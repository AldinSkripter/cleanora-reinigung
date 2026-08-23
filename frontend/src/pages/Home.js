import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import ChapterHeading from "@/components/ChapterHeading";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import { FAQS, IMAGES, PROCESS_STEPS, SERVICES, SERVICE_AREA_PLACES, SITE } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1];

function MaskedLine({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} data-testid="hero-section" className="relative overflow-hidden pt-32 md:pt-44">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-precision/50"
          >
            <span className="h-px w-10 bg-precision/40" />
            Cleanora · Gebäudereinigung Achern
          </motion.p>
          <h1 className="font-display text-5xl font-light leading-[1.02] tracking-tighter text-precision sm:text-6xl lg:text-7xl">
            <MaskedLine delay={0.1}>Professionelle</MaskedLine>
            <MaskedLine delay={0.25}>Gebäudereinigung</MaskedLine>
            <MaskedLine delay={0.4} className="text-precision/40">in Achern &amp; Umgebung</MaskedLine>
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-8 max-w-md text-base leading-relaxed text-precision/70"
          >
            Cleanora ist Ihr Reinigungsservice für Büros, Praxen, Treppenhäuser und Privathaushalte
            in Achern und der Ortenau — gründlich, zuverlässig und mit einem Anspruch: makellos.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/kontakt"
                data-testid="hero-cta-quote"
                className="flex items-center justify-center gap-2 border border-precision bg-precision px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-precision"
              >
                Kostenloses Angebot anfordern
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/kontakt"
                data-testid="hero-cta-contact"
                className="flex items-center justify-center gap-2 border border-precision/25 px-8 py-4 text-sm font-medium text-precision transition-colors duration-300 hover:border-precision"
              >
                Kontakt aufnehmen
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="relative hidden lg:col-span-5 lg:block">
          <motion.div
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <motion.img
              src={IMAGES.hero}
              alt="Professionelle Reinigungskraft bei der Gebäudereinigung in Achern"
              className="h-full w-full object-cover"
              style={reduce ? undefined : { y: yImg, scale: 1.15 }}
              loading="eager"
            />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
            className="absolute -bottom-8 -left-16 border border-black/5 bg-white/85 p-6 backdrop-blur-xl"
          >
            <p className="font-display text-3xl font-light tracking-tight text-precision">Achern &amp; Ortenau</p>
            <p className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-precision/50">
              <MapPin className="h-3.5 w-3.5" /> Regional · Persönlich · Zuverlässig
            </p>
          </motion.div>
        </div>
      </div>
      <div className="mt-24 md:mt-32">
        <Marquee />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:py-40">
      <ChapterHeading number="01" label="Vorstellung" title="Sauberkeit ist kein Zufall. Sie ist Handwerk, System und Verlässlichkeit." />
      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-base leading-relaxed text-precision/70">
            Cleanora ist ein inhabergeführter Reinigungsservice aus Achern. Wir reinigen Büros,
            Praxen, Treppenhäuser, Gewerbeflächen und Privathaushalte — mit klaren Abläufen,
            geschultem Personal und der Überzeugung, dass gute Arbeit keiner lauten Worte bedarf.
          </p>
          <p className="mt-6 text-base leading-relaxed text-precision/70">
            Was uns antreibt: Räume, in denen man sich wohlfühlt. Ob Ihre Mitarbeiter am Morgen ein
            frisches Büro vorfinden, Ihre Mieter ein gepflegtes Treppenhaus oder Ihre Praxis
            hygienisch sauber ist — dafür stehen wir mit unserem Namen.
          </p>
          <Link
            to="/ueber-uns"
            data-testid="intro-about-link"
            className="mt-10 inline-flex items-center gap-2 border-b border-precision pb-1 text-sm font-medium text-precision transition-colors duration-300 hover:text-precision/60"
          >
            Mehr über Cleanora <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={IMAGES.desk}
              alt="Sorgfältige Reinigung einer Arbeitsfläche"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesList() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-pristine/60 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ChapterHeading number="02" label="Leistungen" title="Alles, was sauber werden soll. Aus einer Hand." />
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-precision/10 border-y border-precision/10">
              {SERVICES.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    to={`/leistungen/${s.slug}`}
                    data-testid={`service-link-${s.slug}`}
                    onMouseEnter={() => setActive(i)}
                    className="group flex items-center justify-between gap-6 py-5 md:py-6"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="text-xs font-medium text-precision/40">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl font-light tracking-tight text-precision transition-colors duration-300 group-hover:text-precision/60 md:text-2xl">
                        {s.title}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-precision/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-precision" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-32 aspect-[3/4] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={SERVICES[active].slug}
                  src={SERVICES[active].image}
                  alt={SERVICES[active].title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_POINTS = [
  { title: "Zuverlässigkeit", text: "Vereinbarte Termine und Leistungen gelten. Pünktlich, konstant, ohne Ausreden." },
  { title: "Gründlichkeit", text: "Wir arbeiten nach festen Checklisten — und kontrollieren jedes Ergebnis selbst." },
  { title: "Persönliche Betreuung", text: "Ein fester Ansprechpartner für Ihr Objekt. Kurze Wege, schnelle Entscheidungen." },
  { title: "Transparenz", text: "Klare Angebote ohne versteckte Kosten. Sie wissen immer, was Sie bekommen." },
];

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-precision py-24 text-white grain md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <ChapterHeading dark number="03" label="Warum Cleanora" title="Unser Qualitätsversprechen — schwarz auf weiß." />
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {WHY_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="bg-precision p-10 md:p-14">
              <span className="text-xs font-medium tracking-[0.25em] text-white/40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-2xl font-light tracking-tight">{p.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{p.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-16 flex items-start gap-4">
          <Check className="mt-1 h-5 w-5 shrink-0 text-white/60" strokeWidth={1.5} />
          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            Unser Versprechen: Sollte einmal etwas nicht Ihren Erwartungen entsprechen, sagen Sie es uns —
            und wir bessern unverzüglich nach. Ohne Diskussion, ohne Zusatzkosten.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:py-40">
      <ChapterHeading number="04" label="Ablauf" title="Von der Anfrage zur sauberen Fläche — in vier Schritten." />
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.1} className="border-t border-precision/20 pt-8">
            <span className="font-display text-5xl font-extralight tracking-tighter text-precision/25">{step.n}</span>
            <h3 className="mt-6 font-display text-xl font-light tracking-tight text-precision">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-precision/60">{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section className="bg-pristine/60 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ChapterHeading number="05" label="Einsatzgebiet" title="Zuhause in Achern. Unterwegs in der Ortenau." className="mb-10" />
          <Reveal>
            <p className="text-base leading-relaxed text-precision/70">
              Als lokaler Reinigungsservice sind wir dort im Einsatz, wo wir zuhause sind: in Achern
              und den umliegenden Orten der Region. Kurze Anfahrten bedeuten für Sie flexible Termine
              und schnelle Reaktionszeiten.
            </p>
            <Link
              to="/einsatzgebiet"
              data-testid="area-link"
              className="mt-8 inline-flex items-center gap-2 border-b border-precision pb-1 text-sm font-medium text-precision transition-colors duration-300 hover:text-precision/60"
            >
              Alle Einsatzorte ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <ul className="flex flex-wrap gap-3">
            {SERVICE_AREA_PLACES.map((place) => (
              <li
                key={place}
                className="border border-precision/15 bg-white px-5 py-2.5 text-sm text-precision/70 transition-colors duration-300 hover:border-precision hover:text-precision"
              >
                {place}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ChapterHeading number="06" label="FAQ" title="Häufige Fragen." className="mb-8" />
          <Reveal>
            <p className="text-sm leading-relaxed text-precision/60">
              Ihre Frage ist nicht dabei? Rufen Sie uns an unter{" "}
              <a data-testid="faq-phone" href={`tel:${SITE.phoneHref}`} className="font-medium text-precision underline underline-offset-4">
                {SITE.phone}
              </a>{" "}
              — wir helfen gern persönlich weiter.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Faq />
        </Reveal>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
      <div className="grid gap-16 border border-precision/10 bg-white p-8 md:p-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ChapterHeading number="07" label="Kontakt" title="Bereit für makellose Sauberkeit?" className="mb-8" />
          <Reveal>
            <p className="text-sm leading-relaxed text-precision/70">
              Erzählen Sie uns kurz von Ihrem Objekt — wir melden uns zeitnah mit einem kostenlosen,
              unverbindlichen Angebot. Oder rufen Sie direkt an:
            </p>
            <a
              data-testid="cta-phone"
              href={`tel:${SITE.phoneHref}`}
              className="mt-6 flex items-center gap-3 font-display text-2xl font-light tracking-tight text-precision transition-colors duration-300 hover:text-precision/60"
            >
              <Phone className="h-5 w-5" strokeWidth={1.5} /> {SITE.phone}
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.legalName,
  description: "Professionelle Gebäudereinigung und Reinigungsservice in Achern & Umgebung: Büroreinigung, Unterhaltsreinigung, Fensterreinigung, Treppenhausreinigung und mehr.",
  url: SITE.domain,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    postalCode: "77855",
    addressLocality: "Achern",
    addressCountry: "DE",
  },
  areaServed: ["Achern", "Ortenau"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Seo
        title="Cleanora — Professionelle Gebäudereinigung in Achern & Umgebung"
        description="Cleanora ist Ihr Reinigungsservice in Achern & der Ortenau: Büroreinigung, Unterhaltsreinigung, Fensterreinigung, Treppenhausreinigung u. v. m. Jetzt kostenloses Angebot anfordern."
        path="/"
        jsonLd={[localBusinessJsonLd, faqJsonLd]}
      />
      <Hero />
      <Intro />
      <ServicesList />
      <WhyUs />
      <Process />
      <ServiceArea />
      <FaqSection />
      <ContactCta />
    </>
  );
}
