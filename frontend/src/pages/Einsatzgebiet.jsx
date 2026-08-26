import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import ChapterHeading from "@/components/ChapterHeading";
import { IMAGES, SERVICE_AREA_PLACES } from "@/data/site";
import { useSite } from "@/lib/SiteContext";

const DISTRICTS = [
  { name: "Achern", text: "Unser Standort und Kerngebiet — von der Innenstadt bis zu den Gewerbegebieten." },
  { name: "Oberachern", text: "Regelmäßige Unterhalts- und Treppenhausreinigungen im größten Stadtteil Acherns." },
  { name: "Fautenbach & Großweier", text: "Büro-, Praxis- und Gewerbereinigung direkt vor Ort." },
  { name: "Mösbach & Önsbach", text: "Reinigungsservice für Privathaushalte und kleinere Gewerbeobjekte." },
  { name: "Sasbach & Lauf", text: "Unterwegs entlang der Ach — auch für Ferien- und Gewerbeobjekte." },
  { name: "Renchen & Kappelrodeck", text: "Schnelle Anfahrten ins nördliche Umland und ins Acherntal." },
  { name: "Ottenhöfen & Seebach", text: "Zuverlässige Reinigung auch in den Höhenlagen der Ortenau." },
];

export default function Einsatzgebiet() {
  const site = useSite();
  return (
    <>
      <Seo
        title="Einsatzgebiet Achern & Umgebung — Reinigungsservice Ortenau | Cleanora"
        description="Cleanora ist Ihr Reinigungsservice in Achern und der Ortenau: Oberachern, Sasbach, Lauf, Renchen, Kappelrodeck, Ottenhöfen, Seebach u. a. Kurze Wege, schnelle Termine."
        path="/einsatzgebiet"
      />
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-precision/50">
            <span className="h-px w-10 bg-aqua" />
            Einsatzgebiet
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] tracking-tighter text-precision sm:text-5xl lg:text-6xl">
            Gebäudereinigung in Achern &amp; Umgebung
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-precision/70">
            Als Reinigungsfirma mit Standort in Achern betreuen wir Objekte in der gesamten Region —
            von der Unterhaltsreinigung im Büro bis zur Fensterreinigung im Privathaushalt.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <div className="relative overflow-hidden">
            <img
              src={IMAGES.building}
              alt="Gepflegtes Gebäude im Einsatzgebiet Achern und Ortenau"
              className="aspect-[21/9] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 border border-white/20 bg-precision/70 px-5 py-3 backdrop-blur-xl">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white">
                <MapPin className="h-3.5 w-3.5 text-aqua" /> 77855 Achern · Ortenau
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <ChapterHeading number="01" label="Orte" title="Dort, wo wir für Sie im Einsatz sind." />
        <div className="divide-y divide-precision/10 border-y border-precision/10">
          {DISTRICTS.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.04}>
              <div className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="text-xs font-medium text-aqua-deep md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display text-xl font-light tracking-tight text-precision md:col-span-4 md:text-2xl">
                  {d.name}
                </h2>
                <p className="text-sm leading-relaxed text-precision/60 md:col-span-7">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <p className="max-w-xl text-sm leading-relaxed text-precision/60">
            Ihr Ort ist nicht dabei? Kein Problem — sprechen Sie uns an. Je nach Objekt und Umfang
            sind wir auch darüber hinaus in der Ortenau für Sie unterwegs.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <Reveal className="border border-precision/10 bg-pristine/60 p-10 md:p-16">
          <h2 className="font-display text-2xl font-light tracking-tight text-precision md:text-3xl">
            Ihr Objekt in der Region? Wir schauen es uns an.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-precision/70">
            Kurze Anfahrten, flexible Termine und ein fester Ansprechpartner — so einfach ist
            professionelle Reinigung in Achern &amp; Umgebung.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/kontakt"
              data-testid="area-cta"
              className="inline-flex items-center justify-center gap-2 border border-precision bg-precision px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-precision"
            >
              Kostenloses Angebot anfordern
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${site.phone_href}`}
              data-testid="area-phone"
              className="inline-flex items-center justify-center gap-2 border border-precision/25 px-8 py-4 text-sm font-medium text-precision transition-colors duration-300 hover:border-aqua-deep hover:text-aqua-deep"
            >
              {site.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
