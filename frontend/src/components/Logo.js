import { Link } from "react-router-dom";

export default function Logo({ dark = false }) {
  return (
    <Link
      to="/"
      data-testid="logo-link"
      aria-label="Cleanora Startseite"
      className={`group flex items-center gap-2 ${dark ? "text-white" : "text-precision"}`}
    >
      <span className="font-display text-xl font-black tracking-tighter md:text-2xl">
        CLEANOR<span className="relative inline-block">A<span className="absolute left-0 top-1/2 h-[3px] w-full -rotate-45 bg-current opacity-90 transition-transform duration-300 group-hover:scale-x-125" /></span>
      </span>
    </Link>
  );
}
