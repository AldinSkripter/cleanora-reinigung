import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const LINKS = [
  { to: "/", label: "Start" },
  { to: "/leistungen", label: "Leistungen" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/einsatzgebiet", label: "Einsatzgebiet" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        data-testid="main-nav"
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          scrolled ? "border-black/10 bg-white/80 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase().replace(/ü/g, "ue")}`}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? "text-precision font-medium" : "text-precision/60 hover:text-precision"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              data-testid="nav-cta-button"
              onClick={() => navigate("/kontakt")}
              className="hidden items-center gap-2 border border-precision bg-precision px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-precision lg:flex"
            >
              Angebot anfordern
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center border border-precision/20 text-precision lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-precision px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    data-testid={`mobile-nav-${l.label.toLowerCase().replace(/ü/g, "ue")}`}
                    className={({ isActive }) =>
                      `block border-b border-white/10 py-4 font-display text-3xl font-light tracking-tight ${
                        isActive ? "text-white" : "text-white/60"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/kontakt"
                data-testid="mobile-nav-cta"
                className="flex w-full items-center justify-center gap-2 border border-white bg-white py-4 text-sm font-medium text-precision"
              >
                Kostenloses Angebot anfordern
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
