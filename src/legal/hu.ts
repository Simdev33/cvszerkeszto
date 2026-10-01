import type { LegalContent } from "./types";

// Magyar jogi szövegek – az angol (en.ts) fordítása.
const legal: LegalContent = ({ site, email, price, cookies }) => {
  const operator = {
    list: [
      `Név: ${site.operator.name}`,
      `Székhely: ${site.operator.address}`,
      `Nyilvántartási szám: ${site.operator.registry}`,
      `Adószám: ${site.operator.taxNumber}`,
      `E-mail: ${email}`,
    ],
  };

  return {
    terms: {
      title: "Általános szerződési feltételek",
      description: `A ${site.name} használatának és az arra szóló előfizetésnek a feltételei.`,
      intro: [
        `Ez a dokumentum a ${site.name} webes szolgáltatás (https://${site.domain}, a továbbiakban: Szolgáltatás) használatának és az arra szóló előfizetésnek a feltételeit tartalmazza. A Szolgáltatás használatával vagy az előfizetés megrendelésével elfogadod ezeket a feltételeket; ha nem értesz egyet velük, kérjük, ne használd a Szolgáltatást.`,
      ],
      sections: [
        {
          id: "operator",
          title: "Az üzemeltető",
          blocks: ["A Szolgáltatást az alábbi üzemeltető nyújtja (a továbbiakban: Üzemeltető):", operator, `Tárhelyszolgáltató: ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`],
        },
        {
          id: "service",
          title: "A Szolgáltatás",
          blocks: [
            `A ${site.name} egy online eszköz, amellyel önéletrajzot írhatsz, és PDF-fájlként letöltheted. Főbb funkciói: sablonok és megjelenési beállítások, élő előnézet, öt nyelvű önéletrajz, fotó hozzáadása, mentés JSON-fájlba és betöltés onnan, valamint egy mesterséges intelligenciát használó szövegsegéd (a továbbiakban: AI-segéd).`,
            "Az önéletrajz megírása, megtervezése és előnézete, az AI-segéd, valamint a JSON-fájlba mentés ingyenes. Az önéletrajz PDF-ben történő letöltéséhez előfizetés szükséges (lásd a 3. pontot).",
            "Az önéletrajzodat a böngésződ tárolja, és a PDF is ott, a saját eszközödön készül; a tartalmuk nem jut el az Üzemeltetőhöz. Az egyetlen kivétel az AI-segéd – ennek részleteit az [Adatvédelmi tájékoztató](privacy) tartalmazza.",
          ],
        },
        {
          id: "subscription",
          title: "Előfizetés és díjak",
          blocks: [
            `Az előfizetés egy ${price.days} napos bevezető időszakkal indul, amelynek díja ${price.trial}. Ebben az időszakban a Szolgáltatás teljes körűen, korlátozás nélkül használható.`,
            `Ha a bevezető időszak végéig nem mondod le az előfizetést, az a ${price.next}. naptól automatikusan havi ${price.monthly} díjú előfizetésként folytatódik, és havonta megújul, amíg le nem mondod. A havidíj terhelése minden időszak elején történik, a megrendeléskor megadott fizetési módra.`,
            "A fizetendő teljes összeg a megrendelés leadása előtt egyértelműen megjelenik a fizetési oldalon. A megrendelést a fizetési kötelezettséget jelző gomb (vagy a kiválasztott fizetési mód gombja) megnyomásával adod le.",
            "A díjak változásáról az előfizetőket legalább 30 nappal a változás hatálybalépése előtt e-mailben értesítjük; ha nem fogadod el, addig lemondhatod az előfizetésedet.",
          ],
        },
        {
          id: "payment",
          title: "Fizetés",
          blocks: [
            `A fizetéseket a ${site.payments.name} (Írország) dolgozza fel. Az elérhető fizetési módok az eszközödtől, a böngésződtől és az országodtól függenek; ezek között lehet a betéti és a hitelkártya, az Apple Pay, a Google Pay, a PayPal és a Link. Az Üzemeltető nem látja és nem tárolja a kártyaadataidat.`,
            "Minden sikeres fizetésről a Stripe e-mailben nyugtát küld neked. A jogszabály által előírt számlát az Üzemeltető állítja ki.",
            "Ha egy havi terhelés nem sikerül, a Stripe néhány napon belül újra megpróbálja; ha ez sem sikerül, az előfizetés a letöltési hozzáféréseddel együtt megszűnik.",
          ],
        },
        {
          id: "cancellation",
          title: "Lemondás",
          blocks: [
            "Az előfizetésedet bármikor, indoklás nélkül lemondhatod a [Fiókom](account) oldalon (az e-mailben kapott kóddal lépsz be), egy kattintással, a Stripe biztonságos felületén.",
            `A lemondás az aktuális időszak végén lép hatályba: addig megmarad a hozzáférésed, és további terhelés nem történik. Ha a bevezető időszakban mondod le, a ${price.next}. naptól nem számítunk fel havidíjat.`,
            "A már megkezdett időszak díját nem térítjük vissza, kivéve, ha élsz az elállási jogoddal, valamint a jogszabály által előírt egyéb esetekben.",
          ],
        },
        {
          id: "withdrawal",
          title: "Elállási jog",
          blocks: [
            `Ha fogyasztóként rendeled meg az előfizetést, a megrendeléstől számított 14 napon belül indoklás nélkül elállhatsz a szerződéstől. Elállási szándékodat egyértelmű nyilatkozattal jelezheted az Üzemeltetőnek (például a(z) ${email} címre küldött e-mailben); ehhez használhatod a 2011/83/EU irányelv I. mellékletének B. részében található elállási nyilatkozatmintát, de nem kötelező.`,
            "Mivel a megrendeléskor kifejezetten kéred a Szolgáltatás azonnali megkezdését, elállás esetén az elállásig igénybe vett időszakra arányos díjat kell fizetned. A fennmaradó összeget attól a naptól számított 14 napon belül visszatérítjük a fizetéshez használt fizetési módra, amikor az elállásodról tájékoztatsz minket.",
            "Az elállási jog nem érinti azt a lehetőségedet, hogy az előfizetést bármikor lemondd (lásd az 5. pontot).",
          ],
        },
        {
          id: "account",
          title: "Fiók és belépés",
          blocks: [
            "Külön, jelszavas regisztráció nincs. A fiókod a fizetéskor megadott e-mail-címedhez kapcsolódik: abban a böngészőben, amelyben fizettél, automatikusan be vagy jelentkezve, más eszközökön pedig egy e-mailben kapott, 10 percig érvényes, 6 jegyű kóddal léphetsz be.",
            "Az önéletrajzaidat nem a fiókod tárolja: azok abban a böngészőben maradnak, amelyben megírtad őket. Ha másik eszközön szeretnéd folytatni, használd a „Mentés fájlba” és a „Betöltés fájlból” funkciót.",
            "A belépési kódodat senkivel ne oszd meg. Az előfizetés személyes használatra szól; a hozzáférés megosztása vagy továbbértékesítése nem megengedett.",
          ],
        },
        {
          id: "ai",
          title: "Az AI-segéd",
          blocks: [
            "Az AI-segéd a kifejezett kérésedre (amikor megnyomod a gombját) a Google Gemini szolgáltatás segítségével javaslatot készít egy mező szövegére. A javaslat a jóváhagyásod nélkül soha nem kerül az önéletrajzodba.",
            "A mesterséges intelligencia által készített szöveg hibás, pontatlan vagy a valóságnak nem megfelelő lehet. Minden javaslatot ellenőrizned kell, mielőtt elfogadod és felhasználod; az Üzemeltető a javaslatok tartalmáért nem vállal felelősséget.",
            "Az AI-segéd által feldolgozott mezőkbe ne írj különleges kategóriába tartozó személyes adatot (például egészségügyi adatot), és harmadik személynek olyan adatát sem, amelynek továbbítására nem vagy jogosult.",
            "Az AI-segéd használata mennyiségi korlátokhoz kötött, és külső szolgáltatótól függ, ezért időnként lassú vagy elérhetetlen lehet. Az Üzemeltető ezt a funkciót bármikor módosíthatja vagy megszüntetheti.",
          ],
        },
        {
          id: "use",
          title: "A használat feltételei",
          blocks: [
            "A Szolgáltatást csak jogszerű célra és a jelen feltételeknek megfelelően használhatod. Különösen vállalod, hogy:",
            {
              list: [
                "az önéletrajzodban valós adatokat tüntetsz fel, és csak olyan tartalmat (például fotót) használsz, amelynek felhasználására jogosult vagy;",
                "más személyek (például referenciaszemélyek) személyes adatait jogszerűen kezeled;",
                "nem használod a Szolgáltatást csalásra, személyazonossággal való visszaélésre vagy más jogellenes célra;",
                "nem kísérelsz meg jogosulatlanul hozzáférni a Szolgáltatáshoz, megkerülni a biztonsági vagy fizetési intézkedéseit, és nem akadályozod a működését (például az AI-segédnek küldött automatizált tömeges kérésekkel).",
              ],
            },
            "Az önéletrajzod tartalmáért és annak felhasználásáért kizárólag te felelsz.",
            "Az Üzemeltető a visszaélések megelőzése érdekében korlátozhatja vagy megszüntetheti a hozzáférést; a jelen feltételek súlyos megsértése esetén az előfizetés azonnali hatállyal megszüntethető.",
          ],
        },
        {
          id: "ownership",
          title: "Szellemi tulajdon",
          blocks: [
            "A Szolgáltatás szoftvere, megjelenése, logója, sablonjai és szövegei az Üzemeltető szellemi tulajdonát képezik; ezeket a Szolgáltatás rendeltetésszerű használatán túl nem másolhatod, nem értékesítheted tovább, és nem kínálhatod saját szolgáltatásként.",
            "A Szolgáltatás nyílt forráskódú összetevőket (például React PDF és Mozilla pdf.js) és a SIL Open Font License szerint licencelt betűtípusokat is használ, amelyekre a saját licencfeltételeik vonatkoznak.",
            "Az általad bevitt tartalom a tiéd marad. A letöltött PDF-önéletrajzot – a benne használt sablonnal együtt – szabadon, forrásmegjelölés nélkül felhasználhatod saját álláskeresési és szakmai céljaidra.",
          ],
        },
        {
          id: "data",
          title: "Az adataid és a biztonsági mentés",
          blocks: [
            "Az önéletrajzod kizárólag a böngésződben tárolódik. Elveszhet, ha törlöd a böngészési adatokat, böngészőt vagy eszközt váltasz, vagy privát böngészést használsz. A te felelősséged, hogy a „Mentés fájlba” funkcióval biztonsági mentést készíts; az Üzemeltető az elveszett adatokat nem tudja helyreállítani.",
          ],
        },
        {
          id: "liability",
          title: "Felelősség",
          blocks: [
            "Az Üzemeltető mindent megtesz a Szolgáltatás folyamatos és helyes működéséért, de nem garantálja, hogy az megszakítás és hiba nélkül elérhető lesz. A letöltött PDF-et elküldés előtt ellenőrizd.",
            "Az Üzemeltető – a jogszabályok által megengedett legnagyobb mértékben – nem felel a Szolgáltatás használatából vagy használhatatlanságából eredő közvetett károkért, elmaradt haszonért vagy adatvesztésért, sem az álláspályázatok eredményéért vagy az AI-javaslatok tartalmáért. Ez a korlátozás nem vonatkozik a szándékosan vagy súlyos gondatlansággal okozott kárért, valamint az emberi életet, testi épséget vagy egészséget megsértő szerződésszegésért való felelősségre, és nem érinti a fogyasztókat jogszabály alapján megillető jogokat.",
          ],
        },
        {
          id: "changes-to-service",
          title: "Rendelkezésre állás és változások",
          blocks: [
            "Az Üzemeltető jogosult a Szolgáltatást fejleszteni és módosítani. Ha a Szolgáltatás véglegesen megszűnik, az előfizetéseket megszüntetjük, és a fel nem használt időszak díját időarányosan visszatérítjük. Az önéletrajzaid a böngésződben és a JSON-mentéseidben megmaradnak.",
          ],
        },
        {
          id: "data-protection",
          title: "Adatvédelem",
          blocks: ["A személyes adatok kezelésének részleteit az [Adatvédelmi tájékoztató](privacy) tartalmazza."],
        },
        {
          id: "amendments",
          title: "A feltételek módosítása",
          blocks: [
            "Az Üzemeltető jogosult a jelen feltételeket módosítani. A módosítások az ezen az oldalon történő közzététellel, a dokumentum tetején feltüntetett hatálybalépési napon lépnek hatályba. A számukra hátrányos lényeges változásokról az előfizetőket legalább 30 nappal előre e-mailben értesítjük; ha nem fogadják el a változásokat, a hatálybalépésük előtt lemondhatják az előfizetésüket.",
          ],
        },
        {
          id: "law",
          title: "Irányadó jog és jogviták",
          blocks: [
            "A jelen feltételekre a szlovák jog az irányadó. Ha fogyasztóként használod a Szolgáltatást, ez a jogválasztás nem foszt meg attól a védelemtől, amelyet a lakóhelyed szerinti ország kötelező fogyasztóvédelmi szabályai biztosítanak számodra.",
            `Az esetleges vitákat igyekszünk békés úton rendezni: panaszodat a(z) ${email} címre küldheted, és 30 napon belül válaszolunk. Ha a panaszodat elutasítjuk, vagy 30 napon belül nem válaszolunk, fogyasztóként alternatív vitarendezési eljárást kezdeményezhetsz a Szlovák Kereskedelmi Felügyeletnél (${site.adr.name}, ${site.adr.website}) vagy a szlovák Gazdasági Minisztérium listáján szereplő más vitarendezési testületnél. A lakóhelyed szerinti fogyasztóvédelmi hatósághoz és bírósághoz is fordulhatsz.`,
            "Ezek a feltételek több nyelven is elérhetők; eltérés esetén az angol nyelvű változat az irányadó.",
          ],
        },
        {
          id: "contact",
          title: "Kapcsolat",
          blocks: [`Kérdéseiddel, észrevételeiddel vagy panaszaiddal az alábbi e-mail-címen fordulhatsz az Üzemeltetőhöz: ${email}.`],
        },
      ],
    },

    privacy: {
      title: "Adatvédelmi tájékoztató",
      description: `Milyen személyes adatokat kezel a ${site.name}, miért, és milyen jogaid vannak.`,
      intro: [
        `Az (EU) 2016/679 rendelet (általános adatvédelmi rendelet, GDPR) alapján ez a tájékoztató elmondja, milyen személyes adatokat kezelünk, amikor a ${site.name} szolgáltatást (https://${site.domain}) használod, milyen célból, milyen jogalapon és meddig, valamint hogy milyen jogaid vannak.`,
      ],
      sections: [
        {
          id: "controller",
          title: "Az adatkezelő",
          blocks: [operator, `Adatvédelmi ügyekben a(z) ${email} címen érsz el minket.`],
        },
        {
          id: "summary",
          title: "Röviden",
          blocks: [
            {
              list: [
                "Az önéletrajzodat – a fotóddal együtt – a böngésződ tárolja és alakítja PDF-fé, a saját eszközödön; hozzánk soha nem jut el.",
                "Az AI-segéd csak akkor küld adatot, ha megnyomod a gombját, és akkor is csak a szerkesztett mező szövegét és a szakmai hátteredet – a nevedet, az elérhetőségeidet, a születési dátumodat és a fotódat soha.",
                "Jelszavas regisztráció nincs. Ha előfizetsz, kezeljük az e-mail-címedet és az előfizetésed adatait.",
                "A fizetéseket a Stripe dolgozza fel; a kártyaadataidat nem látjuk és nem tároljuk.",
                "Nem használunk webanalitikát és reklámcélú követést. Csak a belépéshez, a fizetéshez és a nyelvválasztásodhoz szükséges sütiket használjuk.",
              ],
            },
          ],
        },
        {
          id: "cv-data",
          title: "Az önéletrajzod",
          blocks: [
            "A Szolgáltatás az önéletrajzod tartalmát, a fotódat és a megjelenési beállításaidat a böngésződ helyi tárhelyén (localStorage) menti, hogy a munkád ne vesszen el. A PDF is a böngésződben készül. Ezek az adatok – az AI-segéd alább leírt esetét kivéve – sem hozzánk, sem máshoz nem jutnak el, így ezeket nem kezeljük.",
            "Ezeket az adatokat bármikor törölheted a „Fájl → Új, üres önéletrajz” menüponttal vagy a böngésződ adatainak törlésével. A választott megjelenési téma (világos vagy sötét) szintén a helyi tárhelyen tárolódik.",
          ],
        },
        {
          id: "ai",
          title: "Az AI-segéd",
          blocks: [
            "Amikor az AI-segédet használod, a Szolgáltatás a következő adatokat küldi el a szerverünknek, amely azokat a Google Gemini API-nak továbbítja:",
            {
              list: [
                "a szerkesztett mező aktuális szövegét (bemutatkozás vagy tételleírás);",
                "a szakmai hátteredet: a szakmai címedet, a tételek megnevezését, szervezetét és időszakát, a leírások rövidített változatát, a készségeidet és a nyelvtudásodat (a bemutatkozás megírásakor az egész önéletrajzod ilyen összefoglalóját);",
                "az önéletrajz nyelvét és a kért műveletet.",
              ],
            },
            "A nevedet, az e-mail-címedet, a telefonszámodat, a lakhelyedet, a weboldaladat és a profillinkjeidet, a születési dátumodat és a fotódat soha nem küldjük el. Ha azonban a mezőbe magad írsz személyes adatot, az a szöveg részeként továbbításra kerül.",
            "**Cél:** az általad kért szövegjavaslat elkészítése. **Jogalap:** az általad kifejezetten kért szolgáltatás nyújtása (GDPR 6. cikk (1) bekezdés b) pont).",
            `**Időtartam:** a szöveget nem tároljuk és nem naplózzuk; csak a válasz elkészültéig létezik a szerver memóriájában. A Google a kéréseket a Gemini API feltételei szerint kezeli: ${site.ai.terms}`,
            "Az AI-segéd használata nem kötelező; a Szolgáltatás minden más funkciója nélküle is működik.",
          ],
        },
        {
          id: "subscription",
          title: "Előfizetés és fizetés",
          blocks: [
            "Ha előfizetsz, a fizetési oldalon megadott adatokat a Stripe kezeli; mi az előfizetésed nyilvántartásához szükséges adatokat kapjuk meg.",
            {
              list: [
                "Kezelt adatok: e-mail-cím, a Stripe által kiosztott ügyfél- és előfizetés-azonosítók, az előfizetés állapota és időszakai, a fizetések összege és dátuma, a fizetési mód típusa (például kártya, és annak utolsó 4 számjegye), valamint – ha a fizetési oldal bekéri – a számlázási ország és irányítószám.",
                "Cél: az előfizetés létrehozása és teljesítése, a díjak beszedése, a hozzáférés ellenőrzése, a számlázás és az ügyfélszolgálat.",
                "Jogalap: szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont); a számviteli nyilvántartások megőrzése esetén jogi kötelezettség (GDPR 6. cikk (1) bekezdés c) pont).",
                "Időtartam: az előfizetés fennállásáig; megszűnése után a számviteli nyilvántartásokat a szlovák számviteli törvény (431/2002 Z. z. sz. törvény) 35. §-a alapján 10 évig őrizzük meg. A többi adatot az előfizetés megszűnése után kérésedre töröljük.",
              ],
            },
            `A fizetéseket a ${site.payments.name} (${site.payments.address}) dolgozza fel, amely a fizetési adatok és a csalásmegelőzés tekintetében önálló adatkezelő. Az adatkezeléséről a ${site.payments.privacy} oldalon tájékozódhatsz.`,
          ],
        },
        {
          id: "sign-in",
          title: "Belépés e-mailes kóddal",
          blocks: [
            "Más eszközökön egy e-mailben kapott, egyszer használatos kóddal léphetsz be.",
            {
              list: [
                "Kezelt adatok: e-mail-cím, a belépési kód hash-elt formája, a lejárati ideje és a próbálkozások száma.",
                "Cél: a belépés és a fiókod védelme.",
                "Jogalap: szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont).",
                "Időtartam: a kód 10 percig érvényes, és felhasználás után azonnal töröljük.",
              ],
            },
            `A belépési e-maileket adatfeldolgozóként a ${site.email.name} (${site.email.website}) küldi ki.`,
          ],
        },
        {
          id: "logs",
          title: "Technikai naplók",
          blocks: [
            "Az oldal kiszolgálásakor – mint minden weboldal esetén – a tárhelyszolgáltató szerverei technikai adatokat rögzítenek.",
            {
              list: [
                "Kezelt adatok: IP-cím, a kérés időpontja, a kért oldal címe, a böngésző típusa és verziója.",
                "Cél: a Szolgáltatás biztonságos és zavartalan működése, a hibák és a visszaélések felderítése. Az AI-segédnek küldött, valamint a belépési és a fizetési kéréseknél az IP-címet legfeljebb 15 percig a szerver memóriájában is megőrizzük, hogy a túlzott használat korlátozható legyen.",
                "Jogalap: az Üzemeltető jogos érdeke (GDPR 6. cikk (1) bekezdés f) pont).",
                "Időtartam: rövid ideig, a tárhelyszolgáltató adatmegőrzési szabályai szerint.",
              ],
            },
          ],
        },
        {
          id: "cookies",
          title: "Sütik és helyi tárolás",
          blocks: [
            "Csak a Szolgáltatás működéséhez szükséges sütiket használjuk; ezekhez nem kell hozzájárulás:",
            {
              list: [
                `${cookies.session}: bejelentkezve tart (180 nap);`,
                `${cookies.signedIn}: jelzi az oldalnak, hogy be vagy jelentkezve (180 nap);`,
                `${cookies.login}: a belépési kód folyamata (10 perc);`,
                `${cookies.locale}: megjegyzi a nyelvválasztóban kiválasztott nyelvet (1 év).`,
              ],
            },
            "A fizetési oldalon a Stripe saját sütiket használ a fizetés biztonságos feldolgozásához és a csalások megelőzéséhez. Analitikai és reklámsütiket nem használunk. A betűtípusokat a saját szerverünkről töltjük be, így külső betűtípus-szolgáltató nem kap rólad adatot.",
          ],
        },
        {
          id: "processors",
          title: "Adatfeldolgozók és adattovábbítás",
          blocks: [
            "A megbízásunkból a következő adatfeldolgozók kezelnek adatokat:",
            {
              list: [
                `tárhely és alkalmazásszerver: ${site.hosting.name}, ${site.hosting.address};`,
                `az AI-segéd javaslatai: ${site.ai.name}, ${site.ai.address} (Gemini API);`,
                `a belépési e-mailek küldése: ${site.email.name}, USA.`,
              ],
            },
            "Ezeknek a szolgáltatóknak az Amerikai Egyesült Államokban van a székhelyük, ezért az adatok az Európai Gazdasági Térségen kívülre is kerülhetnek. Az ilyen adattovábbítás megfelelő garanciák mellett történik (az EU–USA adatvédelmi keretrendszer és/vagy az Európai Bizottság által elfogadott általános adatvédelmi kikötések alapján).",
            "Az adataidat más harmadik féllel nem osztjuk meg, nem adjuk el, és nem használjuk marketingre, profilalkotásra vagy automatizált döntéshozatalra.",
          ],
        },
        {
          id: "security",
          title: "Adatbiztonság",
          blocks: [
            "Az oldal és a szerver közötti minden kapcsolat titkosított (HTTPS). A belépési sütik aláírtak, és szkriptekből nem olvashatók, az API-kulcsokat pedig kizárólag a szerveren tároljuk. Mivel az önéletrajzod a saját eszközödön van, az eszköz védelmével az adataidat is véded (például képernyőzárral, vagy közös gépen a böngészési adatok törlésével).",
          ],
        },
        {
          id: "rights",
          title: "A jogaid",
          blocks: [
            "A GDPR alapján a következő jogok illetnek meg:",
            {
              list: [
                "tájékoztatáshoz és hozzáféréshez való jog (15. cikk);",
                "helyesbítéshez való jog (16. cikk);",
                "törléshez való jog (17. cikk);",
                "az adatkezelés korlátozásához való jog (18. cikk);",
                "adathordozhatósághoz való jog (20. cikk);",
                "a jogos érdeken alapuló adatkezelés elleni tiltakozás joga (21. cikk).",
              ],
            },
            `Kérésedet a(z) ${email} címre küldheted; legkésőbb egy hónapon belül válaszolunk. Az e-mail-címedet a [Fiókom](account) oldalon, a Stripe felületén magad is módosíthatod. Mivel az önéletrajzodat nem tároljuk, az arra vonatkozó jogaidat közvetlenül a böngésződben gyakorolhatod.`,
          ],
        },
        {
          id: "remedies",
          title: "Jogorvoslat",
          blocks: [
            `Ha úgy érzed, hogy a személyes adataid kezelése sérti a jogszabályokat, panaszt tehetsz az adatkezelő székhelye szerinti felügyeleti hatóságnál, a Szlovák Köztársaság Személyesadat-védelmi Hivatalánál (${site.authority.name}; ${site.authority.address}; ${site.authority.website}), vagy a lakóhelyed, illetve munkahelyed szerinti adatvédelmi hatóságnál – Magyarországon például a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).`,
            "Jogaid megsértése esetén bírósághoz is fordulhatsz; a pert a lakóhelyed szerinti tagállam bíróságai előtt is megindíthatod.",
          ],
        },
        {
          id: "children",
          title: "Gyermekek",
          blocks: ["A Szolgáltatás nem 16 év alatti gyermekeknek szól, és tudatosan nem kezelünk róluk adatot."],
        },
        {
          id: "changes",
          title: "A tájékoztató változásai",
          blocks: [
            "Ezt a tájékoztatót a Szolgáltatás minden változásakor frissítjük; a hatálybalépés dátuma a dokumentum tetején látható. A Szolgáltatás használatának feltételeit az [Általános szerződési feltételek](terms) tartalmazzák.",
          ],
        },
      ],
    },
  };
};

export default legal;
