import { Link, Text, View } from "@react-pdf/renderer";
import { Children, type ReactNode } from "react";
import { formatRange, linkHref, prettyUrl } from "@/lib/resume/format";
import type { Entry, EntrySection, Resume, Section, SectionType } from "@/lib/resume/types";
import { certificateDate, Description, hasContent } from "../blocks";
import type { Theme } from "../theme";

export interface TemplateProps {
  resume: Resume;
  theme: Theme;
}

/** Splits visible, non-empty sections between the main and the side column. */
export function splitSections(sections: Section[], side: SectionType[]) {
  const visible = sections.filter(hasContent);
  return { main: visible.filter((s) => !side.includes(s.type)), side: visible.filter((s) => side.includes(s.type)) };
}

export const isEntrySection = (section: Section): section is EntrySection => "entries" in section;

export const filledEntries = (section: EntrySection) =>
  section.entries.filter((entry) => entry.title.trim() || entry.subtitle.trim() || entry.description.trim());

export function EntryLink({ entry, theme }: { entry: Entry; theme: Theme }) {
  if (!entry.url.trim()) return null;
  return (
    <Link src={linkHref(entry.url, "url")} style={{ color: theme.accent, textDecoration: "none", fontSize: theme.size * 0.9 }}>
      {prettyUrl(entry.url)}
    </Link>
  );
}

/**
 * The default entry layout: title with the date on the right, subtitle and
 * location below, then the description.
 */
export function StandardEntry({ entry, section, theme, subtitleColor }: { entry: Entry; section: EntrySection; theme: Theme; subtitleColor?: string }) {
  const certificate = section.type === "certificates";
  const range = certificate ? certificateDate(entry.start, entry.end, theme) : formatRange(entry, theme.language);
  const meta = [entry.subtitle.trim(), entry.location.trim()].filter(Boolean);
  return (
    <View style={{ marginBottom: theme.entryGap }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }} minPresenceAhead={theme.size * 3}>
        <Text style={{ flex: 1, fontWeight: 700, fontSize: theme.size * 1.05 }}>{entry.title.trim() || entry.subtitle.trim()}</Text>
        {range ? <Text style={{ color: theme.muted, fontSize: theme.size * 0.9, marginTop: 1 }}>{range}</Text> : null}
      </View>
      {entry.title.trim() && meta.length > 0 && (
        <Text style={{ color: subtitleColor ?? theme.accent, fontWeight: 600 }}>
          {meta[0]}
          {meta[1] ? <Text style={{ color: theme.muted, fontWeight: 400 }}>{`  ·  ${meta[1]}`}</Text> : null}
        </Text>
      )}
      <EntryLink entry={entry} theme={theme} />
      <Description text={entry.description} theme={theme} />
    </View>
  );
}

export const NAME_PLACEHOLDER = { hu: "Neved", en: "Your name" };

/**
 * A section whose title always stays on the same page as its first item, so a
 * heading is never left orphaned at the bottom of a page.
 */
export function SectionBlock({ title, children, gap }: { title: ReactNode; children: ReactNode; gap?: number }) {
  const [first, ...rest] = Children.toArray(children);
  return (
    <View style={gap ? { gap } : undefined}>
      <View wrap={false}>
        {title}
        {first}
      </View>
      {rest}
    </View>
  );
}
