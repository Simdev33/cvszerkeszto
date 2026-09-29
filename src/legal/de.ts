import type { LegalContent } from "./types";

const legal: LegalContent = (site, cookie) => ({
  terms: {
    title: "Allgemeine Geschäftsbedingungen",
    description: `Die Bedingungen für die Nutzung des Lebenslauf-Generators ${site.name}.`,
    intro: [
      `Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung des Online-Lebenslauf-Generators ${site.name} (der „Dienst“). Mit der Nutzung des Dienstes erkennen Sie diese Bedingungen an; wenn Sie ihnen nicht zustimmen, nutzen Sie den Dienst bitte nicht.`,
    ],
    sections: [
      {
        id: "provider",
        title: "Anbieter",
        blocks: [
          {
            list: [
              `Name: ${site.operator.name}`,
              `Sitz: ${site.operator.address}`,
              `E-Mail: ${site.operator.email}`,
              `Registernummer: ${site.operator.registry}`,
              `Steuernummer: ${site.operator.taxNumber}`,
            ],
          },
          `Hosting-Anbieter: ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`,
        ],
      },
      {
        id: "service",
        title: "Der Dienst",
        blocks: [
          "Der Dienst ist ein kostenloses, browserbasiertes Werkzeug, mit dem Sie Lebensläufe erstellen und als PDF-Datei herunterladen können. Seine wichtigsten Funktionen sind Vorlagen und Gestaltungsoptionen, eine Live-Vorschau, Lebensläufe in fünf Sprachen, die Einbindung eines Fotos, das Speichern und Laden von JSON-Dateien sowie ein Schreibassistent, der künstliche Intelligenz nutzt (der „KI-Assistent“).",
          "Eine Registrierung ist nicht erforderlich. Ihre Lebenslaufdaten werden von Ihrem Browser gespeichert, und das PDF wird auf Ihrem Gerät erstellt; der Anbieter hat keinen Zugriff auf diese Daten. Einzige Ausnahme ist der KI-Assistent, dessen Datenverarbeitung in der Datenschutzerklärung beschrieben ist.",
        ],
      },
      {
        id: "acceptance",
        title: "Geltung und Vertragsschluss",
        blocks: [
          "Diese Bedingungen werden mit Ihrer ersten Nutzung des Dienstes verbindlich und gelten für die gesamte Dauer der Nutzung. Durch die Nutzung des Dienstes kommt zwischen Ihnen und dem Anbieter ein unentgeltlicher, auf elektronischem Weg geschlossener Vertrag zustande; der Anbieter speichert den Vertragstext nicht gesondert, die Bedingungen sind jedoch jederzeit auf dieser Seite abrufbar.",
          "Für die Nutzung des Dienstes müssen Sie mindestens 16 Jahre alt sein; jüngere Personen dürfen ihn nur mit Zustimmung eines Elternteils oder einer sorgeberechtigten Person nutzen.",
        ],
      },
      {
        id: "use",
        title: "Ihre Pflichten",
        blocks: [
          "Sie verpflichten sich,",
          {
            list: [
              "den Dienst ausschließlich zu rechtmäßigen Zwecken zu nutzen;",
              "nur Inhalte (etwa Fotos) zu verwenden, zu deren Nutzung Sie berechtigt sind, und mit Daten anderer Personen rechtmäßig umzugehen;",
              "den Dienst nicht zu überlasten und seine Beschränkungen nicht zu umgehen – insbesondere keine automatisierten oder massenhaften Anfragen an den KI-Assistenten zu senden;",
              "nicht zu versuchen, den Betrieb des Dienstes zu stören oder sich unbefugt Zugang zu den Systemen des Anbieters zu verschaffen.",
            ],
          },
          "Für den Inhalt Ihres Lebenslaufs, seine Richtigkeit und seine Verwendung sind allein Sie verantwortlich.",
        ],
      },
      {
        id: "ai",
        title: "Der KI-Assistent",
        blocks: [
          "Auf Ihre ausdrückliche Anforderung hin (wenn Sie die entsprechende Schaltfläche betätigen) schlägt der KI-Assistent mithilfe des Dienstes Google Gemini einen Text für ein Feld vor. Ein Vorschlag wird niemals ohne Ihre Zustimmung in Ihren Lebenslauf übernommen.",
          "Von künstlicher Intelligenz erzeugte Texte können fehlerhaft, ungenau oder unwahr sein. Sie müssen jeden Vorschlag prüfen, bevor Sie ihn übernehmen und verwenden; der Anbieter übernimmt keine Verantwortung für den Inhalt der Vorschläge.",
          "Geben Sie in die vom KI-Assistenten verarbeiteten Felder keine besonderen Kategorien personenbezogener Daten (etwa Gesundheitsdaten) ein und auch keine Daten Dritter, zu deren Weitergabe Sie nicht berechtigt sind.",
          "Die Nutzung des KI-Assistenten unterliegt Nutzungsbeschränkungen und hängt von einem externen Anbieter ab; er kann daher zeitweise langsam oder nicht verfügbar sein. Der Anbieter kann diese Funktion jederzeit ändern oder einstellen.",
        ],
      },
      {
        id: "ip",
        title: "Geistiges Eigentum",
        blocks: [
          "Die Software, die Gestaltung, die Vorlagen und die Texte des Dienstes sind geistiges Eigentum des Anbieters bzw. seiner Lizenzgeber. Die eingebetteten Schriften werden unter der SIL Open Font License verwendet.",
          "Die von Ihnen eingegebenen Inhalte gehören Ihnen. Den fertigen PDF-Lebenslauf – einschließlich der darin verwendeten Vorlage – dürfen Sie für Ihre eigene Stellensuche und für Ihre beruflichen Zwecke frei und uneingeschränkt nutzen, ohne Gebühr und ohne Quellenangabe.",
          "Es ist untersagt, den Dienst oder seine Vorlagen ohne Erlaubnis des Anbieters zu kopieren, weiterzuverkaufen oder als eigenen Dienst anzubieten.",
        ],
      },
      {
        id: "data",
        title: "Ihre Daten und Sicherungskopien",
        blocks: [
          "Ihre Lebenslaufdaten werden ausschließlich in Ihrem Browser gespeichert. Sie können verloren gehen, wenn Sie Ihre Browserdaten löschen, Browser oder Gerät wechseln oder im privaten Modus surfen. Es liegt in Ihrer Verantwortung, mit „In Datei speichern“ Sicherungskopien anzulegen; der Anbieter kann verlorene Daten nicht wiederherstellen.",
        ],
      },
      {
        id: "liability",
        title: "Haftung",
        blocks: [
          "Der Dienst wird so bereitgestellt, wie er ist und wie er verfügbar ist. Der Anbieter bemüht sich um einen unterbrechungs- und fehlerfreien Betrieb, garantiert diesen jedoch nicht: Wartungsarbeiten, Fehler oder Ausfälle externer Anbieter (Hosting, KI) können dazu führen, dass der Dienst vorübergehend nicht verfügbar ist.",
          "Soweit gesetzlich zulässig, haftet der Anbieter insbesondere nicht für",
          {
            list: [
              "den Ausgang von Stellenbewerbungen oder sonstigen Bewerbungen;",
              "den Inhalt und die Richtigkeit Ihres Lebenslaufs;",
              "den Verlust von Daten, die in Ihrem Browser gespeichert sind;",
              "den Inhalt der Vorschläge des KI-Assistenten;",
              "Schäden, die auf Störungen Ihres Geräts oder Ihrer Internetverbindung zurückzuführen sind.",
            ],
          },
          "Diese Haftungsbeschränkung gilt nicht für die Haftung bei vorsätzlichen oder grob fahrlässigen Pflichtverletzungen, bei Pflichtverletzungen, die zu einer Verletzung des Lebens, des Körpers oder der Gesundheit führen, sowie in allen sonstigen Fällen, in denen die Haftung gesetzlich nicht ausgeschlossen werden kann.",
        ],
      },
      {
        id: "fees",
        title: "Kosten",
        blocks: [
          "Der Dienst ist derzeit vollständig kostenlos. Führt der Anbieter künftig kostenpflichtige Funktionen ein, wird er deren Bedingungen vorab deutlich bekannt geben; kostenpflichtige Funktionen können nur nach Ihrer ausdrücklichen Zustimmung genutzt werden.",
        ],
      },
      {
        id: "changes",
        title: "Änderungen und Beendigung",
        blocks: [
          "Der Anbieter kann diese Bedingungen ändern. Die geänderten Bedingungen werden mit dem Datum ihres Inkrafttretens auf dieser Seite veröffentlicht; wenn Sie den Dienst nach diesem Datum weiter nutzen, gilt dies als Annahme der geänderten Bedingungen.",
          "Der Anbieter kann den Dienst jederzeit ändern, aussetzen oder einstellen. Da sich Ihre Lebenslaufdaten in Ihrem Browser befinden, sind sie davon nicht betroffen, und Ihre JSON-Sicherung bleibt unabhängig vom Dienst nutzbar.",
        ],
      },
      {
        id: "law",
        title: "Anwendbares Recht und Beschwerden",
        blocks: [
          "Für diese Bedingungen gilt ungarisches Recht. Wenn Sie Verbraucher sind, wird Ihnen dadurch nicht der Schutz entzogen, den Ihnen die zwingenden Verbraucherschutzvorschriften des Staates gewähren, in dem Sie Ihren gewöhnlichen Aufenthalt haben.",
          `Bei Fragen, Beschwerden oder Anregungen erreichen Sie den Anbieter unter ${site.operator.email}; Sie erhalten innerhalb von 30 Tagen eine inhaltliche Antwort. Über Streitigkeiten entscheidet das nach geltendem Recht zuständige Gericht; Verbraucher können sich außerdem an die für ihren Wohnort zuständige Schlichtungsstelle oder Stelle zur alternativen Streitbeilegung wenden.`,
          "Diese Bedingungen sind in mehreren Sprachen verfügbar; bei Abweichungen ist die ungarische Fassung maßgeblich.",
        ],
      },
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    description: `Welche Daten ${site.name} verarbeitet und welche Rechte Sie haben.`,
    intro: [
      `${site.name} ist so gestaltet, dass möglichst wenige personenbezogene Daten verarbeitet werden: keine Registrierung, keine Datenbank, keine Analyse-Tools und kein Tracking. Diese Datenschutzerklärung erläutert auf Grundlage der EU-Datenschutz-Grundverordnung (DSGVO), welche Daten verarbeitet werden und welche Rechte Sie haben.`,
    ],
    sections: [
      {
        id: "controller",
        title: "Verantwortlicher",
        blocks: [
          {
            list: [`Name: ${site.operator.name}`, `Anschrift: ${site.operator.address}`, `E-Mail: ${site.operator.email}`],
          },
          "In allen Datenschutzfragen können Sie sich unter der oben genannten E-Mail-Adresse an den Verantwortlichen („wir“) wenden.",
        ],
      },
      {
        id: "summary",
        title: "Das Wichtigste in Kürze",
        blocks: [
          {
            list: [
              "Ihre Lebenslaufdaten – einschließlich Ihres Fotos – werden ausschließlich in Ihrem Browser gespeichert; wir erhalten oder sehen sie nie.",
              "Das PDF wird auf Ihrem Gerät erstellt.",
              "Der KI-Assistent sendet nur dann Daten, wenn Sie seine Schaltfläche betätigen, und auch dann nur den Text des gerade bearbeiteten Feldes und Ihren beruflichen Hintergrund – niemals Ihren Namen, Ihre Kontaktdaten, Ihr Geburtsdatum oder Ihr Foto.",
              "Keine Registrierung, keine Analyse-Tools, keine Werbe- oder Tracking-Cookies.",
            ],
          },
        ],
      },
      {
        id: "local",
        title: "In Ihrem Browser gespeicherte Daten",
        blocks: [
          "Der Dienst speichert den Inhalt Ihres Lebenslaufs, Ihr Foto und Ihre Designeinstellungen im lokalen Speicher Ihres Browsers (localStorage), damit Ihre Arbeit nicht verloren geht. Abgesehen vom unten beschriebenen Fall des KI-Assistenten werden diese Daten weder an uns noch an Dritte übermittelt; wir verarbeiten sie daher nicht.",
          "Auch das von Ihnen gewählte Farbschema (hell oder dunkel) wird im lokalen Speicher abgelegt. Sie können diese Daten jederzeit über „Datei → Neuer, leerer Lebenslauf“ oder durch Löschen Ihrer Browserdaten entfernen.",
        ],
      },
      {
        id: "cookie",
        title: "Spracheinstellung (Cookie)",
        blocks: [
          `Wenn Sie die Sprache wechseln, setzt der Dienst ein Cookie namens „${cookie}“, das den Code der gewählten Sprache (zum Beispiel „de“) für bis zu ein Jahr speichert, damit die Website bei Ihrem nächsten Besuch in der richtigen Sprache erscheint. Dieses Cookie ist für eine von Ihnen ausdrücklich gewünschte Funktion unbedingt erforderlich und kann Sie nicht identifizieren; es bedarf daher keiner Einwilligung. Weitere Cookies verwendet der Dienst nicht.`,
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
        id: "logs",
        title: "Technische Daten und Protokolle",
        blocks: [
          "Beim Ausliefern der Seiten und bei der Verarbeitung von Anfragen an den KI-Assistenten erfassen die Server des Hosting-Anbieters technische Daten (IP-Adresse, Zeitpunkt, aufgerufene Adresse, Browsertyp), um den Betrieb des Dienstes sicherzustellen und Missbrauch zu verhindern. Bei Anfragen an den KI-Assistenten wird die IP-Adresse zudem für bis zu 10 Minuten im Arbeitsspeicher des Servers vorgehalten, damit eine übermäßige Nutzung begrenzt werden kann.",
          "**Rechtsgrundlage:** unser berechtigtes Interesse an einem sicheren Betrieb des Dienstes (Art. 6 Abs. 1 lit. f DSGVO). **Speicherdauer:** kurzzeitig, entsprechend den Protokollierungseinstellungen des Hosting-Anbieters.",
        ],
      },
      {
        id: "contact",
        title: "Kontakt per E-Mail",
        blocks: [
          "Wenn Sie uns eine E-Mail schreiben, verarbeiten wir die Daten aus Ihrer Nachricht (Name, E-Mail-Adresse, Inhalt), um Ihre Anfrage zu beantworten. Rechtsgrundlage ist unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO); die Daten werden bis zu ein Jahr nach Abschluss des Vorgangs aufbewahrt.",
        ],
      },
      {
        id: "processors",
        title: "Auftragsverarbeiter und Übermittlung in Drittländer",
        blocks: [
          {
            list: [
              `${site.hosting.name} (${site.hosting.address}) – Hosting und Serverinfrastruktur;`,
              `${site.ai.name} (${site.ai.address}) – die Gemini API, die die Vorschläge des KI-Assistenten erzeugt.`,
            ],
          },
          "Beide Anbieter verarbeiten Daten auch in den USA. Die Übermittlung erfolgt auf Grundlage des EU-US Data Privacy Framework und/oder der Standardvertragsklauseln der Europäischen Kommission.",
          "Wir verkaufen keine personenbezogenen Daten, nutzen sie nicht für Marketing oder Profiling und treffen keine automatisierten Entscheidungen.",
        ],
      },
      {
        id: "rights",
        title: "Ihre Rechte",
        blocks: [
          "Nach der DSGVO können Sie Auskunft über Ihre personenbezogenen Daten sowie deren Berichtigung, Löschung oder die Einschränkung ihrer Verarbeitung verlangen, der Verarbeitung auf Grundlage berechtigter Interessen widersprechen und Ihr Recht auf Datenübertragbarkeit ausüben. Wir beantworten Anfragen spätestens innerhalb eines Monats.",
          "Da wir Ihre Lebenslaufdaten nicht speichern, üben Sie diese Rechte (zum Beispiel die Löschung) für diese Daten direkt in Ihrem Browser aus.",
          `Wenn Sie sich beschweren möchten, können Sie sich an die Aufsichtsbehörde wenden: ${site.authority.name}, ${site.authority.address}, ${site.authority.email}, ${site.authority.website}. Sie können sich außerdem an die Datenschutzaufsichtsbehörde des EU-Mitgliedstaats wenden, in dem Sie leben oder arbeiten, oder ein Gericht anrufen.`,
        ],
      },
      {
        id: "children",
        title: "Kinder",
        blocks: [
          "Der Dienst richtet sich nicht gezielt an Kinder unter 16 Jahren. Personen unter 16 Jahren dürfen den KI-Assistenten nur mit Zustimmung eines Elternteils oder einer sorgeberechtigten Person nutzen.",
        ],
      },
      {
        id: "security",
        title: "Datensicherheit",
        blocks: [
          "Die Verbindung zwischen der Website und dem Server ist verschlüsselt (HTTPS), und API-Schlüssel werden ausschließlich auf dem Server gespeichert. Da sich Ihre Lebenslaufdaten auf Ihrem Gerät befinden, trägt auch der Schutz dieses Geräts zur Sicherheit Ihrer Daten bei (etwa eine Bildschirmsperre oder, an einem gemeinsam genutzten Computer, das Löschen Ihrer Browserdaten).",
        ],
      },
      {
        id: "changes",
        title: "Änderungen dieser Datenschutzerklärung",
        blocks: ["Wir können diese Datenschutzerklärung aktualisieren. Die aktuelle Fassung ist mit dem Datum ihres Inkrafttretens stets auf dieser Seite abrufbar."],
      },
    ],
  },
});

export default legal;
