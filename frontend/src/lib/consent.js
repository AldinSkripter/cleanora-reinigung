// Eigenes Cookie-Consent-System für Cleanora (kein externer Dienst).
// Aktueller Ist-Bestand der Website:
// - KEINE Cookies, KEIN Tracking, KEINE Analytics/Marketing-Dienste aktiv.
// - localStorage: "cleanora_admin_token" (nur Admin-Login, technisch notwendig)
//   und "cleanora_consent" (dieser Consent, technisch notwendig).
// - Externe Ressourcen: Bilder von Unsplash/Pexels als einfache <img>-Tags
//   (keine Cookies/Tracking, nur IP-Übertragung beim Abruf).
// Kategorien Statistik/Marketing/Externe Medien sind vorbereitet und werden
// erst aktiv, wenn entsprechende Dienste über loadScriptWhenConsented()
// eingebunden werden.

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = "cleanora_consent";

export const CONSENT_CATEGORIES = [
  {
    id: "necessary",
    locked: true,
    label: "Notwendig",
    desc: "Technisch erforderlich für den Betrieb der Website (z. B. Speicherung Ihrer Datenschutz-Auswahl, Admin-Anmeldung). Diese können nicht deaktiviert werden.",
  },
  {
    id: "statistics",
    locked: false,
    label: "Statistik / Analyse",
    desc: "Anonyme Reichweitenmessung zur Verbesserung unseres Angebots. Aktuell sind keine Statistik-Dienste aktiv.",
  },
  {
    id: "marketing",
    locked: false,
    label: "Marketing",
    desc: "Dienste zur Ausspielung personalisierter Werbung. Aktuell sind keine Marketing-Dienste aktiv.",
  },
  {
    id: "external",
    locked: false,
    label: "Externe Medien",
    desc: "Inhalte externer Anbieter (z. B. Karten, Videos oder Bilddatenbanken). Beim Laden wird Ihre IP-Adresse an den jeweiligen Anbieter übertragen.",
  },
];

export function loadConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.v !== CONSENT_VERSION) return null; // bei Versionsänderung erneut fragen
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choices) {
  const state = {
    v: CONSENT_VERSION,
    ts: new Date().toISOString(),
    necessary: true,
    statistics: Boolean(choices.statistics),
    marketing: Boolean(choices.marketing),
    external: Boolean(choices.external),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("cleanora-consent-changed", { detail: state }));
  return state;
}

export function hasConsent(category) {
  const state = loadConsent();
  if (!state) return false;
  return Boolean(state[category]);
}

// Für künftige Dienste: Skript wird nur bei erteilter Zustimmung geladen.
// Bei Widerruf muss die Seite neu geladen werden, um den Dienst vollständig zu entfernen.
export function loadScriptWhenConsented(src, category) {
  if (!hasConsent(category)) return false;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  s.dataset.consentCategory = category;
  document.head.appendChild(s);
  return true;
}
