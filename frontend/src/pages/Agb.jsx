import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import LegalText from "@/components/LegalText";
import { useSite } from "@/lib/SiteContext";

const buildSections = (site) => [
  {
    title: "1. Geltungsbereich",
    body: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Reinigungs- und Gebäudedienstleistungen zwischen\n\n${site.legal_name}\n${site.street}\n${site.city}\n\n(nachfolgend „Auftragnehmer“) und dem Kunden (nachfolgend „Auftraggeber“). Abweichende Bedingungen des Auftraggebers werden nur wirksam, wenn der Auftragnehmer ihnen ausdrücklich schriftlich zustimmt.`,
  },
  {
    title: "2. Angebot und Vertragsschluss",
    body: "Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind. Ein Vertrag kommt durch schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der Leistungserbringung zustande. Besichtigungen vor Ort zur Angebotserstellung sind im Raum Achern und Umgebung kostenfrei.",
  },
  {
    title: "3. Leistungsumfang",
    body: "Der Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung. Nicht ausdrücklich vereinbarte Zusatzleistungen werden nach Aufwand gesondert berechnet. Der Auftraggeber stellt für die Leistungserbringung erforderlichen Zugang zum Objekt sowie Strom- und Wasseranschlüsse kostenfrei zur Verfügung.",
  },
  {
    title: "4. Preise und Zahlung",
    body: "Es gelten die im Angebot genannten Preise zuzüglich der gesetzlichen Mehrwertsteuer, sofern nicht anders ausgewiesen. Rechnungen sind, sofern nichts Abweichendes vereinbart ist, innerhalb von 14 Tagen nach Rechnungserhalt ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug gelten die gesetzlichen Regelungen.",
  },
  {
    title: "5. Haftung und Reklamation",
    body: "Der Auftragnehmer haftet für schuldhaft verursachte Schäden im Rahmen der gesetzlichen Bestimmungen; bei leicht fahrlässiger Verletzung unwesentlicher Pflichten ist die Haftung ausgeschlossen. Etwaige Beanstandungen der Leistung sind unverzüglich, spätestens innerhalb von 7 Tagen nach Leistungserbringung, mitzuteilen, damit eine kostenfreie Nachbesserung erfolgen kann.",
  },
  {
    title: "6. Schlussbestimmungen",
    body: "Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist — soweit gesetzlich zulässig — der Sitz des Auftragnehmers. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
  },
];

export default function Agb() {
  const site = useSite();
  const SECTIONS = buildSections(site);
  return (
    <>
      <Seo
        title="AGB | Cleanora Gebäudereinigung Achern"
        description="Allgemeine Geschäftsbedingungen der Cleanora Gebäudereinigung, Achern."
        path="/agb"
      />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <h1 className="font-display text-4xl font-light tracking-tighter text-precision md:text-5xl">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-precision/60">
            Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
          </p>
        </Reveal>
        {site.legal.agb ? (
          <LegalText text={site.legal.agb} />
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
