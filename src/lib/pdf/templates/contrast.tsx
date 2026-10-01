import { Page, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { tint } from "@/lib/utils";
import { Bar, certificateDate, contactItems, ContactColumn, languageValue, namedLanguages, namedSkills, Photo, sectionTitle, Tags } from "../blocks";
import type { Theme } from "../theme";
import { filledEntries, isEntrySection, SectionBlock, splitSections, StandardEntry, type TemplateProps } from "./shared";

const SIDE_WIDTH = 186;
const DARK = "#1c2027";

function MainTitle({ children, theme }: { children: string; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 7 }}>
      <View style={{ width: 3.5, height: theme.size * 1.3, borderRadius: 1.5, backgroundColor: theme.accent }} />
      <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 1.18, color: theme.ink }}>{children}</Text>
    </View>
  );
}

function SideBlock({ title, light, children, theme }: { title: string; light: string; children: ReactNode; theme: Theme }) {
  return (
    <View wrap={false}>
      <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 0.92, letterSpacing: 1.2, textTransform: "uppercase", color: light, marginBottom: 6 }}>{title}</Text>
      {children}
    </View>
  );
}

/** A dark sidebar on the right for contact details and skills, with bright accents. */
export function ContrastTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const contacts = contactItems(basics, theme);
  const { main, side } = splitSections(resume.sections, ["skills", "languages", "interests", "certificates"]);
  const name = fullName(basics, theme.language);
  // On the dark sidebar the accent is lightened so it stays readable.
  const light = tint(theme.accent, 0.5);
  const soft = "rgba(255,255,255,0.68)";
  const track = "rgba(255,255,255,0.16)";

  const renderSide = (section: Section) => {
    switch (section.type) {
      case "skills": {
        const skills = namedSkills(section.skills);
        if (skills.every((skill) => skill.level === 0)) return <Tags tags={skills.map((skill) => skill.name)} theme={theme} color="#ffffff" background={track} />;
        return (
          <View style={{ gap: 5 }}>
            {skills.map((skill) => (
              <View key={skill.id} wrap={false}>
                <Text>{skill.name}</Text>
                {skill.level > 0 && <Bar value={skill.level / 5} color={light} track={track} />}
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
                  <Text style={{ color: soft, fontSize: theme.size * 0.85, marginTop: 1 }}>{theme.labels.levels[language.level]}</Text>
                </View>
                <Bar value={languageValue(language)} color={light} track={track} />
              </View>
            ))}
          </View>
        );
      case "interests":
        return <Tags tags={section.tags.filter((tag) => tag.trim())} theme={theme} color="#ffffff" background={track} />;
      case "certificates":
        return (
          <View style={{ gap: 5 }}>
            {filledEntries(section).map((entry) => (
              <View key={entry.id} wrap={false}>
                <Text style={{ fontWeight: 600 }}>{entry.title.trim() || entry.subtitle.trim()}</Text>
                <Text style={{ color: soft, fontSize: theme.size * 0.88 }}>
                  {[entry.title.trim() ? entry.subtitle.trim() : "", certificateDate(entry.start, entry.end, theme)].filter(Boolean).join(" · ")}
                </Text>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page, flexDirection: "row" }}>
      <View fixed style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: SIDE_WIDTH, backgroundColor: DARK }} />

      <View style={{ flex: 1, paddingLeft: theme.page + 4, paddingRight: 24 }}>
        <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.8, fontWeight: 700, lineHeight: 1.1, color: name ? theme.ink : theme.rule }}>{name || theme.labels.namePlaceholder}</Text>
        {basics.headline.trim() ? (
          <Text style={{ fontSize: theme.size * 1.1, color: theme.accent, fontWeight: 700, letterSpacing: 1.3, textTransform: "uppercase", marginTop: 5 }}>{basics.headline.trim()}</Text>
        ) : null}
        <View style={{ marginTop: theme.gap * 1.2, gap: theme.gap }}>
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

      <View style={{ width: SIDE_WIDTH, paddingHorizontal: 18, color: "#ffffff", gap: theme.gap }}>
        {basics.photo && (
          <View style={{ alignItems: "center" }}>
            <Photo src={basics.photo} size={104} theme={theme} border={light} />
          </View>
        )}
        {contacts.length > 0 && (
          <SideBlock title={theme.labels.contact} light={light} theme={theme}>
            <ContactColumn items={contacts} theme={theme} color="#ffffff" iconColor={light} width={SIDE_WIDTH - 36} />
          </SideBlock>
        )}
        {side.map((section) => (
          <SideBlock key={section.id} title={sectionTitle(section, theme)} light={light} theme={theme}>
            {renderSide(section)}
          </SideBlock>
        ))}
      </View>
    </Page>
  );
}
