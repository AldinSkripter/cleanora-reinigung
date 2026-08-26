# Changelog — Cleanora Gebäudereinigung

## 2026-07 — Aqua-Markenfarbe durchgängig auf allen Seiten
- Türkis (#16bfae / aqua-deep #0f8c7f) jetzt systematisch auf allen Seiten: Eyebrow-Striche
  (Leistungen, Über uns, Einsatzgebiet, Kontakt), alle Listen-/Kapitel-Nummern, Hover-Zustände
  von Links und Pfeilen, Check-Icons (Leistungsumfang, Vertrauenszeile, WhyUs), FAQ (Hover +
  geöffnetes Plus-Icon), Marquee-Punkte, aktive Nav-Unterstreichung (decoration-aqua),
  Formular-Fokusrahmen, Kontakt-Icon-Boxen, Orte-Chips-Hover, Prozess-Border-Hover,
  WhyUs-Karten (aqua Nummern + passender Hover-Navy #0e3d5c), dunkle CTA-Labels.
- Verifiziert per Screenshots (Intro/Services, WhyUs dunkel, Navbar-Unterstreichung) +
  55/55 Backend-Tests, Build fehlerfrei.


# Changelog — Cleanora Gebäudereinigung

## 2026-07 — Markenfarben aus dem Logo + Footer-Credit
- Exakte Logo-Farben per PIL extrahiert: Türkis #16bfae (aqua), Navy #0b3048.
- Tailwind: precision → hsl(204 73% 16%) (= Logo-Navy), neue Farben aqua/aqua-deep (#0f8c7f).
- Aqua-Akzente: Hero-Kursive „in Achern & Umgebung.“, Eyebrow-Strich, Vertrauens-Checks,
  Kapitel-Nummern (ChapterHeading), Footer-Link-Hover, Consent/Admin emerald-400 → aqua,
  Footer-Riesen-Wordmark in Aqua-Tönung.
- Footer: Credit „Design & Entwicklung: Jonuzovic Design“ → https://jonuzovicdesign.de
  (target _blank, noopener, data-testid footer-credit).
- Verifiziert per Screenshots (Hero, Footer, Leistungen) + 55/55 Backend-Tests, Build fehlerfrei.


# Changelog — Cleanora Gebäudereinigung

## 2026-07 — Mobiles Logo: vollständige Darstellung statt Kompakt-Crop
- Problem: Die Kompakt-Variante (ohne „GEBÄUDEREINIGUNG“-Sub-Zeile) wirkte auf Mobil wie ein
  abgeschnittenes Logo.
- Fix: Kompakt-Varianten entfernt (Dateien gelöscht, Tests angepasst); auf allen Bildschirmgrößen
  wird das vollständige Logo inkl. Sub-Zeile gezeigt. Mobile Höhe 44px → 48px, Tablet 56px.
- Verifiziert per Pixel-Messung + Screenshots auf 320/360/390/430/768 px, Header geschlossen und
  Menü geöffnet: vollständiges Logo (helles im dunklen Menü), exaktes Seitenverhältnis,
  kein Overlap mit Menü-Button, kein horizontaler Overflow. Desktop unverändert.
- 55/55 Backend-Tests grün (4 Kompakt-Asset-Tests entfernt), Build fehlerfrei.


# Changelog — Cleanora Gebäudereinigung

## 2026-07 — Logo-Skalierung repariert: echtes visuelles Skalierungsmodell (Commit nach ba1a128)
- Problem: max-width-Caps ließen den Slider ab ~360 % wirkungslos wirken; Logo wirkte begrenzt.
- Fix: Logo.jsx komplett neu — keine Breiten-Caps mehr auf Desktop, Höhe = 40px × Skala linear
  (verifiziert: 50 %→20px, 100 %→40px, 200 %→80px, 400 %→160px, 700 %→280px, Seitenverhältnis
  immer exakt 1181:307). Navbar-Container wrapt (flex-wrap) bei großen Logos in eine zweite Zeile,
  statt das Logo zu stutzen. Mobile/Tablet behalten nur Anti-Overlap-Caps (44/56px), Effekt 50–110 % sichtbar.
- Neue LogoImage-Komponente (Bild ohne Link) — geteilt von Navbar, Footer, AdminLogin, Cookie-Consent.
- Cookie-Consent zeigt jetzt das weiße Cleanora-Logo im Banner- und Modal-Kopf; nutzt automatisch
  ein hochgeladenes „Logo für dunklen Hintergrund“, falls vorhanden.
- Admin Logo-Größen-Vorschau zeigt Originalgröße (overflow-x-auto statt Stutzung auf 320px).
- Verifiziert mit echten Screenshots: Desktop 50–700 %, Mobile (Kompakt-Logo, kein Overlap),
  geöffnetes dunkles Menü (helles Logo), Footer (helles Logo, 60px), Admin-Vorschau 300 % = 120px echt.
- Regression: 59/59 Backend-Tests, npm ci 0 Vulnerabilities, Build fehlerfrei.


# Changelog — Cleanora Gebäudereinigung

## 2026-07 — Cookie-Consent + offizielles Kunden-Logo + Helles-Logo-Slot (Commit ba1a128)
- Eigenes Cookie-Consent-System (kein externes Plugin): Banner beim Erstbesuch (nicht auf /admin),
  Buttons Alle akzeptieren / Nur notwendige / Einstellungen; Settings-Modal mit 4 Kategorien
  (Notwendig locked, Statistik, Marketing, Externe Medien — letzte drei aktuell ohne aktive Dienste,
  ehrlich deklariert); Speicherung localStorage 'cleanora_consent' mit CONSENT_VERSION=1
  (Versionsänderung → erneute Einholung); Footer-Link 'Cookie-Einstellungen' für Widerruf;
  Fokus-Trap, ESC, role=dialog/switch; loadScriptWhenConsented() für künftige Dienste vorbereitet.
  Ist-Analyse: keine Cookies/Tracking auf der Website, nur notwendige localStorage-Einträge.
- Offizielles Kunden-Logo als neuer Standard (PNG transparent, 4 Varianten in frontend/public:
  standard/standard-light + kompakt ohne Sub-Zeile für <lg); generierte SVGs entfernt.
- Neuer Admin-Medien-Slot 'Logo für dunklen Hintergrund' (MEDIA_CONFIG logo-light, key logo_light):
  unabhängig hochladbar/ersetzbar/löschbar; Logo.jsx nutzt auf dunklen Flächen (Mobile-Menü, Footer)
  automatisch helles Upload → Fallback normales Upload → Fallback helles Standard-Logo.
- Fix: Cookie-Banner überdeckte mobiles Menü (z-Index: Header 90 > Menü 80 > Banner 70, Modal 100);
  Banner-Buttons whitespace-nowrap; MediaCards refreshen bei cleanora-media-changed.
- npm: Lockfile synchronisiert (npm install), clean-room npm ci → 0 Vulnerabilities, Build fehlerfrei.
- Verifiziert (iteration_4): 59/59 Backend-Tests (14 neue logo-light-Tests), 16/16 Frontend-Checks
  (Consent komplett inkl. Persistenz/Versionierung/Widerruf/Keyboard, Logo-System, Regression Kontakt/Admin).


# Changelog — Cleanora Gebäudereinigung

## 2026-07 — Professionelles Standard-Logo + Skalierung 50–700 % (Commit 2a66515)
- Neues Standard-Logo als SVG: Wassertropfen mit Glanz-Stern + CLEANORA-Schriftzug + GEBÄUDEREINIGUNG.
  4 Varianten in frontend/public: logo-standard.svg / logo-standard-light.svg (hell/dunkel),
  logo-compact.svg / logo-compact-light.svg (ohne Sub-Zeile, für Mobile/Tablet < lg).
- Logo.jsx: Standard-SVG statt Text-Schriftzug; dunkle Flächen (Mobile-Menü, Footer) nutzen automatisch
  die helle Variante; Kompakt-Variante unter lg; Desktop max-w 560px.
- Skalierung: Slider 50–700 % (Standard 150 %); Backend logo_scale ge=0.5/le=7.0/default 1.5.
- Sofort-Anzeige ohne Refresh: LogoScale.save() dispatcht 'cleanora-media-changed', SiteContext lädt
  site-settings + media/info neu (Navbar aktualisiert sofort).
- Responsive Caps: Mobile max-h-11 (44px), Tablet max-h-14 (56px) — Menü bleibt immer frei.
- Admin Medien-Tab: Karte 'Standard-Logo' mit Vorschau beider Varianten + SVG-Download-Buttons;
  Logo-Vorschauen zeigen Standard-SVG statt leerem Platzhalter.
- Verifiziert (iteration_3): 15/15 neue Backend-Tests (Bounds/Persistenz/SVG-Auslieferung), alle 13
  Frontend-Checks grün inkl. Instant-Apply ohne Reload, Mobile-Caps, helle Variante im Menü, Downloads.
  Hinweis: bei sehr breiten Logos saturiert die sichtbare Höhe auf Desktop bei ~360 % (Breitenlimit 560px).


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
