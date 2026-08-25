import { Link } from "react-router-dom";
import { useSite } from "@/lib/SiteContext";

const STANDARD_LOGO = { dark: "/logo-standard.png", light: "/logo-standard-light.png" };
const COMPACT_LOGO = { dark: "/logo-compact.png", light: "/logo-compact-light.png" };

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
  return { custom, standard: STANDARD_LOGO[variant], compact: COMPACT_LOGO[variant] };
}

const ALT = "Cleanora — Gebäudereinigung Achern";

// Rendert NUR das Bild (ohne Link) — für Navbar, Footer, Consent, Admin.
// inNav=true: responsive Höhen-Caps, damit das Menü mobil nie verdeckt wird.
export function LogoImage({ dark = false, height = 40, inNav = false, className = "" }) {
  const src = useLogoSrc(dark);
  const style = { height: `${Math.round(height)}px` };
  if (src.custom) {
    return (
      <img
        src={src.custom}
        alt={ALT}
        style={style}
        className={`w-auto max-w-full object-contain ${inNav ? "max-h-11 md:max-h-14 lg:max-h-none" : ""} ${className}`}
      />
    );
  }
  if (!inNav) {
    return <img src={src.standard} alt={ALT} style={style} className={`w-auto max-w-full object-contain ${className}`} />;
  }
  return (
    <>
      <img
        src={src.standard}
        alt={ALT}
        style={style}
        className={`hidden w-auto max-w-full object-contain lg:block ${className}`}
      />
      <img
        src={src.compact}
        alt={ALT}
        style={style}
        className={`max-h-11 w-auto max-w-full object-contain md:max-h-14 lg:hidden ${className}`}
      />
    </>
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
