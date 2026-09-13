import { en, TranslationKey } from "./en";
import { ha } from "./ha";
import { yo } from "./yo";
import { ig } from "./ig";
import { pcm } from "./pcm";
import { Language } from "../types";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  ha,
  yo,
  ig,
  pcm,
};

export const languageMeta: Record<
  Language,
  { name: string; nativeName: string; flag: string }
> = {
  en: { name: "English", nativeName: "English", flag: "🇬🇧" },
  ha: { name: "Hausa", nativeName: "Harshen Hausa", flag: "🇳🇬" },
  yo: { name: "Yoruba", nativeName: "Èdè Yorùbá", flag: "🇳🇬" },
  ig: { name: "Igbo", nativeName: "Asụsụ Igbo", flag: "🇳🇬" },
  pcm: { name: "Pidgin", nativeName: "Naija Pidgin", flag: "🇳🇬" },
};

export { type TranslationKey };
