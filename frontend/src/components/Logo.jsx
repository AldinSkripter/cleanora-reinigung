import { Link } from "react-router-dom";
import { useSite } from "@/lib/SiteContext";

const STANDARD_LOGO = { dark: "/logo-standard.png", light: "/logo-standard-light.png" };
const COMPACT_LOGO = { dark: "/logo-compact.png", light: "/logo-compact-light.png" };

export default function Logo({ dark = false }) {
  const { media, logo_scale } = useSite();
  const height = Math.round(40 * (logo_scale || 1.5));
  const variant = dark ? "light" : "dark";
  const stamp = encodeURIComponent(media?.updated_at || "");
  const apiBase = import.meta.env.REACT_APP_BACKEND_URL;
  // Eigene Uploads: helles Logo (logo_light) nur für dunkle Flächen, sonst Fallback auf normales Logo.
  const customSrc = dark
    ? media?.logo_light
      ? `${apiBase}/api/media/logo-light?v=${stamp}`
      : media?.logo
        ? `${apiBase}/api/media/logo?v=${stamp}`
        : null
    : media?.logo
      ? `${apiBase}/api/media/logo?v=${stamp}`
      : null;

  return (
    <Link
      to="/"
      data-testid="logo-link"
      aria-label="Cleanora Startseite"
      className="group flex items-center gap-2"
    >
      {customSrc ? (
        <img
          src={customSrc}
          alt="Cleanora — Gebäudereinigung Achern"
          style={{ height: `${height}px` }}
          className="max-h-11 w-auto max-w-[200px] object-contain md:max-h-14 md:max-w-[260px] lg:max-h-none lg:max-w-[560px]"
        />
      ) : (
        <>
          <img
            src={STANDARD_LOGO[variant]}
            alt="Cleanora — Gebäudereinigung Achern"
            style={{ height: `${height}px` }}
            className="hidden w-auto max-w-[560px] object-contain lg:block"
          />
          <img
            src={COMPACT_LOGO[variant]}
            alt="Cleanora — Gebäudereinigung Achern"
            style={{ height: `${height}px` }}
            className="max-h-11 w-auto max-w-[200px] object-contain md:max-h-14 md:max-w-[260px] lg:hidden"
          />
        </>
      )}
    </Link>
  );
}
