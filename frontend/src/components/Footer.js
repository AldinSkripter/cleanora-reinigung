import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { SERVICES, SITE } from "@/data/site";
import { useSite } from "@/lib/SiteContext";

export default function Footer() {
  const site = useSite();
  return (
    <footer data-testid="site-footer" className="relative overflow-hidden bg-precision text-white grain">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo dark />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.legalName} — Ihr Reinigungsservice für Achern &amp; Umgebung.
              Sauberkeit, Qualität und Zuverlässigkeit für Privat- und Gewerbekunden.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a
                data-testid="footer-phone"
                href={`tel:${site.phone_href}`}
                className="flex items-center gap-3 text-white/80 transition-colors duration-300 hover:text-white"
              >
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <a
                data-testid="footer-email"
                href={`mailto:${site.public_email}`}
                className="flex items-center gap-3 text-white/80 transition-colors duration-300 hover:text-white"
              >
                <Mail className="h-4 w-4" /> {site.public_email}
              </a>
              <p className="text-white/50">
                {site.street} · {site.city}
              </p>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">Seiten</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["/", "Startseite"],
                ["/leistungen", "Leistungen"],
                ["/ueber-uns", "Über uns"],
                ["/einsatzgebiet", "Einsatzgebiet"],
                ["/kontakt", "Kontakt"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/70 transition-colors duration-300 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">Leistungen</h3>
            <ul className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/leistungen/${s.slug}`}
                    className="text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 select-none overflow-hidden" aria-hidden="true">
          <p className="whitespace-nowrap font-display text-[13vw] font-black leading-none tracking-tighter text-white/5">
            CLEANORA
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {SITE.legalName} · Achern &amp; Umgebung</p>
          <div className="flex gap-8">
            <Link data-testid="footer-impressum" to="/impressum" className="transition-colors duration-300 hover:text-white">
              Impressum
            </Link>
            <Link data-testid="footer-datenschutz" to="/datenschutz" className="transition-colors duration-300 hover:text-white">
              Datenschutz
            </Link>
            <Link data-testid="footer-admin" to="/admin" className="inline-flex items-center gap-1 transition-colors duration-300 hover:text-white">
              Login <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
