import { COOKIES } from "@/config/cookies";
import { SITE } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { priceVars } from "@/lib/plan";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import hu from "./hu";
import type { LegalContent, LegalDocs } from "./types";

const CONTENT: Record<Locale, LegalContent> = { en, hu, fr, de, es };

export function getLegal(locale: Locale): LegalDocs {
  const email = SITE.operator.email || `[${getDictionary(locale).legal.toBeCompleted}]`;
  return CONTENT[locale]({ site: SITE, email, price: priceVars(locale), cookies: COOKIES });
}
