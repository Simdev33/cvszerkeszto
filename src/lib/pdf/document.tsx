import { Document } from "@react-pdf/renderer";
import { fullName } from "@/lib/resume/format";
import type { Resume, TemplateId } from "@/lib/resume/types";
import { ClassicTemplate } from "./templates/classic";
import { ElegantTemplate } from "./templates/elegant";
import { MinimalTemplate } from "./templates/minimal";
import { ModernTemplate } from "./templates/modern";
import type { TemplateProps } from "./templates/shared";
import { makeTheme } from "./theme";

const TEMPLATES: Record<TemplateId, (props: TemplateProps) => React.ReactElement> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
};

export function documentTitle(resume: Resume) {
  const hu = resume.design.language === "hu";
  const name = fullName(resume.basics, resume.design.language);
  return name ? `${name} – ${hu ? "Önéletrajz" : "Résumé"}` : hu ? "Önéletrajz" : "Résumé";
}

export function ResumeDocument({ resume }: { resume: Resume }) {
  const theme = makeTheme(resume.design);
  const Template = TEMPLATES[resume.design.template] ?? ModernTemplate;
  const author = fullName(resume.basics, resume.design.language);
  return (
    <Document
      title={documentTitle(resume)}
      author={author || undefined}
      subject={resume.basics.headline || undefined}
      creator="CV Stúdió"
      producer="CV Stúdió"
      language={resume.design.language === "hu" ? "hu-HU" : "en-GB"}
    >
      <Template resume={resume} theme={theme} />
    </Document>
  );
}
