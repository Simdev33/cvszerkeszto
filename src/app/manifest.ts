import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Name and icons for "Add to Home screen" (icons: npm run icons). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: getDictionary(DEFAULT_LOCALE).meta.title,
    short_name: SITE.name,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
