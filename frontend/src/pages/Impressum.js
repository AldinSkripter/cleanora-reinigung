import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import { SITE } from "@/data/site";

export default function Impressum() {
  return (
    <>
      <Seo
        title="Impressum | Cleanora Gebäudereinigung Achern"
        description="Impressum der Cleanora Gebäudereinigung, Achern."
        path="/impressum"
      />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <h1 className="font-display text-4xl font-light tracking-tighter text-precision md:text-5xl">
            Impressum
          </h1>
        </Reveal>
        <div className="mt-16 space-y-12 text-sm leading-relaxed text-precision/75">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Angaben gemäß § 5 TMG</h2>
            <p className="mt-4">
              {SITE.legalName}<br />
              Inhaber: [Vor- und Nachname des Inhabers — wird ergänzt]<br />
              {SITE.street}<br />
              {SITE.city}
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Kontakt</h2>
            <p className="mt-4">
              Telefon: {SITE.phone} <span className="text-precision/40">(Platzhalter — wird ergänzt)</span><br />
              E-Mail: {SITE.email}
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Umsatzsteuer-ID</h2>
            <p className="mt-4">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [USt-IdNr. — wird ergänzt, sofern vorhanden]
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="mt-4">
              [Vor- und Nachname des Inhabers — wird ergänzt]<br />
              Anschrift wie oben
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Haftung für Inhalte</h2>
            <p className="mt-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Haftung für Links</h2>
            <p className="mt-4">
              Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Urheberrecht</h2>
            <p className="mt-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
