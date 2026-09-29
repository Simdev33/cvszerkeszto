import { SITE } from "@/config/site";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import hu from "./hu";
import type { LegalContent, LegalDocs } from "./types";

const CONTENT: Record<Locale, LegalContent> = { hu, en, fr, de, es };

export const getLegal = (locale: Locale): LegalDocs => CONTENT[locale](SITE, LOCALE_COOKIE);
