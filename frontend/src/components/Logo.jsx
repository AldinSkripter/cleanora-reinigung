import { Link } from "react-router-dom";
import { useSite } from "@/lib/SiteContext";

const STANDARD_LOGO = { dark: "/logo-standard.svg", light: "/logo-standard-light.svg" };
const COMPACT_LOGO = { dark: "/logo-compact.svg", light: "/logo-compact-light.svg" };

export default function Logo({ dark = false }) {
  const { media, logo_scale } = useSite();
  const height = Math.round(40 * (logo_scale || 1.5));
  const variant = dark ? "light" : "dark";
  return (
    <Link
      to="/"
      data-testid="logo-link"
      aria-label="Cleanora Startseite"
      className="group flex items-center gap-2"
    >
      {media?.logo ? (
        <img
          src={`${import.meta.env.REACT_APP_BACKEND_URL}/api/media/logo?v=${encodeURIComponent(media.updated_at || "")}`}
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
