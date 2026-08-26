import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { CONSENT_CATEGORIES, loadConsent, saveConsent } from "@/lib/consent";
import { LogoImage } from "@/components/Logo";

const ALL_ON = { statistics: true, marketing: true, external: true };
const ALL_OFF = { statistics: false, marketing: false, external: false };

function Toggle({ id, checked, locked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={locked ? true : checked}
      aria-disabled={locked}
      data-testid={`cookie-toggle-${id}`}
      onClick={() => !locked && onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
        locked || checked ? "bg-aqua" : "bg-white/15"
      } ${locked ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left] duration-300 ${
          locked || checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(() => loadConsent());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selection, setSelection] = useState(ALL_OFF);
  const dialogRef = useRef(null);

  const isAdmin = pathname.startsWith("/admin");
  const showBanner = !isAdmin && !consent && !settingsOpen;

  useEffect(() => {
    const open = () => {
      const current = loadConsent();
      setSelection(current ? { statistics: current.statistics, marketing: current.marketing, external: current.external } : ALL_OFF);
      setSettingsOpen(true);
    };
    window.addEventListener("cleanora-open-consent", open);
    return () => window.removeEventListener("cleanora-open-consent", open);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const dialog = dialogRef.current;
    dialog?.querySelector("button")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setSettingsOpen(false);
      if (e.key !== "Tab" || !dialog) return;
      const focusables = dialog.querySelectorAll("button, a[href]");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [settingsOpen]);

  if (isAdmin) return null;

  function decide(choices) {
    setConsent(saveConsent(choices));
    setSettingsOpen(false);
  }

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[70] p-4 md:p-6"
          >
            <div
              data-testid="cookie-banner"
              role="dialog"
              aria-live="polite"
              aria-label="Cookie-Hinweis"
              className="mx-auto flex max-w-4xl flex-col gap-6 border border-white/10 bg-precision p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] md:flex-row md:items-end md:justify-between md:p-8"
            >
              <div className="max-w-xl">
                <LogoImage dark height={30} className="mb-4" />
                <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.25em] text-white/50">
                  <ShieldCheck className="h-4 w-4 text-aqua" /> Ihre Privatsphäre
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Wir nutzen Cookies und ähnliche Technologien, um unsere Website technisch bereitzustellen.
                  Optionale Dienste (Statistik, Marketing, externe Medien) werden nur mit Ihrer Zustimmung
                  aktiviert. Details finden Sie in unserer{" "}
                  <Link to="/datenschutz" className="underline underline-offset-4 transition-colors hover:text-white">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <button
                  type="button"
                  data-testid="cookie-accept-all"
                  onClick={() => decide(ALL_ON)}
                  className="whitespace-nowrap border border-white bg-white px-6 py-3 text-sm font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white"
                >
                  Alle akzeptieren
                </button>
                <button
                  type="button"
                  data-testid="cookie-accept-necessary"
                  onClick={() => decide(ALL_OFF)}
                  className="whitespace-nowrap border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-white"
                >
                  Nur notwendige
                </button>
                <button
                  type="button"
                  data-testid="cookie-open-settings"
                  onClick={() => {
                    setSelection(ALL_OFF);
                    setSettingsOpen(true);
                  }}
                  className="px-6 py-3 text-sm text-white/60 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-precision/70 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={(e) => e.target === e.currentTarget && setSettingsOpen(false)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Cookie-Einstellungen"
              data-testid="cookie-settings-modal"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-[90vh] w-full max-w-2xl flex-col border border-white/10 bg-precision text-white"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-6 md:p-8">
                <div className="flex items-center gap-5">
                  <LogoImage dark height={26} />
                  <h2 className="font-display text-xl font-light tracking-tight md:text-2xl">Cookie-Einstellungen</h2>
                </div>
                <button
                  type="button"
                  data-testid="cookie-settings-close"
                  onClick={() => setSettingsOpen(false)}
                  aria-label="Einstellungen schließen"
                  className="flex h-10 w-10 items-center justify-center border border-white/20 transition-colors duration-300 hover:border-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <p className="text-sm leading-relaxed text-white/60">
                  Wählen Sie, welche Dienste diese Website verwenden darf. Ihre Auswahl wird gespeichert
                  und kann jederzeit über „Cookie-Einstellungen“ im Fußbereich geändert oder widerrufen werden.
                </p>
                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {CONSENT_CATEGORIES.map((cat) => (
                    <li key={cat.id} className="flex items-start justify-between gap-6 py-5">
                      <div>
                        <p className="text-sm font-medium">
                          {cat.label}
                          {cat.locked && (
                            <span className="ml-3 text-[11px] font-normal uppercase tracking-[0.15em] text-aqua">
                              Immer aktiv
                            </span>
                          )}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-white/50">{cat.desc}</p>
                      </div>
                      <Toggle
                        id={cat.id}
                        checked={cat.locked ? true : Boolean(selection[cat.id])}
                        locked={cat.locked}
                        onChange={(v) => setSelection((s) => ({ ...s, [cat.id]: v }))}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row sm:justify-end md:p-8">
                <button
                  type="button"
                  data-testid="cookie-save-selection"
                  onClick={() => decide(selection)}
                  className="border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-white"
                >
                  Auswahl speichern
                </button>
                <button
                  type="button"
                  data-testid="cookie-accept-all-modal"
                  onClick={() => decide(ALL_ON)}
                  className="border border-white bg-white px-6 py-3 text-sm font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white"
                >
                  Alle akzeptieren
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
