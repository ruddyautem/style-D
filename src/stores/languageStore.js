import { create } from "zustand";
import fr from "../locales/fr";
import en from "../locales/en";
import { getLocalizedProductName } from "../locales/products";

const translations = { fr, en };

const getInitialLanguage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const saved = window.localStorage.getItem("style_d_language");
    if (saved === "fr" || saved === "en") return saved;

    const browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (browserLang.startsWith("fr")) return "fr";
    return "en"; // Default all other locales (e.g. Germany, UK, USA, etc.) to English
  }
  return "fr";
};

// Helper to resolve nested keys like "checkout.subtotal" with params replacement
const resolveTranslation = (lang, path, params = {}) => {
  const dict = translations[lang] || translations.fr;
  const keys = path.split(".");

  let result = dict;
  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      // Fallback to French if key missing in target language
      let fallback = translations.fr;
      for (const fbKey of keys) {
        if (fallback && typeof fallback === "object" && fbKey in fallback) {
          fallback = fallback[fbKey];
        } else {
          return path; // Fallback to raw key if not found at all
        }
      }
      result = fallback;
      break;
    }
  }

  if (typeof result !== "string") {
    return path;
  }

  // Parameter replacement: {count}, {amount}, etc.
  return Object.keys(params).reduce((acc, paramKey) => {
    const regex = new RegExp(`\\{${paramKey}\\}`, "g");
    return acc.replace(regex, params[paramKey]);
  }, result);
};

export { getLocalizedProductName };

export const useLanguageStore = create((set, get) => ({
  currentLanguage: getInitialLanguage(),

  setLanguage: (lang) => {
    const validLang = lang === "en" ? "en" : "fr";
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("style_d_language", validLang);
    }
    set({ currentLanguage: validLang });
  },

  toggleLanguage: () => {
    const nextLang = get().currentLanguage === "fr" ? "en" : "fr";
    get().setLanguage(nextLang);
  },

  // Direct translator helper
  t: (path, params) => resolveTranslation(get().currentLanguage, path, params),

  // Direct product name localizer helper
  getProductName: (product) => getLocalizedProductName(product, get().currentLanguage),
}));

// Convenient hook for components
export const useTranslation = () => {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const t = (path, params) => resolveTranslation(currentLanguage, path, params);
  const getProductName = (product) => getLocalizedProductName(product, currentLanguage);

  return { t, currentLanguage, setLanguage, toggleLanguage, getProductName };
};

export default useLanguageStore;
