"use client";

import {
  Award,
  BookOpen,
  Briefcase,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  FolderKanban,
  GraduationCap,
  HandHeart,
  Heart,
  Languages,
  ListPlus,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/client";
import type { Locale } from "@/i18n/config";
import { fmt } from "@/i18n/format";
import { entryContext } from "@/lib/ai/context";
import { CV_LABELS } from "@/lib/resume/i18n";
import { formatMonth, formatRange } from "@/lib/resume/format";
import type { Entry, EntrySectionType, LanguageLevel, Section, SectionType } from "@/lib/resume/types";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AiTextArea } from "./ai-assist";
import { Checkbox, MonthField, TextField } from "./fields";
import { Panel } from "./panel";
import { SortableList, SortableRow } from "./sortable";

export const SECTION_ICONS: Record<SectionType, ReactNode> = {
  experience: <Briefcase />,
  education: <GraduationCap />,
  projects: <FolderKanban />,
  certificates: <Award />,
  volunteering: <HandHeart />,
  custom: <BookOpen />,
  skills: <Sparkles />,
  languages: <Languages />,
  interests: <Heart />,
};

/** Which fields each kind of entry has; the texts come from the dictionary. */
const ENTRY_LAYOUT: Record<EntrySectionType, { location?: boolean; url?: boolean; dates: "range" | "single"; description: boolean }> = {
  experience: { location: true, dates: "range", description: true },
  education: { location: true, dates: "range", description: true },
  projects: { url: true, dates: "range", description: true },
  certificates: { url: true, dates: "single", description: false },
  volunteering: { location: true, dates: "range", description: true },
  custom: { location: true, url: true, dates: "range", description: true },
};

const sectionName = (section: Section, locale: Locale) => section.title.trim() || CV_LABELS[locale].sections[section.type];

/* -------------------------------------------------------------------------- */

function SectionActions({ section, removable }: { section: Section; removable: boolean }) {
  const { t, locale } = useI18n();
  const updateSection = useEditor((state) => state.updateSection);
  const removeSection = useEditor((state) => state.removeSection);
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => updateSection(section.id, { visible: !section.visible })}
        aria-label={section.visible ? t.section.hide : t.section.show}
        title={section.visible ? t.section.hide : t.section.show}
      >
        {section.visible ? <Eye /> : <EyeOff />}
      </Button>
      {removable && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => window.confirm(fmt(t.section.confirmRemove, { name: sectionName(section, locale) })) && removeSection(section.id)}
          aria-label={t.section.remove}
          title={t.section.remove}
        >
          <Trash2 />
        </Button>
      )}
    </>
  );
}

function SectionTitleField({ section }: { section: Section }) {
  const { t, locale } = useI18n();
  const updateSection = useEditor((state) => state.updateSection);
  return (
    <TextField
      label={t.section.titleLabel}
      hint={t.section.titleHint}
      placeholder={CV_LABELS[locale].sections[section.type]}
      value={section.title}
      onChange={(event) => updateSection(section.id, { title: event.target.value })}
    />
  );
}

/* --------------------------------- entries -------------------------------- */

function EntryCard({ sectionId, type, entry, handle }: { sectionId: string; type: EntrySectionType; entry: Entry; handle: ReactNode }) {
  const { t, locale } = useI18n();
  const layout = ENTRY_LAYOUT[type];
  const fields = t.entries[type];
  const focusId = useEditor((state) => state.focusId);
  const clearFocus = useEditor((state) => state.clearFocus);
  const updateEntry = useEditor((state) => state.updateEntry);
  const removeEntry = useEditor((state) => state.removeEntry);
  const duplicateEntry = useEditor((state) => state.duplicateEntry);
  const [open, setOpen] = useState(focusId === entry.id || (!entry.title && !entry.subtitle));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusId !== entry.id) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    ref.current?.querySelector<HTMLInputElement>("input")?.focus();
    clearFocus();
  }, [focusId, entry.id, clearFocus]);

  const set = (patch: Partial<Entry>) => updateEntry(sectionId, entry.id, patch);
  const summary = [entry.title.trim(), entry.subtitle.trim()].filter(Boolean).join(" – ") || t.entry.untitled;
  const dates = layout.dates === "single" ? formatMonth(entry.end || entry.start, locale) : formatRange(entry, locale);

  return (
    <div ref={ref} className="rounded-xl bg-surface-2/60 ring-1 ring-border ring-inset">
      <div className="flex items-center gap-1 py-1.5 pr-1.5 pl-1">
        {handle}
        <button type="button" onClick={() => setOpen(!open)} className="min-w-0 flex-1 py-1 text-left" aria-expanded={open}>
          <span className="block truncate text-[13px] font-medium">{summary}</span>
          {dates && <span className="block truncate text-[11px] text-fg-subtle">{dates}</span>}
        </button>
        <Button variant="ghost" size="icon-sm" onClick={() => duplicateEntry(sectionId, entry.id)} aria-label={t.entry.duplicate} title={t.entry.duplicate}>
          <Copy />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={() => removeEntry(sectionId, entry.id)} aria-label={t.entry.remove} title={t.entry.remove}>
          <Trash2 />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={() => setOpen(!open)} aria-label={open ? t.entry.collapse : t.entry.expand}>
          <ChevronDown className={cn("transition-transform", open && "rotate-180")} />
        </Button>
      </div>
      {open && (
        <div className="grid gap-3 border-t border-border px-3 pt-3 pb-4 sm:grid-cols-2">
          <TextField label={fields.title} placeholder={fields.titlePlaceholder} value={entry.title} onChange={(e) => set({ title: e.target.value })} />
          <TextField label={fields.subtitle} placeholder={fields.subtitlePlaceholder} value={entry.subtitle} onChange={(e) => set({ subtitle: e.target.value })} />
          {layout.location && <TextField label={t.entry.location} placeholder={t.entry.locationPlaceholder} value={entry.location} onChange={(e) => set({ location: e.target.value })} />}
          {layout.url && <TextField label={t.entry.link} placeholder={t.entry.linkPlaceholder} value={entry.url} onChange={(e) => set({ url: e.target.value })} />}
          {layout.dates === "single" ? (
            <MonthField label={t.entry.date} value={entry.end || entry.start} onChange={(value) => set({ end: value, start: "" })} />
          ) : (
            <>
              <MonthField label={t.entry.start} value={entry.start} onChange={(value) => set({ start: value })} />
              <div className="space-y-2">
                <MonthField label={t.entry.end} value={entry.end} onChange={(value) => set({ end: value })} disabled={entry.current} />
                <Checkbox label={type === "education" ? t.entry.currentStudy : t.entry.current} checked={entry.current} onChange={(current) => set({ current })} />
              </div>
            </>
          )}
          {layout.description && (
            <AiTextArea
              field="description"
              className="sm:col-span-2"
              label={fields.description}
              hint={t.entry.descriptionHint}
              placeholder={fields.descriptionPlaceholder || undefined}
              value={entry.description}
              minRows={4}
              onValueChange={(description) => set({ description })}
              context={() => entryContext(useEditor.getState().resume, type, entry)}
              writeHint={fmt(t.entry.writeHint, { title: fields.title, subtitle: fields.subtitle })}
            />
          )}
        </div>
      )}
    </div>
  );
}

function EntriesEditor({ section }: { section: Extract<Section, { entries: Entry[] }> }) {
  const addEntry = useEditor((state) => state.addEntry);
  const moveItem = useEditor((state) => state.moveItem);
  const { t } = useI18n();
  const fields = t.entries[section.type];
  return (
    <div className="space-y-2">
      <SortableList items={section.entries} onMove={(a, b) => moveItem(section.id, a, b)}>
        {(entry) => (
          <SortableRow key={entry.id} id={entry.id}>
            {(handle) => <EntryCard sectionId={section.id} type={section.type} entry={entry} handle={handle} />}
          </SortableRow>
        )}
      </SortableList>
      <Button variant="soft" size="sm" className="w-full" onClick={() => addEntry(section.id)}>
        <Plus />
        {fields.add}
      </Button>
    </div>
  );
}

/* ---------------------------------- skills -------------------------------- */

function LevelPicker({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label={t.skills.levels}>
      {[1, 2, 3, 4, 5].map((level) => (
        <button
          key={level}
          type="button"
          role="radio"
          aria-checked={value === level}
          aria-label={fmt(t.skills.level, { level })}
          onClick={() => onChange(value === level ? 0 : level)}
          className={cn("size-3.5 rounded-full ring-1 transition-colors ring-inset", level <= value ? "bg-primary ring-primary" : "bg-surface ring-border-strong hover:bg-primary-soft")}
        />
      ))}
    </div>
  );
}

function SkillsEditor({ section }: { section: Extract<Section, { type: "skills" }> }) {
  const { addSkill, updateSkill, removeSkill, moveItem } = useEditor.getState();
  const { t } = useI18n();
  const focusId = useEditor((state) => state.focusId);
  const clearFocus = useEditor((state) => state.clearFocus);
  const [bulk, setBulk] = useState("");
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!focusId || !section.skills.some((skill) => skill.id === focusId)) return;
    list.current?.querySelector<HTMLInputElement>(`[data-id="${focusId}"]`)?.focus();
    clearFocus();
  }, [focusId, section.skills, clearFocus]);

  const addMany = () => {
    for (const name of bulk.split(/[,;\n]/).map((part) => part.trim()).filter(Boolean)) addSkill(section.id, name);
    setBulk("");
  };

  return (
    <div className="space-y-3" ref={list}>
      <div className="space-y-1.5">
        <SortableList items={section.skills} onMove={(a, b) => moveItem(section.id, a, b)}>
          {(skill) => (
            <SortableRow key={skill.id} id={skill.id}>
              {(handle) => (
                <div className="flex items-center gap-2 rounded-lg bg-surface-2/60 py-1 pr-1 pl-0.5 ring-1 ring-border ring-inset">
                  {handle}
                  <input
                    data-id={skill.id}
                    value={skill.name}
                    placeholder={t.skills.placeholder}
                    onChange={(e) => updateSkill(section.id, skill.id, { name: e.target.value })}
                    className="h-8 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-fg-subtle"
                  />
                  <LevelPicker value={skill.level} onChange={(level) => updateSkill(section.id, skill.id, { level })} />
                  <Button variant="ghost" size="icon-sm" onClick={() => removeSkill(section.id, skill.id)} aria-label={t.skills.remove}>
                    <X />
                  </Button>
                </div>
              )}
            </SortableRow>
          )}
        </SortableList>
      </div>
      <div className="flex gap-2">
        <input
          value={bulk}
          onChange={(e) => setBulk(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (bulk.trim()) addMany();
              else addSkill(section.id);
            }
          }}
          placeholder={t.skills.bulkPlaceholder}
          aria-label={t.skills.bulkLabel}
          className="h-9 min-w-0 flex-1 rounded-lg bg-surface px-3 text-sm ring-1 ring-border-strong/70 outline-none ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary"
        />
        <Button variant="soft" size="md" onClick={() => (bulk.trim() ? addMany() : addSkill(section.id))}>
          <Plus />
          {t.skills.add}
        </Button>
      </div>
      <p className="text-xs text-fg-subtle">{t.skills.help}</p>
    </div>
  );
}

/* --------------------------------- languages ------------------------------ */

function LanguagesEditor({ section }: { section: Extract<Section, { type: "languages" }> }) {
  const { addLanguage, updateLanguage, removeLanguage, moveItem } = useEditor.getState();
  const { t, locale } = useI18n();
  const levels = Object.entries(CV_LABELS[locale].levels) as [LanguageLevel, string][];
  return (
    <div className="space-y-2">
      <SortableList items={section.languages} onMove={(a, b) => moveItem(section.id, a, b)}>
        {(language) => (
          <SortableRow key={language.id} id={language.id}>
            {(handle) => (
              <div className="flex items-center gap-2 rounded-lg bg-surface-2/60 py-1 pr-1 pl-0.5 ring-1 ring-border ring-inset">
                {handle}
                <input
                  value={language.name}
                  placeholder={t.languages.placeholder}
                  onChange={(e) => updateLanguage(section.id, language.id, { name: e.target.value })}
                  className="h-8 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-fg-subtle"
                />
                <select
                  value={language.level}
                  onChange={(e) => updateLanguage(section.id, language.id, { level: e.target.value as LanguageLevel })}
                  aria-label={t.languages.level}
                  className="h-8 rounded-md bg-surface px-2 text-[13px] ring-1 ring-border outline-none ring-inset focus:ring-2 focus:ring-primary"
                >
                  {levels.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <Button variant="ghost" size="icon-sm" onClick={() => removeLanguage(section.id, language.id)} aria-label={t.languages.remove}>
                  <X />
                </Button>
              </div>
            )}
          </SortableRow>
        )}
      </SortableList>
      <Button variant="soft" size="sm" className="w-full" onClick={() => addLanguage(section.id)}>
        <Plus />
        {t.languages.add}
      </Button>
    </div>
  );
}

/* ---------------------------------- tags ---------------------------------- */

function TagsEditor({ section }: { section: Extract<Section, { type: "interests" }> }) {
  const setTags = useEditor((state) => state.setTags);
  const { t } = useI18n();
  const [draft, setDraft] = useState("");
  const add = () => {
    const tags = draft.split(/[,;\n]/).map((tag) => tag.trim()).filter(Boolean);
    if (tags.length) setTags(section.id, [...section.tags, ...tags]);
    setDraft("");
  };
  return (
    <div className="space-y-3">
      {section.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {section.tags.map((tag, index) => (
            <span key={`${tag}-${index}`} className="inline-flex items-center gap-1 rounded-full bg-primary-soft py-1 pr-1 pl-3 text-[13px] text-primary-soft-fg">
              {tag}
              <button
                type="button"
                onClick={() => setTags(section.id, section.tags.filter((_, i) => i !== index))}
                aria-label={fmt(t.interests.remove, { tag })}
                className="grid size-5 place-items-center rounded-full hover:bg-primary/15"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={t.interests.placeholder}
          aria-label={t.interests.label}
          className="h-9 min-w-0 flex-1 rounded-lg bg-surface px-3 text-sm ring-1 ring-border-strong/70 outline-none ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary"
        />
        <Button variant="soft" onClick={add} disabled={!draft.trim()}>
          <Plus />
          {t.interests.add}
        </Button>
      </div>
    </div>
  );
}

/* --------------------------------- sections ------------------------------- */

const CORE: SectionType[] = ["experience", "education", "skills", "languages"];

function countOf(section: Section) {
  switch (section.type) {
    case "skills":
      return section.skills.length;
    case "languages":
      return section.languages.length;
    case "interests":
      return section.tags.length;
    default:
      return section.entries.length;
  }
}

export function SectionPanel({ section }: { section: Section }) {
  const { t, locale, plural } = useI18n();
  const focusId = useEditor((state) => state.focusId);
  const [open, setOpen] = useState(focusId === section.id);
  const count = countOf(section);
  const removable = !CORE.includes(section.type);

  return (
    <Panel
      id={`section-${section.id}`}
      icon={SECTION_ICONS[section.type]}
      title={sectionName(section, locale)}
      subtitle={section.visible ? (count ? plural(t.section.items, count) : t.section.empty) : t.section.hidden}
      muted={!section.visible}
      open={open}
      onOpenChange={setOpen}
      actions={<SectionActions section={section} removable={removable} />}
    >
      {section.type === "skills" ? (
        <SkillsEditor section={section} />
      ) : section.type === "languages" ? (
        <LanguagesEditor section={section} />
      ) : section.type === "interests" ? (
        <TagsEditor section={section} />
      ) : (
        <EntriesEditor section={section} />
      )}
      <SectionTitleField section={section} />
    </Panel>
  );
}

const ADDABLE: SectionType[] = ["projects", "certificates", "volunteering", "interests", "custom"];

export function AddSectionMenu() {
  const sections = useEditor((state) => state.resume.sections);
  const addSection = useEditor((state) => state.addSection);
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const available = ADDABLE.filter((type) => type === "custom" || !sections.some((section) => section.type === type));

  return (
    <div className="rounded-2xl border border-dashed border-border-strong p-3">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-center gap-2 py-1.5 text-sm font-medium text-fg-muted hover:text-fg">
        <ListPlus className="size-4" />
        {t.section.add}
      </button>
      {open && (
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {available.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                addSection(type);
                setOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-lg bg-surface px-3 py-2.5 text-left text-[13px] font-medium ring-1 ring-border ring-inset hover:bg-surface-2 [&_svg]:size-4 [&_svg]:text-primary"
            >
              {SECTION_ICONS[type]}
              {type === "custom" ? t.section.custom : CV_LABELS[locale].sections[type]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
