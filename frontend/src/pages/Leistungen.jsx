import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import ChapterHeading from "@/components/ChapterHeading";
import { SERVICES } from "@/data/site";

export default function Leistungen() {
  return (
    <>
      <Seo
        title="Leistungen — Gebäudereinigung & Reinigungsservice Achern | Cleanora"
        description="Alle Reinigungsleistungen von Cleanora in Achern & Umgebung: Unterhaltsreinigung, Büroreinigung, Fensterreinigung, Treppenhausreinigung, Praxisreinigung, Bauendreinigung u. v. m."
        path="/leistungen"
      />
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-precision/50">
            <span className="h-px w-10 bg-aqua" />
            Leistungen
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] tracking-tighter text-precision sm:text-5xl lg:text-6xl">
            Reinigungsleistungen für Achern &amp; Umgebung
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-precision/70">
            Von der regelmäßigen Unterhaltsreinigung bis zur Bauendreinigung: Cleanora bietet das
            komplette Spektrum professioneller Gebäudereinigung — für Gewerbe- und Privatkunden.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={0.05}>
              <article className="grid items-center gap-10 lg:grid-cols-12">
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <Link to={`/leistungen/${s.slug}`} className="group block overflow-hidden" tabIndex={-1} aria-hidden="true">
                    <img
                      src={s.image}
                      alt={`${s.title} — Reinigungsservice in Achern`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <span className="text-xs font-medium tracking-[0.25em] text-aqua-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-light tracking-tight text-precision md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-precision/70">{s.short}</p>
                  <Link
                    to={`/leistungen/${s.slug}`}
                    data-testid={`leistungen-detail-${s.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 border-b border-precision pb-1 text-sm font-medium text-precision transition-colors duration-300 hover:border-aqua-deep hover:text-aqua-deep"
                  >
                    Mehr erfahren
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-28 border border-precision/10 bg-pristine/60 p-10 md:p-16">
          <h2 className="font-display text-2xl font-light tracking-tight text-precision md:text-3xl">
            Nicht sicher, welche Leistung passt?
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-precision/70">
            Beschreiben Sie uns einfach Ihr Objekt — wir beraten Sie ehrlich und erstellen ein
            kostenloses, unverbindliches Angebot.
          </p>
          <Link
            to="/kontakt"
            data-testid="leistungen-cta"
            className="mt-8 inline-flex items-center gap-2 border border-precision bg-precision px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-precision"
          >
            Unverbindliches Angebot anfordern
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
