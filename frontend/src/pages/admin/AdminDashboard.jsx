import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Inbox, Loader2, LogOut, MailCheck, MailX, Save, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import Logo from "@/components/Logo";
import Seo from "@/components/Seo";

const inputCls =
  "w-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-white/50";
const labelCls = "text-xs font-medium uppercase tracking-[0.2em] text-white/40";

function EmailSettings() {
  const [cfg, setCfg] = useState(null);
  const [saving, setSaving] = useState(false);
  const set = (key) => (e) =>
    setCfg((c) => ({ ...c, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  useEffect(() => {
    api.get("/admin/settings/email").then(({ data }) => setCfg({ ...data, smtp_password: "" }));
  }, []);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...cfg };
      if (!payload.smtp_password) delete payload.smtp_password;
      await api.put("/admin/settings/email", payload);
      toast.success("E-Mail-Einstellungen gespeichert");
      const { data } = await api.get("/admin/settings/email");
      setCfg({ ...data, smtp_password: "" });
    } catch {
      toast.error("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  }

  if (!cfg) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-white/40" /></div>;
  }

  return (
    <form data-testid="email-settings-form" onSubmit={save} className="space-y-8">
      <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="flex items-center gap-2 font-display text-lg font-light text-white">
          <MailCheck className="h-4 w-4" /> Empfänger
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/40">
          An diese Adresse werden alle Anfragen aus dem Kontaktformular gesendet.
        </p>
        <div className="mt-5">
          <label htmlFor="es-recipient" className={labelCls}>Empfänger-E-Mail</label>
          <input id="es-recipient" data-testid="settings-recipient" type="email" required value={cfg.recipient_email} onChange={set("recipient_email")} className={`${inputCls} mt-2`} />
        </div>
      </div>

      <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="flex items-center gap-2 font-display text-lg font-light text-white">
          <Settings className="h-4 w-4" /> SMTP-Server
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/40">
          Zugangsdaten Ihres Postfachs (z. B. aus Plesk). Das Passwort wird verschlüsselt gespeichert und nie angezeigt.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="es-host" className={labelCls}>SMTP-Host</label>
            <input id="es-host" data-testid="settings-smtp-host" value={cfg.smtp_host} onChange={set("smtp_host")} className={`${inputCls} mt-2`} placeholder="mail.cleanora-reinigung.de" />
          </div>
          <div>
            <label htmlFor="es-port" className={labelCls}>Port</label>
            <input id="es-port" data-testid="settings-smtp-port" type="number" min="1" max="65535" value={cfg.smtp_port} onChange={set("smtp_port")} className={`${inputCls} mt-2`} />
          </div>
          <div>
            <label htmlFor="es-user" className={labelCls}>Benutzername</label>
            <input id="es-user" data-testid="settings-smtp-user" value={cfg.smtp_user} onChange={set("smtp_user")} className={`${inputCls} mt-2`} placeholder="kontak@cleanora-reinigung.de" />
          </div>
          <div>
            <label htmlFor="es-pass" className={labelCls}>
              Passwort {cfg.password_set && <span className="normal-case tracking-normal text-emerald-400/80">(gespeichert — leer lassen zum Beibehalten)</span>}
            </label>
            <input id="es-pass" data-testid="settings-smtp-password" type="password" autoComplete="new-password" value={cfg.smtp_password} onChange={set("smtp_password")} className={`${inputCls} mt-2`} placeholder={cfg.password_set ? "••••••••" : "Postfach-Passwort"} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="es-from" className={labelCls}>Absender-Adresse (From)</label>
            <input id="es-from" data-testid="settings-smtp-from" value={cfg.smtp_from} onChange={set("smtp_from")} className={`${inputCls} mt-2`} placeholder="kontak@cleanora-reinigung.de" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-white/70">
            <input type="checkbox" data-testid="settings-starttls" checked={cfg.start_tls} onChange={(e) => setCfg((c) => ({ ...c, start_tls: e.target.checked, use_tls: e.target.checked ? false : c.use_tls }))} className="h-4 w-4 appearance-none border border-white/30 checked:bg-white" />
            STARTTLS (Port 587)
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-white/70">
            <input type="checkbox" data-testid="settings-ssl" checked={cfg.use_tls} onChange={(e) => setCfg((c) => ({ ...c, use_tls: e.target.checked, start_tls: e.target.checked ? false : c.start_tls }))} className="h-4 w-4 appearance-none border border-white/30 checked:bg-white" />
            SSL/TLS (Port 465)
          </label>
        </div>
      </div>

      <button
        data-testid="settings-save"
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 text-sm font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Einstellungen speichern
      </button>
    </form>
  );
}

function Requests() {
  const [items, setItems] = useState(null);

  const load = () => api.get("/admin/requests").then(({ data }) => setItems(data));
  useEffect(() => { load(); }, []);

  async function remove(id) {
    await api.delete(`/admin/requests/${id}`);
    setItems((list) => list.filter((r) => r.id !== id));
    toast.success("Anfrage gelöscht");
  }

  if (!items) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-white/40" /></div>;
  }

  if (items.length === 0) {
    return (
      <div data-testid="requests-empty" className="border border-dashed border-white/15 p-16 text-center">
        <Inbox className="mx-auto h-8 w-8 text-white/20" strokeWidth={1.5} />
        <p className="mt-4 text-sm text-white/40">Noch keine Anfragen eingegangen.</p>
      </div>
    );
  }

  return (
    <ul data-testid="requests-list" className="space-y-4">
      {items.map((r) => (
        <li key={r.id} className="border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-medium text-white">{r.name}</p>
              <p className="mt-1 text-xs break-all text-white/40">
                {r.email} {r.phone && `· ${r.phone}`} · {r.customer_type === "gewerbe" ? "Gewerbe" : "Privat"}
                {r.service && ` · ${r.service}`} {r.location && `· ${r.location}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span title={r.email_sent ? "Per E-Mail zugestellt" : "Nur gespeichert (SMTP nicht konfiguriert)"}>
                {r.email_sent
                  ? <MailCheck className="h-4 w-4 text-emerald-400" />
                  : <MailX className="h-4 w-4 text-amber-400" />}
              </span>
              <span className="text-xs text-white/30">
                {new Date(r.created_at).toLocaleString("de-DE")}
              </span>
              <button
                data-testid={`request-delete-${r.id}`}
                onClick={() => remove(r.id)}
                aria-label="Anfrage löschen"
                className="border border-white/15 p-2 text-white/50 transition-colors duration-300 hover:border-red-400/50 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <p className="mt-4 whitespace-pre-line border-t border-white/10 pt-4 text-sm leading-relaxed text-white/60">{r.message}</p>
        </li>
      ))}
    </ul>
  );
}

function SiteSettingsForm() {
  const [cfg, setCfg] = useState(null);
  const [saving, setSaving] = useState(false);
  const set = (key) => (e) => setCfg((c) => ({ ...c, [key]: e.target.value }));

  useEffect(() => {
    api.get("/site-settings").then(({ data }) => setCfg(data));
  }, []);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/admin/settings/site", cfg);
      toast.success("Firmendaten gespeichert — nach Neu laden auf der Website sichtbar");
    } catch {
      toast.error("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  }

  if (!cfg) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-white/40" /></div>;
  }

  return (
    <form data-testid="site-settings-form" onSubmit={save} className="space-y-8">
      <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="flex items-center gap-2 font-display text-lg font-light text-white">
          <Settings className="h-4 w-4" /> Firmendaten
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/40">
          Diese Angaben erscheinen auf der Website (Footer, Kontaktseite, Impressum, Datenschutz).
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ss-legal-name" className={labelCls}>Firmenname (rechtlich)</label>
            <input id="ss-legal-name" data-testid="site-legal-name" required value={cfg.legal_name || ""} onChange={set("legal_name")} className={`${inputCls} mt-2`} />
          </div>
          <div>
            <label htmlFor="ss-email" className={labelCls}>Öffentliche E-Mail</label>
            <input id="ss-email" data-testid="site-email" type="email" required value={cfg.public_email} onChange={set("public_email")} className={`${inputCls} mt-2`} />
          </div>
          <div>
            <label htmlFor="ss-phone" className={labelCls}>Telefonnummer</label>
            <input id="ss-phone" data-testid="site-phone" value={cfg.phone} onChange={set("phone")} className={`${inputCls} mt-2`} placeholder="+49 (0) 7841 …" />
          </div>
          <div>
            <label htmlFor="ss-street" className={labelCls}>Straße &amp; Hausnummer</label>
            <input id="ss-street" data-testid="site-street" value={cfg.street} onChange={set("street")} className={`${inputCls} mt-2`} />
          </div>
          <div>
            <label htmlFor="ss-city" className={labelCls}>PLZ &amp; Ort</label>
            <input id="ss-city" data-testid="site-city" value={cfg.city} onChange={set("city")} className={`${inputCls} mt-2`} />
          </div>
          <div>
            <label htmlFor="ss-owner" className={labelCls}>Inhaber (Impressum)</label>
            <input id="ss-owner" data-testid="site-owner" value={cfg.owner_name} onChange={set("owner_name")} className={`${inputCls} mt-2`} placeholder="Vor- und Nachname" />
          </div>
          <div>
            <label htmlFor="ss-ust" className={labelCls}>USt-IdNr. (optional)</label>
            <input id="ss-ust" data-testid="site-ust" value={cfg.ust_id} onChange={set("ust_id")} className={`${inputCls} mt-2`} placeholder="DE …" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ss-hours" className={labelCls}>Erreichbarkeit</label>
            <input id="ss-hours" data-testid="site-hours" value={cfg.hours} onChange={set("hours")} className={`${inputCls} mt-2`} />
          </div>
        </div>
      </div>
      <button
        data-testid="site-settings-save"
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 text-sm font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Firmendaten speichern
      </button>
    </form>
  );
}

function LegalTextsForm() {
  const [texts, setTexts] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/legal-texts").then(({ data }) => setTexts(data));
  }, []);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/admin/settings/legal", texts);
      toast.success("Rechtstexte gespeichert — nach Neu laden auf der Website sichtbar");
    } catch {
      toast.error("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  }

  if (!texts) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-white/40" /></div>;
  }

  const areaCls =
    "mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs leading-relaxed text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-white/50";

  return (
    <form data-testid="legal-texts-form" onSubmit={save} className="space-y-8">
      <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-xs leading-relaxed text-white/40">
          Leer lassen = der Standardtext (mit den hinterlegten Firmendaten) wird automatisch verwendet.
          Eigener Text ersetzt die jeweilige Seite komplett. Formatierung: Zeilen, die mit
          „## “ beginnen, werden als Zwischenüberschrift dargestellt; Leerzeilen trennen Absätze.
        </p>
        <div className="mt-6">
          <label htmlFor="lt-impressum" className={labelCls}>Impressum (eigener Text)</label>
          <textarea
            id="lt-impressum"
            data-testid="legal-impressum"
            rows={12}
            value={texts.impressum}
            onChange={(e) => setTexts((t) => ({ ...t, impressum: e.target.value }))}
            className={areaCls}
            placeholder={"## Angaben gemäß § 5 TMG\nCleanora Gebäudereinigung\n…"}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="lt-datenschutz" className={labelCls}>Datenschutzerklärung (eigener Text)</label>
          <textarea
            id="lt-datenschutz"
            data-testid="legal-datenschutz"
            rows={12}
            value={texts.datenschutz}
            onChange={(e) => setTexts((t) => ({ ...t, datenschutz: e.target.value }))}
            className={areaCls}
            placeholder={"## 1. Verantwortlicher\n…"}
          />
        </div>
      </div>
      <button
        data-testid="legal-save"
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 border border-white bg-white px-8 py-3.5 text-sm font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Rechtstexte speichern
      </button>
    </form>
  );
}

function MediaCard({ kind, title, hint, accept, maxBytes, testid }) {
  const [info, setInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const key = { "share-image": "share_image", favicon: "favicon", logo: "logo" }[kind];
  const base = api.defaults.baseURL;

  const load = () => api.get("/media/info").then(({ data }) => setInfo(data));
  useEffect(() => { load(); }, []);

  const hasImage = Boolean(info?.[key]);
  const previewUrl = `${base}/media/${kind}?v=${encodeURIComponent(info?.updated_at || "")}`;

  function pick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > maxBytes) {
      toast.error(`Datei zu groß (max. ${Math.round(maxBytes / 1024)} KB)`);
      e.target.value = "";
      return;
    }
    setFile(f);
  }

  async function upload() {
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      await api.post(`/admin/media/${kind}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(`${title} gespeichert`);
      setFile(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload fehlgeschlagen");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    setBusy(true);
    try {
      await api.delete(`/admin/media/${kind}`);
      toast.success(`${title} entfernt — Standard wird verwendet`);
      load();
    } catch {
      toast.error("Löschen fehlgeschlagen");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h2 className="font-display text-lg font-light text-white">{title}</h2>
      <p className="mt-2 text-xs leading-relaxed text-white/40">{hint}</p>
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="w-full max-w-xs shrink-0 border border-white/10 bg-precision">
          <img
            data-testid={`${testid}-preview`}
            src={previewUrl}
            alt={`${title} Vorschau`}
            className={kind === "share-image" ? "aspect-[1200/630] w-full object-cover" : "h-24 w-24 object-contain p-4"}
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          <input
            data-testid={`${testid}-input`}
            type="file"
            accept={accept}
            onChange={pick}
            className="w-full text-xs text-white/60 file:mr-4 file:border file:border-white/20 file:bg-transparent file:px-4 file:py-2 file:text-xs file:text-white file:transition-colors hover:file:border-white/60"
          />
          <div className="flex flex-wrap gap-3">
            <button
              data-testid={`${testid}-upload`}
              onClick={upload}
              disabled={!file || busy}
              className="flex items-center gap-2 border border-white bg-white px-5 py-2.5 text-xs font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {hasImage ? "Ersetzen & speichern" : "Hochladen & speichern"}
            </button>
            {hasImage && (
              <button
                data-testid={`${testid}-delete`}
                onClick={remove}
                disabled={busy}
                className="flex items-center gap-2 border border-white/20 px-5 py-2.5 text-xs text-white/60 transition-colors duration-300 hover:border-red-400/60 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" /> Entfernen
              </button>
            )}
          </div>
          <p className="text-xs text-white/30">
            {hasImage ? "Eigenes Bild aktiv." : "Kein eigenes Bild — Standard wird verwendet."}
          </p>
        </div>
      </div>
    </div>
  );
}

function MediaPanel() {
  return (
    <div data-testid="media-panel" className="space-y-8">
      <MediaCard
        kind="logo"
        title="Logo"
        hint="Ihr offizielles Logo für die Website (Navigation & Footer). Empfohlen: 500 × 500 Pixel, PNG mit transparentem Hintergrund. Erlaubt: PNG, SVG, WebP oder JPG (max. 512 KB). Die Website skaliert das Logo automatisch passend — ohne Upload wird der Schriftzug CLEANORA angezeigt."
        accept="image/png,image/svg+xml,image/webp,image/jpeg"
        maxBytes={512 * 1024}
        testid="media-logo"
      />
      <MediaCard
        kind="share-image"
        title="Social-Media Vorschaubild (Share-Bild)"
        hint="Wird angezeigt, wenn die Website über WhatsApp, Facebook, LinkedIn u. a. geteilt wird. Empfohlene Größe: 1200 × 630 Pixel. Erlaubt: JPG, PNG oder WebP (max. 2 MB) — für maximale Kompatibilität JPG oder PNG empfohlen, WebP wird von einzelnen Diensten (z. B. teils LinkedIn) nicht zuverlässig dargestellt."
        accept="image/jpeg,image/png,image/webp"
        maxBytes={2 * 1024 * 1024}
        testid="media-share"
      />
      <MediaCard
        kind="favicon"
        title="Favicon / Browser-Icon"
        hint="Das kleine Icon im Browser-Tab. Erlaubt: PNG, SVG oder ICO (max. 512 KB). Empfohlen: quadratisches PNG, mindestens 64 × 64 Pixel."
        accept="image/png,image/jpeg,image/svg+xml,image/x-icon"
        maxBytes={512 * 1024}
        testid="media-favicon"
      />
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("requests");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cleanora_admin_token")) {
      navigate("/admin", { replace: true });
      return;
    }
    api.get("/auth/me")
      .then(() => setReady(true))
      .catch(() => {
        localStorage.removeItem("cleanora_admin_token");
        navigate("/admin", { replace: true });
      });
  }, [navigate]);

  function logout() {
    localStorage.removeItem("cleanora_admin_token");
    navigate("/admin", { replace: true });
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-precision">
        <Loader2 className="h-6 w-6 animate-spin text-white/40" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-precision text-white grain relative">
      <Seo title="Admin-Bereich | Cleanora" description="Interner Bereich." path="/admin/dashboard" />
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Logo dark />
            <span className="text-xs uppercase tracking-[0.25em] text-white/30">Admin</span>
          </div>
          <button
            data-testid="admin-logout"
            onClick={logout}
            className="flex items-center gap-2 border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition-colors duration-300 hover:border-white/50 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" /> Abmelden
          </button>
        </div>
      </header>
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-5xl px-6 py-12"
      >
        <div className="flex flex-wrap gap-2 border-b border-white/10">
          {[
            ["requests", "Anfragen"],
            ["email", "E-Mail-Einstellungen"],
            ["site", "Firmendaten"],
            ["legal", "Rechtstexte"],
            ["media", "Medien"],
          ].map(([key, label]) => (
            <button
              key={key}
              data-testid={`admin-tab-${key}`}
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 px-3 py-3 text-xs transition-colors duration-300 sm:px-4 sm:text-sm ${
                tab === key ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-10">
          {tab === "requests" ? <Requests /> : tab === "email" ? <EmailSettings /> : tab === "site" ? <SiteSettingsForm /> : tab === "legal" ? <LegalTextsForm /> : <MediaPanel />}
        </div>
      </motion.main>
    </div>
  );
}
