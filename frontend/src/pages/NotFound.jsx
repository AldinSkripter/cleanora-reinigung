import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Seite nicht gefunden | Cleanora" description="Die angeforderte Seite wurde nicht gefunden." path="/404" />
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-6 pt-32 md:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-precision/50">Fehler 404</p>
        <h1 className="mt-6 font-display text-5xl font-light tracking-tighter text-precision md:text-7xl">
          Diese Seite gibt es nicht.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-precision/70">
          Vielleicht wurde sie verschoben — oder der Link ist veraltet.
        </p>
        <Link
          to="/"
          data-testid="notfound-home-link"
          className="mt-10 inline-flex w-fit items-center gap-2 border border-precision bg-precision px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-precision"
        >
          <ArrowLeft className="h-4 w-4" /> Zur Startseite
        </Link>
      </section>
    </>
  );
}
