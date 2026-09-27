import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSection, emptyEntry, emptyResume } from "@/lib/resume/defaults";
import { normalizeResume } from "@/lib/resume/normalize";
import type { Basics, Design, Entry, LanguageSkill, Resume, Section, SectionType, Skill } from "@/lib/resume/types";
import { uid } from "@/lib/utils";

type WithEntries = Extract<Section, { entries: Entry[] }>;

export interface EditorState {
  resume: Resume;
  /** Item that should open (and scroll into view) after it was added. */
  focusId: string | null;
  setDesign: (patch: Partial<Design>) => void;
  setBasics: (patch: Partial<Basics>) => void;
  replaceResume: (resume: Resume) => void;

  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, patch: Partial<Pick<Section, "title" | "visible">>) => void;
  moveSection: (activeId: string, overId: string) => void;

  addEntry: (sectionId: string) => void;
  updateEntry: (sectionId: string, entryId: string, patch: Partial<Entry>) => void;
  removeEntry: (sectionId: string, entryId: string) => void;
  duplicateEntry: (sectionId: string, entryId: string) => void;

  addSkill: (sectionId: string, name?: string) => void;
  updateSkill: (sectionId: string, skillId: string, patch: Partial<Skill>) => void;
  removeSkill: (sectionId: string, skillId: string) => void;

  addLanguage: (sectionId: string) => void;
  updateLanguage: (sectionId: string, languageId: string, patch: Partial<LanguageSkill>) => void;
  removeLanguage: (sectionId: string, languageId: string) => void;

  setTags: (sectionId: string, tags: string[]) => void;
  moveItem: (sectionId: string, activeId: string, overId: string) => void;
  clearFocus: () => void;
}

function move<T extends { id: string }>(list: T[], activeId: string, overId: string) {
  const from = list.findIndex((item) => item.id === activeId);
  const to = list.findIndex((item) => item.id === overId);
  if (from < 0 || to < 0 || from === to) return;
  const [item] = list.splice(from, 1);
  list.splice(to, 0, item);
}

export const useEditor = create<EditorState>()(
  persist(
    immer((set) => {
      const section = (state: EditorState, id: string) => state.resume.sections.find((candidate) => candidate.id === id);
      const entries = (state: EditorState, id: string) => {
        const found = section(state, id);
        return found && "entries" in found ? (found as WithEntries) : undefined;
      };

      return {
        resume: emptyResume(),
        focusId: null,

        setDesign: (patch) => set((state) => void Object.assign(state.resume.design, patch)),
        setBasics: (patch) => set((state) => void Object.assign(state.resume.basics, patch)),
        replaceResume: (resume) =>
          set((state) => {
            state.resume = resume;
            state.focusId = null;
          }),

        addSection: (type) =>
          set((state) => {
            const created = createSection(type);
            state.resume.sections.push(created);
            state.focusId = created.id;
          }),
        removeSection: (id) => set((state) => void (state.resume.sections = state.resume.sections.filter((s) => s.id !== id))),
        updateSection: (id, patch) =>
          set((state) => {
            const found = section(state, id);
            if (found) Object.assign(found, patch);
          }),
        moveSection: (activeId, overId) => set((state) => move(state.resume.sections, activeId, overId)),

        addEntry: (sectionId) =>
          set((state) => {
            const target = entries(state, sectionId);
            if (!target) return;
            const entry = emptyEntry();
            target.entries.push(entry);
            state.focusId = entry.id;
          }),
        updateEntry: (sectionId, entryId, patch) =>
          set((state) => {
            const entry = entries(state, sectionId)?.entries.find((candidate) => candidate.id === entryId);
            if (entry) Object.assign(entry, patch);
          }),
        removeEntry: (sectionId, entryId) =>
          set((state) => {
            const target = entries(state, sectionId);
            if (target) target.entries = target.entries.filter((entry) => entry.id !== entryId);
          }),
        duplicateEntry: (sectionId, entryId) =>
          set((state) => {
            const target = entries(state, sectionId);
            const index = target?.entries.findIndex((entry) => entry.id === entryId) ?? -1;
            if (!target || index < 0) return;
            const copy = { ...target.entries[index], id: uid() };
            target.entries.splice(index + 1, 0, copy);
            state.focusId = copy.id;
          }),

        addSkill: (sectionId, name = "") =>
          set((state) => {
            const target = section(state, sectionId);
            if (target?.type !== "skills") return;
            const skill = { id: uid(), name, level: 0 };
            target.skills.push(skill);
            if (!name) state.focusId = skill.id;
          }),
        updateSkill: (sectionId, skillId, patch) =>
          set((state) => {
            const target = section(state, sectionId);
            const skill = target?.type === "skills" ? target.skills.find((candidate) => candidate.id === skillId) : undefined;
            if (skill) Object.assign(skill, patch);
          }),
        removeSkill: (sectionId, skillId) =>
          set((state) => {
            const target = section(state, sectionId);
            if (target?.type === "skills") target.skills = target.skills.filter((skill) => skill.id !== skillId);
          }),

        addLanguage: (sectionId) =>
          set((state) => {
            const target = section(state, sectionId);
            if (target?.type !== "languages") return;
            const language: LanguageSkill = { id: uid(), name: "", level: target.languages.length === 0 ? "native" : "b2" };
            target.languages.push(language);
            state.focusId = language.id;
          }),
        updateLanguage: (sectionId, languageId, patch) =>
          set((state) => {
            const target = section(state, sectionId);
            const language = target?.type === "languages" ? target.languages.find((candidate) => candidate.id === languageId) : undefined;
            if (language) Object.assign(language, patch);
          }),
        removeLanguage: (sectionId, languageId) =>
          set((state) => {
            const target = section(state, sectionId);
            if (target?.type === "languages") target.languages = target.languages.filter((language) => language.id !== languageId);
          }),

        setTags: (sectionId, tags) =>
          set((state) => {
            const target = section(state, sectionId);
            if (target?.type === "interests") target.tags = tags;
          }),

        moveItem: (sectionId, activeId, overId) =>
          set((state) => {
            const target = section(state, sectionId);
            if (!target) return;
            if ("entries" in target) move(target.entries, activeId, overId);
            else if (target.type === "skills") move(target.skills, activeId, overId);
            else if (target.type === "languages") move(target.languages, activeId, overId);
          }),
        clearFocus: () => set((state) => void (state.focusId = null)),
      };
    }),
    {
      name: "cv-studio:resume",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ resume: state.resume }),
      // Never trust what is in storage – it may come from an older version.
      merge: (persisted, current) => {
        try {
          const resume = normalizeResume((persisted as { resume?: unknown } | undefined)?.resume);
          return { ...current, resume };
        } catch {
          return current;
        }
      },
    },
  ),
);
