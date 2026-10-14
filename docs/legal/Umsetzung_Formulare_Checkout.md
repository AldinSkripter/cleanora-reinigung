# Umsetzung – intern, nicht als Rechtstext veröffentlichen

## Cleanora
Kontaktformular: Hinweis „Wir verwenden Ihre Angaben zur Bearbeitung Ihrer Anfrage. Weitere Informationen finden Sie in unserer Datenschutzerklärung.“ mit direktem Link. Anfragebutton: „Unverbindliche Anfrage senden“. Für gewöhnliche Vertragsanfragen ist keine erzwungene Datenschutz-Einwilligung nötig. Werbung separat, freiwillig und nicht vorangekreuzt abfragen.

Bei Verbraucherverträgen auf Distanz oder beim Kunden: Widerrufsbelehrung und Formular rechtzeitig vor Vertragsschluss geben und anschließend mit Vertragsinhalt per E-Mail/PDF bestätigen. Eine reine Kontaktanfrage ist noch kein Vertragsabschluss.

Vorzeitiger Beginn – separat und nicht vorangekreuzt:
„Ich verlange ausdrücklich und stimme zu, dass Cleanora vor Ablauf der Widerrufsfrist mit der vereinbarten Dienstleistung beginnt. Mir ist bekannt, dass mein Widerrufsrecht bei vollständiger Vertragserfüllung erlischt.“

Wertersatzhinweis aus der Belehrung ebenfalls vorher geben. Wiederkehrende Reinigung nicht schon nach dem ersten Termin als vollständig erfüllt behandeln.

## JD
PostHog vor optionaler Einwilligung vollständig sperren oder entfernen, einschließlich Recorder, Autocapture, Flags, Cookie- und Browser-Speicherzugriff. Session-Replay nicht allein aus einem geladenen Recorder als tatsächliche Aufnahme behaupten. Anbieter, Region, Datenkategorien, Aufzeichnungsumfang, Aufbewahrung und Transfergrundlage erst nach Konfigurationsprüfung in Datenschutz einsetzen.

Google Fonts lokal bereitstellen; externe Bilder und assets.emergent.sh anhand tatsächlicher Ressourcen prüfen. Lokales Hosting nur nach tatsächlicher Umsetzung behaupten. Portfolio-iframes gesondert prüfen; Einbettungen laden alle Dienste der Zielseite mit.

Checkout für digitale Inhalte: Eigenschaften, Systemanforderungen, Lizenz, Aktualisierungen, Gesamtpreis, Zahlungsmittel und Lieferzeit vor Bestellung. Letzter kostenpflichtiger Button „Zahlungspflichtig bestellen“. Vertragsschlussablauf muss zu AGB und E-Mails passen.

Separater, nicht vorangekreuzter Haken für bezahlte sofortige digitale Inhalte:
„Ich stimme ausdrücklich zu, dass JonuzovicDesign vor Ablauf der Widerrufsfrist mit der Vertragserfüllung beginnt. Mir ist bekannt, dass ich durch diese Zustimmung mit Beginn der Vertragserfüllung mein Widerrufsrecht verliere.“

Bestätigungs-E-Mail enthält Vertragsinhalt, wirksam einbezogene Bedingungen, Widerrufsbelehrung/Formular und die erteilte Zustimmung/Kenntnisbestätigung. Nicht pauschal für laufende digitale Dienstleistungen/SaaS verwenden; dort andere Regeln.

## Elektronische Widerrufsfunktion (§ 356a BGB) — im Entwurfs-PR implementiert
Bei einschlägigen über Online-Oberflächen geschlossenen Fernabsatzverträgen: deutlich zugänglicher Button „Vertrag widerrufen“, Eingabe von Name, Vertragskennung und Bestätigungs-E-Mail; zweiter Button „Widerruf bestätigen“; unverzügliche Bestätigung auf dauerhaftem Datenträger mit Erklärung, Datum und Uhrzeit. Kein unnötiger Login-Zwang. Funktion während Widerrufsfrist verfügbar halten. Die Implementierung liegt im Entwurfs-PR: /widerruf, öffentlicher Empfang, eindeutige Referenz, dauerhafter Datenbankeintrag und E-Mail-Outbox mit Wiederholungen. Nach dem Deploy müssen SMTP-Livebetrieb, Empfang, Zugänglichkeit und Hintergrundprozess überprüft werden. Erst dann den vorbereiteten Online-Hinweis in die Belehrungen aufnehmen. Staff-Zugriff auf die Erklärungsliste: GET /api/withdrawals/admin. Rückzahlung und Prüfung der Rechtsfolgen erfolgen gesondert.

## Abonnements / Kündigung
Bei einschlägigen online angebotenen entgeltlichen Dauerschuldverhältnissen zusätzlich Kündigungsfunktion nach § 312k BGB prüfen/umsetzen. Laufzeiten und Kündigung pro Produkt konkret anzeigen. Widerruf und Kündigung sind unterschiedliche Funktionen.

## Sonstige Pflichten
Impressum/Datenschutz auf jeder Seite leicht erreichbar; auch Social-Media-Geschäftsprofile entsprechend verlinken. Steuerstatus, erteilte USt-IdNr./W-IdNr. und mögliche Register-/Versicherungsangaben nach DDG/DL-InfoV prüfen. Keine persönliche Steuer-ID als Ersatz veröffentlichen. Keine erfundene Versicherungsdeckung nennen.

BFSG-Anwendbarkeit anhand tatsächlicher Dienste und Unternehmensgröße prüfen; Kleinstunternehmen-Ausnahme für Dienstleistungen ist nicht automatisch durch „Kleingewerbe“ bewiesen. Bei Anwendbarkeit gesetzliche Barrierefreiheitsinformationen und technische Anforderungen erfüllen. Kontrastbefunde sind keine abschließende BFSG-Prüfung.

AV-Verträge, Empfängerliste, Löschkonzept, technische Zugriffssicherung und Backups gehören zur tatsächlichen Umsetzung. Texte allein ersetzen diese Maßnahmen nicht.
