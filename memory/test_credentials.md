# Test Credentials
# Agent writes here when creating/modifying auth credentials (admin accounts, test users).
# Testing agent reads this before auth tests. Fork/continuation agents read on startup.

## Admin-Login (Cleanora Admin-Panel, /admin)
- E-Mail: admin@cleanora-reinigung.de
- Passwort: Cleanora-Admin-2026!
- Rolle: admin
- Quelle: Backend-Env `ADMIN_EMAIL` / `ADMIN_PASSWORD` (bei Backend-Start automatisch geseedet; Passwortänderung in .env aktualisiert den Hash beim nächsten Start)

## Auth-Endpunkte
- POST /api/auth/login {email, password} → {token}
- GET  /api/auth/me (Bearer-Token)
- GET  /api/admin/settings/email (Bearer)
- PUT  /api/admin/settings/email (Bearer)
- GET  /api/admin/requests (Bearer)
- DELETE /api/admin/requests/{id} (Bearer)

## Kontaktformular
- POST /api/contact (öffentlich; Honeypot-Feld `website`, Rate-Limit 5/Min, `privacy: true` Pflicht)
- Empfänger standardmäßig: kontak@cleanora-reinigung.de (im Admin-Panel änderbar)
- SMTP ist noch NICHT mit echten Zugangsdaten konfiguriert — Anfragen werden in der DB gespeichert und im Admin-Panel angezeigt; E-Mail-Versand erst nach SMTP-Eintragung im Admin-Panel oder per .env
