import type { LegalContent } from "./types";

const legal: LegalContent = (site, cookie) => ({
  terms: {
    title: "Conditions générales d’utilisation",
    description: `Les conditions d’utilisation du créateur de CV ${site.name}.`,
    intro: [
      `Les présentes conditions régissent l’utilisation du service en ligne de création de CV ${site.name} (le « Service »). En utilisant le Service, vous acceptez les présentes conditions ; si vous ne les acceptez pas, veuillez ne pas utiliser le Service.`,
    ],
    sections: [
      {
        id: "provider",
        title: "Le prestataire",
        blocks: [
          {
            list: [
              `Nom : ${site.operator.name}`,
              `Siège social : ${site.operator.address}`,
              `E-mail : ${site.operator.email}`,
              `Numéro d’immatriculation : ${site.operator.registry}`,
              `Numéro d’identification fiscale : ${site.operator.taxNumber}`,
            ],
          },
          `Hébergeur : ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`,
        ],
      },
      {
        id: "service",
        title: "Le Service",
        blocks: [
          "Le Service est un outil gratuit, fonctionnant dans le navigateur, qui permet de rédiger des CV et de les télécharger au format PDF. Ses principales fonctionnalités sont les modèles et les réglages de mise en page, l’aperçu en direct, les CV en cinq langues, l’ajout d’une photo, l’enregistrement et le chargement de fichiers JSON, ainsi qu’un assistant de rédaction utilisant l’intelligence artificielle (l’« assistant IA »).",
          "Aucune inscription n’est requise. Les données de votre CV sont stockées par votre navigateur et le PDF est généré sur votre appareil ; le prestataire n’a pas accès à ces données. La seule exception est l’assistant IA, dont le traitement des données est décrit dans la Politique de confidentialité.",
        ],
      },
      {
        id: "acceptance",
        title: "Acceptation et champ d’application",
        blocks: [
          "Les présentes conditions vous engagent dès votre première utilisation du Service et s’appliquent pendant toute la durée de celle-ci. L’utilisation du Service crée entre vous et le prestataire un contrat à titre gratuit, conclu par voie électronique ; le prestataire ne l’archive pas séparément, et les conditions restent accessibles à tout moment sur cette page.",
          "Vous devez avoir au moins 16 ans pour utiliser le Service ; les utilisateurs plus jeunes ne peuvent l’utiliser qu’avec le consentement d’un parent ou d’un tuteur légal.",
        ],
      },
      {
        id: "use",
        title: "Vos obligations",
        blocks: [
          "Vous vous engagez :",
          {
            list: [
              "à n’utiliser le Service qu’à des fins licites ;",
              "à n’utiliser que des contenus (tels que des photos) que vous avez le droit d’utiliser, et à traiter les données d’autrui de manière licite ;",
              "à ne pas surcharger le Service ni tenter de contourner ses limites – en particulier, à ne pas envoyer de requêtes automatisées ou massives à l’assistant IA ;",
              "à ne pas tenter de perturber le Service ni d’accéder sans autorisation aux systèmes du prestataire.",
            ],
          },
          "Vous êtes l’unique responsable du contenu de votre CV, de son exactitude et de l’usage que vous en faites.",
        ],
      },
      {
        id: "ai",
        title: "L’assistant IA",
        blocks: [
          "À votre demande expresse (lorsque vous appuyez sur son bouton), l’assistant IA utilise le service Google Gemini pour proposer un texte pour un champ. Une suggestion n’est jamais ajoutée à votre CV sans votre accord.",
          "Un texte généré par intelligence artificielle peut être erroné, imprécis ou contraire à la réalité. Vous devez vérifier chaque suggestion avant de l’accepter et de l’utiliser ; le prestataire n’assume aucune responsabilité quant au contenu des suggestions.",
          "Ne saisissez pas de catégories particulières de données à caractère personnel (telles que des données de santé) dans les champs traités par l’assistant IA, ni de données de tiers que vous n’avez pas le droit de communiquer.",
          "L’utilisation de l’assistant IA est soumise à des limites d’usage et dépend d’un fournisseur externe ; l’assistant peut donc parfois être lent ou indisponible. Le prestataire peut modifier ou supprimer cette fonctionnalité à tout moment.",
        ],
      },
      {
        id: "ip",
        title: "Propriété intellectuelle",
        blocks: [
          "Le logiciel, le design, les modèles et les textes du Service sont la propriété intellectuelle du prestataire ou de ses concédants de licence. Les polices intégrées sont utilisées conformément à la licence SIL Open Font License.",
          "Les contenus que vous saisissez vous appartiennent. Vous pouvez utiliser librement et sans restriction le CV finalisé au format PDF – y compris le modèle qu’il utilise – pour votre propre recherche d’emploi et à des fins professionnelles, gratuitement et sans obligation de mentionner la source.",
          "Il est interdit de copier ou de revendre le Service ou ses modèles, ou de les proposer comme votre propre service, sans l’autorisation du prestataire.",
        ],
      },
      {
        id: "data",
        title: "Vos données et sauvegardes",
        blocks: [
          "Les données de votre CV sont stockées uniquement dans votre navigateur. Elles peuvent être perdues si vous effacez vos données de navigation, changez de navigateur ou d’appareil, ou utilisez la navigation privée. Il vous appartient d’effectuer des sauvegardes avec « Enregistrer dans un fichier » ; le prestataire ne peut pas récupérer les données perdues.",
        ],
      },
      {
        id: "liability",
        title: "Responsabilité",
        blocks: [
          "Le Service est fourni « en l’état » et « selon sa disponibilité ». Le prestataire s’efforce d’en assurer un fonctionnement continu et sans erreur, mais ne le garantit pas : des opérations de maintenance, des erreurs ou des pannes de fournisseurs externes (hébergement, IA) peuvent rendre le Service temporairement indisponible.",
          "Dans les limites autorisées par la loi, le prestataire n’est notamment pas responsable :",
          {
            list: [
              "de l’issue des candidatures à un emploi ou d’autres candidatures ;",
              "du contenu et de l’exactitude de votre CV ;",
              "de la perte des données stockées dans votre navigateur ;",
              "du contenu des suggestions de l’assistant IA ;",
              "des dommages résultant de défaillances de votre appareil ou de votre connexion Internet.",
            ],
          },
          "Cette limitation ne s’applique pas à la responsabilité pour les manquements intentionnels ou dus à une négligence grave, pour les manquements portant atteinte à la vie, à l’intégrité physique ou à la santé, ni à toute autre responsabilité qui ne peut être exclue par la loi.",
        ],
      },
      {
        id: "fees",
        title: "Tarifs",
        blocks: [
          "Le Service est actuellement entièrement gratuit. Si le prestataire introduit à l’avenir des fonctionnalités payantes, il en communiquera clairement les conditions à l’avance, et ces fonctionnalités ne pourront être utilisées qu’avec votre acceptation expresse.",
        ],
      },
      {
        id: "changes",
        title: "Modifications et cessation du Service",
        blocks: [
          "Le prestataire peut modifier les présentes conditions. Les conditions modifiées seront publiées sur cette page avec leur date d’entrée en vigueur ; la poursuite de l’utilisation du Service après cette date vaut acceptation des conditions modifiées.",
          "Le prestataire peut modifier, suspendre ou arrêter le Service à tout moment. Les données de votre CV se trouvant dans votre navigateur, elles n’en sont pas affectées, et votre sauvegarde JSON reste utilisable indépendamment du Service.",
        ],
      },
      {
        id: "law",
        title: "Droit applicable et réclamations",
        blocks: [
          "Les présentes conditions sont régies par le droit hongrois. Si vous êtes un consommateur, ce choix ne vous prive pas de la protection que vous assurent les dispositions impératives de protection des consommateurs du pays dans lequel vous avez votre résidence habituelle.",
          `Pour toute question, réclamation ou remarque, contactez le prestataire à l’adresse ${site.operator.email} ; vous recevrez une réponse sur le fond dans un délai de 30 jours. Les litiges sont tranchés par la juridiction compétente en vertu du droit applicable ; si vous êtes un consommateur, vous pouvez également vous adresser à l’organisme de conciliation ou de règlement extrajudiciaire des litiges compétent pour votre lieu de résidence.`,
          "Les présentes conditions sont disponibles en plusieurs langues ; en cas de divergence, la version hongroise prévaut.",
        ],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    description: `Quelles données ${site.name} traite et quels sont vos droits.`,
    intro: [
      `${site.name} est conçu pour traiter le moins de données personnelles possible : pas d’inscription, pas de base de données, pas d’outil de mesure d’audience et aucun traçage. Conformément au règlement général sur la protection des données de l’Union européenne (RGPD), la présente politique explique quelles données sont traitées et quels sont vos droits.`,
    ],
    sections: [
      {
        id: "controller",
        title: "Le responsable du traitement",
        blocks: [
          {
            list: [`Nom : ${site.operator.name}`, `Adresse : ${site.operator.address}`, `E-mail : ${site.operator.email}`],
          },
          "Pour toute question relative à la protection des données, vous pouvez contacter le responsable du traitement (« nous ») à l’adresse e-mail ci-dessus.",
        ],
      },
      {
        id: "summary",
        title: "En bref",
        blocks: [
          {
            list: [
              "Les données de votre CV – y compris votre photo – sont stockées uniquement dans votre navigateur ; nous ne les recevons jamais et ne les voyons jamais.",
              "Le PDF est généré sur votre appareil.",
              "L’assistant IA n’envoie des données que lorsque vous appuyez sur son bouton, et même dans ce cas uniquement le texte du champ que vous modifiez et votre parcours professionnel – jamais votre nom, vos coordonnées, votre date de naissance ni votre photo.",
              "Pas d’inscription, pas d’outil de mesure d’audience, pas de cookies publicitaires ni de traçage.",
            ],
          },
        ],
      },
      {
        id: "local",
        title: "Données stockées dans votre navigateur",
        blocks: [
          "Le Service enregistre le contenu de votre CV, votre photo et vos réglages de mise en page dans le stockage local de votre navigateur (localStorage) afin que votre travail ne soit pas perdu. Hormis le cas de l’assistant IA décrit ci-dessous, ces données ne sont transmises ni à nous ni à qui que ce soit d’autre ; nous ne les traitons donc pas.",
          "Le thème de couleur choisi (clair ou sombre) est également conservé dans le stockage local. Vous pouvez supprimer ces données à tout moment via « Fichier → Nouveau CV vierge » ou en effaçant les données de votre navigateur.",
        ],
      },
      {
        id: "cookie",
        title: "Préférence de langue (cookie)",
        blocks: [
          `Lorsque vous changez de langue, le Service dépose un cookie nommé « ${cookie} », qui enregistre le code de la langue choisie (par exemple « fr ») pendant un an au maximum, afin que le site s’affiche dans la bonne langue lors de votre prochaine visite. Ce cookie est strictement nécessaire à une fonctionnalité que vous avez expressément demandée et ne permet pas de vous identifier ; il n’est donc pas soumis à votre consentement. Le Service n’utilise aucun autre cookie.`,
        ],
      },
      {
        id: "ai",
        title: "L’assistant IA",
        blocks: [
          "Lorsque vous utilisez l’assistant IA, le Service envoie les données suivantes à notre serveur, qui les transmet à l’API Google Gemini :",
          {
            list: [
              "le texte actuel du champ que vous modifiez (profil ou description d’un élément) ;",
              "votre parcours professionnel : votre intitulé de poste, les intitulés, organisations et dates de vos éléments, des descriptions abrégées, vos compétences et vos langues (lors de la rédaction de votre profil, un tel résumé de l’ensemble de votre CV) ;",
              "la langue de votre CV et l’action demandée.",
            ],
          },
          "Votre nom, votre adresse e-mail, votre numéro de téléphone, votre ville, votre site web et vos liens de profil, votre date de naissance et votre photo ne sont jamais transmis. Toutefois, si vous saisissez vous-même des données personnelles dans le champ, elles sont transmises avec le texte.",
          "**Finalité :** produire la suggestion de texte que vous avez demandée. **Base juridique :** la fourniture d’un service que vous avez expressément demandé (article 6, paragraphe 1, point b) du RGPD).",
          `**Durée de conservation :** nous ne conservons ni ne journalisons le texte ; il n’existe dans la mémoire du serveur que jusqu’à ce que la réponse soit complète. Google traite les requêtes conformément aux conditions de l’API Gemini : ${site.ai.terms}`,
          "L’utilisation de l’assistant IA est facultative ; toutes les autres fonctionnalités du Service fonctionnent sans lui.",
        ],
      },
      {
        id: "logs",
        title: "Données techniques et journaux",
        blocks: [
          "Lors de l’affichage des pages et du traitement des requêtes de l’assistant IA, les serveurs de l’hébergeur enregistrent des données techniques (adresse IP, heure, adresse demandée, type de navigateur) afin d’assurer le fonctionnement du Service et de prévenir les abus. Pour les requêtes de l’assistant IA, l’adresse IP est en outre conservée dans la mémoire du serveur pendant 10 minutes au maximum, afin de pouvoir limiter une utilisation excessive.",
          "**Base juridique :** notre intérêt légitime à exploiter le Service en toute sécurité (article 6, paragraphe 1, point f) du RGPD). **Durée de conservation :** une courte période, selon les paramètres de journalisation de l’hébergeur.",
        ],
      },
      {
        id: "contact",
        title: "Nous contacter par e-mail",
        blocks: [
          "Si vous nous écrivez par e-mail, nous traitons les données figurant dans votre message (nom, adresse e-mail, contenu) afin de répondre à votre demande, sur la base de notre intérêt légitime (article 6, paragraphe 1, point f) du RGPD), pendant un an au maximum après la clôture du dossier.",
        ],
      },
      {
        id: "processors",
        title: "Sous-traitants et transferts internationaux",
        blocks: [
          {
            list: [
              `${site.hosting.name} (${site.hosting.address}) – hébergement et infrastructure serveur ;`,
              `${site.ai.name} (${site.ai.address}) – l’API Gemini, qui génère les suggestions de l’assistant IA.`,
            ],
          },
          "Ces deux prestataires traitent également des données aux États-Unis. Les transferts reposent sur le cadre de protection des données UE–États-Unis (Data Privacy Framework) et/ou sur les clauses contractuelles types adoptées par la Commission européenne.",
          "Nous ne vendons pas de données personnelles, nous ne les utilisons pas à des fins de marketing ou de profilage et nous ne prenons aucune décision automatisée.",
        ],
      },
      {
        id: "rights",
        title: "Vos droits",
        blocks: [
          "En vertu du RGPD, vous pouvez demander l’accès à vos données personnelles, leur rectification, leur effacement ou la limitation de leur traitement, vous opposer à un traitement fondé sur l’intérêt légitime et exercer votre droit à la portabilité des données. Nous répondons aux demandes dans un délai d’un mois au plus tard.",
          "Comme nous ne conservons pas les données de votre CV, vous exercez ces droits (par exemple le droit à l’effacement) directement dans votre navigateur pour ces données.",
          `En cas de réclamation, vous pouvez vous adresser à l’autorité de contrôle : ${site.authority.name}, ${site.authority.address}, ${site.authority.email}, ${site.authority.website}. Vous pouvez également saisir l’autorité de protection des données du pays de l’UE dans lequel vous résidez ou travaillez, ou un tribunal.`,
        ],
      },
      {
        id: "children",
        title: "Enfants",
        blocks: [
          "Le Service ne s’adresse pas spécifiquement aux enfants de moins de 16 ans. Les utilisateurs de moins de 16 ans ne peuvent utiliser l’assistant IA qu’avec le consentement d’un parent ou d’un tuteur légal.",
        ],
      },
      {
        id: "security",
        title: "Sécurité",
        blocks: [
          "La connexion entre le site et le serveur est chiffrée (HTTPS), et les clés d’API sont stockées uniquement sur le serveur. Les données de votre CV se trouvant sur votre appareil, protéger cet appareil, c’est aussi protéger vos données (par exemple au moyen d’un verrouillage de l’écran, ou en effaçant vos données de navigation sur un ordinateur partagé).",
        ],
      },
      {
        id: "changes",
        title: "Modifications de la présente politique",
        blocks: ["Nous pouvons mettre à jour la présente politique. La version en vigueur, avec sa date d’entrée en vigueur, est toujours disponible sur cette page."],
      },
    ],
  },
});

export default legal;
