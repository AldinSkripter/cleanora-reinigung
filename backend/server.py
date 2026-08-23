from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import html
import logging
import os
import time
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from typing import Optional

import aiosmtplib
import bcrypt
import jwt
from bson import ObjectId
from cryptography.fernet import Fernet
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field, field_validator
from starlette.middleware.cors import CORSMiddleware

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Cleanora API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ["JWT_SECRET"]
fernet = Fernet(os.environ["CONFIG_ENCRYPTION_KEY"].encode())

# ---------------------------------------------------------------- auth

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_token(email: str) -> str:
    payload = {"sub": email, "role": "admin", "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


bearer = HTTPBearer(auto_error=False)


async def get_admin(creds: HTTPAuthorizationCredentials = Depends(bearer)):
    if not creds:
        raise HTTPException(status_code=401, detail="Nicht authentifiziert")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Ungültiges oder abgelaufenes Token")
    user = await db.users.find_one({"email": payload.get("sub")})
    if not user:
        raise HTTPException(status_code=401, detail="Benutzer nicht gefunden")
    return {"email": user["email"], "role": user.get("role", "admin")}


class LoginInput(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


@api_router.post("/auth/login")
async def login(data: LoginInput, request: Request):
    email = data.email.lower().strip()
    identifier = f"{request.client.host}:{email}"
    now = datetime.now(timezone.utc)
    attempt = await db.login_attempts.find_one({"_id": identifier})
    if attempt and attempt.get("locked_until") and attempt["locked_until"] > now:
        raise HTTPException(status_code=429, detail="Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.")

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user["password_hash"]):
        count = (attempt or {}).get("count", 0) + 1
        update = {"count": count, "last_attempt": now}
        if count >= 5:
            update["locked_until"] = now + timedelta(minutes=15)
        await db.login_attempts.update_one({"_id": identifier}, {"$set": update}, upsert=True)
        raise HTTPException(status_code=401, detail="E-Mail oder Passwort falsch")

    await db.login_attempts.delete_one({"_id": identifier})
    return {"token": create_token(email), "email": email}


@api_router.get("/auth/me")
async def me(admin=Depends(get_admin)):
    return admin


# ------------------------------------------------------- email settings

DEFAULT_SETTINGS = {
    "recipient_email": os.environ.get("CONTACT_RECIPIENT", "kontak@cleanora-reinigung.de"),
    "smtp_host": os.environ.get("SMTP_HOST", ""),
    "smtp_port": int(os.environ.get("SMTP_PORT", "587")),
    "smtp_user": os.environ.get("SMTP_USER", ""),
    "smtp_from": os.environ.get("SMTP_FROM", ""),
    "use_tls": os.environ.get("SMTP_USE_TLS", "false").lower() == "true",
    "start_tls": os.environ.get("SMTP_START_TLS", "true").lower() == "true",
}


async def get_email_settings(with_password: bool = False) -> dict:
    saved = await db.settings.find_one({"_id": "email"}) or {}
    cfg = dict(DEFAULT_SETTINGS)
    for key in cfg:
        if saved.get(key) is not None:
            cfg[key] = saved[key]
    cfg["password_set"] = bool(saved.get("smtp_password_enc") or os.environ.get("SMTP_PASSWORD"))
    if with_password:
        if saved.get("smtp_password_enc"):
            cfg["smtp_password"] = fernet.decrypt(saved["smtp_password_enc"].encode()).decode()
        else:
            cfg["smtp_password"] = os.environ.get("SMTP_PASSWORD", "")
    return cfg


class EmailSettingsInput(BaseModel):
    recipient_email: EmailStr
    smtp_host: str = Field(default="", max_length=255)
    smtp_port: int = Field(default=587, ge=1, le=65535)
    smtp_user: str = Field(default="", max_length=255)
    smtp_password: Optional[str] = Field(default=None, max_length=255)
    smtp_from: str = Field(default="", max_length=255)
    use_tls: bool = False
    start_tls: bool = True


@api_router.get("/admin/settings/email")
async def read_email_settings(admin=Depends(get_admin)):
    return await get_email_settings()


@api_router.put("/admin/settings/email")
async def update_email_settings(data: EmailSettingsInput, admin=Depends(get_admin)):
    doc = data.model_dump(exclude={"smtp_password"})
    if data.smtp_password:
        doc["smtp_password_enc"] = fernet.encrypt(data.smtp_password.encode()).decode()
    doc["updated_at"] = datetime.now(timezone.utc)
    await db.settings.update_one({"_id": "email"}, {"$set": doc}, upsert=True)
    logger.info("E-Mail-Einstellungen aktualisiert von %s", admin["email"])
    return {"ok": True}


# ------------------------------------------------------------ contact

_rate_store: dict[str, list[float]] = {}
RATE_LIMIT = 5
RATE_WINDOW = 60.0


def check_rate_limit(ip: str):
    now = time.time()
    hits = [t for t in _rate_store.get(ip, []) if now - t < RATE_WINDOW]
    if len(hits) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Zu viele Anfragen. Bitte versuchen Sie es später erneut.")
    hits.append(now)
    _rate_store[ip] = hits


class ContactInput(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=60)
    customer_type: str = Field(default="privat", max_length=20)
    service: str = Field(default="", max_length=120)
    object_type: str = Field(default="", max_length=120)
    location: str = Field(default="", max_length=120)
    message: str = Field(min_length=10, max_length=5000)
    privacy: bool
    website: str = Field(default="", max_length=120)  # Honeypot

    @field_validator("name", "message", "phone", "service", "object_type", "location")
    @classmethod
    def strip_controls(cls, v: str) -> str:
        if any(ord(c) < 32 and c not in "\n\r\t" for c in v):
            raise ValueError("Ungültige Zeichen")
        return v.strip()

    @field_validator("privacy")
    @classmethod
    def privacy_accepted(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Datenschutz-Zustimmung erforderlich")
        return v


# ------------------------------------------------------- site settings

SITE_DEFAULTS = {
    "legal_name": os.environ.get("LEGAL_NAME", "Cleanora Gebäudereinigung"),
    "public_email": os.environ.get("PUBLIC_EMAIL", "kontak@cleanora-reinigung.de"),
    "phone": os.environ.get("PUBLIC_PHONE", "+49 (0) 7841 000 000"),
    "street": os.environ.get("PUBLIC_STREET", "Musterstraße 12"),
    "city": os.environ.get("PUBLIC_CITY", "77855 Achern"),
    "owner_name": "",
    "ust_id": "",
    "hours": "Mo–Fr 8:00–17:00 Uhr · Termine nach Vereinbarung",
}


class SiteSettingsInput(BaseModel):
    legal_name: str = Field(default="Cleanora Gebäudereinigung", max_length=120)
    public_email: EmailStr
    phone: str = Field(default="", max_length=60)
    street: str = Field(default="", max_length=120)
    city: str = Field(default="", max_length=120)
    owner_name: str = Field(default="", max_length=120)
    ust_id: str = Field(default="", max_length=40)
    hours: str = Field(default="", max_length=120)


async def get_site_settings() -> dict:
    saved = await db.settings.find_one({"_id": "site"}) or {}
    cfg = dict(SITE_DEFAULTS)
    for key in cfg:
        if saved.get(key) is not None:
            cfg[key] = saved[key]
    cfg["phone_href"] = "+" + "".join(ch for ch in cfg["phone"].replace("(0)", "") if ch.isdigit())
    return cfg


@api_router.get("/site-settings")
async def public_site_settings():
    return await get_site_settings()


@api_router.put("/admin/settings/site")
async def update_site_settings(data: SiteSettingsInput, admin=Depends(get_admin)):
    doc = data.model_dump()
    doc["updated_at"] = datetime.now(timezone.utc)
    await db.settings.update_one({"_id": "site"}, {"$set": doc}, upsert=True)
    logger.info("Firmendaten aktualisiert von %s", admin["email"])
    return {"ok": True}


# ------------------------------------------------------------ contact


def build_email(data: ContactInput, cfg: dict) -> EmailMessage:
    e = lambda s: html.escape(str(s))
    rows = [
        ("Name / Firma", data.name),
        ("E-Mail", str(data.email)),
        ("Telefon", data.phone or "—"),
        ("Kundentyp", "Gewerbekunde" if data.customer_type == "gewerbe" else "Privatkunde"),
        ("Leistung", data.service or "—"),
        ("Objektart", data.object_type or "—"),
        ("Ort", data.location or "—"),
    ]
    text = "Neue Anfrage über das Kontaktformular\n\n" + "\n".join(f"{k}: {v}" for k, v in rows) + f"\n\nNachricht:\n{data.message}"
    html_rows = "".join(f'<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">{e(k)}</td><td style="padding:6px 0">{e(v)}</td></tr>' for k, v in rows)
    html_body = (
        '<div style="font-family:Arial,sans-serif;max-width:640px">'
        "<h2>Neue Anfrage — cleanora-reinigung.de</h2>"
        f"<table>{html_rows}</table>"
        f'<hr style="border:none;border-top:1px solid #ddd;margin:16px 0">'
        f"<p>{e(data.message).replace(chr(10), '<br>')}</p></div>"
    )
    msg = EmailMessage()
    msg["Subject"] = f"Anfrage Kontaktformular: {data.name}"
    msg["From"] = cfg["smtp_from"] or cfg["smtp_user"]
    msg["To"] = cfg["recipient_email"]
    msg["Reply-To"] = str(data.email)
    msg.set_content(text)
    msg.add_alternative(html_body, subtype="html")
    return msg


async def send_email(data: ContactInput) -> bool:
    cfg = await get_email_settings(with_password=True)
    if not cfg["smtp_host"] or not cfg["smtp_user"] or not cfg["smtp_password"]:
        logger.warning("SMTP nicht konfiguriert — Anfrage wurde nur in der Datenbank gespeichert")
        return False
    if cfg["use_tls"] and cfg["start_tls"]:
        raise RuntimeError("use_tls und start_tls schließen sich aus")
    await aiosmtplib.send(
        build_email(data, cfg),
        hostname=cfg["smtp_host"],
        port=cfg["smtp_port"],
        username=cfg["smtp_user"],
        password=cfg["smtp_password"],
        use_tls=cfg["use_tls"],
        start_tls=cfg["start_tls"],
        timeout=20,
    )
    return True


@api_router.post("/contact")
async def contact(data: ContactInput, request: Request):
    if data.website:  # Honeypot: still accept silently
        return {"ok": True}
    check_rate_limit(request.client.host)
    doc = data.model_dump(exclude={"website", "privacy"})
    doc["created_at"] = datetime.now(timezone.utc)
    doc["ip"] = request.client.host
    try:
        doc["email_sent"] = await send_email(data)
    except Exception:
        logger.exception("E-Mail-Versand fehlgeschlagen")
        doc["email_sent"] = False
        await db.contact_requests.insert_one(doc)
        raise HTTPException(status_code=502, detail="Die Nachricht konnte derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut.")
    await db.contact_requests.insert_one(doc)
    return {"ok": True}


@api_router.get("/admin/requests")
async def list_requests(admin=Depends(get_admin)):
    items = await db.contact_requests.find().sort("created_at", -1).limit(200).to_list(200)
    for it in items:
        it["id"] = str(it.pop("_id"))
    return items


@api_router.delete("/admin/requests/{request_id}")
async def delete_request(request_id: str, admin=Depends(get_admin)):
    if not ObjectId.is_valid(request_id):
        raise HTTPException(status_code=400, detail="Ungültige ID")
    await db.contact_requests.delete_one({"_id": ObjectId(request_id)})
    return {"ok": True}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


# ------------------------------------------------------- legal texts

class LegalTextsInput(BaseModel):
    impressum: str = Field(default="", max_length=30000)
    datenschutz: str = Field(default="", max_length=30000)


@api_router.get("/legal-texts")
async def public_legal_texts():
    saved = await db.settings.find_one({"_id": "legal"}) or {}
    return {"impressum": saved.get("impressum", ""), "datenschutz": saved.get("datenschutz", "")}


@api_router.put("/admin/settings/legal")
async def update_legal_texts(data: LegalTextsInput, admin=Depends(get_admin)):
    doc = data.model_dump()
    doc["updated_at"] = datetime.now(timezone.utc)
    await db.settings.update_one({"_id": "legal"}, {"$set": doc}, upsert=True)
    logger.info("Rechtstexte aktualisiert von %s", admin["email"])
    return {"ok": True}


# ------------------------------------------------------------ startup

async def seed_admin():
    email = os.environ["ADMIN_EMAIL"].lower().strip()
    password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({
            "email": email,
            "password_hash": hash_password(password),
            "role": "admin",
            "created_at": datetime.now(timezone.utc),
        })
        logger.info("Admin-Benutzer angelegt: %s", email)
    elif not verify_password(password, existing["password_hash"]):
        await db.users.update_one({"email": email}, {"$set": {"password_hash": hash_password(password)}})
        logger.info("Admin-Passwort aktualisiert: %s", email)


@app.on_event("startup")
async def startup():
    await seed_admin()
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("last_attempt", expireAfterSeconds=86400)
    await db.contact_requests.create_index("created_at")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
