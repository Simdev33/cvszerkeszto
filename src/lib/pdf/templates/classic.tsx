import { Page, Text, View } from "@react-pdf/renderer";
import { fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { contactItems, ContactRow, namedLanguages, namedSkills, Photo, sectionTitle } from "../blocks";
import type { Theme } from "../theme";
import { filledEntries, isEntrySection, NAME_PLACEHOLDER, SectionBlock, splitSections, StandardEntry, type TemplateProps } from "./shared";

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

function Title({ children, theme }: { children: string; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ marginBottom: 7 }}>
      <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 1.1, letterSpacing: 1.6, textTransform: "uppercase", color: theme.accent }}>
        {children}
      </Text>
      <View style={{ height: 0.75, backgroundColor: theme.accentMuted, marginTop: 3 }} />
    </View>
  );
}

/** Single column, centred header, restrained typography – for conservative fields. */
export function ClassicTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const contacts = contactItems(basics, theme);
  const { main } = splitSections(resume.sections, []);
  const name = fullName(basics, theme.language);
  const centred = !basics.photo;

  const inline = (items: string[]) => <Text>{items.join("  ·  ")}</Text>;

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "skills":
        return inline(namedSkills(section.skills).map((skill) => skill.name));
      case "languages":
        return inline(namedLanguages(section.languages).map((language) => `${language.name} – ${theme.language === "hu" ? lowerFirst(theme.labels.levels[language.level]) : theme.labels.levels[language.level]}`));
      case "interests":
        return inline(section.tags.filter((tag) => tag.trim()));
      default:
        return isEntrySection(section)
          ? filledEntries(section).map((entry) => <StandardEntry key={entry.id} entry={entry} section={section} theme={theme} subtitleColor={theme.ink} />)
          : null;
    }
  };

  const header = (
    <View style={{ alignItems: centred ? "center" : "flex-start", flex: 1 }}>
      <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.6, fontWeight: 700, lineHeight: 1.15, color: name ? theme.ink : theme.rule }}>
        {name || NAME_PLACEHOLDER[theme.language]}
      </Text>
      {basics.headline.trim() ? (
        <Text style={{ fontSize: theme.size * 1.15, color: theme.muted, marginTop: 3, letterSpacing: 0.4 }}>{basics.headline.trim()}</Text>
      ) : null}
      {contacts.length > 0 && (
        <View style={{ marginTop: 8 }}>
          <ContactRow items={contacts} theme={theme} color={theme.ink} iconColor={theme.accent} justify={centred ? "center" : "flex-start"} />
        </View>
      )}
    </View>
  );

  return (
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page, paddingHorizontal: theme.page + 12 }}>
      {centred ? (
        header
      ) : (
        <View style={{ flexDirection: "row", gap: 18, alignItems: "center" }}>
          <Photo src={basics.photo!} size={78} theme={theme} />
          {header}
        </View>
      )}
      <View style={{ height: 1.5, backgroundColor: theme.accent, marginTop: theme.gap * 0.9, marginBottom: theme.gap }} />

      <View style={{ gap: theme.gap }}>
        {basics.summary.trim() ? (
          <SectionBlock title={<Title theme={theme}>{theme.labels.summary}</Title>}>
            <Text>{basics.summary.trim()}</Text>
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
