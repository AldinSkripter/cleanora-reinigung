import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import Logo from "@/components/Logo";
import Seo from "@/components/Seo";

const inputCls =
  "w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-white/50";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("cleanora_admin_token")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("cleanora_admin_token", data.token);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setStatus("error");
      setError(formatApiError(err));
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-precision px-6 grain relative">
      <Seo title="Admin-Login | Cleanora" description="Interner Bereich." path="/admin" />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm border border-white/10 bg-white/[0.03] p-10"
      >
        <div className="flex justify-center">
          <Logo dark />
        </div>
        <p className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-white/40">Interner Bereich</p>
        <form onSubmit={submit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="admin-email" className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">E-Mail</label>
            <input
              id="admin-email"
              data-testid="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputCls} mt-2`}
              placeholder="admin@cleanora-reinigung.de"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Passwort</label>
            <input
              id="admin-password"
              data-testid="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputCls} mt-2`}
              placeholder="••••••••"
            />
          </div>
          {status === "error" && (
            <p data-testid="admin-login-error" role="alert" className="border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            data-testid="admin-login-submit"
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 border border-white bg-white py-3.5 text-sm font-medium text-precision transition-colors duration-300 hover:bg-transparent hover:text-white disabled:opacity-60"
          >
            {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
            Anmelden
          </button>
        </form>
      </motion.div>
    </div>
  );
}
