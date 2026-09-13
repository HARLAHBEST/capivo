"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "../types";
import { translations, TranslationKey, languageMeta } from "../locales";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  languages: typeof languageMeta;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handle = window.requestAnimationFrame(() => {
      const saved = localStorage.getItem("capivo_preferred_lang") as Language;
      if (saved && translations[saved]) {
        setLanguageState(saved);
      }
    });

    return () => window.cancelAnimationFrame(handle);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("capivo_preferred_lang", lang);
  };

  const t = (key: TranslationKey): string => {
    const currentDict = translations[language];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback to English
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: languageMeta,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
