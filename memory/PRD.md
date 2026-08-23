# PRD — Cleanora Gebäudereinigung (Achern & Umgebung)

## Original-Problemstellung
Vollständige, moderne Premium-Website für CLEANORA (Gebäudereinigung & Reinigungsservice, Achern & Umgebung): hochwertiger Markenauftritt, Local-SEO-Fokus Achern/Ortenau, Seiten Startseite/Leistungen (mit 10 Unterseiten)/Über uns/Einsatzgebiet/Kontakt/Impressum/Datenschutz, technisch voll funktionierendes Kontaktformular mit E-Mail-Versand (Empfänger per ENV konfigurierbar), Spam-Schutz, DSGVO-konform, SEO-Basis (Meta, Sitemap, robots, Schema.org), Footer, Premium-UX (Sticky Nav, Scroll-Animationen, FAQ, Mobile Menu, Click-to-Call), professionelle deutsche Texte ohne erfundene Fakten, .env.example/.gitignore/README, Plesk-VPS-tauglich, Push in GitHub-Repo (URL vom Kunden noch ausstehend).

## Architektur
- **Frontend:** React 19 (CRA/craco), react-router-dom 7, Tailwind, framer-motion (Scroll-Reveals, Hero-Mask-Reveal), lenis (Smooth Scroll), fontsource (Outfit Variable + DM Sans, lokal = DSGVO-konform), sonner Toasts, axios.
- **Backend:** FastAPI + Motor (MongoDB). Endpunkte: /api/contact (Honeypot, IP-Rate-Limit 5/min, Validierung, DSGVO-Pflicht), /api/auth/login + /api/auth/me (JWT, bcrypt, Brute-Force-Lock 5×/15 min), /api/admin/settings/email (GET/PUT, SMTP-Passwort Fernet-verschlüsselt), /api/admin/requests (GET/DELETE), /api/health.
- **E-Mail:** aiosmtplib; Konfiguration zur Laufzeit aus MongoDB (Admin-Panel), Fallback .env. HTML+Text-Mail, Reply-To = Besucher. Ohne SMTP: Anfrage wird in DB gespeichert und im Admin angezeigt.
- **Design:** Swiss High-Contrast (Pristine White vs. Precision Deep Blue), Outfit/DM Sans, asymmetrische Editorial-Layouts, nummerierte Kapitel, langsamer Marquee, Glas-Sticky-Nav, dunkles Admin-Panel.

## User-Personas
- Gewerbekunde (Büro/Praxis/Hausverwaltung in Achern) sucht verlässlichen Reinigungspartner.
- Privatkunde sucht Haushalts-/Fensterreinigung in der Region.
- Inhaber (Admin) verwaltet E-Mail-Empfänger/SMTP und sieht Anfragen im Panel.

## Core Requirements (statisch)
Mehrsprachig DE, responsive (Desktop/Tablet/Mobile), Local-SEO Achern & Ortenau, keine erfundenen Firmenfakten, Platzhalter für Impressum/Kontaktdaten, keine Secrets im Repo.

## Implementiert (Juli 2026)
- Alle Seiten: Start (Hero mit Mask-Reveal, Marquee, Kapitel 01–07, FAQ, Kontakt), Leistungen-Übersicht, 10 dynamische Leistungs-Detailseiten, Über uns, Einsatzgebiet, Kontakt, Impressum, Datenschutz, 404, Admin-Login + Admin-Dashboard (Anfragen-Inbox + E-Mail-Einstellungen).
- Backend komplett: Kontakt mit Spam-Schutz, JWT-Admin-Auth, E-Mail-Settings (verschlüsselt), Anfragen-Speicherung.
- SEO: Meta/OG/Canonical pro Seite, JSON-LD (ProfessionalService, Service, FAQPage), sitemap.xml, robots.txt.
- Doku: README (Install/Deploy Plesk), .env.example (backend+frontend), .gitignore, auth_testing.md.
- Admin-Panel erweitert: Tab „Firmendaten" (Firmenname, öffentliche E-Mail, Telefon, Adresse, Inhaber, USt-IdNr., Erreichbarkeit) — Werte werden live auf Website (Footer/Kontakt/Impressum/Datenschutz/JSON-LD) gerendert via GET /api/site-settings (öffentlich) + PUT /api/admin/settings/site (geschützt).
- Admin-Panel Tab „Rechtstexte": Impressum & Datenschutz komplett im Admin editierbar (GET /api/legal-texts öffentlich, PUT /api/admin/settings/legal geschützt); leer = Standardtext mit Firmendaten.
- Admin-Zugang geändert auf kontakt@cleanora-reinigung.de (alter Test-Admin gelöscht).
- Neues Hero-Bild (moderne professionelle Reinigung statt Fensterputzer auf Fassade).
- Bugfix: Seitenwechsel springt zuverlässig an den Seitenanfang (Lenis überschrieb window.scrollTo → jetzt lenis.scrollTo(0, immediate) bei Routenwechsel). E2E verifiziert.
- GitHub: Code in https://github.com/AldinSkripter/cleanora-reinigung gepusht (Branch main).

## Backlog
- P0: Echte SMTP-Zugangsdaten im Admin-Panel eintragen (oder .env) und Testmail verifizieren. Verbleibende Platzhalter (USt-ID, ggf. echte Adresse) im Admin-Panel unter „Firmendaten" pflegen.
- P1: Finale Domain in SITE.domain/sitemap/robots setzen; OG-Share-Image (og:image) ergänzen; Favicon mit Cleanora-Wordmark.
- P2: Cookie-/Consent-Hinweis falls später Tracking hinzukommt; Testimonials/Referenzen sobald echte vorliegen; mehrsprachige Version optional; Erfolgsmetriken (Core Web Vitals Messung auf Zielserver).

## Nächste Aufgaben
1. SMTP produktiv konfigurieren + End-to-End-Testmail.
2. USt-ID und finale Adresse im Admin-Panel ergänzen.
3. Bei Domainwechsel: SITE.domain/sitemap/robots anpassen.
