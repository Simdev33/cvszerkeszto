"use client";

import { Camera, MessageSquareText, Trash2, UserRound } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { resumeContext } from "@/lib/ai/context";
import { fullName, initials } from "@/lib/resume/format";
import { useEditor } from "@/lib/store";
import { AiTextArea } from "./ai-assist";
import { TextField } from "./fields";
import { Panel } from "./panel";
import { PhotoDialog } from "./photo-dialog";

export function PersonalPanel() {
  const basics = useEditor((state) => state.resume.basics);
  const design = useEditor((state) => state.resume.design);
  const setBasics = useEditor((state) => state.setBasics);
  const [pending, setPending] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const bind = (key: Exclude<keyof typeof basics, "photo">) => ({
    value: basics[key],
    onChange: (event: { target: { value: string } }) => setBasics({ [key]: event.target.value }),
  });
  const name = fullName(basics, "hu");

  return (
    <Panel icon={<UserRound />} title="Személyes adatok" subtitle={name || "Név, elérhetőségek, fotó"} defaultOpen>
      <div className="flex items-center gap-4">
        <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 text-xl font-semibold text-fg-subtle ring-1 ring-border">
          {basics.photo ? (
            <Image src={basics.photo} alt="Profilfotó" fill sizes="80px" className="object-cover" unoptimized />
          ) : (
            initials(basics, "hu") || <Camera className="size-6" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="soft" onClick={() => fileInput.current?.click()}>
              <Camera />
              {basics.photo ? "Fotó cseréje" : "Fotó feltöltése"}
            </Button>
            {basics.photo && (
              <Button size="sm" variant="ghost" onClick={() => setBasics({ photo: null })}>
                <Trash2 />
                Eltávolítás
              </Button>
            )}
          </div>
          <p className="text-xs leading-relaxed text-fg-subtle">Nem kötelező. Világos hátterű, igényes portré a legjobb; a fotó csak a böngésződben tárolódik.</p>
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
        <TextField label="Vezetéknév" placeholder="Kovács" autoComplete="family-name" {...bind("lastName")} />
        <TextField label="Keresztnév" placeholder="Anna" autoComplete="given-name" {...bind("firstName")} />
        <TextField label="Pozíció / szakmai cím" placeholder="pl. Pénzügyi elemző" className="sm:col-span-2" {...bind("headline")} />
        <TextField label="E-mail-cím" type="email" placeholder="nev@example.com" autoComplete="email" {...bind("email")} />
        <TextField label="Telefonszám" type="tel" placeholder="+36 30 123 4567" autoComplete="tel" {...bind("phone")} />
        <TextField label="Lakhely" placeholder="Budapest" autoComplete="address-level2" {...bind("location")} />
        <TextField label="Weboldal" placeholder="portfolio.hu" {...bind("website")} />
        <TextField label="LinkedIn" placeholder="linkedin.com/in/…" {...bind("linkedin")} />
        <TextField label="GitHub" placeholder="github.com/…" {...bind("github")} />
        <TextField label="Születési dátum" type="date" hint="nem kötelező" {...bind("birthDate")} />
        <TextField label="Jogosítvány" placeholder="pl. B kategória" hint="nem kötelező" {...bind("drivingLicense")} />
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
  const summary = useEditor((state) => state.resume.basics.summary);
  const setBasics = useEditor((state) => state.setBasics);
  const length = summary.trim().length;

  return (
    <Panel icon={<MessageSquareText />} title="Bemutatkozás" subtitle={length ? `${length} karakter` : "Rövid szakmai összefoglaló"}>
      <AiTextArea
        field="summary"
        label="Szakmai összefoglaló"
        hint={`${length} / ideálisan 300–600`}
        value={summary}
        minRows={5}
        placeholder="Pl.: 5 év tapasztalattal rendelkező könyvelő vagyok, aki… Erősségeim… Olyan pozíciót keresek, ahol…"
        onValueChange={(value) => setBasics({ summary: value })}
        context={() => resumeContext(useEditor.getState().resume)}
        writeHint="Előbb töltsd ki a szakmai címet vagy egy munkahelyet"
      />
      <p className="text-xs leading-relaxed text-fg-subtle">
        3–4 mondat elég: ki vagy szakmailag, mik a legfontosabb eredményeid, és milyen munkát keresel. Igazítsd a megpályázott állashoz.
      </p>
    </Panel>
  );
}
