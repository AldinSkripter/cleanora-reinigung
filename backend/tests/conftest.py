import io
import os
import re
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing")
BASE_URL = base_url.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def api_url():
    return API


@pytest.fixture(scope="session")
def test_credentials():
    p = Path("/app/memory/test_credentials.md")
    if not p.exists():
        pytest.skip("Missing /app/memory/test_credentials.md")
    content = p.read_text(encoding="utf-8")
    email = re.search(r"(?im)^\s*[-*]?\s*E-Mail:\s*([^\s]+)", content)
    pw = re.search(r"(?im)^\s*[-*]?\s*Passwort:\s*([^\s]+)", content)
    if not email or not pw:
        pytest.skip("No credentials found in test_credentials.md")
    return {"email": email.group(1), "password": pw.group(1)}


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def auth_token(client, test_credentials):
    r = client.post(f"{API}/auth/login", json=test_credentials, timeout=30)
    if r.status_code != 200:
        pytest.fail(f"Login failed {r.status_code}: {r.text[:300]}")
    token = r.json().get("token")
    if not token:
        pytest.fail("No token in login response")
    return token


@pytest.fixture(scope="session")
def admin(client, auth_token):
    s = requests.Session()
    s.headers.update({"Authorization": f"Bearer {auth_token}"})
    return s


@pytest.fixture
def clean_login_attempts():
    """Remove TEST_ probe entries from login_attempts before and after the test
    so brute-force lockout tests are isolated between runs."""
    from pymongo import MongoClient

    backend_env = dotenv_values("/app/backend/.env")
    mongo_url = os.environ.get("MONGO_URL") or backend_env.get("MONGO_URL")
    db_name = os.environ.get("DB_NAME") or backend_env.get("DB_NAME")
    if not mongo_url or not db_name:
        pytest.skip("MONGO_URL / DB_NAME not available for login_attempts cleanup")

    def purge():
        mc = MongoClient(mongo_url)
        try:
            mc[db_name].login_attempts.delete_many(
                {"_id": {"$regex": "test_lockout_probe", "$options": "i"}}
            )
        finally:
            mc.close()

    purge()
    yield
    purge()


def _png_bytes(transparent=True, size=(240, 80)):
    from PIL import Image, ImageDraw
    mode = "RGBA" if transparent else "RGB"
    bg = (0, 0, 0, 0) if transparent else (255, 255, 255)
    img = Image.new(mode, size, bg)
    d = ImageDraw.Draw(img)
    d.rectangle([10, 10, size[0] - 10, size[1] - 10], outline=(0, 120, 200, 255) if transparent else (0, 120, 200), width=4)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def _jpeg_bytes(size=(240, 80)):
    from PIL import Image
    img = Image.new("RGB", size, (240, 240, 240))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    return buf.getvalue()


@pytest.fixture(scope="session")
def transparent_png():
    return _png_bytes(True)


@pytest.fixture(scope="session")
def jpeg_image():
    return _jpeg_bytes()
