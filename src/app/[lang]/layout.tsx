import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { SITE } from "@/config/site";
import { isLocale, LOCALES, OG_LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates, siteUrl } from "@/i18n/metadata";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

// Every locale is prerendered. dynamicParams stays on: the proxy already sends addresses without a
// supported locale elsewhere, and unknown sub-pages must reach [page] to show the localized 404.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: meta.title, template: `%s · ${SITE.name}` },
    description: meta.description,
    applicationName: SITE.name,
    keywords: meta.keywords,
    alternates: alternates(lang),
    openGraph: { type: "website", locale: OG_LOCALES[lang], siteName: SITE.name, title: meta.title, description: meta.description },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
  colorScheme: "light dark",
};

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
