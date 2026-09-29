import { Page, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { Bar, contactItems, ContactColumn, languageValue, namedLanguages, namedSkills, Photo, sectionTitle, Tags } from "../blocks";
import type { Theme } from "../theme";
import { filledEntries, isEntrySection, SectionBlock, splitSections, StandardEntry, type TemplateProps } from "./shared";

const SIDE_WIDTH = 182;

function SideBlock({ title, theme, children }: { title: string; theme: Theme; children: ReactNode }) {
  return (
    <View wrap={false}>
      <Text
        minPresenceAhead={theme.size * 3}
        style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 0.95, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 6, color: theme.onAccent }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function MainTitle({ children, theme }: { children: string; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 7 }}>
      <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 1.12, letterSpacing: 0.9, textTransform: "uppercase", color: theme.accent }}>
        {children}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.rule }} />
    </View>
  );
}

function SideContent({ section, theme, track, muted }: { section: Section; theme: Theme; track: string; muted: string }) {
  switch (section.type) {
    case "skills": {
      const skills = namedSkills(section.skills);
      if (skills.every((skill) => skill.level === 0)) {
        return <Tags tags={skills.map((skill) => skill.name)} theme={theme} color={theme.onAccent} background={track} />;
      }
      return (
        <View style={{ gap: 5 }}>
          {skills.map((skill) => (
            <View key={skill.id} wrap={false}>
              <Text>{skill.name}</Text>
              {skill.level > 0 && <Bar value={skill.level / 5} color={theme.onAccent} track={track} />}
            </View>
          ))}
        </View>
      );
    }
    case "languages":
      return (
        <View style={{ gap: 5 }}>
          {namedLanguages(section.languages).map((language) => (
            <View key={language.id} wrap={false}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
                <Text style={{ fontWeight: 600 }}>{language.name}</Text>
                <Text style={{ color: muted, fontSize: theme.size * 0.85, marginTop: 1 }}>{theme.labels.levels[language.level]}</Text>
              </View>
              <Bar value={languageValue(language)} color={theme.onAccent} track={track} />
            </View>
          ))}
        </View>
      );
    case "interests":
      return <Tags tags={section.tags.filter((tag) => tag.trim())} theme={theme} color={theme.onAccent} background={track} />;
    default:
      return null;
  }
}

/** Two columns: a coloured sidebar (photo, contact, skills) and the main story. */
export function ModernTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const light = theme.onAccent === "#ffffff";
  const muted = light ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.6)";
  const track = light ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.14)";
  const contacts = contactItems(basics, theme);
  const { main, side } = splitSections(resume.sections, ["skills", "languages", "interests"]);
  const name = fullName(basics, theme.language);

  return (
    <Page
      size={design.pageSize}
      style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page, flexDirection: "row" }}
    >
      <View fixed style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: SIDE_WIDTH, backgroundColor: theme.accent }} />

      <View style={{ width: SIDE_WIDTH, paddingHorizontal: 20, color: theme.onAccent, gap: theme.gap }}>
        {basics.photo && (
          <View style={{ alignItems: "center" }}>
            <Photo src={basics.photo} size={108} theme={theme} border={light ? "rgba(255,255,255,0.85)" : "#ffffff"} />
          </View>
        )}
        {contacts.length > 0 && (
          <SideBlock title={theme.labels.contact} theme={theme}>
            <ContactColumn items={contacts} theme={theme} color={theme.onAccent} iconColor={muted} width={SIDE_WIDTH - 40} />
          </SideBlock>
        )}
        {side.map((section) => (
          <SideBlock key={section.id} title={sectionTitle(section, theme)} theme={theme}>
            <SideContent section={section} theme={theme} track={track} muted={muted} />
          </SideBlock>
        ))}
      </View>

      <View style={{ flex: 1, paddingLeft: 26, paddingRight: 30 }}>
        <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.7, fontWeight: 700, lineHeight: 1.1, color: name ? theme.ink : theme.rule }}>
          {name || theme.labels.namePlaceholder}
        </Text>
        {basics.headline.trim() ? (
          <Text style={{ fontSize: theme.size * 1.25, color: theme.accent, fontWeight: 600, marginTop: 4 }}>{basics.headline.trim()}</Text>
        ) : null}

        <View style={{ marginTop: theme.gap * 1.1, gap: theme.gap }}>
          {basics.summary.trim() ? (
            <SectionBlock title={<MainTitle theme={theme}>{theme.labels.summary}</MainTitle>}>
              <Text>{basics.summary.trim()}</Text>
            </SectionBlock>
          ) : null}
          {main.filter(isEntrySection).map((section) => (
            <SectionBlock key={section.id} title={<MainTitle theme={theme}>{sectionTitle(section, theme)}</MainTitle>}>
              {filledEntries(section).map((entry) => (
                <StandardEntry key={entry.id} entry={entry} section={section} theme={theme} />
              ))}
            </SectionBlock>
          ))}
        </View>
      </View>
    </Page>
  );
}
