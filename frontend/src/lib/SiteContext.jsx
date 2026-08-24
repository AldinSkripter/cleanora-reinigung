import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { SITE } from "@/data/site";

const DEFAULTS = {
  legal_name: SITE.legalName,
  public_email: SITE.email,
  phone: SITE.phone,
  phone_href: SITE.phoneHref,
  street: SITE.street,
  city: SITE.city,
  owner_name: "",
  ust_id: "",
  hours: "Mo–Fr 8:00–17:00 Uhr · Termine nach Vereinbarung",
  legal: { impressum: "", datenschutz: "" },
};

const SiteContext = createContext(DEFAULTS);

export function SiteProvider({ children }) {
  const [site, setSite] = useState(DEFAULTS);
  useEffect(() => {
    api
      .get("/site-settings")
      .then(({ data }) => setSite((s) => ({ ...s, ...data })))
      .catch(() => {});
    api
      .get("/legal-texts")
      .then(({ data }) => setSite((s) => ({ ...s, legal: data })))
      .catch(() => {});
  }, []);
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
