import { Link } from "react-router-dom";
import { useSite } from "@/lib/SiteContext";

const STANDARD_LOGO = { dark: "/logo-standard.png", light: "/logo-standard-light.png" };

function useLogoSrc(dark) {
  const { media } = useSite();
  const stamp = encodeURIComponent(media?.updated_at || "");
  const apiBase = import.meta.env.REACT_APP_BACKEND_URL;
  // Eigene Uploads: helles Logo (logo_light) auf dunklen Flächen, sonst Fallback auf normales Logo.
  const custom = dark
    ? media?.logo_light
      ? `${apiBase}/api/media/logo-light?v=${stamp}`
      : media?.logo
        ? `${apiBase}/api/media/logo?v=${stamp}`
        : null
    : media?.logo
      ? `${apiBase}/api/media/logo?v=${stamp}`
      : null;
  const variant = dark ? "light" : "dark";
  return { custom, standard: STANDARD_LOGO[variant] };
}

const ALT = "Cleanora — Gebäudereinigung Achern";

// Rendert NUR das Bild (ohne Link) — für Navbar, Footer, Consent, Admin.
// inNav=true: responsive Höhen-Caps, damit das Menü mobil nie verdeckt wird.
// Das vollständige Logo (inkl. Sub-Zeile) wird auf allen Größen gezeigt — nichts wird abgeschnitten.
export function LogoImage({ dark = false, height = 40, inNav = false, className = "" }) {
  const src = useLogoSrc(dark);
  const style = { height: `${Math.round(height)}px` };
  const navCaps = inNav ? "max-h-12 md:max-h-14 lg:max-h-none" : "";
  return (
    <img
      src={src.custom || src.standard}
      alt={ALT}
      style={style}
      className={`w-auto max-w-full object-contain ${navCaps} ${className}`}
    />
  );
}

export default function Logo({ dark = false, inNav = false }) {
  const { logo_scale } = useSite();
  const height = 40 * (logo_scale || 1.5);
  return (
    <Link
      to="/"
      data-testid="logo-link"
      aria-label="Cleanora Startseite"
      className="group flex shrink-0 items-center gap-2"
    >
      <LogoImage dark={dark} height={height} inNav={inNav} />
    </Link>
  );
}
