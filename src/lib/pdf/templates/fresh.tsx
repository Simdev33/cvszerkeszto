import { Page, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { contactItems, ContactRow, Dots, languageValue, namedLanguages, namedSkills, Photo, sectionTitle, Tags } from "../blocks";
import type { Theme } from "../theme";
import { filledEntries, isEntrySection, SectionBlock, splitSections, StandardEntry, type TemplateProps } from "./shared";

function Title({ children, theme }: { children: string; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 7 }}>
      <View style={{ width: 9, height: 9, borderRadius: 2.5, backgroundColor: theme.accent }} />
      <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 1.25, color: theme.ink }}>{children}</Text>
    </View>
  );
}

/** An entry in a light card with an accent edge. */
function Card({ children, theme }: { children: ReactNode; theme: Theme }) {
  return (
    <View style={{ borderLeftWidth: 2.5, borderLeftColor: theme.accent, paddingLeft: 10, marginBottom: theme.entryGap }} wrap>
      {children}
    </View>
  );
}

/** A soft tinted header and entries in light cards – friendly and modern. */
export function FreshTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const contacts = contactItems(basics, theme);
  const { main } = splitSections(resume.sections, []);
  const name = fullName(basics, theme.language);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "skills": {
        const skills = namedSkills(section.skills);
        if (skills.every((skill) => skill.level === 0)) return <Tags tags={skills.map((skill) => skill.name)} theme={theme} color={theme.ink} border={theme.accentMuted} />;
        return (
          <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 5 }}>
            {skills.map((skill) => (
              <View key={skill.id} style={{ width: "50%", flexDirection: "row", alignItems: "center", gap: 6, paddingRight: 14 }} wrap={false}>
                <Text style={{ flex: 1 }}>{skill.name}</Text>
                {skill.level > 0 && <Dots value={skill.level / 5} color={theme.accent} track={theme.accentSoft} />}
              </View>
            ))}
          </View>
        );
      }
      case "languages":
        return (
          <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 5 }}>
            {namedLanguages(section.languages).map((language) => (
              <View key={language.id} style={{ width: "50%", paddingRight: 14 }} wrap={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                  <Text style={{ fontWeight: 600 }}>{language.name}</Text>
                  <Dots value={languageValue(language)} color={theme.accent} track={theme.accentSoft} />
                </View>
                <Text style={{ color: theme.muted, fontSize: theme.size * 0.88 }}>{theme.labels.levels[language.level]}</Text>
              </View>
            ))}
          </View>
        );
      case "interests":
        return <Tags tags={section.tags.filter((tag) => tag.trim())} theme={theme} color={theme.ink} border={theme.accentMuted} />;
      default:
        return isEntrySection(section)
          ? filledEntries(section).map((entry) => (
              <Card key={entry.id} theme={theme}>
                <StandardEntry entry={entry} section={section} theme={{ ...theme, entryGap: 0 }} />
              </Card>
            ))
          : null;
    }
  };

  return (
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page, paddingHorizontal: theme.page + 6 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 18, backgroundColor: theme.accentSoft, borderRadius: 12, padding: 16, marginBottom: theme.gap * 1.2 }}>
        {basics.photo && <Photo src={basics.photo} size={82} theme={theme} border="#ffffff" />}
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.6, fontWeight: 700, lineHeight: 1.1, color: name ? theme.ink : theme.muted }}>{name || theme.labels.namePlaceholder}</Text>
          {basics.headline.trim() ? <Text style={{ fontSize: theme.size * 1.15, color: theme.accent, fontWeight: 600, marginTop: 3 }}>{basics.headline.trim()}</Text> : null}
          <View style={{ width: 34, height: 3, borderRadius: 1.5, backgroundColor: theme.accent, marginTop: 7 }} />
          {contacts.length > 0 && (
            <View style={{ marginTop: 9 }}>
              <ContactRow items={contacts} theme={theme} color={theme.ink} iconColor={theme.accent} />
            </View>
          )}
        </View>
      </View>

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
