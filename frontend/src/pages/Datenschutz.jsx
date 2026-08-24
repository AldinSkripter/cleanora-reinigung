import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import LegalText from "@/components/LegalText";
import { useSite } from "@/lib/SiteContext";

const buildSections = (site) => [
  {
    title: "1. Verantwortlicher",
    body: `Verantwortlicher für die Datenverarbeitung auf dieser Website ist:\n\n${site.legal_name}\nInhaber: ${site.owner_name || "[Vor- und Nachname des Inhabers — wird ergänzt]"}\n${site.street}\n${site.city}\nE-Mail: ${site.public_email}`,
  },
  {
    title: "2. Allgemeines zur Datenverarbeitung",
    body: "Wir verarbeiten personenbezogene Daten nur, soweit dies für die Bereitstellung dieser Website und die Bearbeitung Ihrer Anfragen erforderlich ist. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Diese Website verwendet kein Tracking, keine Analyse-Tools und keine Cookies zu Marketingzwecken. Schriftarten werden lokal vom eigenen Server geladen (kein Abruf bei Drittanbietern).",
  },
  {
    title: "3. Kontaktformular",
    body: "Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen angegebenen Daten (Name/Firma, E-Mail-Adresse, Telefonnummer, Kundentyp, gewünschte Leistung, Objektart, Ort, Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage und zur Erstellung eines Angebots (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden an die hinterlegte E-Mail-Adresse unseres Unternehmens übermittelt und zur Bearbeitung gespeichert. Eine Weitergabe an Dritte erfolgt nicht. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen. Die Übermittlung erfolgt erst nach Ihrer ausdrücklichen Einwilligung über die Datenschutz-Checkbox (Art. 6 Abs. 1 lit. a DSGVO).",
  },
  {
    title: "4. Server-Log-Dateien und technische Speicherung",
    body: "Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter automatisch technische Verbindungsdaten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp). Diese Daten sind technisch erforderlich, um die Website auszuliefern und die Systemsicherheit zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Zum Schutz vor Spam und Missbrauch wird die IP-Adresse bei Formularübermittlungen kurzzeitig für eine Ratenbegrenzung verarbeitet sowie zusammen mit der Anfrage gespeichert.",
  },
  {
    title: "5. Ihre Rechte",
    body: "Sie haben jederzeit das Recht auf Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zudem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde (für Baden-Württemberg: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg, LfDI).",
  },
  {
    title: "6. Datensicherheit",
    body: "Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol und am Präfix „https://“ in der Adresszeile Ihres Browsers.",
  },
];

export default function Datenschutz() {
  const site = useSite();
  const SECTIONS = buildSections(site);
  return (
    <>
      <Seo
        title="Datenschutzerklärung | Cleanora Gebäudereinigung Achern"
        description="Datenschutzerklärung der Cleanora Gebäudereinigung, Achern — Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
        path="/datenschutz"
      />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <h1 className="font-display text-4xl font-light tracking-tighter text-precision md:text-5xl">
            Datenschutzerklärung
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-precision/60">
            Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
          </p>
        </Reveal>
        {site.legal.datenschutz ? (
          <LegalText text={site.legal.datenschutz} />
        ) : (
        <div className="mt-16 space-y-12 text-sm leading-relaxed text-precision/75">
          {SECTIONS.map((s) => (
            <Reveal key={s.title}>
              <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">{s.title}</h2>
              <p className="mt-4 whitespace-pre-line">{s.body}</p>
            </Reveal>
          ))}
        </div>
        )}
      </section>
    </>
  );
}
