import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const title = "CV Stúdió – Profi önéletrajz-készítő, ingyen";
const description =
  "Készíts profi önéletrajzot percek alatt: 4 modern sablon, élő előnézet, AI-szövegsegéd, magyar és angol nyelv, fotó, és nyomtatásra kész, kijelölhető szövegű PDF. Ingyenes, regisztráció nélkül.";

/**
 * The public origin for canonical and Open Graph links: NEXT_PUBLIC_SITE_URL if
 * set, otherwise the deployment's own domain on Vercel (its system variables are
 * available at build time), so shared links never point at localhost.
 */
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercel =
    process.env.VERCEL_ENV === "preview"
      ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: title, template: "%s · CV Stúdió" },
  description,
  applicationName: "CV Stúdió",
  keywords: ["önéletrajz", "önéletrajz készítő", "önéletrajz minta", "CV készítő", "CV sablon", "önéletrajz PDF", "angol önéletrajz", "Europass alternatíva"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "hu_HU", siteName: "CV Stúdió", title, description },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
  colorScheme: "light dark",
};

// Applies the saved (or system) theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="hu" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
