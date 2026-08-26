import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { SERVICES } from "@/data/site";

const initial = {
  name: "",
  email: "",
  phone: "",
  customer_type: "privat",
  service: "",
  object_type: "",
  location: "",
  message: "",
  privacy: false,
  website: "",
};

const inputCls =
  "w-full border-b border-precision/20 bg-transparent py-3 text-sm text-precision placeholder:text-precision/35 outline-none transition-colors duration-300 focus:border-aqua-deep";
const labelCls = "text-xs font-medium uppercase tracking-[0.2em] text-precision/50";

export default function ContactForm({ dark = false }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(formatApiError(err));
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        data-testid="contact-success"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-6 border border-precision/15 bg-white p-10 md:p-14"
      >
        <CheckCircle2 className="h-10 w-10 text-precision" strokeWidth={1.5} />
        <div>
          <h3 className="font-display text-2xl font-light tracking-tight text-precision md:text-3xl">
            Vielen Dank für Ihre Anfrage.
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-precision/70">
            Ihre Nachricht ist bei uns eingegangen. Wir melden uns in der Regel innerhalb eines
            Werktages bei Ihnen — bei dringenden Anliegen erreichen Sie uns auch telefonisch.
          </p>
        </div>
        <button
          data-testid="contact-new-request"
          onClick={() => setStatus("idle")}
          className="border border-precision px-6 py-3 text-sm font-medium text-precision transition-colors duration-300 hover:bg-precision hover:text-white"
        >
          Weitere Anfrage senden
        </button>
      </motion.div>
    );
  }

  return (
    <form data-testid="contact-form" onSubmit={submit} className="space-y-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name / Firma *</label>
          <input id="cf-name" data-testid="contact-name" required maxLength={120} value={form.name} onChange={set("name")} className={inputCls} placeholder="Max Mustermann" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>E-Mail *</label>
          <input id="cf-email" data-testid="contact-email" type="email" required value={form.email} onChange={set("email")} className={inputCls} placeholder="max@beispiel.de" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Telefonnummer</label>
          <input id="cf-phone" data-testid="contact-phone" type="tel" maxLength={60} value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+49 …" />
        </div>
        <div>
          <label htmlFor="cf-location" className={labelCls}>Ort</label>
          <input id="cf-location" data-testid="contact-location" maxLength={120} value={form.location} onChange={set("location")} className={inputCls} placeholder="Achern" />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Ich frage an als</legend>
        <div className="mt-4 flex gap-3">
          {[
            ["privat", "Privatkunde"],
            ["gewerbe", "Gewerbekunde"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-testid={`contact-type-${value}`}
              onClick={() => setForm((f) => ({ ...f, customer_type: value }))}
              className={`border px-5 py-2.5 text-sm transition-colors duration-300 ${
                form.customer_type === value
                  ? "border-precision bg-precision text-white"
                  : "border-precision/25 text-precision/70 hover:border-precision"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-service" className={labelCls}>Gewünschte Leistung</label>
          <select
            id="cf-service"
            data-testid="contact-service"
            value={form.service}
            onChange={set("service")}
            className={`${inputCls} cursor-pointer`}
          >
            <option value="">Bitte wählen …</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Sonstiges">Sonstiges / Beratung</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-object" className={labelCls}>Objekt / Objektart</label>
          <input id="cf-object" data-testid="contact-object" maxLength={120} value={form.object_type} onChange={set("object_type")} className={inputCls} placeholder="z. B. Bürofläche, Treppenhaus, Praxis" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Ihre Nachricht *</label>
        <textarea
          id="cf-message"
          data-testid="contact-message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          value={form.message}
          onChange={set("message")}
          className={`${inputCls} resize-none`}
          placeholder="Beschreiben Sie kurz Ihr Objekt und Ihren Reinigungswunsch …"
        />
      </div>

      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set("website")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <label className="flex cursor-pointer items-start gap-3 text-sm text-precision/70">
        <input
          type="checkbox"
          data-testid="contact-privacy"
          required
          checked={form.privacy}
          onChange={set("privacy")}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-precision/40 transition-colors duration-200 checked:bg-precision"
        />
        <span>
          Ich habe die <a href="/datenschutz" className="underline underline-offset-4 hover:text-aqua-deep">Datenschutzerklärung</a> gelesen
          und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anfrage einverstanden. *
        </span>
      </label>

      {status === "error" && (
        <p data-testid="contact-error" role="alert" className="border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <motion.button
        data-testid="contact-submit"
        type="submit"
        disabled={status === "sending"}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-3 border border-precision bg-precision px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-transparent hover:text-precision disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "sending" ? "Wird gesendet …" : "Unverbindliches Angebot anfordern"}
      </motion.button>
    </form>
  );
}
