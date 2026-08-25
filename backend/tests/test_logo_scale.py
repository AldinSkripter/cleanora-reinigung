# Tests for logo_scale bounds (0.5 - 7.0), persistence, and static standard-logo SVG delivery
import pytest
import requests

from conftest import API, BASE_URL


@pytest.fixture(scope="module")
def original_scale(admin):
    r = admin.get(f"{API}/site-settings", timeout=30)
    assert r.status_code == 200
    yield r.json().get("logo_scale", 1.5)


def _put(admin, cfg, scale):
    payload = {**cfg, "logo_scale": scale}
    payload.pop("_id", None)
    return admin.put(f"{API}/admin/settings/site", json=payload, timeout=30)


@pytest.fixture(scope="module")
def site_cfg(admin):
    r = admin.get(f"{API}/site-settings", timeout=30)
    assert r.status_code == 200
    d = r.json()
    assert "_id" not in d, "MongoDB _id leaked in /api/site-settings"
    return d


class TestLogoScaleBounds:
    def test_default_present(self, site_cfg):
        assert "logo_scale" in site_cfg
        assert isinstance(site_cfg["logo_scale"], (int, float))
        assert 0.5 <= site_cfg["logo_scale"] <= 7.0

    @pytest.mark.parametrize("scale", [0.5, 1.5, 3.0, 7.0])
    def test_accepts_valid_scales(self, admin, site_cfg, scale):
        r = _put(admin, site_cfg, scale)
        assert r.status_code == 200, r.text[:300]
        # verify persistence via public GET
        g = requests.get(f"{API}/site-settings", timeout=30)
        assert g.status_code == 200
        assert abs(g.json()["logo_scale"] - scale) < 1e-6

    @pytest.mark.parametrize("scale", [7.5, 8, 0.4, 0, -1])
    def test_rejects_out_of_range(self, admin, site_cfg, scale):
        r = _put(admin, site_cfg, scale)
        assert r.status_code == 422, f"expected 422 for {scale}, got {r.status_code}"

    def test_requires_auth(self, site_cfg):
        r = requests.put(f"{API}/admin/settings/site", json={**site_cfg, "logo_scale": 2.0}, timeout=30)
        assert r.status_code in (401, 403)

    def test_restore(self, admin, site_cfg, original_scale):
        r = _put(admin, site_cfg, 1.5)
        assert r.status_code == 200
        g = requests.get(f"{API}/site-settings", timeout=30)
        assert abs(g.json()["logo_scale"] - 1.5) < 1e-6


class TestStandardLogoAssets:
    @pytest.mark.parametrize("path", [
        "/logo-standard.png", "/logo-standard-light.png",
        "/logo-compact.png", "/logo-compact-light.png",
    ])
    def test_png_served(self, path):
        r = requests.get(f"{BASE_URL}{path}", timeout=30)
        assert r.status_code == 200, f"{path} -> {r.status_code}"
        ctype = r.headers.get("content-type", "")
        assert "png" in ctype, f"{path} content-type {ctype}"
        assert r.content[:8] == b"\x89PNG\r\n\x1a\n"


class TestMediaInfo:
    def test_media_info_shape(self):
        r = requests.get(f"{API}/media/info", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert "_id" not in d
        for k in ("logo", "logo_light", "favicon", "share_image"):
            assert k in d
            assert isinstance(d[k], bool)
