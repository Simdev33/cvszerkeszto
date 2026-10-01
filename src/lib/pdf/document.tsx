import { Document } from "@react-pdf/renderer";
import { SITE } from "@/config/site";
import { fullName } from "@/lib/resume/format";
import { CV_LABELS } from "@/lib/resume/i18n";
import type { Resume, TemplateId } from "@/lib/resume/types";
import { ClassicTemplate } from "./templates/classic";
import { CompactTemplate } from "./templates/compact";
import { ContrastTemplate } from "./templates/contrast";
import { CreativeTemplate } from "./templates/creative";
import { ElegantTemplate } from "./templates/elegant";
import { ExecutiveTemplate } from "./templates/executive";
import { FreshTemplate } from "./templates/fresh";
import { MinimalTemplate } from "./templates/minimal";
import { ModernTemplate } from "./templates/modern";
import type { TemplateProps } from "./templates/shared";
import { makeTheme } from "./theme";

const TEMPLATES: Record<TemplateId, (props: TemplateProps) => React.ReactElement> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  fresh: FreshTemplate,
  contrast: ContrastTemplate,
};

export function documentTitle(resume: Resume) {
  const { documentTitle: title } = CV_LABELS[resume.design.language];
  const name = fullName(resume.basics, resume.design.language);
  return name ? `${name} – ${title}` : title;
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
      creator={SITE.name}
      producer={SITE.name}
      language={CV_LABELS[resume.design.language].intl}
    >
      <Template resume={resume} theme={theme} />
    </Document>
  );
}
