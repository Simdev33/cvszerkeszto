import type { LegalContent } from "./types";

const legal: LegalContent = (site, cookie) => ({
  terms: {
    title: "Általános szerződési feltételek",
    description: `A ${site.name} önéletrajz-készítő használatának feltételei.`,
    intro: [
      `Ez a dokumentum a ${site.name} webes önéletrajz-készítő (a továbbiakban: Szolgáltatás) használatának feltételeit tartalmazza. A Szolgáltatás használatával a Felhasználó elfogadja ezeket a feltételeket; ha nem ért egyet velük, kérjük, ne használja a Szolgáltatást.`,
    ],
    sections: [
      {
        id: "provider",
        title: "A szolgáltató adatai",
        blocks: [
          {
            list: [
              `Név: ${site.operator.name}`,
              `Székhely: ${site.operator.address}`,
              `E-mail: ${site.operator.email}`,
              `Nyilvántartási szám: ${site.operator.registry}`,
              `Adószám: ${site.operator.taxNumber}`,
            ],
          },
          `Tárhelyszolgáltató: ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`,
        ],
      },
      {
        id: "service",
        title: "A szolgáltatás",
        blocks: [
          "A Szolgáltatás egy böngészőben futó, ingyenes eszköz önéletrajzok szerkesztésére és PDF formátumban történő letöltésére. Főbb funkciói: sablonok és megjelenési beállítások, élő előnézet, öt nyelvű önéletrajz, fénykép hozzáadása, mentés és betöltés JSON-fájlba, valamint egy mesterséges intelligenciát használó szövegsegéd (a továbbiakban: AI-segéd).",
          "A Szolgáltatás használata nem kötött regisztrációhoz. Az önéletrajz adatait a Felhasználó böngészője tárolja, és a PDF is a Felhasználó eszközén készül; a Szolgáltató ezekhez az adatokhoz nem fér hozzá. Kivételt csak az AI-segéd jelent, amelynek adatkezelését az Adatvédelmi tájékoztató részletezi.",
        ],
      },
      {
        id: "acceptance",
        title: "A feltételek elfogadása és hatálya",
        blocks: [
          "A feltételek a Szolgáltatás első használatával válnak a Felhasználóra nézve kötelezővé, és a használat teljes idejére érvényesek. A Szolgáltatás használatával a Felhasználó és a Szolgáltató között ingyenes, elektronikus úton kötött szerződés jön létre, amelyet a Szolgáltató nem iktat; a feltételek mindig ezen az oldalon érhetők el.",
          "A Szolgáltatást 16. életévét betöltött személy használhatja; ennél fiatalabb Felhasználó csak szülője vagy gondviselője hozzájárulásával.",
        ],
      },
      {
        id: "use",
        title: "A felhasználó kötelezettségei",
        blocks: [
          "A Felhasználó vállalja, hogy",
          {
            list: [
              "a Szolgáltatást kizárólag jogszerű célra használja;",
              "csak olyan tartalmat (például fényképet) használ fel, amelyhez joga van, és más személy adatait csak jogszerűen kezeli;",
              "nem terheli túl és nem próbálja megkerülni a Szolgáltatás korlátait, különösen nem küld automatizált vagy tömeges kéréseket az AI-segédnek;",
              "nem kísérli meg a Szolgáltatás működését megzavarni, és nem próbál jogosulatlanul hozzáférni a Szolgáltató rendszereihez.",
            ],
          },
          "Az önéletrajz tartalmáért, valóságtartalmáért és felhasználásáért kizárólag a Felhasználó felel.",
        ],
      },
      {
        id: "ai",
        title: "Az AI-segéd",
        blocks: [
          "Az AI-segéd a Felhasználó kifejezett kérésére (gombnyomásra) javaslatot készít egy mező szövegére a Google Gemini szolgáltatás segítségével. A javaslat a Felhasználó jóváhagyása nélkül nem kerül az önéletrajzba.",
          "A mesterséges intelligencia által készített szöveg hibás, pontatlan vagy a valóságnak nem megfelelő lehet. A Felhasználó köteles minden javaslatot ellenőrizni, mielőtt elfogadja és felhasználja; a Szolgáltató a javaslatok tartalmáért nem vállal felelősséget.",
          "Az AI-segéd által feldolgozott mezőkbe a Felhasználó ne írjon különleges kategóriába tartozó személyes adatot (például egészségügyi adatot), és harmadik személy olyan adatát sem, amelynek továbbítására nincs joga.",
          "Az AI-segéd használata mennyiségi korláthoz kötött, és külső szolgáltatótól függ, ezért időnként lassú vagy elérhetetlen lehet. A Szolgáltató a funkciót bármikor módosíthatja vagy megszüntetheti.",
        ],
      },
      {
        id: "ip",
        title: "Szellemi tulajdon",
        blocks: [
          "A Szolgáltatás szoftvere, arculata, sablonjai és szövegei a Szolgáltató, illetve licencadói szellemi tulajdonát képezik. A beágyazott betűtípusok a SIL Open Font License szerint használhatók.",
          "A Felhasználó által bevitt tartalom a Felhasználóé. Az elkészített PDF-önéletrajzot – a benne alkalmazott sablonnal együtt – a Felhasználó díj és forrásmegjelölés nélkül, korlátozás nélkül felhasználhatja saját álláskeresési és szakmai céljaira.",
          "A Szolgáltatást vagy annak sablonjait a Szolgáltató engedélye nélkül tilos másolni, újraértékesíteni vagy saját szolgáltatásként kínálni.",
        ],
      },
      {
        id: "data",
        title: "Adatok és biztonsági mentés",
        blocks: [
          "Az önéletrajz adatai kizárólag a Felhasználó böngészőjében tárolódnak. A böngészési adatok törlése, a böngésző vagy az eszköz cseréje, illetve privát böngészés esetén az adatok elveszhetnek. A Felhasználó felelőssége, hogy a „Mentés fájlba” funkcióval biztonsági mentést készítsen; a Szolgáltató az elveszett adatokat nem tudja helyreállítani.",
        ],
      },
      {
        id: "liability",
        title: "Felelősség",
        blocks: [
          "A Szolgáltatás a jelenlegi állapotában és az elérhetőség függvényében vehető igénybe. A Szolgáltató törekszik a folyamatos és hibamentes működésre, de ezt nem garantálja: karbantartás, hiba vagy külső szolgáltatók (tárhely, AI) kiesése miatt a Szolgáltatás átmenetileg elérhetetlen lehet.",
          "A Szolgáltató – a jogszabályok által megengedett mértékben – nem felel különösen",
          {
            list: [
              "az álláspályázatok és egyéb jelentkezések eredményéért;",
              "az önéletrajz tartalmáért és helyességéért;",
              "a böngészőben tárolt adatok elvesztéséért;",
              "az AI-segéd javaslatainak tartalmáért;",
              "a Felhasználó eszközének vagy internetkapcsolatának hibáiból eredő károkért.",
            ],
          },
          "A felelősség korlátozása nem vonatkozik a szándékosan vagy súlyos gondatlansággal okozott, valamint az életet, testi épséget vagy egészséget megkárosító szerződésszegésért való felelősségre, sem azokra az esetekre, amelyekben a felelősséget jogszabály nem engedi kizárni.",
        ],
      },
      {
        id: "fees",
        title: "Díjak",
        blocks: [
          "A Szolgáltatás jelenleg teljes egészében ingyenes. Ha a Szolgáltató a jövőben díjköteles funkciót vezet be, annak feltételeit a bevezetés előtt jól láthatóan közli, és díjköteles funkció csak a Felhasználó kifejezett elfogadásával vehető igénybe.",
        ],
      },
      {
        id: "changes",
        title: "Módosítás és megszüntetés",
        blocks: [
          "A Szolgáltató jogosult a feltételeket módosítani. A módosított feltételeket a hatálybalépés napjának feltüntetésével ezen az oldalon teszi közzé; a Szolgáltatás további használata a módosított feltételek elfogadásának minősül.",
          "A Szolgáltató a Szolgáltatást bármikor módosíthatja, szüneteltetheti vagy megszüntetheti. Mivel az önéletrajz adatai a Felhasználó böngészőjében vannak, a megszüntetés ezeket nem érinti, és a JSON-mentés a Szolgáltatástól függetlenül is megőrizhető.",
        ],
      },
      {
        id: "law",
        title: "Irányadó jog, panaszok",
        blocks: [
          "A feltételekre a magyar jog az irányadó. Ha a Felhasználó fogyasztó, ez a rendelkezés nem fosztja meg attól a védelemtől, amelyet a szokásos tartózkodási helye szerinti ország kötelezően alkalmazandó fogyasztóvédelmi szabályai biztosítanak.",
          `Kérdés, panasz vagy észrevétel esetén a Felhasználó a ${site.operator.email} címen fordulhat a Szolgáltatóhoz, amely a megkeresésre legfeljebb 30 napon belül érdemben válaszol. A jogviták elbírálására a jogszabályok szerint illetékes bíróság jogosult; a fogyasztó a lakóhelye szerint illetékes békéltető testülethez is fordulhat.`,
          "A feltételek több nyelven érhetők el; eltérés esetén a magyar nyelvű változat az irányadó.",
        ],
      },
    ],
  },

  privacy: {
    title: "Adatvédelmi tájékoztató",
    description: `Milyen adatokat kezel a ${site.name}, és milyen jogai vannak a Felhasználónak.`,
    intro: [
      `A ${site.name} úgy készült, hogy a lehető legkevesebb személyes adatot kezelje: nincs regisztráció, nincs adatbázis, nincs analitika és nincs követés. Ez a tájékoztató az Európai Unió általános adatvédelmi rendelete (GDPR) alapján bemutatja, milyen adatok kerülnek feldolgozásra, és milyen jogai vannak a Felhasználónak.`,
    ],
    sections: [
      {
        id: "controller",
        title: "Az adatkezelő",
        blocks: [
          {
            list: [`Név: ${site.operator.name}`, `Cím: ${site.operator.address}`, `E-mail: ${site.operator.email}`],
          },
          "Adatvédelmi kérdésekben a fenti e-mail-címen lehet az adatkezelőhöz (a továbbiakban: Adatkezelő) fordulni.",
        ],
      },
      {
        id: "summary",
        title: "Röviden",
        blocks: [
          {
            list: [
              "Az önéletrajz adatai – a fényképpel együtt – kizárólag a Felhasználó böngészőjében tárolódnak; az Adatkezelő ezeket nem kapja meg és nem látja.",
              "A PDF a Felhasználó eszközén készül.",
              "Az AI-segéd csak gombnyomásra küld adatot, akkor is csak a szerkesztett mező szövegét és a szakmai hátteret – nevet, elérhetőséget, születési dátumot és fényképet soha.",
              "Nincs regisztráció, nincs analitika, nincsenek hirdetési vagy követő sütik.",
            ],
          },
        ],
      },
      {
        id: "local",
        title: "A böngészőben tárolt adatok",
        blocks: [
          "Az önéletrajz tartalmát, a fényképet és a megjelenési beállításokat a Szolgáltatás a böngésző helyi tárhelyén (localStorage) menti, hogy a munka ne vesszen el. Ezek az adatok – az AI-segéd alább leírt esetét kivéve – nem kerülnek továbbításra sem az Adatkezelőnek, sem más szervezetnek, így ezek tekintetében az Adatkezelő adatkezelést nem végez.",
          "A választott megjelenési téma (világos vagy sötét) szintén a helyi tárhelyen tárolódik. A Felhasználó ezeket az adatokat bármikor törölheti a „Fájl → Új, üres önéletrajz” menüponttal vagy a böngésző adatainak törlésével.",
        ],
      },
      {
        id: "cookie",
        title: "Nyelvi beállítás (süti)",
        blocks: [
          `Ha a Felhasználó nyelvet vált, a Szolgáltatás egy „${cookie}” nevű sütit állít be, amely a választott nyelv kódját (például „hu”) tárolja legfeljebb egy évig, hogy a következő látogatáskor az oldal a megfelelő nyelven jelenjen meg. Ez a süti a Felhasználó által kifejezetten kért funkcióhoz feltétlenül szükséges és személyazonosításra nem alkalmas, ezért hozzájárulást nem igényel. Más sütit a Szolgáltatás nem használ.`,
        ],
      },
      {
        id: "ai",
        title: "Az AI-segéd",
        blocks: [
          "Amikor a Felhasználó az AI-segédet használja, a Szolgáltatás a következő adatokat küldi el az Adatkezelő szerverének, amely azokat a Google Gemini API-nak továbbítja:",
          {
            list: [
              "a szerkesztett mező (bemutatkozás vagy tételleírás) aktuális szövegét;",
              "a szakmai hátteret: a szakmai címet, a tételek megnevezését, szervezetét és időszakát, a leírások rövidített változatát, a készségeket és a nyelvtudást (a bemutatkozás megírásakor az egész önéletrajz ilyen összefoglalóját);",
              "az önéletrajz nyelvét és a kért műveletet.",
            ],
          },
          "Nem kerül elküldésre a név, az e-mail-cím, a telefonszám, a lakhely, a weboldal- és profilhivatkozások, a születési dátum és a fénykép. Ha azonban a Felhasználó a szerkesztett mezőbe maga ír személyes adatot, az a szöveg részeként továbbításra kerül.",
          "**Cél:** a kért szövegjavaslat elkészítése. **Jogalap:** a Felhasználó által kifejezetten kért szolgáltatás nyújtása (GDPR 6. cikk (1) bekezdés b) pont).",
          `**Időtartam:** az Adatkezelő a szöveget nem tárolja és nem naplózza, az csak a válasz elkészítéséig létezik a szerver memóriájában. A Google a kéréseket a Gemini API feltételei szerint kezeli: ${site.ai.terms}`,
          "Az AI-segéd használata nem kötelező; a Szolgáltatás minden más funkciója nélküle is működik.",
        ],
      },
      {
        id: "logs",
        title: "Technikai adatok és naplózás",
        blocks: [
          "Az oldalak kiszolgálása és az AI-segéd kéréseinek feldolgozása során a tárhelyszolgáltató szerverei technikai adatokat (IP-cím, időpont, kért cím, böngésző típusa) rögzítenek a működés biztosítása és a visszaélések megelőzése érdekében. Az AI-segéd kéréseinél az IP-cím legfeljebb 10 percig a szerver memóriájában is megmarad, hogy a túlzott használat korlátozható legyen.",
          "**Jogalap:** az Adatkezelő jogos érdeke a Szolgáltatás biztonságos működtetéséhez (GDPR 6. cikk (1) bekezdés f) pont). **Időtartam:** rövid ideig, a tárhelyszolgáltató naplózási beállításai szerint.",
        ],
      },
      {
        id: "contact",
        title: "Kapcsolatfelvétel e-mailben",
        blocks: [
          "Ha a Felhasználó e-mailben keresi meg az Adatkezelőt, a levélben szereplő adatokat (név, e-mail-cím, az üzenet tartalma) az Adatkezelő a megkeresés megválaszolása céljából, jogos érdeke alapján (GDPR 6. cikk (1) bekezdés f) pont) kezeli, az ügy lezárásától számított legfeljebb egy évig.",
        ],
      },
      {
        id: "processors",
        title: "Adatfeldolgozók és adattovábbítás",
        blocks: [
          {
            list: [
              `${site.hosting.name} (${site.hosting.address}) – tárhely és szerver-infrastruktúra;`,
              `${site.ai.name} (${site.ai.address}) – a Gemini API, amely az AI-segéd javaslatait készíti.`,
            ],
          },
          "Mindkét szolgáltató az Amerikai Egyesült Államokban is végez adatkezelést. Az adattovábbítás az EU–USA adatvédelmi keretrendszer (Data Privacy Framework), illetve az Európai Bizottság által elfogadott általános adatvédelmi szerződési feltételek alapján történik.",
          "Az Adatkezelő személyes adatot nem ad el, marketing- vagy profilalkotási célra nem használ, és automatizált döntéshozatal nem történik.",
        ],
      },
      {
        id: "rights",
        title: "A Felhasználó jogai",
        blocks: [
          "A GDPR alapján a Felhasználó kérheti a rá vonatkozó személyes adatokhoz való hozzáférést, azok helyesbítését, törlését vagy kezelésének korlátozását, tiltakozhat a jogos érdeken alapuló adatkezelés ellen, és élhet az adathordozhatóság jogával. Az Adatkezelő a kérelmet legfeljebb egy hónapon belül teljesíti.",
          "Mivel az Adatkezelő az önéletrajz adatait nem tárolja, ezek tekintetében a jogok (például a törlés) közvetlenül a Felhasználó böngészőjében gyakorolhatók.",
          `Panasz esetén a Felhasználó a felügyeleti hatósághoz fordulhat: ${site.authority.name}, ${site.authority.address}, ${site.authority.email}, ${site.authority.website}. Emellett a szokásos tartózkodási helye vagy munkahelye szerinti uniós adatvédelmi hatósághoz, illetve bírósághoz is fordulhat.`,
        ],
      },
      {
        id: "children",
        title: "Gyermekek",
        blocks: [
          "A Szolgáltatás nem kifejezetten 16 éven aluliaknak szól. 16 év alatti Felhasználó az AI-segédet csak szülője vagy gondviselője hozzájárulásával használhatja.",
        ],
      },
      {
        id: "security",
        title: "Adatbiztonság",
        blocks: [
          "Az oldal és a szerver közötti kapcsolat titkosított (HTTPS), az API-kulcsok kizárólag a szerveren tárolódnak. Mivel az önéletrajz adatai a Felhasználó eszközén vannak, biztonságukhoz az eszköz védelme is hozzátartozik (például képernyőzár, közös gépen a böngészési adatok törlése).",
        ],
      },
      {
        id: "changes",
        title: "A tájékoztató módosítása",
        blocks: ["Az Adatkezelő a tájékoztatót módosíthatja. A hatályos változat a hatálybalépés napjával mindig ezen az oldalon érhető el."],
      },
    ],
  },
});

export default legal;
