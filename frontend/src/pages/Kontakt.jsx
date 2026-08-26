import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { useSite } from "@/lib/SiteContext";

export default function Kontakt() {
  const site = useSite();
  return (
    <>
      <Seo
        title="Kontakt — Kostenloses Angebot anfordern | Cleanora Achern"
        description="Kontaktieren Sie Cleanora für ein kostenloses, unverbindliches Angebot: Gebäudereinigung, Büroreinigung, Fensterreinigung u. v. m. in Achern & Umgebung."
        path="/kontakt"
      />
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-precision/50">
            <span className="h-px w-10 bg-aqua" />
            Kontakt
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] tracking-tighter text-precision sm:text-5xl lg:text-6xl">
            Sprechen wir über Ihr Objekt.
          </h1>
        </Reveal>

        <div className="mt-20 grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-base leading-relaxed text-precision/70">
                Ob regelmäßige Unterhaltsreinigung oder einmaliger Einsatz: Schildern Sie uns Ihr
                Anliegen — wir melden uns in der Regel innerhalb eines Werktages mit einer ersten
                Einschätzung oder einem Terminvorschlag.
              </p>
            </Reveal>
            <div className="mt-12 space-y-8">
              {[
                {
                  icon: Phone,
                  label: "Telefon",
                  content: (
                    <a data-testid="kontakt-phone" href={`tel:${site.phone_href}`} className="transition-colors duration-300 hover:text-aqua-deep">
                      {site.phone}
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  label: "E-Mail",
                  content: (
                    <a data-testid="kontakt-email" href={`mailto:${site.public_email}`} className="transition-colors duration-300 hover:text-aqua-deep">
                      {site.public_email}
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  label: "Adresse",
                  content: <span>{site.street} · {site.city}</span>,
                },
                {
                  icon: Clock,
                  label: "Erreichbarkeit",
                  content: <span>{site.hours}</span>,
                },
              ].map((item) => (
                <Reveal key={item.label} className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-aqua-deep/30 text-aqua-deep">
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-precision/50">{item.label}</p>
                    <p className="mt-1.5 text-sm font-medium text-precision">{item.content}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {!site.owner_name && (
              <Reveal className="mt-12 border-l-2 border-precision/20 pl-6">
                <p className="text-sm leading-relaxed text-precision/60">
                  Hinweis: Alle Angaben zu Adresse und Telefonnummer werden aktuell vorbereitet und
                  in Kürze ergänzt. Ihre Anfrage über das Formular erreicht uns bereits zuverlässig.
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <div className="border border-precision/10 bg-white p-8 md:p-12">
              <h2 className="font-display text-2xl font-light tracking-tight text-precision">
                Anfrage senden
              </h2>
              <p className="mt-3 text-sm text-precision/60">
                Kostenlos &amp; unverbindlich — Felder mit * sind Pflichtfelder.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
