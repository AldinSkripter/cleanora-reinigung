import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import ChapterHeading from "@/components/ChapterHeading";
import { IMAGES } from "@/data/site";

const VALUES = [
  {
    title: "Zuverlässigkeit",
    text: "Wir erscheinen, wenn wir es vereinbart haben — und liefern, was wir versprochen haben. Verlässlichkeit ist für uns kein Werbeversprechen, sondern Arbeitsalltag.",
  },
  {
    title: "Gründliche Arbeit",
    text: "Sauber heißt bei uns sauber: Wir arbeiten nach klaren Checklisten, mit professionellem Equipment und einem Blick fürs Detail, der auch Ecken und Kanten nicht vergisst.",
  },
  {
    title: "Persönliche Betreuung",
    text: "Bei Cleanora haben Sie einen festen Ansprechpartner, der Ihr Objekt kennt. Fragen, Änderungen oder Sonderwünsche klären wir direkt und unkompliziert.",
  },
  {
    title: "Flexible Lösungen",
    text: "Kein Objekt ist wie das andere. Wir passen Leistungsumfang, Turnus und Reinigungszeiten an Ihren Alltag an — nicht umgekehrt.",
  },
  {
    title: "Hohe Qualitätsstandards",
    text: "Regelmäßige Qualitätskontrollen und geschultes Personal sorgen dafür, dass das Ergebnis nicht nur am ersten Tag überzeugt, sondern dauerhaft.",
  },
  {
    title: "Transparente Kommunikation",
    text: "Klare Angebote, klare Absprachen, klare Preise. Sie wissen jederzeit, welche Leistung Sie zu welchen Konditionen erhalten.",
  },
];

export default function UeberUns() {
  return (
    <>
      <Seo
        title="Über uns — Cleanora Gebäudereinigung Achern"
        description="Lernen Sie Cleanora kennen: Ihr inhabergeführter Reinigungsservice aus Achern. Zuverlässigkeit, gründliche Arbeit, persönliche Betreuung und transparente Kommunikation."
        path="/ueber-uns"
      />
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-precision/50">
            <span className="h-px w-10 bg-precision/40" />
            Über uns
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] tracking-tighter text-precision sm:text-5xl lg:text-6xl">
            Menschen, die Sauberkeit ernst nehmen.
          </h1>
        </Reveal>
        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-base leading-relaxed text-precision/70">
              Cleanora ist ein inhabergeführter Reinigungsservice aus Achern. Entstanden aus der
              Überzeugung, dass professionelle Gebäudereinigung vor allem drei Dinge braucht:
              Sorgfalt, Verlässlichkeit und Menschen, die mitdenken.
            </p>
            <p className="mt-6 text-base leading-relaxed text-precision/70">
              Wir arbeiten für Büros, Praxen, Hausverwaltungen, Gewerbebetriebe und private
              Haushalte in Achern und der Ortenau. Als lokaler Betrieb sind wir schnell vor Ort,
              kennen die Region — und stehen mit unserem Namen für jedes Ergebnis.
            </p>
            <p className="mt-6 text-base leading-relaxed text-precision/70">
              Unsere Nähe zu unseren Kunden ist unser größter Vorteil: kurze Wege, persönliche
              Absprachen und die Gewissheit, dass Ihr Objekt in vertrauten Händen ist.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <div className="overflow-hidden">
              <img
                src={IMAGES.living}
                alt="Makelos gereinigter Wohnbereich nach der Reinigung durch Cleanora"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:py-40">
        <ChapterHeading number="01" label="Werte" title="Woran wir uns jeden Tag messen lassen." />
        <div className="grid gap-px border border-precision/10 bg-precision/10 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="bg-background p-10">
              <span className="text-xs font-medium tracking-[0.25em] text-precision/40">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-6 font-display text-xl font-light tracking-tight text-precision">{v.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-precision/60">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <Reveal className="relative overflow-hidden bg-precision p-10 text-white grain md:p-20">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">Lokale Nähe</p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-light leading-tight tracking-tight md:text-4xl">
            Aus Achern, für Achern — und die ganze Region.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60">
            Überzeugen Sie sich selbst: Fordern Sie ein kostenloses, unverbindliches Angebot an.
            Wir schauen uns Ihr Objekt gern persönlich an.
          </p>
          <Link
            to="/kontakt"
            data-testid="about-cta"
            className="mt-10 inline-flex items-center gap-2 border border-white bg-white px-8 py-4 text-sm font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white"
          >
            Kontakt aufnehmen
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
