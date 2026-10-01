# GetProCV – önéletrajz-készítő

**getprocv.com** – profi, ötnyelvű (angol, magyar, francia, német, spanyol) önéletrajz-készítő Next.js-ben. Üzemeltető: TourCierge s. r. o. (Pozsony). Az önéletrajz **csak a böngészőben** tárolódik, a PDF is ott készül. Az írás, a tervezés, az előnézet és az AI-segéd ingyenes; **a PDF letöltéséhez előfizetés kell: 7 nap 4,99 €, utána 9,99 €/hó** (bármikor lemondható).

## Fizetés (Stripe)

- **Csomag:** 7 napos próbaidős előfizetés + 4,99 € egyszeri díj az első számlán, utána 9,99 €/hó (`src/lib/plan.ts`). Az árakat és a terméket az első fizetéskor az alkalmazás hozza létre a Stripe-ban (vagy `STRIPE_PRICE_*`).
- **Pénztár:** saját fizetési képernyő a letöltés gomb helyett (`src/components/paywall/*`), Checkout Session `ui_mode: "elements"` – expressz gombok (Apple Pay, Google Pay, PayPal, Link) + kártya. Hozzájárulás nélkül (ÁSZF + adatvédelem + azonnali kezdés kérése) nem lehet fizetni.
- **Nincs adatbázis:** a Stripe az igazság. Fizetés után aláírt, httpOnly süti léptet be (`gp_session`); más eszközön 6 jegyű e-mailes kóddal (Resend; a kód hash-e a Stripe-ügyfél metaadataiban). Fiók: `/account` (`/hu/fiok` …) → Stripe ügyfélportál (lemondás, kártyacsere, számlák).
- **Közös Stripe-fiók** a DoneSignIn-nel és a ConvertPDFNow-val: minden GetProCV-objektum `metadata.app = "getprocv"`, és csak a saját előfizetés ad hozzáférést.
- A letöltés-kapu a böngészőben fut (a PDF is ott készül), technikailag megkerülhető – ugyanúgy, mint a testvéroldalakon.

## Funkciók

- **AI-szövegsegéd (Google Gemini):** a bemutatkozásnál és minden tétel leírásánál – szebbé tétel, meggyőzőbbé tétel, tömörítés, felsorolássá alakítás, üres mezőnél javaslat. A javaslat élőben íródik ki, és csak jóváhagyásra cseréli a szöveget (visszavonható). Mindig az önéletrajz nyelvén ír (szükség esetén fordít). Csak a szerkesztett mező és a szakmai háttér megy ki, név/elérhetőség/fotó soha.
- **4 sablon:** Modern (színes oldalsáv), Elegáns (színes fejléc), Klasszikus (egyhasábos), Minimál (idővonalas)
- **Élő előnézet:** a szerkesztő mellett a valódi, letölthető PDF látszik, oldalszámmal
- **Testreszabás:** 10 kiemelő szín + egyéni szín, 5 betűtípus-páros (mind teljes magyar ékezetkészlettel), 3 méret/térköz, A4 vagy US Letter
- **Öt nyelv, angol a fő nyelv:** az angol előtag nélkül él a gyökérben (`/`, `/editor`, `/terms`, `/privacy`, `/account`; az `/en/…` átirányít), a többi nyelv előtaggal és lefordított címekkel (`/hu/szerkeszto`, `/fr/editeur`, `/de/agb` …). A `/` első látogatáskor a böngésző nyelvére irányít (a nyelvválasztó `NEXT_LOCALE` sütije felülírja), a régi `/szerkeszto` link is működik.
- **Ötnyelvű CV:** címsorok, dátumformátum (2021. márc. / Mar 2021 / mars 2021 / 03/2021 / mar. 2021) és névsorrend (Kovács Anna / Anna Kovács) a CV nyelvéhez igazodik – ez független a felület nyelvétől; nyelvenként saját mintaszemély
- **ÁSZF és adatvédelmi tájékoztató** mind az öt nyelven (angol a forrás és az irányadó), a TourCierge s. r. o. adataival, szlovák joggal, előfizetési, lemondási és elállási feltételekkel
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
- [Stripe](https://stripe.com) – előfizetés (`stripe`, `@stripe/react-stripe-js`), [Resend](https://resend.com) – belépési kódok e-mailben
- [dnd-kit](https://dndkit.com) – húzással rendezés, [lucide](https://lucide.dev) – ikonok
- Google Fonts betűk (Inter, Roboto, Montserrat, Merriweather, Playfair Display – OFL licenc) az `@expo-google-fonts` csomagokból

**Új nyelv hozzáadása:** `src/i18n/config.ts` (nyelvkód, név, útvonalak), `src/i18n/dictionaries/<nyelv>.ts`, `src/legal/<nyelv>.ts`, `src/lib/resume/samples/<nyelv>.ts` és a CV-címkék a `src/lib/resume/i18n.ts`-ben; az `npm test` jelzi, ha bármi hiányzik.

## Fejlesztés

Node.js 22.13+ szükséges.

```bash
npm install
npm run dev
```

A kulcsokat a `.env.local` fájlba tedd (a git kihagyja) – minta és leírás: [`.env.example`](.env.example). Röviden: `GEMINI_API_KEY` (AI-segéd), `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (fizetés), `SESSION_SECRET` (belépési sütik aláírása), `RESEND_API_KEY` + `EMAIL_FROM` (belépési kódok; fejlesztésben kulcs nélkül a kód a szervernaplóba kerül).

Gemini-kulcs nélkül minden más működik, az AI-gomb ilyenkor hibaüzenetet ad. A szerver sorban próbálja a modelleket; amelyik túlterhelt (503/429) vagy menet közben megszakítja a választ, azt egy percig átugorja. IP-címenként 10 percenként legfeljebb 40 kérés mehet.

Majd nyisd meg: http://localhost:3000 (a szerkesztő: `/editor`, magyarul `/hu/szerkeszto`; mintaadatokkal `?sample`, adott sablonnal `?template=elegant`). Teszt-fizetés: 4242 4242 4242 4242, bármilyen jövőbeli lejárat és CVC.

| Parancs | Leírás |
| --- | --- |
| `npm run dev` | fejlesztői szerver |
| `npm run build` / `npm start` | production build és futtatás |
| `npm test` | unit tesztek (Vitest) – adatmodell, formázás, import, PDF-renderelés, AI-segéd, és hogy mind az öt nyelv szótára, jogi szövege és mintája teljes |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript ellenőrzés |
| `npm run thumbnails` | a sablonképek (`public/templates/<nyelv>/*.webp`) újragenerálása a nyelvenkénti mintaadatokból |
| `npm run icons` | favicon.ico, apple-icon.png és a manifest-ikonok újragenerálása a `src/app/icon.svg`-ből |

**Élesítés előtt** add meg az üzemeltető (TourCierge s. r. o.) kapcsolati e-mail-címét a `src/config/site.ts`-ben – amíg üres, a jogi oldalakon „to be completed” jelölés látszik. A jogi szövegek gondos sablonok; érdemes jogásszal átnézetni.

A `scripts/copy-assets.mjs` (automatikusan fut `install`, `dev` és `build` előtt) a pdf.js workerét a `public/pdfjs/<verzió>/`, a betűket a `public/fonts/` mappába másolja.

**Vercel:** Framework: Next.js, alapértelmezett build parancs. A Project → Settings → Environment Variables alatt add meg a `.env.example` változóit (élesben `SESSION_SECRET` és `RESEND_API_KEY` kötelező, és a Resendben a getprocv.com domaint hitelesíteni kell), majd deployolj újra. Productionben a linkek alapból a https://getprocv.com címre mutatnak; ezt a `NEXT_PUBLIC_SITE_URL` írja felül. Az expressz fizetési gombokhoz (Apple Pay, Google Pay) a domaint a Stripe-ban is regisztrálni kell.

## Projektstruktúra

```
src/
  app/[lang]/          nyitóoldal, [page] = szerkesztő / ÁSZF / adatvédelem / fiók (lefordított címmel), 404, OG-kép – nyelvenként
  app/api/ai/          AI-szövegsegéd végpont (Gemini, streamelt válasz, modell-tartalék, rate limit)
  app/api/checkout|auth|account/  Stripe-pénztár, e-mailes kódos belépés, fiók és ügyfélportál
  app/icon.svg         a logó (favicon forrása; `npm run icons`)
  components/editor/   szerkesztő: panelek, mezők, AI-segéd, fotóvágó, előnézet, felső sáv
  components/          közös fejléc/lábléc, logó, nyelvválasztó, jogi oldal; paywall/ = fizetési képernyő; account/ = belépés, fiók; ui/ = alap UI-elemek
  config/              site.ts = márka, üzemeltető, adatfeldolgozók; cookies.ts = sütinevek
  i18n/                nyelvek és címek (config), szótárak (dictionaries/), kliens-kontextus, formázás
  legal/               ÁSZF és adatvédelmi tájékoztató nyelvenként
  proxy.ts             nyelvi átirányítás
  lib/resume/          adatmodell, nyelvenkénti mintaadatok (samples/), CV-címkék (i18n.ts), formázás, import/export, erősség-pontszám
  lib/pdf/             PDF-sablonok (templates/), közös építőelemek, témák és betűk
  lib/ai/              AI-segéd: kérésformátum, promptok, anonim kontextus, kliens
  lib/server/          Stripe (billing), munkamenet-sütik, kódos belépés, e-mail, kéréskorlát
  lib/plan.ts          a csomag (4,99 € / 7 nap, 9,99 €/hó)
  lib/account.ts, lib/download.ts  fiók-állapot a böngészőben, letöltés vagy fizetési képernyő
  lib/store.ts         állapot + automatikus mentés
scripts/               asset-másolás, sablonkép- és ikongenerálás
```
