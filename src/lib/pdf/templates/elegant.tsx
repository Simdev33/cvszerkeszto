import { Page, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { certificateDate, contactItems, ContactRow, Dots, languageValue, namedLanguages, namedSkills, Photo, sectionTitle, Tags } from "../blocks";
import type { Theme } from "../theme";
import { filledEntries, isEntrySection, SectionBlock, splitSections, StandardEntry, type TemplateProps } from "./shared";

const SIDE_WIDTH = 178;

function Title({ children, compact, theme }: { children: string; compact?: boolean; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ marginBottom: compact ? 6 : 8 }}>
      <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * (compact ? 1.2 : 1.45), color: theme.accent, lineHeight: 1.2 }}>{children}</Text>
      <View style={{ width: 26, height: 1.5, backgroundColor: theme.accent, marginTop: 3 }} />
    </View>
  );
}

function SideItem({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <View style={{ gap: 2 }} wrap={false}>
      <Text style={{ fontWeight: 600 }}>{label}</Text>
      {children}
    </View>
  );
}

/** Full-width coloured header, main column and a softly tinted side column. */
export function ElegantTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const light = theme.onAccent === "#ffffff";
  const contacts = contactItems(basics, theme);
  const { main, side } = splitSections(resume.sections, ["skills", "languages", "interests", "certificates"]);
  const name = fullName(basics, theme.language);
  const headerMuted = light ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.62)";

  const renderSide = (section: Section) => {
    switch (section.type) {
      case "skills": {
        const skills = namedSkills(section.skills);
        if (skills.every((skill) => skill.level === 0)) return <Tags tags={skills.map((skill) => skill.name)} theme={theme} color={theme.ink} background="#ffffff" />;
        return (
          <View style={{ gap: 5 }}>
            {skills.map((skill) => (
              <SideItem key={skill.id} label={skill.name}>
                {skill.level > 0 && <Dots value={skill.level / 5} color={theme.accent} track={theme.accentMuted} />}
              </SideItem>
            ))}
          </View>
        );
      }
      case "languages":
        return (
          <View style={{ gap: 5 }}>
            {namedLanguages(section.languages).map((language) => (
              <SideItem key={language.id} label={language.name}>
                <Text style={{ color: theme.muted, fontSize: theme.size * 0.88 }}>{theme.labels.levels[language.level]}</Text>
                <Dots value={languageValue(language)} color={theme.accent} track={theme.accentMuted} />
              </SideItem>
            ))}
          </View>
        );
      case "interests":
        return <Tags tags={section.tags.filter((tag) => tag.trim())} theme={theme} color={theme.ink} background="#ffffff" />;
      case "certificates":
        return (
          <View style={{ gap: 6 }}>
            {filledEntries(section).map((entry) => (
              <SideItem key={entry.id} label={entry.title.trim() || entry.subtitle.trim()}>
                <Text style={{ color: theme.muted, fontSize: theme.size * 0.88 }}>
                  {[entry.title.trim() ? entry.subtitle.trim() : "", certificateDate(entry.start, entry.end, theme)].filter(Boolean).join(" · ")}
                </Text>
              </SideItem>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page }}>
      <View fixed style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: SIDE_WIDTH, backgroundColor: theme.accentSoft }} />

      <View
        style={{
          marginTop: -theme.page,
          backgroundColor: theme.accent,
          paddingTop: theme.page * 0.9,
          paddingBottom: theme.page * 0.8,
          paddingHorizontal: 34,
          flexDirection: "row",
          alignItems: "center",
          gap: 22,
        }}
      >
        {basics.photo && <Photo src={basics.photo} size={92} theme={theme} border={light ? "rgba(255,255,255,0.9)" : "#ffffff"} />}
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.8, fontWeight: 700, lineHeight: 1.1, color: theme.onAccent }}>
            {name || theme.labels.namePlaceholder}
          </Text>
          {basics.headline.trim() ? (
            <Text style={{ color: headerMuted, fontSize: theme.size * 1.02, letterSpacing: 1.6, textTransform: "uppercase", marginTop: 5 }}>{basics.headline.trim()}</Text>
          ) : null}
          {contacts.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <ContactRow items={contacts} theme={theme} color={theme.onAccent} iconColor={headerMuted} />
            </View>
          )}
        </View>
      </View>

      <View style={{ flexDirection: "row", flexGrow: 1 }}>
        <View style={{ flex: 1, paddingLeft: 34, paddingRight: 24, paddingTop: theme.gap * 1.2, gap: theme.gap }}>
          {basics.summary.trim() ? (
            <SectionBlock title={<Title theme={theme}>{theme.labels.summary}</Title>}>
              <Text>{basics.summary.trim()}</Text>
            </SectionBlock>
          ) : null}
          {main.filter(isEntrySection).map((section) => (
            <SectionBlock key={section.id} title={<Title theme={theme}>{sectionTitle(section, theme)}</Title>}>
              {filledEntries(section).map((entry) => (
                <StandardEntry key={entry.id} entry={entry} section={section} theme={theme} />
              ))}
            </SectionBlock>
          ))}
        </View>
        <View style={{ width: SIDE_WIDTH, paddingHorizontal: 18, paddingTop: theme.gap * 1.2, gap: theme.gap }}>
          {side.map((section) => (
            <View key={section.id} wrap={false}>
              <Title compact theme={theme}>{sectionTitle(section, theme)}</Title>
              {renderSide(section)}
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
}
