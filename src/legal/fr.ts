import type { LegalContent } from "./types";

// Textes juridiques français – traduction de en.ts (en cas de divergence, la version anglaise prévaut).
const legal: LegalContent = ({ site, email, price, cookies }) => {
  const operator = {
    list: [
      `Nom : ${site.operator.name}`,
      `Siège social : ${site.operator.address}`,
      `Immatriculation : ${site.operator.registry}`,
      `Numéro fiscal : ${site.operator.taxNumber}`,
      `E-mail : ${email}`,
    ],
  };

  return {
    terms: {
      title: "Conditions générales d’utilisation",
      description: `Les conditions d’utilisation de ${site.name} et de l’abonnement à ce service.`,
      intro: [
        `Les présentes conditions régissent l’utilisation du service en ligne ${site.name} (https://${site.domain}, ci-après : le « Service ») ainsi que l’abonnement à celui-ci. En utilisant le Service ou en souscrivant l’abonnement, vous acceptez les présentes conditions ; si vous ne les acceptez pas, nous vous prions de ne pas utiliser le Service.`,
      ],
      sections: [
        {
          id: "operator",
          title: "L’exploitant",
          blocks: ["Le Service est fourni par l’exploitant suivant (ci-après : l’« Exploitant ») :", operator, `Hébergeur : ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`],
        },
        {
          id: "service",
          title: "Le Service",
          blocks: [
            `${site.name} est un outil en ligne qui permet de rédiger des CV et de les télécharger au format PDF. Ses principales fonctionnalités sont les modèles et les réglages de mise en page, l’aperçu en direct, les CV en cinq langues, l’ajout d’une photo, l’enregistrement et le chargement de fichiers JSON, ainsi qu’un assistant de rédaction utilisant l’intelligence artificielle (l’« assistant IA »).`,
            "La rédaction, la mise en page et l’aperçu d’un CV, l’assistant IA et l’enregistrement dans un fichier JSON sont gratuits. Le téléchargement du CV au format PDF nécessite un abonnement (voir la section 3).",
            "Votre CV est stocké et le PDF est généré dans votre navigateur, sur votre propre appareil ; leur contenu n’est pas transmis à l’Exploitant. La seule exception est l’assistant IA – les détails figurent dans la [Politique de confidentialité](privacy).",
          ],
        },
        {
          id: "subscription",
          title: "Abonnement et tarifs",
          blocks: [
            `L’abonnement commence par une période initiale de ${price.days} jours, dont le prix est de ${price.trial}. Pendant cette période, le Service peut être utilisé pleinement, sans aucune restriction.`,
            `Si vous ne résiliez pas l’abonnement avant la fin de la période initiale, il se poursuit automatiquement, à partir du ${price.next}e jour, sous la forme d’un abonnement au prix mensuel de ${price.monthly}, et il est renouvelé chaque mois jusqu’à sa résiliation. Le prix mensuel est prélevé au début de chaque période sur le moyen de paiement que vous avez indiqué lors de la commande.`,
            "Le montant total à payer est clairement indiqué sur la page de paiement avant que vous ne passiez commande. La commande est passée lorsque vous appuyez sur le bouton indiquant l’obligation de paiement (ou sur le bouton du moyen de paiement choisi).",
            "Nous informons les abonnés par e-mail de toute modification des tarifs au moins 30 jours avant son entrée en vigueur ; si vous ne l’acceptez pas, vous pouvez résilier votre abonnement avant cette date.",
          ],
        },
        {
          id: "payment",
          title: "Paiement",
          blocks: [
            `Les paiements sont traités par ${site.payments.name} (Irlande). Les moyens de paiement disponibles dépendent de votre appareil, de votre navigateur et de votre pays, et peuvent inclure les cartes de débit et de crédit, Apple Pay, Google Pay, PayPal et Link. L’Exploitant ne voit ni ne conserve les données de votre carte.`,
            "Stripe vous envoie un reçu par e-mail pour chaque paiement réussi. La facture exigée par la loi est émise par l’Exploitant.",
            "Si un prélèvement mensuel échoue, Stripe effectue une nouvelle tentative dans un délai de quelques jours ; si le prélèvement échoue toujours, l’abonnement prend fin, de même que votre accès au téléchargement.",
          ],
        },
        {
          id: "cancellation",
          title: "Résiliation",
          blocks: [
            "Vous pouvez résilier votre abonnement à tout moment, sans avoir à vous justifier, sur la page [Mon compte](account) (connexion avec un code envoyé par e-mail), en un clic, via l’interface sécurisée de Stripe.",
            `La résiliation prend effet à la fin de la période en cours : jusque-là, vous conservez votre accès, et aucun autre prélèvement n’est effectué. Si vous résiliez pendant la période initiale, aucun prix mensuel n’est prélevé à partir du ${price.next}e jour.`,
            "Le prix d’une période déjà commencée n’est pas remboursé, sauf si vous exercez votre droit de rétractation et dans les autres cas prévus par la loi.",
          ],
        },
        {
          id: "withdrawal",
          title: "Droit de rétractation",
          blocks: [
            `Si vous souscrivez l’abonnement en tant que consommateur, vous pouvez vous rétracter du contrat dans un délai de 14 jours à compter de la commande, sans avoir à motiver votre décision. Vous pouvez informer l’Exploitant de votre décision de vous rétracter au moyen d’une déclaration dénuée d’ambiguïté (par exemple par e-mail à l’adresse ${email}) ; vous pouvez utiliser le modèle de formulaire de rétractation figurant à l’annexe I, partie B, de la directive 2011/83/UE, mais vous n’y êtes pas obligé.`,
            "Comme vous demandez expressément, lors de la commande, que l’exécution du Service commence immédiatement, vous devez, en cas de rétractation, payer un montant proportionnel à la période d’utilisation écoulée jusqu’à la rétractation. Nous vous remboursons le montant restant, sur le moyen de paiement utilisé pour le paiement, dans un délai de 14 jours à compter du jour où vous nous informez de votre rétractation.",
            "Le droit de rétractation n’affecte pas votre possibilité de résilier l’abonnement à tout moment (voir la section 5).",
          ],
        },
        {
          id: "account",
          title: "Compte et connexion",
          blocks: [
            "Il n’y a pas d’inscription distincte avec mot de passe. Votre compte est lié à l’adresse e-mail que vous indiquez lors du paiement : dans le navigateur avec lequel vous avez payé, vous êtes connecté automatiquement, et sur d’autres appareils, vous pouvez vous connecter avec un code à 6 chiffres envoyé par e-mail, valable 10 minutes.",
            "Vos CV ne sont pas stockés dans votre compte : ils restent dans le navigateur dans lequel vous les avez rédigés. Pour continuer sur un autre appareil, utilisez « Enregistrer dans un fichier » et « Charger depuis un fichier ».",
            "Ne communiquez votre code de connexion à personne. L’abonnement est à usage personnel ; le partage ou la revente de l’accès ne sont pas autorisés.",
          ],
        },
        {
          id: "ai",
          title: "L’assistant IA",
          blocks: [
            "À votre demande expresse (lorsque vous appuyez sur son bouton), l’assistant IA utilise le service Google Gemini pour proposer un texte pour un champ. Une suggestion n’est jamais ajoutée à votre CV sans votre accord.",
            "Un texte généré par intelligence artificielle peut être erroné, imprécis ou contraire à la réalité. Vous devez vérifier chaque suggestion avant de l’accepter et de l’utiliser ; l’Exploitant n’assume aucune responsabilité quant au contenu des suggestions.",
            "Ne saisissez pas de catégories particulières de données à caractère personnel (telles que des données de santé) dans les champs traités par l’assistant IA, ni de données de tiers que vous n’avez pas le droit de communiquer.",
            "L’utilisation de l’assistant IA est soumise à des limites d’usage et dépend d’un fournisseur externe ; l’assistant peut donc parfois être lent ou indisponible. L’Exploitant peut modifier ou supprimer cette fonctionnalité à tout moment.",
          ],
        },
        {
          id: "use",
          title: "Conditions d’utilisation",
          blocks: [
            "Vous ne pouvez utiliser le Service qu’à des fins licites et conformément aux présentes conditions. Vous vous engagez notamment :",
            {
              list: [
                "à indiquer des informations véridiques dans votre CV, et à n’utiliser que des contenus (tels que des photos) que vous avez le droit d’utiliser ;",
                "à traiter de manière licite les données personnelles d’autrui (par exemple celles de vos références) ;",
                "à ne pas utiliser le Service à des fins de fraude, d’usurpation d’identité ou à toute autre fin illicite ;",
                "à ne pas tenter d’accéder sans autorisation au Service, de contourner ses mesures de sécurité ou de paiement, ni de perturber son fonctionnement (par exemple par des requêtes automatisées en masse adressées à l’assistant IA).",
              ],
            },
            "Vous êtes l’unique responsable du contenu de votre CV et de l’usage que vous en faites.",
            "L’Exploitant peut restreindre l’accès ou y mettre fin afin de prévenir les abus ; en cas de manquement grave aux présentes conditions, l’abonnement peut être résilié avec effet immédiat.",
          ],
        },
        {
          id: "ownership",
          title: "Propriété intellectuelle",
          blocks: [
            "Le logiciel, le design, le logo, les modèles et les textes du Service sont la propriété intellectuelle de l’Exploitant ; au-delà d’une utilisation du Service conforme à sa destination, ils ne peuvent être ni copiés, ni revendus, ni proposés comme votre propre service.",
            "Le Service utilise également des composants open source (tels que React PDF et Mozilla pdf.js) ainsi que des polices distribuées sous licence SIL Open Font License, soumis à leurs propres conditions de licence.",
            "Les contenus que vous saisissez vous appartiennent. Vous pouvez utiliser librement le CV téléchargé au format PDF – y compris le modèle qu’il utilise – pour votre propre recherche d’emploi et à des fins professionnelles, sans obligation de mentionner la source.",
          ],
        },
        {
          id: "data",
          title: "Vos données et sauvegardes",
          blocks: [
            "Votre CV est stocké uniquement dans votre navigateur. Il peut être perdu si vous effacez vos données de navigation, changez de navigateur ou d’appareil, ou utilisez la navigation privée. Il vous appartient d’effectuer des sauvegardes avec « Enregistrer dans un fichier » ; l’Exploitant ne peut pas récupérer les données perdues.",
          ],
        },
        {
          id: "liability",
          title: "Responsabilité",
          blocks: [
            "L’Exploitant fait de son mieux pour assurer le fonctionnement continu et correct du Service, mais ne garantit pas qu’il sera disponible sans interruption ni erreur. Vérifiez le PDF téléchargé avant de l’envoyer.",
            "Dans toute la mesure permise par la loi, l’Exploitant n’est pas responsable des dommages indirects, du manque à gagner ou des pertes de données résultant de l’utilisation ou de l’impossibilité d’utiliser le Service, ni de l’issue des candidatures, ni du contenu des suggestions de l’IA. Cette limitation ne s’applique pas à la responsabilité pour les dommages causés intentionnellement ou par une faute lourde, ni pour les manquements contractuels portant atteinte à la vie, à l’intégrité physique ou à la santé, et elle n’affecte pas les droits reconnus aux consommateurs par la loi.",
          ],
        },
        {
          id: "changes-to-service",
          title: "Disponibilité et modifications",
          blocks: [
            "L’Exploitant a le droit de développer et de modifier le Service. En cas d’arrêt définitif du Service, nous mettons fin aux abonnements et remboursons, au prorata, le prix de la période non utilisée. Vos CV restent dans votre navigateur et dans vos sauvegardes JSON.",
          ],
        },
        {
          id: "data-protection",
          title: "Protection des données",
          blocks: ["Les modalités du traitement des données personnelles sont décrites dans la [Politique de confidentialité](privacy)."],
        },
        {
          id: "amendments",
          title: "Modification des conditions",
          blocks: [
            "L’Exploitant a le droit de modifier les présentes conditions. Les modifications prennent effet par leur publication sur cette page, à la date d’entrée en vigueur indiquée en haut du document. Nous informons les abonnés par e-mail, au moins 30 jours à l’avance, de toute modification substantielle qui leur est défavorable ; s’ils ne l’acceptent pas, ils peuvent résilier leur abonnement avant son entrée en vigueur.",
          ],
        },
        {
          id: "law",
          title: "Droit applicable et litiges",
          blocks: [
            "Les présentes conditions sont régies par le droit slovaque. Si vous utilisez le Service en tant que consommateur, ce choix de loi ne vous prive pas de la protection que vous assurent les dispositions impératives de protection des consommateurs de votre pays de résidence.",
            `Nous nous efforçons de régler les litiges à l’amiable : vous pouvez adresser votre réclamation à ${email}, et nous y répondons dans un délai de 30 jours. Si nous rejetons votre réclamation ou si nous n’y répondons pas dans un délai de 30 jours, vous pouvez, en tant que consommateur, engager une procédure de règlement extrajudiciaire des litiges auprès de l’Inspection slovaque du commerce (${site.adr.name}, ${site.adr.website}) ou d’un autre organisme de règlement des litiges figurant sur la liste du ministère slovaque de l’Économie. Vous pouvez également vous adresser à l’autorité de protection des consommateurs et aux tribunaux de votre lieu de résidence.`,
            "Les présentes conditions sont disponibles en plusieurs langues ; en cas de divergence, la version anglaise prévaut.",
          ],
        },
        {
          id: "contact",
          title: "Contact",
          blocks: [`Vous pouvez contacter l’Exploitant pour toute question, remarque ou réclamation à l’adresse e-mail suivante : ${email}.`],
        },
      ],
    },

    privacy: {
      title: "Politique de confidentialité",
      description: `Quelles données personnelles ${site.name} traite, pourquoi, et quels sont vos droits.`,
      intro: [
        `Conformément au règlement (UE) 2016/679 (règlement général sur la protection des données, RGPD), la présente politique explique quelles données personnelles nous traitons lorsque vous utilisez ${site.name} (https://${site.domain}), dans quel but, sur quelle base juridique et pendant combien de temps, ainsi que les droits dont vous disposez.`,
      ],
      sections: [
        {
          id: "controller",
          title: "Le responsable du traitement",
          blocks: [operator, `Pour toute question relative à la protection des données, vous pouvez nous joindre à l’adresse ${email}.`],
        },
        {
          id: "summary",
          title: "En bref",
          blocks: [
            {
              list: [
                "Votre CV – y compris votre photo – est stocké et converti en PDF dans votre navigateur, sur votre propre appareil ; il ne nous parvient jamais.",
                "L’assistant IA n’envoie des données que lorsque vous appuyez sur son bouton, et même dans ce cas uniquement le texte du champ que vous modifiez et votre parcours professionnel – jamais votre nom, vos coordonnées, votre date de naissance ni votre photo.",
                "Il n’y a pas d’inscription avec mot de passe. Si vous vous abonnez, nous traitons votre adresse e-mail et les données de votre abonnement.",
                "Les paiements sont traités par Stripe ; nous ne voyons ni ne conservons les données de votre carte.",
                "Nous n’utilisons ni outil de mesure d’audience ni suivi publicitaire. Nous n’utilisons que les cookies nécessaires à la connexion, au paiement et au choix de la langue.",
              ],
            },
          ],
        },
        {
          id: "cv-data",
          title: "Votre CV",
          blocks: [
            "Le Service enregistre le contenu de votre CV, votre photo et vos réglages de mise en page dans le stockage local de votre navigateur (localStorage), afin que votre travail ne soit pas perdu. Le PDF est lui aussi généré dans votre navigateur. Hormis le cas de l’assistant IA décrit ci-dessous, ces données ne sont transmises ni à nous ni à qui que ce soit d’autre ; nous ne les traitons donc pas.",
            "Vous pouvez supprimer ces données à tout moment via « Fichier → Nouveau CV vierge » ou en effaçant les données de votre navigateur. Le thème de couleur choisi (clair ou sombre) est également conservé dans le stockage local.",
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
            "**Finalité :** produire la suggestion de texte que vous avez demandée. **Base juridique :** la fourniture d’un service que vous avez expressément demandé (article 6, paragraphe 1, point b) du RGPD).",
            `**Durée de conservation :** nous ne conservons ni ne journalisons le texte ; il n’existe dans la mémoire du serveur que jusqu’à ce que la réponse soit complète. Google traite les requêtes conformément aux conditions de l’API Gemini : ${site.ai.terms}`,
            "L’utilisation de l’assistant IA est facultative ; toutes les autres fonctionnalités du Service fonctionnent sans lui.",
          ],
        },
        {
          id: "subscription",
          title: "Abonnement et paiement",
          blocks: [
            "Si vous vous abonnez, les données que vous saisissez sur la page de paiement sont traitées par Stripe ; nous recevons les données nécessaires au suivi de votre abonnement.",
            {
              list: [
                "Données traitées : adresse e-mail, identifiants de client et d’abonnement attribués par Stripe, statut et périodes de l’abonnement, montant et date des paiements, type de moyen de paiement (par exemple carte, avec ses 4 derniers chiffres) et – si la page de paiement les demande – pays et code postal de facturation.",
                "Finalité : création et exécution de l’abonnement, encaissement des paiements, vérification de l’accès, facturation et service client.",
                "Base juridique : exécution d’un contrat (article 6, paragraphe 1, point b) du RGPD) ; pour la tenue des documents comptables, respect d’une obligation légale (article 6, paragraphe 1, point c) du RGPD).",
                "Durée de conservation : pendant toute la durée de l’abonnement ; après sa fin, nous conservons les documents comptables pendant 10 ans, conformément à l’article 35 de la loi slovaque sur la comptabilité (loi n° 431/2002 Coll.). Nous supprimons les autres données à votre demande après la fin de l’abonnement.",
              ],
            },
            `Les paiements sont traités par ${site.payments.name} (${site.payments.address}), qui agit en tant que responsable du traitement indépendant pour les données de paiement et la prévention de la fraude. Vous trouverez des informations sur ses traitements de données à l’adresse ${site.payments.privacy}.`,
          ],
        },
        {
          id: "sign-in",
          title: "Connexion par code envoyé par e-mail",
          blocks: [
            "Sur d’autres appareils, vous pouvez vous connecter avec un code à usage unique envoyé par e-mail.",
            {
              list: [
                "Données traitées : adresse e-mail, forme hachée du code de connexion, heure d’expiration du code et nombre de tentatives.",
                "Finalité : connexion et protection de votre compte.",
                "Base juridique : exécution d’un contrat (article 6, paragraphe 1, point b) du RGPD).",
                "Durée de conservation : le code est valable 10 minutes, et nous le supprimons immédiatement après son utilisation.",
              ],
            },
            `Les e-mails de connexion sont envoyés par ${site.email.name} (${site.email.website}), en qualité de sous-traitant.`,
          ],
        },
        {
          id: "logs",
          title: "Journaux techniques",
          blocks: [
            "Lorsque le site est servi – comme pour tout site web – les serveurs de l’hébergeur enregistrent des données techniques.",
            {
              list: [
                "Données traitées : adresse IP, heure de la requête, adresse de la page demandée, type et version du navigateur.",
                "Finalité : fonctionnement sûr et ininterrompu du Service, détection des erreurs et des abus. Pour les requêtes liées à l’assistant IA, à la connexion et au paiement, l’adresse IP est en outre conservée dans la mémoire du serveur pendant 15 minutes au maximum, afin de pouvoir limiter une utilisation excessive.",
                "Base juridique : intérêt légitime de l’Exploitant (article 6, paragraphe 1, point f) du RGPD).",
                "Durée de conservation : une courte période, conformément aux règles de conservation des données de l’hébergeur.",
              ],
            },
          ],
        },
        {
          id: "cookies",
          title: "Cookies et stockage local",
          blocks: [
            "Nous n’utilisons que des cookies nécessaires au fonctionnement du Service ; ils ne requièrent pas de consentement :",
            {
              list: [
                `${cookies.session} : maintient votre connexion (180 jours) ;`,
                `${cookies.signedIn} : indique au site que vous êtes connecté (180 jours) ;`,
                `${cookies.login} : processus de connexion par code (10 minutes) ;`,
                `${cookies.locale} : mémorise la langue choisie dans le sélecteur de langue (1 an).`,
              ],
            },
            "Sur la page de paiement, Stripe utilise ses propres cookies pour traiter le paiement en toute sécurité et prévenir la fraude. Nous n’utilisons pas de cookies de mesure d’audience ni de cookies publicitaires. Nous chargeons les polices de caractères depuis notre propre serveur : aucun fournisseur de polices externe ne reçoit donc de données vous concernant.",
          ],
        },
        {
          id: "processors",
          title: "Sous-traitants et transferts de données",
          blocks: [
            "Les sous-traitants suivants traitent des données pour notre compte :",
            {
              list: [
                `hébergement et serveur d’application : ${site.hosting.name}, ${site.hosting.address} ;`,
                `suggestions de l’assistant IA : ${site.ai.name}, ${site.ai.address} (API Gemini) ;`,
                `envoi des e-mails de connexion : ${site.email.name}, États-Unis.`,
              ],
            },
            "Ces prestataires ont leur siège aux États-Unis d’Amérique ; les données peuvent donc également être transférées en dehors de l’Espace économique européen. Ces transferts sont encadrés par des garanties appropriées (le cadre de protection des données UE–États-Unis et/ou les clauses contractuelles types adoptées par la Commission européenne).",
            "Nous ne communiquons vos données à aucun autre tiers, nous ne les vendons pas, et nous ne les utilisons pas à des fins de marketing, de profilage ou de prise de décision automatisée.",
          ],
        },
        {
          id: "security",
          title: "Sécurité des données",
          blocks: [
            "Toutes les connexions entre le site et le serveur sont chiffrées (HTTPS). Les cookies de connexion sont signés et ne peuvent pas être lus par des scripts, et les clés d’API sont stockées uniquement sur le serveur. Votre CV se trouvant sur votre appareil, protéger cet appareil, c’est aussi protéger vos données (par exemple au moyen d’un verrouillage de l’écran, ou en effaçant vos données de navigation sur un ordinateur partagé).",
          ],
        },
        {
          id: "rights",
          title: "Vos droits",
          blocks: [
            "En vertu du RGPD, vous disposez des droits suivants :",
            {
              list: [
                "droit d’information et d’accès (article 15) ;",
                "droit de rectification (article 16) ;",
                "droit à l’effacement (article 17) ;",
                "droit à la limitation du traitement (article 18) ;",
                "droit à la portabilité des données (article 20) ;",
                "droit d’opposition au traitement fondé sur l’intérêt légitime (article 21).",
              ],
            },
            `Vous pouvez adresser votre demande à ${email} ; nous y répondrons dans un délai d’un mois au plus. Vous pouvez également modifier vous-même votre adresse e-mail sur la page [Mon compte](account), via l’interface de Stripe. Comme nous ne conservons pas votre CV, vous exercez ces droits à son égard directement dans votre navigateur.`,
          ],
        },
        {
          id: "remedies",
          title: "Voies de recours",
          blocks: [
            `Si vous estimez que le traitement de vos données personnelles enfreint la loi, vous pouvez introduire une réclamation auprès de l’autorité de contrôle du lieu du siège du responsable du traitement, l’Office de protection des données personnelles de la République slovaque (${site.authority.name} ; ${site.authority.address} ; ${site.authority.website}), ou auprès de l’autorité de protection des données de votre lieu de résidence ou de travail – en Hongrie, par exemple, l’Autorité nationale hongroise de protection des données et de la liberté de l’information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH ; 1055 Budapest, Falk Miksa utca 9–11. ; https://naih.hu).`,
            "En cas de violation de vos droits, vous pouvez également saisir la justice ; vous pouvez intenter l’action devant les juridictions de l’État membre de votre lieu de résidence.",
          ],
        },
        {
          id: "children",
          title: "Enfants",
          blocks: ["Le Service ne s’adresse pas aux enfants de moins de 16 ans, et nous ne traitons pas sciemment de données les concernant."],
        },
        {
          id: "changes",
          title: "Modifications de la présente politique",
          blocks: [
            "Nous mettons à jour la présente politique à chaque évolution du Service ; la date d’entrée en vigueur est indiquée en haut du document. Les conditions d’utilisation du Service figurent dans les [Conditions générales d’utilisation](terms).",
          ],
        },
      ],
    },
  };
};

export default legal;
