import { ArrowRight, ChevronDown, Download, Eye, FileCheck2, Globe2, LayoutTemplate, PencilLine, ShieldCheck, Sparkles, SwatchBook, WandSparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

const TEMPLATES = [
  { id: "modern", name: "Modern", text: "Színes oldalsáv a kapcsolatnak és a készségeknek, tágas főhasáb a tapasztalatnak." },
  { id: "elegant", name: "Elegáns", text: "Karakteres fejléc talpas címekkel, finoman színezett oldalsávval." },
  { id: "classic", name: "Klasszikus", text: "Hagyományos, egyhasábos elrendezés – bankoknak, közszférának, jogi pályára." },
  { id: "minimal", name: "Minimál", text: "Letisztult idővonal sok levegővel, ahol a tartalom beszél." },
];

const FEATURES = [
  { icon: <Eye />, title: "Élő előnézet", text: "Minden leütés azonnal megjelenik a valódi PDF-en – letöltéskor nem ér meglepetés." },
  { icon: <FileCheck2 />, title: "ATS-barát PDF", text: "Valódi, kijelölhető szöveg beágyazott betűkkel: a HR-rendszerek és állásportálok is gond nélkül beolvassák." },
  { icon: <Globe2 />, title: "Magyar és angol CV", text: "Egy kattintással angolra váltanak a címsorok, a dátumok és a névsorrend – külföldi jelentkezéshez." },
  { icon: <SwatchBook />, title: "A te stílusod", text: "4 sablon, 10 kiemelő szín vagy bármilyen egyéni szín, 5 betűtípus és igazítható fotó." },
  { icon: <WandSparkles />, title: "AI-szövegsegéd", text: "Egy kattintással szebbé, meggyőzőbbé vagy tömörebbé teszi a bemutatkozásod és a munkaköri leírásaidat – a javaslatot te hagyod jóvá." },
  { icon: <ShieldCheck />, title: "Automatikus mentés, adatvédelem", text: "Regisztráció nélkül, minden változás a böngésződben mentődik. Az AI-segéd csak az épp szerkesztett mezőt küldi el, nevet és elérhetőséget soha." },
];

const STEPS = [
  { icon: <LayoutTemplate />, title: "Válassz sablont", text: "Négy letisztult, nyomdakész sablon – bármikor válthatsz, az adataid megmaradnak." },
  { icon: <PencilLine />, title: "Töltsd ki", text: "Egyszerű űrlapok, példákkal és tippekkel. Az erősség-mérő megmutatja, mi hiányzik még." },
  { icon: <Download />, title: "Töltsd le PDF-ben", text: "Egy kattintás, és kész a tökéletes, kijelölhető szövegű PDF – vízjel nélkül." },
];

const FAQ = [
  { q: "Tényleg ingyenes?", a: "Igen. Nincs rejtett díj, előfizetés, regisztráció vagy vízjel – a letöltött PDF teljesen a tiéd." },
  {
    q: "Hol tárolódnak az adataim?",
    a: "A saját böngésződben – nálunk nincs fiók és nincs adatbázis. Ha törlöd a böngészési adatokat, az önéletrajz is törlődik, ezért érdemes a „Fájl → Mentés fájlba” funkcióval biztonsági mentést készíteni.",
  },
  {
    q: "Mit csinál az AI-segéd, és mit lát belőlem?",
    a: "A bemutatkozásnál és a munkaköri leírásoknál az „AI-segéd” gombbal kérhetsz javított, meggyőzőbb, tömörebb vagy felsorolásos változatot, üres mezőnél pedig javaslatot. Ilyenkor csak az adott mező szövege és a szakmai háttér (pozíció, cég, készségek) kerül a Google Gemini-hez feldolgozásra – neved, elérhetőséged és fotód soha. Mi semmit nem tárolunk belőle, és a javaslat csak akkor kerül az önéletrajzba, ha jóváhagyod.",
  },
  {
    q: "Tegyek fényképet az önéletrajzba?",
    a: "Magyarországon gyakori és sok helyen elvárt, de nem kötelező. Nemzetközi, különösen angolszász cégeknél inkább hagyd el. Ha teszel, legyen világos hátterű, igényes portré.",
  },
  { q: "Milyen hosszú legyen az önéletrajz?", a: "Pályakezdőként egy oldal, tapasztalt szakemberként legfeljebb kettő. Az előnézet mutatja az oldalszámot, a „Kompakt” méret pedig segít egy oldalra férni." },
  {
    q: "Beolvassák a HR-rendszerek (ATS)?",
    a: "Igen. A PDF valódi, kijelölhető szöveget tartalmaz beágyazott betűtípusokkal. A legbiztonságosabbak az egyhasábos sablonok (Klasszikus, Minimál).",
  },
  { q: "Hogyan folytathatom másik gépen?", a: "A szerkesztőben válaszd a „Fájl → Mentés fájlba” menüpontot, majd a másik gépen a „Betöltés fájlból” lehetőséget." },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="shrink-0 rounded-lg">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-fg-muted md:flex">
          <a href="#sablonok" className="hover:text-fg">
            Sablonok
          </a>
          <a href="#funkciok" className="hover:text-fg">
            Funkciók
          </a>
          <a href="#gyik" className="hover:text-fg">
            GYIK
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/szerkeszto"
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-fg shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            Önéletrajz készítése
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative overflow-x-clip">
        <div className="bg-grid-dots pointer-events-none absolute inset-x-0 top-0 h-[720px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute top-[-200px] left-1/2 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

        <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-fg-muted shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              Ingyenes · Regisztráció nélkül · AI-szövegsegéddel
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl">
              Profi önéletrajz,
              <br />
              <span className="bg-linear-to-r from-primary via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">percek alatt.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-fg-muted sm:text-lg lg:mx-0">
              Válassz egy letisztult sablont, töltsd ki az adataidat, és töltsd le nyomtatásra kész PDF-ben. Élő előnézettel, magyar és angol nyelven.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/szerkeszto"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-medium text-primary-fg shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
              >
                Önéletrajz készítése
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/szerkeszto?minta"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-surface px-6 text-[15px] font-medium ring-1 ring-border-strong/70 transition-colors ring-inset hover:bg-surface-2"
              >
                Minta megtekintése
              </Link>
            </div>
            <p className="mt-5 text-[13px] text-fg-subtle">Nem kell fiók, azonnal kezdheted.</p>
          </div>

          <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px]">
            <Image
              src="/templates/elegant.webp"
              alt=""
              width={952}
              height={1347}
              className="absolute top-6 right-0 w-[58%] rotate-[5deg] rounded-lg shadow-2xl ring-1 ring-black/5"
            />
            <Image
              src="/templates/modern.webp"
              alt="Minta önéletrajz a Modern sablonnal"
              width={952}
              height={1347}
              priority
              className="absolute top-0 left-[8%] w-[62%] -rotate-[3deg] rounded-lg shadow-2xl ring-1 ring-black/5"
            />
          </div>
        </section>

        <section id="sablonok" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Sablonok</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">Négy sablon, amivel jó benyomást keltesz</h2>
            <p className="mt-3 text-fg-muted">Mindegyik testre szabható színnel, betűtípussal és mérettel – és bármikor válthatsz közöttük.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.map((template) => (
              <Link key={template.id} href={`/szerkeszto?sablon=${template.id}`} className="group">
                <div className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <Image src={`/templates/${template.id}.webp`} alt={`${template.name} sablon`} width={952} height={1347} className="h-auto w-full" />
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 font-semibold">
                  {template.name}
                  <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{template.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="funkciok" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Funkciók</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">Minden, ami egy jó önéletrajzhoz kell</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary [&_svg]:size-5">{feature.icon}</span>
                <h3 className="mt-4 font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary-soft text-primary [&_svg]:size-4">{step.icon}</span>
                  <span className="font-mono text-xs text-fg-subtle">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/szerkeszto"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-medium text-primary-fg shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
            >
              Kezdjük!
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section id="gyik" className="relative mx-auto max-w-3xl scroll-mt-20 px-5 py-16">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Gyakori kérdések</h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 py-1 font-medium">
                  {item.q}
                  <ChevronDown className="size-4 shrink-0 text-fg-subtle transition-transform group-open:rotate-180" />
                </summary>
                <p className="pt-2 pb-1 text-sm leading-relaxed text-fg-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="relative border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-fg-subtle sm:flex-row">
            <p>© {new Date().getFullYear()} CV Stúdió</p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" /> Minden adat a böngésződben marad.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
