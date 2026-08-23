import Reveal from "@/components/Reveal";

export default function ChapterHeading({ number, label, title, dark = false, className = "" }) {
  return (
    <Reveal className={`mb-14 md:mb-20 ${className}`}>
      <p className={`text-xs font-medium uppercase tracking-[0.25em] ${dark ? "text-white/50" : "text-precision/50"}`}>
        {number} — {label}
      </p>
      <h2 className={`mt-6 max-w-3xl text-balance text-3xl font-light tracking-tight md:text-5xl ${dark ? "text-white" : "text-precision"}`}>
        {title}
      </h2>
    </Reveal>
  );
}
