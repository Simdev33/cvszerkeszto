# CV Stúdió – önéletrajz-generátor

Profi, magyar nyelvű önéletrajz-készítő Next.js-ben. Az adatok **csak a böngészőben** tárolódnak, a PDF is ott készül – nincs adatbázis, nincs regisztráció. Az egyetlen szerveroldali rész az opcionális AI-szövegsegéd (`/api/ai`).

## Funkciók

- **AI-szövegsegéd (Google Gemini):** a bemutatkozásnál és minden tétel leírásánál – szebbé tétel, meggyőzőbbé tétel, tömörítés, felsorolássá alakítás, üres mezőnél javaslat. A javaslat élőben íródik ki, és csak jóváhagyásra cseréli a szöveget (visszavonható). Angol CV-hez angolul ír. Csak a szerkesztett mező és a szakmai háttér megy ki, név/elérhetőség/fotó soha.
- **4 sablon:** Modern (színes oldalsáv), Elegáns (színes fejléc), Klasszikus (egyhasábos), Minimál (idővonalas)
- **Élő előnézet:** a szerkesztő mellett a valódi, letölthető PDF látszik, oldalszámmal
- **Testreszabás:** 10 kiemelő szín + egyéni szín, 5 betűtípus-páros (mind teljes magyar ékezetkészlettel), 3 méret/térköz, A4 vagy US Letter
- **Magyar és angol CV:** címsorok, dátumformátum (2021. márc. / Mar 2021) és névsorrend (Kovács Anna / Anna Kovács) automatikusan vált
- **Fotó:** feltöltés, húzással igazítható és nagyítható kivágás, kör / lekerekített / szögletes forma
- **Szakaszok:** munkatapasztalat, tanulmányok, készségek (szintjelzővel), nyelvtudás (CEFR-szintekkel), projektek, tanúsítványok, önkéntes munka, érdeklődési kör, tetszőleges számú egyéni szakasz
- Húzással rendezhető tételek és szakaszok, elrejthető szakaszok, átnevezhető címek
- **Önéletrajz-erősség mérő** konkrét tippekkel
- **Automatikus mentés** a böngészőben, **mentés/betöltés JSON-fájlba**, mintaadatok egy kattintással
- **Profi PDF:** vektoros, kijelölhető és kereshető szöveg, beágyazott betűk, kattintható linkek, ATS-barát; a címsor sosem marad árván az oldal alján
- Világos és sötét téma, mobilnézet (Szerkesztés / Előnézet fülek)

## Technológia

- [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4
- [@react-pdf/renderer](https://react-pdf.org) – PDF-sablonok React-komponensekként
- [pdf.js](https://mozilla.github.io/pdf.js/) – az élő előnézet megjelenítése
- [zustand](https://zustand.docs.pmnd.rs) + immer – állapot és automatikus mentés (localStorage)
- [Google Gemini API](https://ai.google.dev) – AI-szövegsegéd (REST + SSE, külön SDK nélkül)
- [dnd-kit](https://dndkit.com) – húzással rendezés, [lucide](https://lucide.dev) – ikonok
- Google Fonts betűk (Inter, Roboto, Montserrat, Merriweather, Playfair Display – OFL licenc) az `@expo-google-fonts` csomagokból

## Fejlesztés

Node.js 22.13+ szükséges.

```bash
npm install
npm run dev
```

Az AI-segédhez hozz létre egy `.env.local` fájlt (a git kihagyja):

```bash
GEMINI_API_KEY=a-te-gemini-kulcsod
# opcionális: a próbált modellek sorrendje, vesszővel elválasztva
# GEMINI_MODELS=gemini-3.8-flash,gemini-3.5-flash-lite,gemini-3.6-flash
```

Kulcs nélkül minden más működik, az AI-gomb ilyenkor hibaüzenetet ad. A szerver sorban próbálja a modelleket; amelyik túlterhelt (503/429) vagy menet közben megszakítja a választ, azt egy percig átugorja. IP-címenként 10 percenként legfeljebb 40 kérés mehet.

Majd nyisd meg: http://localhost:3000 (a szerkesztő: `/szerkeszto`, mintaadatokkal: `/szerkeszto?minta`).

| Parancs | Leírás |
| --- | --- |
| `npm run dev` | fejlesztői szerver |
| `npm run build` / `npm start` | production build és futtatás |
| `npm test` | unit tesztek (Vitest) – adatmodell, formázás, import, és mind a 4 sablon PDF-renderelése |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript ellenőrzés |
| `npm run thumbnails` | a sablonképek (`public/templates/*.webp`) újragenerálása a mintaadatokból |

A `scripts/copy-assets.mjs` (automatikusan fut `install`, `dev` és `build` előtt) a pdf.js workerét a `public/pdfjs/<verzió>/`, a betűket a `public/fonts/` mappába másolja.

**Vercel:** külön beállítás nélkül is működik (Framework: Next.js, alapértelmezett build parancs). Az AI-segédhez a Project → Settings → Environment Variables alatt add meg a `GEMINI_API_KEY`-t (Production és Preview), majd deployolj újra. A canonical és a megosztási (Open Graph) linkek automatikusan a projekt éles domainjét kapják (saját domain esetén azt). Más tárhelyen, vagy ha felül akarod írni, állítsd be a `NEXT_PUBLIC_SITE_URL` környezeti változót (pl. `https://cvstudio.hu`).

## Projektstruktúra

```
src/
  app/                 nyitóoldal (/), szerkesztő (/szerkeszto), favicon, OG-kép
  app/api/ai/          AI-szövegsegéd végpont (Gemini, streamelt válasz, modell-tartalék, rate limit)
  components/editor/   szerkesztő: panelek, mezők, AI-segéd, fotóvágó, előnézet, felső sáv
  components/ui/       alap UI-elemek
  lib/resume/          adatmodell, mintaadatok, formázás (dátum, név), import/export, erősség-pontszám
  lib/pdf/             PDF-sablonok (templates/), közös építőelemek, témák és betűk
  lib/ai/              AI-segéd: kérésformátum, promptok, anonim kontextus, kliens
  lib/store.ts         állapot + automatikus mentés
scripts/               asset-másolás, sablonkép-generálás
```
