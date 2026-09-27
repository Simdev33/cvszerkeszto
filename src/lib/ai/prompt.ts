/** Prompts for the AI writing assistant (used by the /api/ai route). */
import type { AiAction, AiRequest } from "./shared";

const LANGUAGE = { hu: "magyar", en: "angol" } as const;

function system(request: AiRequest) {
  const language = LANGUAGE[request.language];
  return [
    "Tapasztalt magyar HR-szakember és önéletrajz-szerkesztő vagy. Egy önéletrajz egyetlen mezőjének szövegét írod vagy javítod.",
    "",
    "Szabályok:",
    "- Csak a kész szöveget add vissza: bevezetés, magyarázat, idézőjel, címsor és markdown-formázás (félkövér, dőlt) nélkül.",
    "- Ne találj ki tényt: se számot, százalékot, cégnevet, eszközt, eredményt vagy felelősséget, ami nem szerepel a megadott adatokban. Ami bizonytalan, azt hagyd ki.",
    "- Ne nagyíts fel semmit: ne írj „több mint”, „számos”, „kiemelkedő” jellegű túlzást, ha az adatok nem támasztják alá; a számokat pontosan úgy vedd át, ahogy szerepelnek.",
    `- A kimenet nyelve: ${language}. Ha a bemenet más nyelvű, fordítsd le természetesen, ne tükörfordítással.`,
    "- Természetes, igényes szakmai nyelv. Kerüld a közhelyeket (pl. „csapatjátékos”, „dinamikus”, „motivált”, „team player”) és a túlzó reklámstílust.",
    request.language === "hu"
      ? "- A magyar helyesírás szabályai szerint írj (pl. 34%-kal, 40 000, Kft.), és kerüld a feleslegesen angolos kifejezéseket."
      : "- Use natural, concise British or American CV English consistently; keep proper names unchanged.",
  ].join("\n");
}

function format(request: AiRequest) {
  if (request.field === "summary") {
    const length = request.action === "shorten" ? "2–3 mondat, legfeljebb 350 karakter" : "3–4 mondat, összesen legfeljebb 600 karakter";
    return request.language === "hu"
      ? `Formátum: egyetlen bekezdés, ${length}, felsorolás nélkül, egyes szám első személyben (pl. „…termékmenedzser vagyok, aki…”). A háttéradatokból csak a legfontosabb 1–2 eredményt emeld ki, ne sorold fel a teljes pályafutást.`
      : `Formátum: egyetlen bekezdés, ${length}, felsorolás nélkül, a szokásos alany nélküli angol CV-stílusban (pl. „Product manager with…”). A háttéradatokból csak a legfontosabb 1–2 eredményt emeld ki, ne sorold fel a teljes pályafutást.`;
  }
  const bullets =
    "Formátum: tömör felsorolás, minden pont külön sorban, „- ” jellel kezdve, 3–6 pont; pontonként egy gondolat, legfeljebb kb. 15 szó. " +
    (request.language === "hu"
      ? "A pontok legyenek egységesek: főnévi szerkezettel kezdődjenek (pl. „Új ügyfélkör kiépítése”, „Havi leltár lebonyolítása”)."
      : "Start every point with a strong action verb (past tense for past roles, present tense for the current role).");
  if (request.action === "improve" || request.action === "shorten") {
    return `Az eredeti formát tartsd meg: ha felsorolás, maradjon felsorolás („- ” jellel), ha folyó szöveg, maradjon folyó szöveg. ${bullets}`;
  }
  return bullets;
}

const TASKS: Record<AiAction, (request: AiRequest) => string> = {
  write: (request) =>
    request.field === "summary"
      ? "Írj szakmai bemutatkozást az önéletrajz adatai alapján: ki a jelölt szakmailag, a tapasztalat hossza (ha a dátumokból kiderül), a fő szakterülete és 1–2 valódi erőssége. Ha a mezőben van vázlat vagy jegyzet, abból dolgozz."
      : "Írj leírást ehhez a tételhez. Ha a mezőben van vázlat vagy jegyzet, abból dolgozz; ha nincs, csak a pozícióra általánosan jellemző feladatokat írd le, konkrét számok és eredmények nélkül – ezeket a jelölt később maga egészíti ki.",
  improve: () => "Javítsd a szöveget: helyesírás, nyelvtan, gördülékenység, szakmai hangnem. A tartalom és a hossz maradjon nagyjából ugyanaz.",
  impact: () =>
    "Tedd meggyőzőbbé és eredményközpontúbbá: erős, cselekvő megfogalmazás, a felelősség és az elért eredmény kerüljön előtérbe. A meglévő számokat emeld ki, újakat ne találj ki.",
  bullets: () => "Alakítsd a szöveget egységes, tömör felsorolássá úgy, hogy minden információ megmaradjon.",
  shorten: () => "Tömörítsd a szöveget nagyjából a felére–kétharmadára úgy, hogy a legfontosabb információk megmaradjanak.",
};

const FIELD_NAME = { summary: "Szakmai bemutatkozás (összefoglaló)", description: "Egy tétel leírása" } as const;

export function buildPrompt(request: AiRequest) {
  const user = [
    request.context.trim() ? `Az önéletrajz adatai (háttér):\n${request.context.trim()}` : "",
    `Mező: ${FIELD_NAME[request.field]}`,
    `A mező jelenlegi szövege:\n"""\n${request.text.trim() || "(üres)"}\n"""`,
    `Feladat: ${TASKS[request.action](request)}`,
    format(request),
  ]
    .filter(Boolean)
    .join("\n\n");
  return { system: system(request), user };
}
