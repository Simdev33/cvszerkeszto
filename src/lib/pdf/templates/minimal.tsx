import { Page, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { formatRange, fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { certificateDate, contactItems, ContactRow, Description, namedLanguages, namedSkills, Photo, sectionTitle, Tags } from "../blocks";
import type { Theme } from "../theme";
import { EntryLink, filledEntries, isEntrySection, SectionBlock, splitSections, type TemplateProps } from "./shared";

const DATE_COLUMN = 118;

function Row({ left, children, keepTogether, theme }: { left?: ReactNode; children: ReactNode; keepTogether?: boolean; theme: Theme }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: theme.entryGap }} wrap={!keepTogether}>
      <View style={{ width: DATE_COLUMN, paddingRight: 10 }}>{left}</View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

function Title({ children, theme }: { children: string; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ flexDirection: "row", marginBottom: 8 }}>
      <View style={{ width: DATE_COLUMN }}>
        <View style={{ width: 18, height: 2, backgroundColor: theme.accent, marginTop: theme.size * 0.6 }} />
      </View>
      <Text style={{ flex: 1, fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 0.95, letterSpacing: 1.8, textTransform: "uppercase", color: theme.accent }}>
        {children}
      </Text>
    </View>
  );
}

/** Airy single column with a date rail on the left – calm and very readable. */
export function MinimalTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const contacts = contactItems(basics, theme);
  const { main } = splitSections(resume.sections, []);
  const name = fullName(basics, theme.language);

  const muted = (text: string) => (text ? <Text style={{ color: theme.muted, fontSize: theme.size * 0.86 }}>{text}</Text> : null);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "skills":
        return (
          <Row theme={theme}>
            <Tags tags={namedSkills(section.skills).map((skill) => skill.name)} theme={theme} color={theme.ink} border={theme.accentMuted} />
          </Row>
        );
      case "languages":
        return namedLanguages(section.languages).map((language) => (
          <Row theme={theme} key={language.id} left={muted(theme.labels.levels[language.level])} keepTogether>
            <Text style={{ fontWeight: 600 }}>{language.name}</Text>
          </Row>
        ));
      case "interests":
        return (
          <Row theme={theme}>
            <Text>{section.tags.filter((tag) => tag.trim()).join("  ·  ")}</Text>
          </Row>
        );
      default:
        if (!isEntrySection(section)) return null;
        return filledEntries(section).map((entry) => {
          const date = section.type === "certificates" ? certificateDate(entry.start, entry.end, theme) : formatRange(entry, theme.language);
          return (
            <Row theme={theme} key={entry.id} left={muted(date)}>
              <Text style={{ fontWeight: 700, fontSize: theme.size * 1.05 }}>{entry.title.trim() || entry.subtitle.trim()}</Text>
              {entry.title.trim() && (entry.subtitle.trim() || entry.location.trim()) ? (
                <Text style={{ color: theme.muted }}>{[entry.subtitle.trim(), entry.location.trim()].filter(Boolean).join(", ")}</Text>
              ) : null}
              <EntryLink entry={entry} theme={theme} />
              <Description text={entry.description} theme={theme} />
            </Row>
          );
        });
    }
  };

  return (
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page + 4, paddingHorizontal: theme.page + 6 }}>
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center", marginBottom: theme.gap * 1.3 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.9, fontWeight: 700, lineHeight: 1.1, letterSpacing: -0.4, color: name ? theme.ink : theme.rule }}>
            {name || theme.labels.namePlaceholder}
          </Text>
          {basics.headline.trim() ? (
            <Text style={{ fontSize: theme.size * 1.2, color: theme.accent, marginTop: 4 }}>{basics.headline.trim()}</Text>
          ) : null}
          {contacts.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <ContactRow items={contacts} theme={theme} color={theme.muted} iconColor={theme.accent} />
            </View>
          )}
        </View>
        {basics.photo && <Photo src={basics.photo} size={84} theme={theme} />}
      </View>

      <View style={{ gap: theme.gap * 0.8 }}>
        {basics.summary.trim() ? (
          <SectionBlock title={<Title theme={theme}>{theme.labels.summary}</Title>}>
            <Row theme={theme}>
              <Text>{basics.summary.trim()}</Text>
            </Row>
          </SectionBlock>
        ) : null}
        {main.map((section) => (
          <SectionBlock key={section.id} title={<Title theme={theme}>{sectionTitle(section, theme)}</Title>}>
            {renderSection(section)}
          </SectionBlock>
        ))}
      </View>
    </Page>
  );
}
