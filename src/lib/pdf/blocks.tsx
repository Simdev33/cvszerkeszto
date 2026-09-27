/* Shared building blocks for the PDF templates (react-pdf primitives). */
import { Circle, Image, Link, Path, Rect, Svg, Text, View } from "@react-pdf/renderer";
import { LEVEL_VALUE } from "@/lib/resume/i18n";
import { formatMonth, linkHref, parseDescription, prettyUrl } from "@/lib/resume/format";
import type { Basics, LanguageSkill, Section, Skill } from "@/lib/resume/types";
import type { Theme } from "./theme";

/* ---------------------------------- icons --------------------------------- */

// Shapes from Lucide (ISC licence), 24 × 24 viewBox, stroked.
type Shape =
  | { d: string }
  | { x: number; y: number; width: number; height: number; rx?: number }
  | { cx: number; cy: number; r: number };

const ICONS = {
  mail: [{ x: 2, y: 4, width: 20, height: 16, rx: 2 }, { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  phone: [
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    },
  ],
  location: [{ d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }, { cx: 12, cy: 10, r: 3 }],
  website: [{ cx: 12, cy: 12, r: 10 }, { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }, { d: "M2 12h20" }],
  linkedin: [{ d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }, { x: 2, y: 9, width: 4, height: 12 }, { cx: 4, cy: 4, r: 2 }],
  github: [
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
    },
    { d: "M9 18c-4.51 2-5-2-7-2" },
  ],
  birthDate: [{ d: "M8 2v4M16 2v4" }, { x: 3, y: 4, width: 18, height: 18, rx: 2 }, { d: "M3 10h18" }],
  drivingLicense: [
    { d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" },
    { cx: 7, cy: 17, r: 2 },
    { d: "M9 17h6" },
    { cx: 17, cy: 17, r: 2 },
  ],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size, color }: { name: IconName; size: number; color: string }) {
  const stroke = { stroke: color, strokeWidth: 2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} style={{ marginTop: size * 0.12 }}>
      {(ICONS[name] as Shape[]).map((shape, i) =>
        "d" in shape ? <Path key={i} d={shape.d} {...stroke} /> : "r" in shape ? <Circle key={i} {...shape} {...stroke} /> : <Rect key={i} {...shape} {...stroke} />,
      )}
    </Svg>
  );
}

/* --------------------------------- contact -------------------------------- */

export interface ContactItem {
  icon: IconName;
  text: string;
  href?: string;
}

/** "linkedin.com/in/kovacs-anna" → "kovacs-anna" – the icon already says which service it is. */
export function profileHandle(url: string) {
  const pretty = prettyUrl(url).replace(/[?#].*$/, "");
  const handle = pretty.replace(/^(?:[a-z]{2,3}\.)?linkedin\.com\/(?:in|company)\//i, "").replace(/^github\.com\//i, "");
  return handle || pretty;
}

export function contactItems(basics: Basics, theme: Theme): ContactItem[] {
  const items: ContactItem[] = [];
  if (basics.email.trim()) items.push({ icon: "mail", text: basics.email.trim(), href: linkHref(basics.email, "email") });
  if (basics.phone.trim()) items.push({ icon: "phone", text: basics.phone.trim(), href: linkHref(basics.phone, "phone") });
  if (basics.location.trim()) items.push({ icon: "location", text: basics.location.trim() });
  if (basics.website.trim()) items.push({ icon: "website", text: prettyUrl(basics.website), href: linkHref(basics.website, "url") });
  if (basics.linkedin.trim()) items.push({ icon: "linkedin", text: profileHandle(basics.linkedin), href: linkHref(basics.linkedin, "url") });
  if (basics.github.trim()) items.push({ icon: "github", text: profileHandle(basics.github), href: linkHref(basics.github, "url") });
  if (basics.birthDate.trim()) {
    const value = /^\d{4}-\d{2}-\d{2}$/.test(basics.birthDate)
      ? new Date(`${basics.birthDate}T12:00:00`).toLocaleDateString(theme.language === "hu" ? "hu-HU" : "en-GB", { year: "numeric", month: "long", day: "numeric" })
      : basics.birthDate.trim();
    items.push({ icon: "birthDate", text: `${theme.labels.birthDate}: ${value}` });
  }
  if (basics.drivingLicense.trim()) items.push({ icon: "drivingLicense", text: `${theme.labels.drivingLicense}: ${basics.drivingLicense.trim()}` });
  return items;
}

export function ContactText({ item, color, style }: { item: ContactItem; color: string; style?: object }) {
  return item.href ? (
    <Link src={item.href} style={{ color, textDecoration: "none", ...style }}>
      {item.text}
    </Link>
  ) : (
    <Text style={{ color, ...style }}>{item.text}</Text>
  );
}

export function ContactColumn({ items, theme, color, iconColor, width, gap = 5 }: { items: ContactItem[]; theme: Theme; color: string; iconColor: string; width: number; gap?: number }) {
  // Long e-mail addresses cannot wrap nicely in a narrow column, so they shrink instead.
  const textWidth = width - theme.size - 6;
  const fit = (text: string) => {
    const estimate = text.length * theme.size * 0.57;
    return estimate > textWidth ? { fontSize: Math.max(6.5, (theme.size * textWidth) / estimate) } : undefined;
  };
  return (
    <View style={{ gap }}>
      {items.map((item) => (
        <View key={item.icon} style={{ flexDirection: "row", gap: 6 }}>
          <Icon name={item.icon} size={theme.size * 0.95} color={iconColor} />
          <View style={{ flex: 1 }}>
            <ContactText item={item} color={color} style={fit(item.text)} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function ContactRow({ items, theme, color, iconColor, justify = "flex-start" }: { items: ContactItem[]; theme: Theme; color: string; iconColor: string; justify?: "flex-start" | "center" }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: justify, columnGap: 12, rowGap: 3 }}>
      {items.map((item) => (
        <View key={item.icon} style={{ flexDirection: "row", gap: 4 }}>
          <Icon name={item.icon} size={theme.size * 0.9} color={iconColor} />
          <ContactText item={item} color={color} />
        </View>
      ))}
    </View>
  );
}

/* ---------------------------------- photo --------------------------------- */

export function Photo({ src, size, theme, border }: { src: string; size: number; theme: Theme; border?: string }) {
  const radius = theme.photoShape === "circle" ? size / 2 : theme.photoShape === "rounded" ? size * 0.14 : 0;
  return (
    <View style={{ width: size, height: size, borderRadius: radius, overflow: "hidden", ...(border ? { borderWidth: 2.5, borderColor: border } : {}) }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt attribute */}
      <Image src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </View>
  );
}

/* ------------------------------- description ------------------------------ */

export function Description({ text, theme, color }: { text: string; theme: Theme; color?: string }) {
  const blocks = parseDescription(text);
  if (!blocks.length) return null;
  return (
    <View style={{ marginTop: 3, gap: 2.5, color: color ?? theme.ink }}>
      {blocks.map((block, index) =>
        block.type === "paragraph" ? (
          <Text key={index}>{block.text}</Text>
        ) : (
          <View key={index} style={{ gap: 1.5 }}>
            {block.items.map((item, i) => (
              <View key={i} style={{ flexDirection: "row" }} wrap={false}>
                <Text style={{ width: theme.size * 0.95, color: theme.accent }}>•</Text>
                <Text style={{ flex: 1 }}>{item}</Text>
              </View>
            ))}
          </View>
        ),
      )}
    </View>
  );
}

/* ------------------------------ levels & tags ----------------------------- */

export function Bar({ value, color, track, height = 3 }: { value: number; color: string; track: string; height?: number }) {
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: track, marginTop: 2 }}>
      <View style={{ width: `${Math.round(value * 100)}%`, height, borderRadius: height / 2, backgroundColor: color }} />
    </View>
  );
}

export function Dots({ value, color, track, size = 5 }: { value: number; color: string; track: string; size?: number }) {
  const filled = Math.round(value * 5);
  return (
    <View style={{ flexDirection: "row", gap: size * 0.6 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <View key={i} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: i < filled ? color : track }} />
      ))}
    </View>
  );
}

export function Tags({ tags, theme, color, background, border }: { tags: string[]; theme: Theme; color: string; background?: string; border?: string }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
      {tags.map((tag, i) => (
        <Text
          key={i}
          style={{
            paddingVertical: 2,
            paddingHorizontal: 6,
            borderRadius: 3,
            fontSize: theme.size * 0.92,
            color,
            ...(background ? { backgroundColor: background } : {}),
            ...(border ? { borderWidth: 0.75, borderColor: border } : {}),
          }}
        >
          {tag}
        </Text>
      ))}
    </View>
  );
}

/* --------------------------------- helpers -------------------------------- */

export const namedSkills = (skills: Skill[]) => skills.filter((skill) => skill.name.trim());
export const namedLanguages = (languages: LanguageSkill[]) => languages.filter((language) => language.name.trim());
export const languageValue = (language: LanguageSkill) => LEVEL_VALUE[language.level];

export function sectionTitle(section: Section, theme: Theme) {
  return section.title.trim() || theme.labels.sections[section.type];
}

/** Sections that actually have something to print. */
export function hasContent(section: Section) {
  if (!section.visible) return false;
  switch (section.type) {
    case "skills":
      return namedSkills(section.skills).length > 0;
    case "languages":
      return namedLanguages(section.languages).length > 0;
    case "interests":
      return section.tags.some((tag) => tag.trim());
    default:
      return section.entries.some((entry) => entry.title.trim() || entry.subtitle.trim() || entry.description.trim());
  }
}

export function certificateDate(start: string, end: string, theme: Theme) {
  return formatMonth(end || start, theme.language);
}
