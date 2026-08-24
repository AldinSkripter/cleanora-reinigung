import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.REACT_APP_BACKEND_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cleanora_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function formatApiError(error) {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const first = detail[0];
    if (first?.loc?.includes("email")) return "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (first?.loc?.includes("message")) return "Die Nachricht muss mindestens 10 Zeichen enthalten.";
    if (first?.loc?.includes("name")) return "Bitte geben Sie Ihren Namen an.";
    if (first?.loc?.includes("privacy")) return "Bitte stimmen Sie der Datenschutzerklärung zu.";
    return "Bitte überprüfen Sie Ihre Eingaben.";
  }
  return "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
}

export default api;
