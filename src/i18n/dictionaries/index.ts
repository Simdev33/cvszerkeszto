import type { Locale } from "../config";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import hu, { type Dictionary } from "./hu";

export type { Dictionary };

export const DICTIONARIES: Record<Locale, Dictionary> = { hu, en, fr, de, es };

export const getDictionary = (locale: Locale) => DICTIONARIES[locale];
