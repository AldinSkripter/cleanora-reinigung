import { MARQUEE_ITEMS } from "@/data/site";

export default function Marquee({ dark = false }) {
  const row = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={`font-display font-light uppercase tracking-[0.3em] text-2xl md:text-4xl ${dark ? "text-white/25" : "text-precision/30"}`}>
            {item}
          </span>
          <span className={`mx-10 h-1.5 w-1.5 rounded-full ${dark ? "bg-aqua/50" : "bg-aqua/70"}`} />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative overflow-hidden py-8 md:py-10 ${dark ? "" : "border-y border-black/10"}`} aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
