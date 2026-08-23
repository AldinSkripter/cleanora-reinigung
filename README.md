# Cleanora — Gebäudereinigung & Reinigungsservice, Achern & Umgebung

Premium-Unternehmenswebsite für **Cleanora Gebäudereinigung** mit voll funktionsfähigem
Kontaktformular (E-Mail-Versand via SMTP) und Admin-Panel zur Verwaltung der
E-Mail-Einstellungen und eingegangenen Anfragen.

**Stack:** React (Frontend) · FastAPI (Backend) · MongoDB (Datenbank)

---

## 1. Voraussetzungen

- **Node.js** ≥ 18 (inkl. npm oder yarn)
- **Python** ≥ 3.10
- **MongoDB** ≥ 5 (lokal oder remote, z. B. MongoDB Atlas)

## 2. Projektstruktur

```
├── backend/            # FastAPI-API (Kontaktformular, Admin, Auth)
│   ├── server.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/           # React-Website
│   ├── src/
│   ├── public/         # index.html, robots.txt, sitemap.xml
│   ├── package.json
│   └── .env.example
└── README.md
```

## 3. Installation

```bash
# Backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # Werte anpassen (siehe unten)

# Frontend
cd ../frontend
yarn install                # oder: npm install
cp .env.example .env        # REACT_APP_BACKEND_URL anpassen
```

## 4. Environment Variables

### backend/.env

| Variable | Beschreibung |
|---|---|
| `MONGO_URL` | MongoDB-Verbindungsstring |
| `DB_NAME` | Datenbankname (z. B. `cleanora`) |
| `CORS_ORIGINS` | Erlaubte Frontend-Origins, kommagetrennt (Produktion: `https://ihre-domain.de`) |
| `JWT_SECRET` | Zufälliger 64-Zeichen-Hex-Wert (`openssl rand -hex 32`) |
| `ADMIN_EMAIL` | E-Mail des Admin-Logins |
| `ADMIN_PASSWORD` | Initial-Passwort des Admins (beim ersten Start angelegt) |
| `CONFIG_ENCRYPTION_KEY` | Fernet-Key zur Verschlüsselung des SMTP-Passworts (`python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"`) |
| `CONTACT_RECIPIENT` | Standard-Empfänger für Kontaktanfragen (im Admin-Panel änderbar) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | SMTP-Fallback (optional — bequemer im Admin-Panel konfigurierbar) |
| `SMTP_USE_TLS` / `SMTP_START_TLS` | TLS-Modus: Port 465 → `SMTP_USE_TLS=true`, Port 587 → `SMTP_START_TLS=true` |

### frontend/.env

| Variable | Beschreibung |
|---|---|
| `REACT_APP_BACKEND_URL` | Basis-URL des Backends ohne `/api` (Produktion: `https://ihre-domain.de`) |

**Niemals echte Zugangsdaten committen.** `.env` ist per `.gitignore` ausgeschlossen.

## 5. Development Start

```bash
# Backend (Terminal 1)
cd backend && source .venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend (Terminal 2)
cd frontend
yarn start          # läuft auf http://localhost:3000
```

Admin-Panel: `http://localhost:3000/admin` (Login mit `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## 6. Production Build

```bash
cd frontend
yarn build          # erzeugt frontend/build/ (statische Dateien)
```

## 7. Production Start / Deployment (Plesk VPS)

### Variante A — Node/Python auf dem VPS (empfohlen)

1. Repository auf den Server klonen, Abhängigkeiten installieren (s. oben).
2. **Frontend:** `yarn build` ausführen. Das Verzeichnis `frontend/build/` in Plesk als
   DocumentRoot der Domain ausliefern (Apache/Nginx). Folgende Rewrite-Regel einrichten,
   damit React-Routing funktioniert (alle Pfade → `index.html`):

   ```apache
   # .htaccess im DocumentRoot (Apache)
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{REQUEST_URI} !^/api
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

3. **Backend:** mit Gunicorn/Uvicorn als Systemdienst betreiben:

   ```bash
   pip install gunicorn
   gunicorn -k uvicorn.workers.UvicornWorker server:app -w 2 -b 127.0.0.1:8001
   ```

   (Alternativ: Plesk „Python"-Erweiterung mit Startup-Datei `server.py` / App `server:app`.)

4. **Reverse Proxy:** Requests auf `/api/*` an `http://127.0.0.1:8001` weiterleiten
   (in Plesk: Apache/Nginx-Weisungen der Domain, z. B. `ProxyPass /api http://127.0.0.1:8001/api`).
5. **MongoDB:** lokal installieren (nur localhost binden) oder MongoDB Atlas nutzen.
6. **Umgebungsvariablen** in Plesk bzw. `.env` setzen — nicht ins Webroot legen.

### Variante B — Docker

Beliebige Standard-Node/Python-Container verwenden; das Projekt hat keine
plattformspezifischen Abhängigkeiten.

## 8. Kontaktformular / E-Mail-Konfiguration

Das Kontaktformular sendet Anfragen per SMTP an die konfigurierte Empfänger-Adresse
(Standard: `kontak@cleanora-reinigung.de`).

**Konfiguration im Admin-Panel** (`/admin` → „E-Mail-Einstellungen").

Das Admin-Panel bietet drei Bereiche:
- **Anfragen:** alle Kontaktanfragen aus dem Formular (auch als Backup, falls SMTP einmal fehlschlägt)
- **E-Mail-Einstellungen:** Empfänger-Adresse + komplette SMTP-Konfiguration
- **Firmendaten:** öffentliche E-Mail, Telefon, Adresse, Inhaber, USt-IdNr., Erreichbarkeit — Änderungen erscheinen sofort auf der Website (Footer, Kontakt, Impressum, Datenschutz)

1. Postfach in Plesk anlegen (z. B. `kontak@cleanora-reinigung.de`).
2. Im Admin-Panel eintragen:
   - **SMTP-Host:** meist `mail.ihre-domain.de` (siehe Plesk-Mail-Einstellungen)
   - **Port 587** + STARTTLS *(oder Port 465 + SSL/TLS)*
   - **Benutzername:** vollständige E-Mail-Adresse des Postfachs
   - **Passwort:** Postfach-Passwort (wird verschlüsselt gespeichert)
   - **Absender:** dieselbe Adresse wie Benutzername (vermeidet SPF/DMARC-Probleme)
3. Speichern — Testanfrage über das Formular senden.

Alle Anfragen werden zusätzlich in der Datenbank gespeichert und sind im Admin-Panel
unter „Anfragen" einsehbar — auch falls der SMTP-Versand einmal fehlschlägt.

**Schutzmaßnahmen:** Honeypot-Feld, IP-Ratenbegrenzung (5 Anfragen/Minute),
serverseitige Validierung, DSGVO-Pflicht-Checkbox, Brute-Force-Sperre im Admin-Login
(5 Fehlversuche → 15 Minuten Sperre).

## 9. SEO

- Individuelle Titles, Meta-Descriptions, Canonicals und Open-Graph-Tags pro Seite
- `frontend/public/sitemap.xml` und `robots.txt` (Domain ggf. anpassen)
- Strukturierte Daten (Schema.org: ProfessionalService, Service, FAQPage)
- Semantisches HTML, H1/H2-Struktur, deutsche Sprachauszeichnung

**Hinweis:** Die Domain `https://cleanora-reinigung.de` in `sitemap.xml`, `robots.txt`
und `frontend/src/data/site.js` (`SITE.domain`) ggf. an die finale Domain anpassen.

## 10. Platzhalter ersetzen

Alle Firmendaten (Telefon, Adresse, Inhaber, USt-IdNr., Erreichbarkeit, öffentliche E-Mail)
können bequem im **Admin-Panel** unter `/admin` → „Firmendaten" gepflegt werden — kein
Code-Eingriff nötig. Alternativ liegen die Standardwerte in `frontend/src/data/site.js` (`SITE`).

---

© Cleanora Gebäudereinigung — Achern & Umgebung
