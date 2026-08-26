import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { SERVICES, SITE } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];

export default function LeistungDetail() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const service = SERVICES.find((s) => s.slug === slug);
  const index = SERVICES.findIndex((s) => s.slug === slug);
  if (!service) return <Navigate to="/leistungen" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} Achern`,
    provider: { "@type": "ProfessionalService", name: SITE.legalName, url: SITE.domain },
    areaServed: ["Achern", "Ortenau"],
    description: service.short,
  };

  const next = SERVICES[(index + 1) % SERVICES.length];

  return (
    <>
      <Seo
        title={`${service.title} in Achern & Umgebung | Cleanora Gebäudereinigung`}
        description={`${service.title} in Achern & der Ortenau: ${service.short} Jetzt unverbindliches Angebot bei Cleanora anfordern.`}
        path={`/leistungen/${service.slug}`}
        jsonLd={jsonLd}
      />
      <section className="mx-auto max-w-7xl px-6 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <Link
            to="/leistungen"
            data-testid="detail-back"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-precision/50 transition-colors duration-300 hover:text-aqua-deep"
          >
            <ArrowLeft className="h-4 w-4" /> Alle Leistungen
          </Link>
          <div className="mt-10 overflow-hidden">
            <motion.h1
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="font-display text-4xl font-light leading-[1.05] tracking-tighter text-precision sm:text-5xl lg:text-6xl"
            >
              {service.title}
            </motion.h1>
          </div>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-precision/70">{service.short}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden">
              <img
                src={service.image}
                alt={`${service.title} — Cleanora Reinigungsservice Achern`}
                className="aspect-[16/10] w-full object-cover"
                loading="eager"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Leistungsumfang</p>
            <ul className="mt-8 space-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-precision/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua-deep" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mt-20 grid max-w-3xl gap-8">
          <Reveal>
            <p className="text-base leading-relaxed text-precision/70">{service.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-precision/70">{service.text}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid gap-16 border border-precision/10 bg-white p-8 md:p-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Anfrage</p>
              <h2 className="mt-6 font-display text-2xl font-light tracking-tight text-precision md:text-3xl">
                Unverbindliches Angebot anfordern
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-precision/70">
                Interesse an unserer Leistung „{service.title}"? Senden Sie uns eine kurze Nachricht —
                wir melden uns zeitnah mit einem kostenlosen Angebot.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </Reveal>
        </div>

        <Reveal className="mt-16 flex items-center justify-between border-t border-precision/10 pt-10">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-aqua-deep">Nächste Leistung</span>
          <Link
            to={`/leistungen/${next.slug}`}
            data-testid="detail-next-service"
            className="group flex items-center gap-3 font-display text-xl font-light tracking-tight text-precision transition-colors duration-300 hover:text-aqua-deep md:text-2xl"
          >
            {next.title}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
