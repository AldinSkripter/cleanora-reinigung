import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import LegalText from "@/components/LegalText";
import { useSite } from "@/lib/SiteContext";
import { LEGAL_DEFAULTS } from "@/lib/legalDefaults";

export default function Impressum() {
  const site = useSite();
  const text = site.legal?.impressum?.trim() || LEGAL_DEFAULTS.impressum;
  return (
    <>
      <Seo title="Impressum | Cleanora Gebäudereinigung Achern" description="Impressum der Cleanora Gebäudereinigung, Achern." path="/impressum" />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal><h1 className="font-display text-4xl font-light tracking-tighter text-precision md:text-5xl">Impressum</h1></Reveal>
        <LegalText text={text} />
      </section>
    </>
  );
}
