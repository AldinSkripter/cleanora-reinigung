"""Media (logo) upload/replace/delete + logo_scale persistence + auth tests."""
import io

import pytest
import requests

from conftest import API


# ---------------- health & auth ----------------

class TestHealthAuth:
    def test_health(self, client):
        r = client.get(f"{API}/health", timeout=30)
        assert r.status_code == 200
        assert r.json()["status"] == "ok"

    def test_login_success(self, client, test_credentials):
        r = client.post(f"{API}/auth/login", json=test_credentials, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data.get("token"), str) and len(data["token"]) > 10
        assert data["email"] == test_credentials["email"].lower()

    def test_me_requires_token(self, client):
        r = client.get(f"{API}/auth/me", timeout=30)
        assert r.status_code in (401, 403)

    def test_me_with_token(self, admin, test_credentials):
        r = admin.get(f"{API}/auth/me", timeout=30)
        assert r.status_code == 200, r.text
        assert r.json()["email"] == test_credentials["email"].lower()
        assert r.json()["role"] == "admin"

    def test_bcrypt_hash_format(self):
        import asyncio, os
        from motor.motor_asyncio import AsyncIOMotorClient
        from dotenv import dotenv_values
        env = dotenv_values("/app/backend/.env")

        async def run():
            c = AsyncIOMotorClient(env["MONGO_URL"])
            u = await c[env["DB_NAME"]].users.find_one({"email": env["ADMIN_EMAIL"].lower()})
            c.close()
            return u

        user = asyncio.get_event_loop().run_until_complete(run()) if False else asyncio.run(run())
        assert user is not None, "Admin user not seeded"
        assert user["password_hash"].startswith("$2b$"), user["password_hash"][:6]


# ---------------- media auth guards ----------------

class TestMediaAuthGuards:
    def test_upload_requires_auth(self, client, transparent_png):
        r = client.post(f"{API}/admin/media/logo",
                        files={"file": ("l.png", io.BytesIO(transparent_png), "image/png")}, timeout=30)
        assert r.status_code in (401, 403)

    def test_delete_requires_auth(self, client):
        r = client.delete(f"{API}/admin/media/logo", timeout=30)
        assert r.status_code in (401, 403)

    def test_unknown_kind(self, admin, transparent_png):
        r = admin.post(f"{API}/admin/media/bogus",
                       files={"file": ("l.png", io.BytesIO(transparent_png), "image/png")}, timeout=30)
        assert r.status_code == 404


# ---------------- logo lifecycle ----------------

@pytest.fixture(scope="class", autouse=True)
def cleanup_logo(admin):
    yield
    admin.delete(f"{API}/admin/media/logo", timeout=30)


class TestLogoLifecycle:
    def test_01_clean_state_404(self, admin, client):
        assert admin.delete(f"{API}/admin/media/logo", timeout=30).status_code == 200
        info = client.get(f"{API}/media/info", timeout=30)
        assert info.status_code == 200
        assert info.json()["logo"] is False
        r = client.get(f"{API}/media/logo", timeout=30, allow_redirects=False)
        assert r.status_code == 404, f"expected 404 without logo, got {r.status_code}"

    def test_02_upload_transparent_png(self, admin, client, transparent_png):
        r = admin.post(f"{API}/admin/media/logo",
                       files={"file": ("logo.png", io.BytesIO(transparent_png), "image/png")}, timeout=60)
        assert r.status_code == 200, r.text
        assert r.json()["ok"] is True
        assert r.json()["filename"] == "logo.png"

        info = client.get(f"{API}/media/info", timeout=30).json()
        assert info["logo"] is True
        assert info["updated_at"]

        g = client.get(f"{API}/media/logo", timeout=30)
        assert g.status_code == 200
        assert g.headers["content-type"] == "image/png"
        assert g.content == transparent_png, "served bytes differ from uploaded bytes"
        # verify alpha channel preserved
        from PIL import Image
        img = Image.open(io.BytesIO(g.content))
        assert img.mode == "RGBA", f"transparency lost, mode={img.mode}"

    def test_03_replace_with_jpeg(self, admin, client, jpeg_image):
        r = admin.post(f"{API}/admin/media/logo",
                       files={"file": ("logo.jpg", io.BytesIO(jpeg_image), "image/jpeg")}, timeout=60)
        assert r.status_code == 200, r.text
        assert r.json()["filename"] == "logo.jpg"

        g = client.get(f"{API}/media/logo", timeout=30)
        assert g.status_code == 200
        assert g.headers["content-type"] == "image/jpeg"
        assert g.content == jpeg_image
        assert client.get(f"{API}/media/info", timeout=30).json()["logo"] is True

    def test_04_replace_back_to_png(self, admin, client, transparent_png):
        r = admin.post(f"{API}/admin/media/logo",
                       files={"file": ("logo2.png", io.BytesIO(transparent_png), "image/png")}, timeout=60)
        assert r.status_code == 200, r.text
        g = client.get(f"{API}/media/logo", timeout=30)
        assert g.status_code == 200
        assert g.headers["content-type"] == "image/png"

    def test_05_delete_returns_to_default(self, admin, client):
        r = admin.delete(f"{API}/admin/media/logo", timeout=30)
        assert r.status_code == 200, r.text
        assert r.json()["ok"] is True
        info = client.get(f"{API}/media/info", timeout=30).json()
        assert info["logo"] is False
        g = client.get(f"{API}/media/logo", timeout=30, allow_redirects=False)
        assert g.status_code == 404

    def test_06_delete_idempotent(self, admin):
        assert admin.delete(f"{API}/admin/media/logo", timeout=30).status_code == 200


class TestUploadValidation:
    def test_txt_rejected_with_german_message(self, admin):
        r = admin.post(f"{API}/admin/media/logo",
                       files={"file": ("bad.txt", io.BytesIO(b"hello world"), "text/plain")}, timeout=30)
        assert r.status_code == 415, r.text
        detail = r.json().get("detail", "")
        assert "Nicht unterstütztes Format" in detail, detail

    def test_empty_file_rejected(self, admin):
        r = admin.post(f"{API}/admin/media/logo",
                       files={"file": ("e.png", io.BytesIO(b""), "image/png")}, timeout=30)
        assert r.status_code == 400, r.text
        assert "Leere" in r.json().get("detail", "")

    def test_oversize_rejected(self, admin):
        big = b"\x89PNG\r\n\x1a\n" + b"0" * (600 * 1024)
        r = admin.post(f"{API}/admin/media/logo",
                       files={"file": ("big.png", io.BytesIO(big), "image/png")}, timeout=60)
        assert r.status_code == 413, r.text
        assert "zu groß" in r.json().get("detail", "")

    def test_missing_file_field(self, admin):
        r = admin.post(f"{API}/admin/media/logo", timeout=30)
        assert r.status_code == 422


class TestOtherMediaKinds:
    def test_share_image_fallback_redirect(self, client):
        r = client.get(f"{API}/media/share-image", timeout=30, allow_redirects=False)
        assert r.status_code in (200, 307), r.status_code

    def test_favicon_fallback_redirect(self, client):
        r = client.get(f"{API}/media/favicon", timeout=30, allow_redirects=False)
        assert r.status_code in (200, 307), r.status_code

    def test_unknown_media_kind(self, client):
        r = client.get(f"{API}/media/nope", timeout=30)
        assert r.status_code == 404


# ---------------- logo_scale persistence ----------------

class TestLogoScale:
    def test_get_site_settings(self, client):
        r = client.get(f"{API}/site-settings", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert "logo_scale" in d
        assert isinstance(d["logo_scale"], (int, float))

    def test_update_and_persist_scale(self, admin, client):
        original = client.get(f"{API}/site-settings", timeout=30).json()
        payload = {k: v for k, v in original.items() if k != "phone_href"}
        payload["logo_scale"] = 1.75
        r = admin.put(f"{API}/admin/settings/site", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        assert client.get(f"{API}/site-settings", timeout=30).json()["logo_scale"] == 1.75

        payload["logo_scale"] = 0.5
        assert admin.put(f"{API}/admin/settings/site", json=payload, timeout=30).status_code == 200
        assert client.get(f"{API}/site-settings", timeout=30).json()["logo_scale"] == 0.5

        # restore
        payload["logo_scale"] = original.get("logo_scale", 1.0)
        admin.put(f"{API}/admin/settings/site", json=payload, timeout=30)

    def test_scale_out_of_range_rejected(self, admin, client):
        original = client.get(f"{API}/site-settings", timeout=30).json()
        payload = {k: v for k, v in original.items() if k != "phone_href"}
        payload["logo_scale"] = 9.0
        r = admin.put(f"{API}/admin/settings/site", json=payload, timeout=30)
        assert r.status_code == 422

    def test_scale_requires_auth(self, client):
        r = client.put(f"{API}/admin/settings/site", json={"public_email": "a@b.de"}, timeout=30)
        assert r.status_code in (401, 403)


# ---------------- brute-force lockout (uses throwaway email; does not lock real admin) ----------------

class TestBruteForceLockout:
    def test_lockout_after_5_failures(self, client, clean_login_attempts):
        email = "TEST_lockout_probe@example.com"
        codes = []
        # NOTE: lockout key is "{request.client.host}:{email}". Behind the k8s ingress the
        # source IP alternates between ingress node IPs, so the counter is split across keys.
        # We therefore send more attempts to reliably reach 5 on one key.
        for _ in range(14):
            r = client.post(f"{API}/auth/login", json={"email": email, "password": "wrong-pw"}, timeout=30)
            codes.append(r.status_code)
        assert codes[:4] == [401, 401, 401, 401], codes
        # BUG (CRITICAL): server.py:83 compares Mongo's naive `locked_until` with tz-aware `now`
        # -> TypeError -> HTTP 500 instead of 429. Lockout is never enforced and the endpoint
        # crashes for that (ip, email) for 15 minutes, even with the correct password.
        assert 500 not in codes, f"login returns 500 after lockout window starts: {codes}"
        assert 429 in codes, f"no lockout (429) triggered after 14 wrong passwords: {codes}"

    def test_correct_password_also_blocked_while_locked(self, client, test_credentials, clean_login_attempts):
        """While an (ip,email) pair is locked, even the correct password must return 429 (not 500)."""
        email = "TEST_lockout_probe2@example.com"
        for _ in range(14):
            client.post(f"{API}/auth/login", json={"email": email, "password": "wrong-pw"}, timeout=30)
        codes = set()
        for _ in range(6):
            r = client.post(f"{API}/auth/login", json={"email": email, "password": test_credentials["password"]}, timeout=30)
            codes.add(r.status_code)
        assert 500 not in codes, f"500 while locked: {codes}"
        assert 429 in codes, f"expected 429 while locked, got {codes}"

    def test_real_admin_still_logs_in(self, client, test_credentials):
        r = client.post(f"{API}/auth/login", json=test_credentials, timeout=30)
        assert r.status_code == 200, r.text
