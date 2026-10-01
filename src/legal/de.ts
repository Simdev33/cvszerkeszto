import type { LegalContent } from "./types";

// Deutsche Rechtstexte – übersetzt aus der englischen Fassung (en.ts), die bei Abweichungen maßgeblich ist.
const legal: LegalContent = ({ site, email, price, cookies }) => {
  const operator = {
    list: [
      `Name: ${site.operator.name}`,
      `Sitz: ${site.operator.address}`,
      `Registernummer: ${site.operator.registry}`,
      `Steuernummer: ${site.operator.taxNumber}`,
      `E-Mail: ${email}`,
    ],
  };

  return {
    terms: {
      title: "Allgemeine Geschäftsbedingungen",
      description: `Die Bedingungen für die Nutzung von ${site.name} und für das zugehörige Abonnement.`,
      intro: [
        `Diese Bedingungen regeln die Nutzung des Webdienstes ${site.name} (https://${site.domain}, der „Dienst“) und das Abonnement dieses Dienstes. Mit der Nutzung des Dienstes oder der Bestellung des Abonnements akzeptieren Sie diese Bedingungen; wenn Sie mit ihnen nicht einverstanden sind, nutzen Sie den Dienst bitte nicht.`,
      ],
      sections: [
        {
          id: "operator",
          title: "Der Betreiber",
          blocks: [
            "Der Dienst wird von folgendem Betreiber erbracht (der „Betreiber“):",
            operator,
            `Hosting-Anbieter: ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`,
          ],
        },
        {
          id: "service",
          title: "Der Dienst",
          blocks: [
            `${site.name} ist ein Online-Werkzeug, mit dem Sie Lebensläufe verfassen und als PDF-Datei herunterladen können. Seine wichtigsten Funktionen sind Vorlagen und Gestaltungsoptionen, eine Live-Vorschau, Lebensläufe in fünf Sprachen, die Einbindung eines Fotos, das Speichern und Laden von JSON-Dateien sowie ein Schreibassistent, der künstliche Intelligenz nutzt (der „KI-Assistent“).`,
            "Das Verfassen, Gestalten und die Vorschau eines Lebenslaufs, der KI-Assistent und das Speichern in einer JSON-Datei sind kostenlos. Für das Herunterladen des Lebenslaufs als PDF ist ein Abonnement erforderlich (siehe Abschnitt 3).",
            "Ihr Lebenslauf wird in Ihrem Browser auf Ihrem eigenen Gerät gespeichert, und auch das PDF wird dort erstellt; ihr Inhalt wird nicht an den Betreiber übermittelt. Einzige Ausnahme ist der KI-Assistent – Einzelheiten dazu finden Sie in der [Datenschutzerklärung](privacy).",
          ],
        },
        {
          id: "subscription",
          title: "Abonnement und Entgelte",
          blocks: [
            `Das Abonnement beginnt mit einem Einführungszeitraum von ${price.days} Tagen, für den ein Entgelt von ${price.trial} anfällt. In diesem Zeitraum kann der Dienst vollständig und ohne Einschränkungen genutzt werden.`,
            `Wenn Sie das Abonnement nicht bis zum Ende des Einführungszeitraums kündigen, wird es ab Tag ${price.next} automatisch als Abonnement mit einem monatlichen Entgelt von ${price.monthly} fortgesetzt und verlängert sich jeden Monat, bis Sie es kündigen. Das monatliche Entgelt wird jeweils zu Beginn des Zeitraums über die Zahlungsart eingezogen, die Sie bei der Bestellung angegeben haben.`,
            "Der zu zahlende Gesamtbetrag wird Ihnen vor Abgabe Ihrer Bestellung auf der Zahlungsseite deutlich angezeigt. Die Bestellung geben Sie ab, indem Sie die Schaltfläche betätigen, die auf die Zahlungspflicht hinweist (bzw. die Schaltfläche der gewählten Zahlungsart).",
            "Über Änderungen der Entgelte informieren wir Abonnenten mindestens 30 Tage vor deren Inkrafttreten per E-Mail; wenn Sie die Änderung nicht akzeptieren, können Sie Ihr Abonnement bis dahin kündigen.",
          ],
        },
        {
          id: "payment",
          title: "Zahlung",
          blocks: [
            `Die Zahlungen werden von ${site.payments.name} (Irland) abgewickelt. Die verfügbaren Zahlungsarten hängen von Ihrem Gerät, Ihrem Browser und Ihrem Land ab und können Debit- und Kreditkarten, Apple Pay, Google Pay, PayPal und Link umfassen. Der Betreiber sieht und speichert Ihre Kartendaten nicht.`,
            "Stripe sendet Ihnen für jede erfolgreiche Zahlung einen Zahlungsbeleg per E-Mail. Die gesetzlich vorgeschriebene Rechnung stellt der Betreiber aus.",
            "Schlägt eine monatliche Abbuchung fehl, versucht Stripe sie innerhalb weniger Tage erneut; gelingt sie auch dann nicht, endet das Abonnement und damit auch Ihr Zugang zum Herunterladen.",
          ],
        },
        {
          id: "cancellation",
          title: "Kündigung",
          blocks: [
            "Sie können Ihr Abonnement jederzeit ohne Angabe von Gründen auf der Seite [Mein Konto](account) (Anmeldung mit einem Code, den wir Ihnen per E-Mail senden) mit einem Klick über die sichere Oberfläche von Stripe kündigen.",
            `Die Kündigung wird zum Ende des laufenden Zeitraums wirksam: Bis dahin behalten Sie Ihren Zugang, und es erfolgen keine weiteren Abbuchungen. Wenn Sie während des Einführungszeitraums kündigen, wird ab Tag ${price.next} kein monatliches Entgelt berechnet.`,
            "Das Entgelt für einen bereits begonnenen Zeitraum wird nicht erstattet, außer wenn Sie Ihr Widerrufsrecht ausüben, sowie in den sonstigen gesetzlich vorgeschriebenen Fällen.",
          ],
        },
        {
          id: "withdrawal",
          title: "Widerrufsrecht",
          blocks: [
            `Wenn Sie das Abonnement als Verbraucher bestellen, können Sie den Vertrag innerhalb von 14 Tagen ab der Bestellung ohne Angabe von Gründen widerrufen. Ihren Entschluss, den Vertrag zu widerrufen, können Sie dem Betreiber mittels einer eindeutigen Erklärung mitteilen (zum Beispiel per E-Mail an ${email}); Sie können dafür das Muster-Widerrufsformular aus Anhang I Teil B der Richtlinie 2011/83/EU verwenden, sind dazu aber nicht verpflichtet.`,
            "Da Sie bei der Bestellung ausdrücklich verlangen, dass mit der Erbringung des Dienstes sofort begonnen wird, müssen Sie im Falle eines Widerrufs ein anteiliges Entgelt für den bis zum Widerruf genutzten Zeitraum zahlen. Den verbleibenden Betrag erstatten wir Ihnen innerhalb von 14 Tagen ab dem Tag, an dem Sie uns über Ihren Widerruf informieren, über die für die Zahlung verwendete Zahlungsart.",
            "Das Widerrufsrecht lässt Ihre Möglichkeit unberührt, das Abonnement jederzeit zu kündigen (siehe Abschnitt 5).",
          ],
        },
        {
          id: "account",
          title: "Konto und Anmeldung",
          blocks: [
            "Eine gesonderte Registrierung mit Passwort gibt es nicht. Ihr Konto ist mit der E-Mail-Adresse verknüpft, die Sie bei der Zahlung angeben: In dem Browser, in dem Sie bezahlt haben, werden Sie automatisch angemeldet, und auf anderen Geräten können Sie sich mit einem 6-stelligen Code anmelden, der Ihnen per E-Mail zugesandt wird und 10 Minuten lang gültig ist.",
            "Ihre Lebensläufe werden nicht in Ihrem Konto gespeichert: Sie bleiben in dem Browser, in dem Sie sie verfasst haben. Um auf einem anderen Gerät weiterzuarbeiten, nutzen Sie „In Datei speichern“ und „Aus Datei laden“.",
            "Geben Sie Ihren Anmeldecode an niemanden weiter. Das Abonnement ist für die persönliche Nutzung bestimmt; die Weitergabe oder der Weiterverkauf des Zugangs ist nicht gestattet.",
          ],
        },
        {
          id: "ai",
          title: "Der KI-Assistent",
          blocks: [
            "Auf Ihre ausdrückliche Anforderung hin (wenn Sie die entsprechende Schaltfläche betätigen) schlägt der KI-Assistent mithilfe des Dienstes Google Gemini einen Text für ein Feld vor. Ein Vorschlag wird niemals ohne Ihre Zustimmung in Ihren Lebenslauf übernommen.",
            "Von künstlicher Intelligenz erzeugte Texte können fehlerhaft, ungenau oder unwahr sein. Sie müssen jeden Vorschlag prüfen, bevor Sie ihn übernehmen und verwenden; der Betreiber übernimmt keine Verantwortung für den Inhalt der Vorschläge.",
            "Geben Sie in die vom KI-Assistenten verarbeiteten Felder keine besonderen Kategorien personenbezogener Daten (etwa Gesundheitsdaten) ein und auch keine Daten Dritter, zu deren Weitergabe Sie nicht berechtigt sind.",
            "Die Nutzung des KI-Assistenten unterliegt Nutzungsbeschränkungen und hängt von einem externen Anbieter ab; er kann daher zeitweise langsam oder nicht verfügbar sein. Der Betreiber kann diese Funktion jederzeit ändern oder einstellen.",
          ],
        },
        {
          id: "use",
          title: "Nutzungsregeln",
          blocks: [
            "Sie dürfen den Dienst nur zu rechtmäßigen Zwecken und im Einklang mit diesen Bedingungen nutzen. Insbesondere verpflichten Sie sich:",
            {
              list: [
                "in Ihrem Lebenslauf wahrheitsgemäße Angaben zu machen und nur Inhalte (etwa Fotos) zu verwenden, zu deren Nutzung Sie berechtigt sind;",
                "mit personenbezogenen Daten anderer Personen (zum Beispiel von Referenzgebern) rechtmäßig umzugehen;",
                "den Dienst nicht für Betrug, das Vortäuschen einer fremden Identität oder andere rechtswidrige Zwecke zu nutzen;",
                "nicht zu versuchen, sich unbefugt Zugang zum Dienst zu verschaffen, seine Sicherheits- oder Zahlungsmechanismen zu umgehen oder seinen Betrieb zu behindern (zum Beispiel durch automatisierte Massenanfragen an den KI-Assistenten).",
              ],
            },
            "Für den Inhalt Ihres Lebenslaufs und seine Verwendung sind allein Sie verantwortlich.",
            "Der Betreiber kann den Zugang einschränken oder beenden, um Missbrauch zu verhindern; bei einem schwerwiegenden Verstoß gegen diese Bedingungen kann das Abonnement mit sofortiger Wirkung gekündigt werden.",
          ],
        },
        {
          id: "ownership",
          title: "Geistiges Eigentum",
          blocks: [
            "Die Software, die Gestaltung, das Logo, die Vorlagen und die Texte des Dienstes sind geistiges Eigentum des Betreibers; sie dürfen über die bestimmungsgemäße Nutzung des Dienstes hinaus weder vervielfältigt noch weiterverkauft oder als eigener Dienst angeboten werden.",
            "Der Dienst nutzt außerdem Open-Source-Komponenten (etwa React PDF und Mozilla pdf.js) sowie Schriften unter der SIL Open Font License, für die jeweils eigene Lizenzbedingungen gelten.",
            "Die von Ihnen eingegebenen Inhalte gehören weiterhin Ihnen. Den heruntergeladenen PDF-Lebenslauf – einschließlich der darin verwendeten Vorlage – dürfen Sie für Ihre eigene Stellensuche und Ihre beruflichen Zwecke frei und ohne Quellenangabe nutzen.",
          ],
        },
        {
          id: "data",
          title: "Ihre Daten und Sicherungskopien",
          blocks: [
            "Ihr Lebenslauf wird ausschließlich in Ihrem Browser gespeichert. Er kann verloren gehen, wenn Sie Ihre Browserdaten löschen, Browser oder Gerät wechseln oder im privaten Modus surfen. Es liegt in Ihrer Verantwortung, mit „In Datei speichern“ Sicherungskopien anzulegen; der Betreiber kann verlorene Daten nicht wiederherstellen.",
          ],
        },
        {
          id: "liability",
          title: "Haftung",
          blocks: [
            "Der Betreiber bemüht sich nach Kräften um einen durchgehenden und fehlerfreien Betrieb des Dienstes, übernimmt jedoch keine Gewähr dafür, dass der Dienst ohne Unterbrechungen oder Fehler verfügbar ist. Prüfen Sie das heruntergeladene PDF, bevor Sie es versenden.",
            "Der Betreiber haftet – im größtmöglichen gesetzlich zulässigen Umfang – nicht für mittelbare Schäden, entgangenen Gewinn oder Datenverlust, die sich aus der Nutzung oder der Nichtnutzbarkeit des Dienstes ergeben, und auch nicht für den Ausgang von Bewerbungen oder den Inhalt der KI-Vorschläge. Diese Beschränkung gilt nicht für die Haftung für vorsätzlich oder grob fahrlässig verursachte Schäden sowie für Vertragsverletzungen, die zu einer Verletzung des Lebens, des Körpers oder der Gesundheit führen, und lässt die Rechte, die Verbrauchern von Gesetzes wegen zustehen, unberührt.",
          ],
        },
        {
          id: "changes-to-service",
          title: "Verfügbarkeit und Änderungen",
          blocks: [
            "Der Betreiber ist berechtigt, den Dienst weiterzuentwickeln und zu ändern. Wird der Dienst dauerhaft eingestellt, beenden wir die Abonnements und erstatten das Entgelt für den nicht genutzten Zeitraum anteilig. Ihre Lebensläufe bleiben in Ihrem Browser und in Ihren JSON-Sicherungskopien erhalten.",
          ],
        },
        {
          id: "data-protection",
          title: "Datenschutz",
          blocks: ["Einzelheiten zur Verarbeitung personenbezogener Daten finden Sie in der [Datenschutzerklärung](privacy)."],
        },
        {
          id: "amendments",
          title: "Änderung der Bedingungen",
          blocks: [
            "Der Betreiber ist berechtigt, diese Bedingungen zu ändern. Änderungen werden mit der Veröffentlichung auf dieser Seite zu dem oben im Dokument angegebenen Datum des Inkrafttretens wirksam. Über wesentliche Änderungen zu ihrem Nachteil informieren wir Abonnenten mindestens 30 Tage im Voraus per E-Mail; wenn sie die Änderungen nicht akzeptieren, können sie ihr Abonnement vor deren Inkrafttreten kündigen.",
          ],
        },
        {
          id: "law",
          title: "Anwendbares Recht und Streitigkeiten",
          blocks: [
            "Für diese Bedingungen gilt slowakisches Recht. Wenn Sie den Dienst als Verbraucher nutzen, wird Ihnen durch diese Rechtswahl nicht der Schutz entzogen, den Ihnen die zwingenden Verbraucherschutzvorschriften des Staates Ihres Wohnsitzes gewähren.",
            `Wir bemühen uns, Streitigkeiten gütlich beizulegen: Ihre Beschwerde können Sie an ${email} senden, und wir antworten innerhalb von 30 Tagen. Wenn wir Ihre Beschwerde zurückweisen oder nicht innerhalb von 30 Tagen antworten, können Sie als Verbraucher ein Verfahren zur alternativen Streitbeilegung bei der Slowakischen Handelsinspektion (${site.adr.name}, ${site.adr.website}) oder bei einer anderen Streitbeilegungsstelle einleiten, die in der Liste des slowakischen Wirtschaftsministeriums geführt wird. Sie können sich auch an die Verbraucherschutzbehörde und die Gerichte Ihres Wohnorts wenden.`,
            "Diese Bedingungen sind in mehreren Sprachen verfügbar; bei Abweichungen ist die englische Fassung maßgeblich.",
          ],
        },
        {
          id: "contact",
          title: "Kontakt",
          blocks: [`Mit Fragen, Anmerkungen oder Beschwerden können Sie sich unter folgender E-Mail-Adresse an den Betreiber wenden: ${email}.`],
        },
      ],
    },

    privacy: {
      title: "Datenschutzerklärung",
      description: `Welche personenbezogenen Daten ${site.name} verarbeitet, warum, und welche Rechte Sie haben.`,
      intro: [
        `Gemäß der Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung, DSGVO) erläutert diese Erklärung, welche personenbezogenen Daten wir verarbeiten, wenn Sie ${site.name} (https://${site.domain}) nutzen, zu welchem Zweck, auf welcher Rechtsgrundlage und wie lange, und welche Rechte Sie haben.`,
      ],
      sections: [
        {
          id: "controller",
          title: "Der Verantwortliche",
          blocks: [operator, `In Datenschutzangelegenheiten erreichen Sie uns unter ${email}.`],
        },
        {
          id: "summary",
          title: "Das Wichtigste in Kürze",
          blocks: [
            {
              list: [
                "Ihr Lebenslauf – einschließlich Ihres Fotos – wird in Ihrem Browser auf Ihrem eigenen Gerät gespeichert und dort in ein PDF umgewandelt; er gelangt nie zu uns.",
                "Der KI-Assistent sendet nur dann Daten, wenn Sie seine Schaltfläche betätigen, und auch dann nur den Text des gerade bearbeiteten Feldes und Ihren beruflichen Hintergrund – niemals Ihren Namen, Ihre Kontaktdaten, Ihr Geburtsdatum oder Ihr Foto.",
                "Es gibt keine Registrierung mit Passwort. Wenn Sie ein Abonnement abschließen, verarbeiten wir Ihre E-Mail-Adresse und Ihre Abonnementdaten.",
                "Zahlungen werden von Stripe abgewickelt; Ihre Kartendaten sehen und speichern wir nicht.",
                "Wir nutzen weder Webanalyse noch Werbe-Tracking. Wir setzen nur Cookies ein, die für die Anmeldung, die Zahlung und Ihre Sprachauswahl erforderlich sind.",
              ],
            },
          ],
        },
        {
          id: "cv-data",
          title: "Ihr Lebenslauf",
          blocks: [
            "Der Dienst speichert den Inhalt Ihres Lebenslaufs, Ihr Foto und Ihre Designeinstellungen im lokalen Speicher Ihres Browsers (localStorage), damit Ihre Arbeit nicht verloren geht. Auch das PDF wird in Ihrem Browser erstellt. Abgesehen vom unten beschriebenen Fall des KI-Assistenten werden diese Daten weder an uns noch an Dritte übermittelt; wir verarbeiten sie daher nicht.",
            "Sie können diese Daten jederzeit über „Datei → Neuer, leerer Lebenslauf“ oder durch Löschen Ihrer Browserdaten entfernen. Auch das von Ihnen gewählte Farbschema (hell oder dunkel) wird im lokalen Speicher abgelegt.",
          ],
        },
        {
          id: "ai",
          title: "Der KI-Assistent",
          blocks: [
            "Wenn Sie den KI-Assistenten nutzen, sendet der Dienst die folgenden Daten an unseren Server, der sie an die Google Gemini API weiterleitet:",
            {
              list: [
                "den aktuellen Text des Feldes, das Sie bearbeiten (Profil oder Beschreibung eines Eintrags);",
                "Ihren beruflichen Hintergrund: Ihre Berufsbezeichnung, die Bezeichnungen, Organisationen und Zeiträume Ihrer Einträge, gekürzte Beschreibungen sowie Ihre Kenntnisse und Sprachen (beim Verfassen Ihres Profils eine solche Zusammenfassung Ihres gesamten Lebenslaufs);",
                "die Sprache Ihres Lebenslaufs und die gewünschte Aktion.",
              ],
            },
            "Ihr Name, Ihre E-Mail-Adresse, Ihre Telefonnummer, Ihr Wohnort, Ihre Website- und Profil-Links, Ihr Geburtsdatum und Ihr Foto werden niemals übermittelt. Wenn Sie jedoch selbst personenbezogene Daten in das Feld eingeben, werden diese als Teil des Textes übermittelt.",
            "**Zweck:** Erstellung des von Ihnen angeforderten Textvorschlags. **Rechtsgrundlage:** Erbringung eines von Ihnen ausdrücklich angeforderten Dienstes (Art. 6 Abs. 1 lit. b DSGVO).",
            `**Speicherdauer:** Wir speichern und protokollieren den Text nicht; er befindet sich nur so lange im Arbeitsspeicher des Servers, bis die Antwort vollständig ist. Google verarbeitet die Anfragen gemäß den Nutzungsbedingungen der Gemini API: ${site.ai.terms}`,
            "Die Nutzung des KI-Assistenten ist freiwillig; alle anderen Funktionen des Dienstes funktionieren auch ohne ihn.",
          ],
        },
        {
          id: "subscription",
          title: "Abonnement und Zahlung",
          blocks: [
            "Wenn Sie ein Abonnement abschließen, werden die Daten, die Sie auf der Zahlungsseite eingeben, von Stripe verarbeitet; wir erhalten die Daten, die wir benötigen, um Ihr Abonnement zu erfassen.",
            {
              list: [
                "Verarbeitete Daten: E-Mail-Adresse, die von Stripe vergebenen Kunden- und Abonnementkennungen, Status und Zeiträume des Abonnements, Betrag und Datum der Zahlungen, die Art des Zahlungsmittels (zum Beispiel Karte und deren letzte 4 Ziffern) sowie – sofern die Zahlungsseite danach fragt – Rechnungsland und Postleitzahl.",
                "Zweck: Abschluss und Erfüllung des Abonnements, Einzug der Entgelte, Prüfung der Zugangsberechtigung, Rechnungsstellung und Kundenservice.",
                "Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO); für die Aufbewahrung der Buchhaltungsunterlagen eine rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO).",
                "Speicherdauer: solange das Abonnement besteht; nach dessen Ende bewahren wir die Buchhaltungsunterlagen gemäß § 35 des slowakischen Rechnungslegungsgesetzes (Gesetz Nr. 431/2002 Slg.) 10 Jahre lang auf. Die übrigen Daten löschen wir nach Ende des Abonnements auf Ihren Wunsch.",
              ],
            },
            `Die Zahlungen werden von ${site.payments.name} (${site.payments.address}) abgewickelt, die in Bezug auf die Zahlungsdaten und die Betrugsprävention eigenständig Verantwortlicher ist. Informationen zu ihrer Datenverarbeitung finden Sie unter ${site.payments.privacy}.`,
          ],
        },
        {
          id: "sign-in",
          title: "Anmeldung mit einem E-Mail-Code",
          blocks: [
            "Auf anderen Geräten können Sie sich mit einem Einmalcode anmelden, der Ihnen per E-Mail zugesandt wird.",
            {
              list: [
                "Verarbeitete Daten: E-Mail-Adresse, der Anmeldecode in gehashter Form, sein Ablaufzeitpunkt und die Anzahl der Versuche.",
                "Zweck: Anmeldung und Schutz Ihres Kontos.",
                "Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).",
                "Speicherdauer: Der Code ist 10 Minuten lang gültig, und wir löschen ihn unmittelbar nach der Verwendung.",
              ],
            },
            `Die Anmelde-E-Mails versendet ${site.email.name} (${site.email.website}) als Auftragsverarbeiter.`,
          ],
        },
        {
          id: "logs",
          title: "Technische Protokolle",
          blocks: [
            "Beim Ausliefern der Seite zeichnen die Server des Hosting-Anbieters – wie bei jeder Website – technische Daten auf.",
            {
              list: [
                "Verarbeitete Daten: IP-Adresse, Zeitpunkt der Anfrage, Adresse der aufgerufenen Seite, Browsertyp und -version.",
                "Zweck: der sichere und unterbrechungsfreie Betrieb des Dienstes sowie die Erkennung von Fehlern und Missbrauch. Bei Anfragen an den KI-Assistenten sowie bei Anmelde- und Zahlungsanfragen wird die IP-Adresse zudem bis zu 15 Minuten lang im Arbeitsspeicher des Servers vorgehalten, damit eine übermäßige Nutzung begrenzt werden kann.",
                "Rechtsgrundlage: das berechtigte Interesse des Betreibers (Art. 6 Abs. 1 lit. f DSGVO).",
                "Speicherdauer: für kurze Zeit, gemäß den Aufbewahrungsregeln des Hosting-Anbieters.",
              ],
            },
          ],
        },
        {
          id: "cookies",
          title: "Cookies und lokale Speicherung",
          blocks: [
            "Wir verwenden nur Cookies, die für das Funktionieren des Dienstes erforderlich sind; diese bedürfen keiner Einwilligung:",
            {
              list: [
                `${cookies.session}: hält Sie angemeldet (180 Tage);`,
                `${cookies.signedIn}: teilt der Seite mit, dass Sie angemeldet sind (180 Tage);`,
                `${cookies.login}: der Anmeldevorgang mit Code (10 Minuten);`,
                `${cookies.locale}: speichert die Sprache, die Sie in der Sprachauswahl gewählt haben (1 Jahr).`,
              ],
            },
            "Auf der Zahlungsseite verwendet Stripe eigene Cookies, um die Zahlung sicher abzuwickeln und Betrug zu verhindern. Wir verwenden keine Analyse- oder Werbe-Cookies. Die Schriftarten laden wir von unserem eigenen Server, sodass kein externer Schriftarten-Anbieter Daten über Sie erhält.",
          ],
        },
        {
          id: "processors",
          title: "Auftragsverarbeiter und Datenübermittlung",
          blocks: [
            "Die folgenden Auftragsverarbeiter verarbeiten Daten in unserem Auftrag:",
            {
              list: [
                `Hosting und Anwendungsserver: ${site.hosting.name}, ${site.hosting.address};`,
                `Vorschläge des KI-Assistenten: ${site.ai.name}, ${site.ai.address} (Gemini API);`,
                `Versand der Anmelde-E-Mails: ${site.email.name}, USA.`,
              ],
            },
            "Diese Anbieter haben ihren Sitz in den Vereinigten Staaten von Amerika, daher können Daten auch in Länder außerhalb des Europäischen Wirtschaftsraums übermittelt werden. Solche Übermittlungen erfolgen mit geeigneten Garantien (dem EU-US-Datenschutzrahmen – EU-U.S. Data Privacy Framework – und/oder den von der Europäischen Kommission erlassenen Standardvertragsklauseln).",
            "Wir geben Ihre Daten an keine weiteren Dritten weiter, verkaufen sie nicht und nutzen sie weder für Marketing noch für Profiling oder automatisierte Entscheidungen.",
          ],
        },
        {
          id: "security",
          title: "Datensicherheit",
          blocks: [
            "Alle Verbindungen zwischen der Seite und dem Server sind verschlüsselt (HTTPS). Die Anmelde-Cookies sind signiert und können nicht von Skripten gelesen werden, und API-Schlüssel werden ausschließlich auf dem Server gespeichert. Da sich Ihr Lebenslauf auf Ihrem Gerät befindet, trägt auch der Schutz dieses Geräts zur Sicherheit Ihrer Daten bei (etwa eine Bildschirmsperre oder, an einem gemeinsam genutzten Computer, das Löschen Ihrer Browserdaten).",
          ],
        },
        {
          id: "rights",
          title: "Ihre Rechte",
          blocks: [
            "Nach der DSGVO haben Sie folgende Rechte:",
            {
              list: [
                "Recht auf Information und Auskunft (Art. 15);",
                "Recht auf Berichtigung (Art. 16);",
                "Recht auf Löschung (Art. 17);",
                "Recht auf Einschränkung der Verarbeitung (Art. 18);",
                "Recht auf Datenübertragbarkeit (Art. 20);",
                "Recht auf Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung (Art. 21).",
              ],
            },
            `Ihr Anliegen können Sie an ${email} senden; wir antworten spätestens innerhalb eines Monats. Ihre E-Mail-Adresse können Sie auch selbst auf der Seite [Mein Konto](account) über die Oberfläche von Stripe ändern. Da wir Ihren Lebenslauf nicht speichern, üben Sie diese Rechte für ihn direkt in Ihrem Browser aus.`,
          ],
        },
        {
          id: "remedies",
          title: "Rechtsbehelfe",
          blocks: [
            `Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen geltendes Recht verstößt, können Sie Beschwerde bei der für den Sitz des Verantwortlichen zuständigen Aufsichtsbehörde einlegen, dem Amt für den Schutz personenbezogener Daten der Slowakischen Republik (${site.authority.name}; ${site.authority.address}; ${site.authority.website}), oder bei der Datenschutzaufsichtsbehörde Ihres Wohnorts oder Arbeitsorts – in Ungarn zum Beispiel bei der Nationalen Behörde für Datenschutz und Informationsfreiheit (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).`,
            "Werden Ihre Rechte verletzt, können Sie sich auch an ein Gericht wenden; Sie können die Klage vor den Gerichten des Mitgliedstaats Ihres Wohnorts erheben.",
          ],
        },
        {
          id: "children",
          title: "Kinder",
          blocks: ["Der Dienst richtet sich nicht an Kinder unter 16 Jahren, und wir verarbeiten nicht wissentlich Daten von ihnen."],
        },
        {
          id: "changes",
          title: "Änderungen dieser Erklärung",
          blocks: [
            "Wir aktualisieren diese Erklärung, wenn sich der Dienst ändert; das Datum des Inkrafttretens ist oben im Dokument angegeben. Die Bedingungen für die Nutzung des Dienstes sind in den [Allgemeinen Geschäftsbedingungen](terms) festgelegt.",
          ],
        },
      ],
    },
  };
};

export default legal;
