import { Page, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { tint } from "@/lib/utils";
import { contactItems, ContactRow, Dots, languageValue, namedLanguages, namedSkills, Photo, sectionTitle } from "../blocks";
import type { Theme } from "../theme";
import { filledEntries, isEntrySection, splitSections, StandardEntry, type TemplateProps } from "./shared";

const RAIL = 112;
const BAND = "#1f2329";

/** One row: the section title in the left rail (first row only), the content on the right. */
function RailRow({ title, children, theme, keepTogether }: { title?: string; children: ReactNode; theme: Theme; keepTogether?: boolean }) {
  return (
    <View style={{ flexDirection: "row" }} wrap={!keepTogether} minPresenceAhead={theme.size * 3}>
      <View style={{ width: RAIL, paddingRight: 14 }}>
        {title ? (
          <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 0.88, letterSpacing: 1.3, textTransform: "uppercase", color: theme.accent, marginTop: 1 }}>
            {title}
          </Text>
        ) : null}
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

/** A section: a hairline above, its title in the rail next to the first item. */
function RailSection({ title, items, theme }: { title: string; items: ReactNode[]; theme: Theme }) {
  return (
    <View>
      <View style={{ height: 0.75, backgroundColor: theme.rule, marginBottom: theme.gap * 0.7 }} />
      {items.map((item, index) => (
        <RailRow key={index} title={index === 0 ? title : undefined} theme={theme} keepTogether={index === 0}>
          {item}
        </RailRow>
      ))}
    </View>
  );
}

/** A dark band header and a rail of section titles – calm and confident, for senior roles. */
export function ExecutiveTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const contacts = contactItems(basics, theme);
  const { main } = splitSections(resume.sections, []);
  const name = fullName(basics, theme.language);
  const side = theme.page + 10;

  const inline = (items: string[]) => <Text>{items.join("  ·  ")}</Text>;

  const itemsOf = (section: Section): ReactNode[] => {
    switch (section.type) {
      case "skills": {
        const skills = namedSkills(section.skills);
        if (skills.every((skill) => skill.level === 0)) return [inline(skills.map((skill) => skill.name))];
        return [
          <View key="skills" style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 4 }}>
            {skills.map((skill) => (
              <View key={skill.id} style={{ width: "50%", flexDirection: "row", alignItems: "center", gap: 6, paddingRight: 10 }}>
                <Text style={{ flex: 1 }}>{skill.name}</Text>
                {skill.level > 0 && <Dots value={skill.level / 5} color={theme.accent} track={theme.rule} size={4.5} />}
              </View>
            ))}
          </View>,
        ];
      }
      case "languages":
        return [
          <View key="languages" style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 4 }}>
            {namedLanguages(section.languages).map((language) => (
              <View key={language.id} style={{ width: "50%", flexDirection: "row", alignItems: "center", gap: 6, paddingRight: 10 }}>
                <Text style={{ fontWeight: 600 }}>{language.name}</Text>
                <Text style={{ flex: 1, color: theme.muted, fontSize: theme.size * 0.88 }}>{theme.labels.levels[language.level]}</Text>
                <Dots value={languageValue(language)} color={theme.accent} track={theme.rule} size={4.5} />
              </View>
            ))}
          </View>,
        ];
      case "interests":
        return [inline(section.tags.filter((tag) => tag.trim()))];
      default:
        return isEntrySection(section) ? filledEntries(section).map((entry) => <StandardEntry key={entry.id} entry={entry} section={section} theme={theme} subtitleColor={theme.ink} />) : [];
    }
  };

  return (
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page, paddingHorizontal: side }}>
      <View
        style={{
          marginTop: -theme.page,
          marginHorizontal: -side,
          backgroundColor: BAND,
          paddingTop: theme.page * 0.95,
          paddingBottom: theme.page * 0.85,
          paddingHorizontal: side,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        {basics.photo && <Photo src={basics.photo} size={84} theme={theme} border={theme.accent} />}
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.7, fontWeight: 700, lineHeight: 1.1, color: name ? "#ffffff" : "#6b7280" }}>
            {name || theme.labels.namePlaceholder}
          </Text>
          {basics.headline.trim() ? (
            <Text style={{ color: tint(theme.accent, 0.55), fontSize: theme.size * 1.02, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", marginTop: 5 }}>
              {basics.headline.trim()}
            </Text>
          ) : null}
          {contacts.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <ContactRow items={contacts} theme={theme} color="#ffffff" iconColor="rgba(255,255,255,0.6)" />
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 3, backgroundColor: theme.accent, marginHorizontal: -side, marginBottom: theme.gap * 1.1 }} />

      <View style={{ gap: theme.gap }}>
        {basics.summary.trim() ? <RailSection title={theme.labels.summary} items={[<Text key="summary">{basics.summary.trim()}</Text>]} theme={theme} /> : null}
        {main.map((section) => (
          <RailSection key={section.id} title={sectionTitle(section, theme)} items={itemsOf(section)} theme={theme} />
        ))}
      </View>
    </Page>
  );
}
