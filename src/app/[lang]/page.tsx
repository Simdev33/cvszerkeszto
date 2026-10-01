import { ArrowRight, Check, ChevronDown, Download, Eye, FileCheck2, Globe2, LayoutTemplate, PencilLine, ShieldCheck, Sparkles, SwatchBook, WandSparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { priceVars } from "@/lib/plan";

const TEMPLATE_IDS = ["modern", "elegant", "classic", "minimal", "executive", "creative", "compact", "fresh", "contrast"] as const;
// Same order as landing.features.items and landing.steps in the dictionaries.
const FEATURE_ICONS = [<Eye key="0" />, <FileCheck2 key="1" />, <Globe2 key="2" />, <WandSparkles key="3" />, <SwatchBook key="4" />, <ShieldCheck key="5" />];
const STEP_ICONS = [<LayoutTemplate key="0" />, <PencilLine key="1" />, <Download key="2" />];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.landing;
  const editor = localePath(lang, "editor");
  const price = priceVars(lang);

  return (
    <>
      <SiteHeader lang={lang} dict={dict} anchors />
      <main className="relative overflow-x-clip">
        <div className="bg-grid-dots pointer-events-none absolute inset-x-0 top-0 h-[720px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute top-[-200px] left-1/2 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

        <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-fg-muted shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              {t.hero.badge}
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl">
              {t.hero.title1}
              <br />
              <span className="bg-linear-to-r from-primary via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">{t.hero.title2}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-fg-muted sm:text-lg lg:mx-0">{t.hero.text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href={editor}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-medium text-primary-fg shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
              >
                {t.hero.cta}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`${editor}?sample`}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-surface px-6 text-[15px] font-medium ring-1 ring-border-strong/70 transition-colors ring-inset hover:bg-surface-2"
              >
                {t.hero.sample}
              </Link>
            </div>
            <p className="mt-5 text-[13px] text-fg-subtle">{t.hero.note}</p>
          </div>

          <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px]">
            <Image
              src={`/templates/${lang}/elegant.webp`}
              alt=""
              width={952}
              height={1347}
              className="absolute top-6 right-0 w-[58%] rotate-[5deg] rounded-lg shadow-2xl ring-1 ring-black/5"
            />
            <Image
              src={`/templates/${lang}/modern.webp`}
              alt={t.hero.imageAlt}
              width={952}
              height={1347}
              priority
              className="absolute top-0 left-[8%] w-[62%] -rotate-[3deg] rounded-lg shadow-2xl ring-1 ring-black/5"
            />
          </div>
        </section>

        <section id="templates" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">{t.templates.kicker}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">{t.templates.title}</h2>
            <p className="mt-3 text-fg-muted">{t.templates.text}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATE_IDS.map((id) => {
              const template = t.templates.items[id];
              return (
                <Link key={id} href={`${editor}?template=${id}`} className="group">
                  <div className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <Image src={`/templates/${lang}/${id}.webp`} alt={fmt(t.templates.alt, { name: template.name })} width={952} height={1347} className="h-auto w-full" />
                  </div>
                  <h3 className="mt-4 flex items-center gap-1.5 font-semibold">
                    {template.name}
                    <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{template.text}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="features" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">{t.features.kicker}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">{t.features.title}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((feature, index) => (
              <article key={feature.title} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary [&_svg]:size-5">{FEATURE_ICONS[index]}</span>
                <h3 className="mt-4 font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">{t.pricing.kicker}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">{t.pricing.title}</h2>
            <p className="mt-3 text-fg-muted">{t.pricing.text}</p>
          </div>
          <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-xl shadow-primary/10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-[#8b5cf6] to-[#ec4899]" />
            <p className="font-semibold">{fmt(t.pricing.label, price)}</p>
            <p className="mt-2 text-5xl font-semibold tracking-tight tabular-nums">{price.trial}</p>
            <ul className="mt-6 space-y-2.5">
              {t.pricing.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[15px] text-fg-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={editor}
              className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-medium text-primary-fg shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
            >
              {t.pricing.cta}
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-fg-subtle">{fmt(t.pricing.renewal, price)}</p>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {t.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary-soft text-primary [&_svg]:size-4">{STEP_ICONS[index]}</span>
                  <span className="font-mono text-xs text-fg-subtle">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href={editor}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-medium text-primary-fg shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
            >
              {t.start}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section id="faq" className="relative mx-auto max-w-3xl scroll-mt-20 px-5 py-16">
          <h2 className="text-center text-3xl font-semibold tracking-tight">{t.faq.title}</h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
            {t.faq.items.map((item) => (
              <details key={item.q} className="group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 py-1 font-medium">
                  {item.q}
                  <ChevronDown className="size-4 shrink-0 text-fg-subtle transition-transform group-open:rotate-180" />
                </summary>
                <p className="pt-2 pb-1 text-sm leading-relaxed text-fg-muted">{fmt(item.a, price)}</p>
              </details>
            ))}
          </div>
        </section>

        <SiteFooter lang={lang} dict={dict} />
      </main>
    </>
  );
}
