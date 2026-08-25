"""Tests for the new 'logo-light' media slot (Logo für dunklen Hintergrund),
the customer standard-logo PNG assets and a contact-form regression."""
import io
import uuid

import pytest
import requests

from conftest import API, BASE_URL


def _png(color, size=(240, 80)):
    from PIL import Image, ImageDraw
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rectangle([5, 5, size[0] - 5, size[1] - 5], outline=color, width=6)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


@pytest.fixture(scope="module")
def white_png():
    return _png((255, 255, 255, 255))


@pytest.fixture(scope="module")
def blue_png():
    return _png((0, 100, 200, 255))


# --- Standard logo PNG assets (public/) ---
class TestStandardLogoAssets:
    @pytest.mark.parametrize("path", [
        "/logo-standard.png", "/logo-standard-light.png",
    ])
    def test_png_served(self, path):
        r = requests.get(f"{BASE_URL}{path}", timeout=30)
        assert r.status_code == 200, f"{path} -> {r.status_code}"
        assert r.content[:8] == b"\x89PNG\r\n\x1a\n", f"{path} is not a PNG"
        assert len(r.content) > 1000


# --- /api/media/info shape ---
class TestMediaInfo:
    def test_info_contains_logo_light(self, client):
        r = client.get(f"{API}/media/info", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "_id" not in data
        for key in ("logo", "logo_light", "share_image", "favicon", "updated_at"):
            assert key in data, f"missing {key} in {data}"


# --- logo-light lifecycle + independence from logo slot ---
class TestLogoLightLifecycle:
    def test_00_clean_state(self, admin, client):
        admin.delete(f"{API}/admin/media/logo-light", timeout=30)
        admin.delete(f"{API}/admin/media/logo", timeout=30)
        info = client.get(f"{API}/media/info", timeout=30).json()
        assert info.get("logo_light") in (None, False, "")
        r = client.get(f"{API}/media/logo-light", timeout=30, allow_redirects=False)
        assert r.status_code == 404, f"expected 404 without upload, got {r.status_code}"

    def test_01_upload_requires_auth(self, client, white_png):
        r = client.post(f"{API}/admin/media/logo-light",
                        files={"file": ("TEST_light.png", white_png, "image/png")}, timeout=30)
        assert r.status_code in (401, 403)

    def test_02_upload_white_png(self, admin, client, white_png):
        r = admin.post(f"{API}/admin/media/logo-light",
                       files={"file": ("TEST_light.png", white_png, "image/png")}, timeout=30)
        assert r.status_code == 200, r.text[:300]
        info = client.get(f"{API}/media/info", timeout=30).json()
        assert info.get("logo_light"), f"logo_light not set: {info}"
        got = client.get(f"{API}/media/logo-light", timeout=30)
        assert got.status_code == 200
        assert got.content == white_png
        assert "image/png" in got.headers.get("content-type", "")

    def test_03_slots_independent(self, admin, client, blue_png, white_png):
        # uploading normal logo must not change logo_light
        r = admin.post(f"{API}/admin/media/logo",
                       files={"file": ("TEST_logo.png", blue_png, "image/png")}, timeout=30)
        assert r.status_code == 200
        assert client.get(f"{API}/media/logo", timeout=30).content == blue_png
        assert client.get(f"{API}/media/logo-light", timeout=30).content == white_png
        # deleting normal logo must not remove logo_light
        assert admin.delete(f"{API}/admin/media/logo", timeout=30).status_code == 200
        assert client.get(f"{API}/media/logo", timeout=30, allow_redirects=False).status_code == 404
        assert client.get(f"{API}/media/logo-light", timeout=30).content == white_png

    def test_04_invalid_mime_rejected(self, admin):
        r = admin.post(f"{API}/admin/media/logo-light",
                       files={"file": ("TEST_x.txt", b"hello", "text/plain")}, timeout=30)
        assert r.status_code == 415
        assert "detail" in r.json()

    def test_05_oversize_rejected(self, admin):
        big = b"\x89PNG\r\n\x1a\n" + b"0" * (600 * 1024)
        r = admin.post(f"{API}/admin/media/logo-light",
                       files={"file": ("TEST_big.png", big, "image/png")}, timeout=30)
        assert r.status_code == 413

    def test_06_delete_and_verify(self, admin, client):
        assert admin.delete(f"{API}/admin/media/logo-light", timeout=30).status_code == 200
        info = client.get(f"{API}/media/info", timeout=30).json()
        assert info.get("logo_light") in (None, False, "")
        assert client.get(f"{API}/media/logo-light", timeout=30,
                          allow_redirects=False).status_code == 404

    def test_07_delete_idempotent(self, admin):
        assert admin.delete(f"{API}/admin/media/logo-light", timeout=30).status_code in (200, 404)


# --- Regression: contact form ---
class TestContactRegression:
    def test_contact_submit_and_cleanup(self, admin, client):
        marker = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"{marker} Tester",
            "email": "test@example.com",
            "phone": "+49123456789",
            "service": "Buerroreinigung",
            "message": f"Automatisierte Testanfrage {marker}",
            "privacy": True,
            "website": "",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code in (200, 201), r.text[:300]

        lst = admin.get(f"{API}/admin/requests", timeout=30)
        assert lst.status_code == 200
        items = lst.json()
        items = items.get("items", items) if isinstance(items, dict) else items
        assert isinstance(items, list)
        mine = [i for i in items if marker in str(i.get("message", "")) or marker in str(i.get("name", ""))]
        assert mine, "submitted contact request not found in admin list"
        assert "_id" not in mine[0]
        for i in mine:
            d = admin.delete(f"{API}/admin/requests/{i['id']}", timeout=30)
            assert d.status_code in (200, 204)
