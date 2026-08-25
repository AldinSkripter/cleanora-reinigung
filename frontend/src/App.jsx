import { lazy, Suspense, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { getLenis, setLenis } from "@/lib/lenis";
import { SiteProvider } from "@/lib/SiteContext";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Home from "@/pages/Home";

const Leistungen = lazy(() => import("@/pages/Leistungen"));
const LeistungDetail = lazy(() => import("@/pages/LeistungDetail"));
const UeberUns = lazy(() => import("@/pages/UeberUns"));
const Einsatzgebiet = lazy(() => import("@/pages/Einsatzgebiet"));
const Kontakt = lazy(() => import("@/pages/Kontakt"));
const Impressum = lazy(() => import("@/pages/Impressum"));
const Datenschutz = lazy(() => import("@/pages/Datenschutz"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

function SiteLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    api.get("/media/info").then(({ data }) => {
      if (data.favicon) {
        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = `${import.meta.env.REACT_APP_BACKEND_URL}/api/media/favicon?v=${encodeURIComponent(data.updated_at || "")}`;
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(lenis);
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <SiteProvider>
          <ScrollToTop />
          <CookieConsent />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/leistungen" element={<Leistungen />} />
                <Route path="/leistungen/:slug" element={<LeistungDetail />} />
                <Route path="/ueber-uns" element={<UeberUns />} />
                <Route path="/einsatzgebiet" element={<Einsatzgebiet />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </SiteProvider>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
