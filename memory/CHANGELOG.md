# Changelog — Cleanora Gebäudereinigung

## 2026-07 — Verifikations- und Bugfix-Runde (Commit e23dd63)
Vollständiger Testlauf (testing_agent, iteration_1 + iteration_2) nach Nutzer-Bugmeldung
(Logo-Upload/Löschen „Fehler“, Desktop-Abstände zu groß). Ergebnis: 28/28 Backend-Tests grün,
alle Frontend-Flows verifiziert.

Behoben:
- CRITICAL: Login-Lockout lieferte HTTP 500 statt 429 (naive Mongo-Datetime vs. tz-aware now) — `locked_until` wird beim Lesen UTC-normalisiert (server.py)
- Rate-Limit/Lockout nutzt jetzt X-Forwarded-For (`client_ip()`), korrekt hinter Reverse-Proxy
- HIGH: Logo-Größen-Vorschau im Admin stale/kaputt — jetzt Cache-Buster `?v=updated_at`, Live-Refresh via `cleanora-media-changed` Event nach Upload/Löschen, Platzhalter wenn kein Logo
- MEDIUM: MediaCard zeigt Platzhalter „Standard aktiv“ statt Broken-Image/404 wenn kein Bild hinterlegt
- MEDIUM: Desktop-Sektionsabstände 160px → 112px (lg:py-28), Hero-Grid items-start (keine Leerfläche zwischen Headline und Intro)
- Neue Pytest-Regressionssuite: /app/backend/tests/test_media_logo.py (27→28 Tests)

Verifiziert (iteration_2): PNG transparent + JPEG Upload, Ersetzen, Löschen, Standard-Wordmark-Rückkehr,
Slider 50–200 % persistent, Navbar Desktop/Mobile, keine JS-Errors, keine >=400 Responses,
Mobile 390px ohne Overflow, Menü-X sichtbar.

Offen (optional/kosmetisch): CORS_ORIGINS live explizit setzen; MediaCard-Logo-Vorschau auf dunklem Grund
bei transparenten Logos schwer sichtbar; CTA/FAQ-Sektionen noch 128px Padding (Rhythmus).

## Zuvor (Auswahl)
- 3da0180: Hero kompakter, README nginx/Apache Upload-Limit-Hinweis
- 1511c4c: Logo-Größen-Slider 50–200 %, heller Hero
- 71bfc9b: Logo-Upload im Admin, Slash am Wordmark entfernt
- d9a1aa6: Vite-Migration, OG/Medienverwaltung
- 9f2ab4a: Honeypot/ContactInput-Fix, SMTP-Flow
- b263923: motor 3.7.1 / pymongo 4.17 Kompatibilität
- 108ccda/42ab53b: Dependency-Bereinigung (keine emergentintegrations/visual-edits mehr)
