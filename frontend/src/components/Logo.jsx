import { Link } from "react-router-dom";
import { useSite } from "@/lib/SiteContext";

export default function Logo({ dark = false }) {
  const { media, logo_scale } = useSite();
  return (
    <Link
      to="/"
      data-testid="logo-link"
      aria-label="Cleanora Startseite"
      className={`group flex items-center gap-2 ${dark ? "text-white" : "text-precision"}`}
    >
      {media?.logo ? (
        <img
          src={`${import.meta.env.REACT_APP_BACKEND_URL}/api/media/logo?v=${encodeURIComponent(media.updated_at || "")}`}
          alt="Cleanora — Gebäudereinigung Achern"
          style={{ height: `${Math.round(40 * (logo_scale || 1))}px` }}
          className="w-auto max-w-[260px] object-contain"
        />
      ) : (
        <span className="font-display text-xl font-black tracking-tighter md:text-2xl">CLEANORA</span>
      )}
    </Link>
  );
}
