"use client";

import { Camera, MessageSquareText, Trash2, UserRound } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { resumeContext } from "@/lib/ai/context";
import { fullName, initials } from "@/lib/resume/format";
import { useEditor } from "@/lib/store";
import { AiTextArea } from "./ai-assist";
import { TextField } from "./fields";
import { Panel } from "./panel";
import { PhotoDialog } from "./photo-dialog";

export function PersonalPanel() {
  const { t: { personal: t }, locale } = useI18n();
  const basics = useEditor((state) => state.resume.basics);
  const design = useEditor((state) => state.resume.design);
  const setBasics = useEditor((state) => state.setBasics);
  const [pending, setPending] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const bind = (key: Exclude<keyof typeof basics, "photo" | "summary">) => ({
    label: t.fields[key],
    placeholder: key === "birthDate" ? undefined : t.placeholders[key],
    value: basics[key],
    onChange: (event: { target: { value: string } }) => setBasics({ [key]: event.target.value }),
  });
  const name = fullName(basics, locale);
  // Hungarian forms ask for the family name first, the others for the given name.
  const nameFields = locale === "hu" ? (["lastName", "firstName"] as const) : (["firstName", "lastName"] as const);

  return (
    <Panel icon={<UserRound />} title={t.title} subtitle={name || t.subtitle} defaultOpen>
      <div className="flex items-center gap-4">
        <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 text-xl font-semibold text-fg-subtle ring-1 ring-border">
          {basics.photo ? (
            <Image src={basics.photo} alt={t.photoAlt} fill sizes="80px" className="object-cover" unoptimized />
          ) : (
            initials(basics, locale) || <Camera className="size-6" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="soft" onClick={() => fileInput.current?.click()}>
              <Camera />
              {basics.photo ? t.replacePhoto : t.uploadPhoto}
            </Button>
            {basics.photo && (
              <Button size="sm" variant="ghost" onClick={() => setBasics({ photo: null })}>
                <Trash2 />
                {t.removePhoto}
              </Button>
            )}
          </div>
          <p className="text-xs leading-relaxed text-fg-subtle">{t.photoHint}</p>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) setPending(file);
          }}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {nameFields.map((key) => (
          <TextField key={key} autoComplete={key === "lastName" ? "family-name" : "given-name"} {...bind(key)} />
        ))}
        <TextField className="sm:col-span-2" {...bind("headline")} />
        <TextField type="email" autoComplete="email" {...bind("email")} />
        <TextField type="tel" autoComplete="tel" {...bind("phone")} />
        <TextField autoComplete="address-level2" {...bind("location")} />
        <TextField {...bind("website")} />
        <TextField {...bind("linkedin")} />
        <TextField {...bind("github")} />
        <TextField type="date" hint={t.optional} {...bind("birthDate")} />
        <TextField hint={t.optional} {...bind("drivingLicense")} />
      </div>

      <PhotoDialog
        file={pending}
        shape={design.photoShape}
        onCancel={() => setPending(null)}
        onSave={(photo) => {
          setBasics({ photo });
          setPending(null);
        }}
      />
    </Panel>
  );
}

export function SummaryPanel() {
  const { t: { summary: t }, plural } = useI18n();
  const summary = useEditor((state) => state.resume.basics.summary);
  const setBasics = useEditor((state) => state.setBasics);
  const length = summary.trim().length;

  return (
    <Panel icon={<MessageSquareText />} title={t.title} subtitle={length ? plural(t.characters, length) : t.subtitle}>
      <AiTextArea
        field="summary"
        label={t.label}
        hint={fmt(t.hint, { count: length })}
        value={summary}
        minRows={5}
        placeholder={t.placeholder}
        onValueChange={(value) => setBasics({ summary: value })}
        context={() => resumeContext(useEditor.getState().resume)}
        writeHint={t.aiWriteHint}
      />
      <p className="text-xs leading-relaxed text-fg-subtle">{t.help}</p>
    </Panel>
  );
}
