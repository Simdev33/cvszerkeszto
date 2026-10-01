import { Page, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { Bar, certificateDate, contactItems, ContactColumn, Dots, languageValue, namedLanguages, namedSkills, Photo, sectionTitle, Tags } from "../blocks";
import type { Theme } from "../theme";
import { filledEntries, isEntrySection, SectionBlock, splitSections, StandardEntry, type TemplateProps } from "./shared";

const SIDE_WIDTH = 168;

function Title({ children, theme }: { children: string; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 }}>
      <View style={{ width: 5, height: 5, backgroundColor: theme.accent }} />
      <Text style={{ fontFamily: theme.heading, fontWeight: 700, fontSize: theme.size * 0.95, letterSpacing: 1.2, textTransform: "uppercase", color: theme.ink }}>{children}</Text>
    </View>
  );
}

function SideItem({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <View wrap={false}>
      <Text style={{ fontWeight: 600 }}>{label}</Text>
      {children}
    </View>
  );
}

/** Two dense columns and small margins – a long career still fits on one page. */
export function CompactTemplate({ resume, theme: base }: TemplateProps) {
  // Everything a little tighter than the chosen density.
  const theme: Theme = { ...base, size: base.size * 0.94, gap: base.gap * 0.75, entryGap: base.entryGap * 0.8, page: base.page * 0.8 };
  const { basics, design } = resume;
  const contacts = contactItems(basics, theme);
  const { main, side } = splitSections(resume.sections, ["skills", "languages", "interests", "certificates"]);
  const name = fullName(basics, theme.language);

  const renderSide = (section: Section) => {
    switch (section.type) {
      case "skills": {
        const skills = namedSkills(section.skills);
        if (skills.every((skill) => skill.level === 0)) return <Tags tags={skills.map((skill) => skill.name)} theme={theme} color={theme.ink} border={theme.accentMuted} />;
        return (
          <View style={{ gap: 4 }}>
            {skills.map((skill) => (
              <SideItem key={skill.id} label={skill.name}>
                {skill.level > 0 && <Bar value={skill.level / 5} color={theme.accent} track={theme.rule} />}
              </SideItem>
            ))}
          </View>
        );
      }
      case "languages":
        return (
          <View style={{ gap: 4 }}>
            {namedLanguages(section.languages).map((language) => (
              <SideItem key={language.id} label={language.name}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: theme.muted, fontSize: theme.size * 0.9 }}>{theme.labels.levels[language.level]}</Text>
                  <Dots value={languageValue(language)} color={theme.accent} track={theme.rule} size={4} />
                </View>
              </SideItem>
            ))}
          </View>
        );
      case "interests":
        return <Tags tags={section.tags.filter((tag) => tag.trim())} theme={theme} color={theme.ink} border={theme.accentMuted} />;
      case "certificates":
        return (
          <View style={{ gap: 4 }}>
            {filledEntries(section).map((entry) => (
              <SideItem key={entry.id} label={entry.title.trim() || entry.subtitle.trim()}>
                <Text style={{ color: theme.muted, fontSize: theme.size * 0.9 }}>
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
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page, paddingHorizontal: theme.page + 4 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        {basics.photo && <Photo src={basics.photo} size={62} theme={theme} />}
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 2.4, fontWeight: 700, lineHeight: 1.1, color: name ? theme.ink : theme.rule }}>{name || theme.labels.namePlaceholder}</Text>
          {basics.headline.trim() ? <Text style={{ fontSize: theme.size * 1.1, color: theme.accent, fontWeight: 600, marginTop: 2 }}>{basics.headline.trim()}</Text> : null}
        </View>
        {contacts.length > 0 && (
          <View style={{ width: SIDE_WIDTH }}>
            <ContactColumn items={contacts} theme={theme} color={theme.ink} iconColor={theme.accent} width={SIDE_WIDTH} gap={2} />
          </View>
        )}
      </View>
      <View style={{ height: 1.5, backgroundColor: theme.accent, marginTop: theme.gap, marginBottom: theme.gap }} />

      <View style={{ flexDirection: "row", flexGrow: 1 }}>
        <View style={{ flex: 1, paddingRight: 14, borderRightWidth: 0.75, borderRightColor: theme.rule, gap: theme.gap }}>
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
        <View style={{ width: SIDE_WIDTH, paddingLeft: 14, gap: theme.gap }}>
          {side.map((section) => (
            <View key={section.id} wrap={false}>
              <Title theme={theme}>{sectionTitle(section, theme)}</Title>
              {renderSide(section)}
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
}
