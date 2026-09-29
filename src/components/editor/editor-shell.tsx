"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/controls";
import { I18nProvider, type ClientMessages } from "@/i18n/client";
import type { Locale } from "@/i18n/config";

// The editor reads the saved CV from localStorage, so it only renders in the browser.
const EditorApp = dynamic(() => import("./editor-app").then((mod) => mod.EditorApp), {
  ssr: false,
  loading: () => (
    <div className="grid h-dvh place-items-center">
      <Spinner className="size-6 text-primary" />
    </div>
  ),
});

export function EditorShell({ locale, messages }: { locale: Locale; messages: ClientMessages }) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <EditorApp />
    </I18nProvider>
  );
}
