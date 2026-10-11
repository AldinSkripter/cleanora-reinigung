import Seo from "@/components/Seo";
import Reveal from "@/components/Reveal";
import LegalText from "@/components/LegalText";
import { useSite } from "@/lib/SiteContext";
import { LEGAL_DEFAULTS } from "@/lib/legalDefaults";

export default function Datenschutz() {
  const site = useSite();
  const text = site.legal?.datenschutz?.trim() || LEGAL_DEFAULTS.datenschutz;
  return (
    <>
      <Seo title="Datenschutzerklärung | Cleanora Gebäudereinigung Achern" description="Informationen zur Verarbeitung personenbezogener Daten bei Cleanora Gebäudereinigung." path="/datenschutz" />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 md:pt-44">
        <Reveal><h1 className="font-display text-4xl font-light tracking-tighter text-precision md:text-5xl">Datenschutzerklärung</h1></Reveal>
        <LegalText text={text} />
      </section>
    </>
  );
}
