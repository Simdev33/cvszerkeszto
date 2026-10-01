import { Page, Text, View } from "@react-pdf/renderer";
import { formatRange, fullName } from "@/lib/resume/format";
import type { Section } from "@/lib/resume/types";
import { Bar, certificateDate, contactItems, ContactRow, Description, namedLanguages, namedSkills, Photo, sectionTitle, Tags } from "../blocks";
import type { Theme } from "../theme";
import { EntryLink, filledEntries, isEntrySection, SectionBlock, splitSections, type TemplateProps } from "./shared";

/** A filled, rounded section label. */
function Pill({ children, theme }: { children: string; theme: Theme }) {
  return (
    <View minPresenceAhead={theme.size * 4} style={{ flexDirection: "row", marginBottom: 7 }}>
      <Text
        style={{
          backgroundColor: theme.accent,
          color: theme.onAccent,
          borderRadius: 10,
          paddingHorizontal: 9,
          paddingVertical: 2.5,
          fontFamily: theme.heading,
          fontWeight: 700,
          fontSize: theme.size * 0.9,
          letterSpacing: 1.1,
          textTransform: "uppercase",
        }}
      >
        {children}
      </Text>
    </View>
  );
}

/** Bold colour, rounded section labels and a playful corner shape – for creative fields. */
export function CreativeTemplate({ resume, theme }: TemplateProps) {
  const { basics, design } = resume;
  const contacts = contactItems(basics, theme);
  const { main } = splitSections(resume.sections, []);
  const name = fullName(basics, theme.language);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "skills": {
        const skills = namedSkills(section.skills);
        if (skills.every((skill) => skill.level === 0)) {
          return <Tags tags={skills.map((skill) => skill.name)} theme={theme} color={theme.accent} background={theme.accentSoft} />;
        }
        return (
          <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 6 }}>
            {skills.map((skill) => (
              <View key={skill.id} style={{ width: "50%", paddingRight: 14 }} wrap={false}>
                <Text>{skill.name}</Text>
                {skill.level > 0 && <Bar value={skill.level / 5} color={theme.accent} track={theme.accentSoft} height={4} />}
              </View>
            ))}
          </View>
        );
      }
      case "languages":
        return (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {namedLanguages(section.languages).map((language) => (
              <View key={language.id} style={{ flexDirection: "row", gap: 5, borderRadius: 8, backgroundColor: theme.accentSoft, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontWeight: 700, color: theme.accent }}>{language.name}</Text>
                <Text style={{ color: theme.muted, fontSize: theme.size * 0.88, marginTop: 0.5 }}>{theme.labels.levels[language.level]}</Text>
              </View>
            ))}
          </View>
        );
      case "interests":
        return <Tags tags={section.tags.filter((tag) => tag.trim())} theme={theme} color={theme.accent} background={theme.accentSoft} />;
      default:
        if (!isEntrySection(section)) return null;
        return filledEntries(section).map((entry) => {
          const range = section.type === "certificates" ? certificateDate(entry.start, entry.end, theme) : formatRange(entry, theme.language);
          const meta = [entry.subtitle.trim(), entry.location.trim()].filter(Boolean);
          return (
            <View key={entry.id} style={{ marginBottom: theme.entryGap }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }} minPresenceAhead={theme.size * 3}>
                <Text style={{ flex: 1, fontWeight: 700, fontSize: theme.size * 1.05 }}>{entry.title.trim() || entry.subtitle.trim()}</Text>
                {range ? (
                  <Text style={{ color: theme.accent, backgroundColor: theme.accentSoft, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1, fontSize: theme.size * 0.85 }}>{range}</Text>
                ) : null}
              </View>
              {entry.title.trim() && meta.length > 0 ? <Text style={{ color: theme.muted, fontWeight: 600 }}>{meta.join("  ·  ")}</Text> : null}
              <EntryLink entry={entry} theme={theme} />
              <Description text={entry.description} theme={theme} />
            </View>
          );
        });
    }
  };

  return (
    <Page size={design.pageSize} style={{ fontFamily: theme.body, fontSize: theme.size, lineHeight: theme.line, color: theme.ink, paddingVertical: theme.page, paddingLeft: theme.page + 16, paddingRight: theme.page + 8 }}>
      <View fixed style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 7, backgroundColor: theme.accent }} />
      <View style={{ position: "absolute", top: -70, right: -70, width: 200, height: 200, borderRadius: 100, backgroundColor: theme.accentSoft }} />
      <View style={{ position: "absolute", top: 44, right: 96, width: 18, height: 18, borderRadius: 9, backgroundColor: theme.accentMuted }} />

      <View style={{ flexDirection: "row", alignItems: "center", gap: 18, marginBottom: theme.gap * 1.3 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.heading, fontSize: theme.size * 3.1, fontWeight: 700, lineHeight: 1.05, letterSpacing: -0.5, color: name ? theme.accent : theme.rule }}>
            {name || theme.labels.namePlaceholder}
          </Text>
          {basics.headline.trim() ? (
            <Text style={{ fontSize: theme.size * 1.15, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: theme.ink, marginTop: 5 }}>{basics.headline.trim()}</Text>
          ) : null}
          {contacts.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <ContactRow items={contacts} theme={theme} color={theme.ink} iconColor={theme.accent} />
            </View>
          )}
        </View>
        {basics.photo && (
          <View style={{ padding: 3, borderWidth: 2.5, borderColor: theme.accent, borderRadius: theme.photoShape === "circle" ? 60 : theme.photoShape === "rounded" ? 16 : 0 }}>
            <Photo src={basics.photo} size={96} theme={theme} />
          </View>
        )}
      </View>

      <View style={{ gap: theme.gap }}>
        {basics.summary.trim() ? (
          <SectionBlock title={<Pill theme={theme}>{theme.labels.summary}</Pill>}>
            <Text>{basics.summary.trim()}</Text>
          </SectionBlock>
        ) : null}
        {main.map((section) => (
          <SectionBlock key={section.id} title={<Pill theme={theme}>{sectionTitle(section, theme)}</Pill>}>
            {renderSection(section)}
          </SectionBlock>
        ))}
      </View>
    </Page>
  );
}
