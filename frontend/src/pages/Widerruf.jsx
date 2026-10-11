import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import LegalText from "@/components/LegalText";
import { FileDown } from "lucide-react";
import { useSite } from "@/lib/SiteContext";

const buildSections = (site) => [
  {
    title: "Widerrufsrecht",
    body: "Verbrauchern steht bei außerhalb von Geschäftsräumen geschlossenen Verträgen und bei Fernabsatzverträgen grundsätzlich ein gesetzliches Widerrufsrecht zu. Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen den Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.",
  },
  {
    title: "Ausübung des Widerrufs",
    body: `Um Ihr Widerrufsrecht auszuüben, müssen Sie uns\n\n${site.legal_name}\n${site.street}\n${site.city}\nE-Mail: ${site.public_email}\n\nmittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.`,
  },
  {
    title: "Folgen des Widerrufs",
    body: "Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben. Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.",
  },
  {
    title: "Erlöschen des Widerrufsrechts",
    body: "Das Widerrufsrecht erlischt bei einem Vertrag über Dienstleistungen, wenn der Auftragnehmer die Dienstleistung vollständig erbracht hat und mit der Ausführung der Dienstleistung erst begonnen hat, nachdem der Verbraucher dazu seine ausdrückliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung verliert.",
  },
];

export default function Widerruf() {
  const site = useSite();
  const SECTIONS = buildSections(site);
  return (
    <>
      <Seo
        title="Widerrufsbelehrung | Cleanora Gebäudereinigung Achern"
        description="Widerrufsbelehrung der Cleanora Gebäudereinigung, Achern — Informationen zum gesetzlichen Widerrufsrecht für Verbraucher."
        path="/widerrufsbelehrung"
      />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <h1 className="font-display text-4xl font-light tracking-tighter text-precision md:text-5xl">
            Widerrufsbelehrung
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-precision/60">
            Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
          </p>
        </Reveal>
        {site.legal.widerruf ? (
          <LegalText text={site.legal.widerruf} />
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
        <Reveal>
          <div
            data-testid="kuendigung-download"
            className="mt-16 flex flex-col gap-6 border border-aqua-deep/25 bg-pristine/40 p-8 sm:flex-row sm:items-center sm:justify-between md:p-10"
          >
            <div>
              <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.25em] text-aqua-deep">
                <FileDown className="h-4 w-4" /> Formular
              </p>
              <h2 className="mt-3 font-display text-xl font-light tracking-tight text-precision md:text-2xl">
                Kündigungsformular (PDF)
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-precision/60">
                Sie möchten Ihren Reinigungsvertrag kündigen? Laden Sie hier unser vorbereitetes
                Formular herunter — ausfüllen und per Post oder E-Mail an uns senden. Eine formlos
                formulierte Kündigung in Textform (z. B. per E-Mail) ist selbstverständlich ebenso gültig.
              </p>
            </div>
            <a
              data-testid="kuendigung-download-btn"
              href="/downloads/cleanora-kuendigungsformular.pdf"
              download="Cleanora-Kuendigungsformular.pdf"
              className="inline-flex shrink-0 items-center gap-2.5 border border-precision bg-precision px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-precision"
            >
              <FileDown className="h-4 w-4" /> PDF herunterladen
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
