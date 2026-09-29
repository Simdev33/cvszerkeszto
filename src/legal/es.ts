import type { LegalContent } from "./types";

const legal: LegalContent = (site, cookie) => ({
  terms: {
    title: "Términos y condiciones de uso",
    description: `Condiciones de uso del creador de currículums ${site.name}.`,
    intro: [
      `Estos términos regulan el uso del creador de currículums online ${site.name} (el «Servicio»). Al utilizar el Servicio, aceptas estos términos; si no estás de acuerdo con ellos, te rogamos que no lo utilices.`,
    ],
    sections: [
      {
        id: "provider",
        title: "Datos del prestador",
        blocks: [
          {
            list: [
              `Nombre: ${site.operator.name}`,
              `Domicilio social: ${site.operator.address}`,
              `Correo electrónico: ${site.operator.email}`,
              `Número de registro: ${site.operator.registry}`,
              `Número de identificación fiscal: ${site.operator.taxNumber}`,
            ],
          },
          `Proveedor de alojamiento: ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`,
        ],
      },
      {
        id: "service",
        title: "El Servicio",
        blocks: [
          "El Servicio es una herramienta gratuita que funciona en el navegador y permite redactar currículums y descargarlos en PDF. Sus funciones principales son las plantillas y los ajustes de diseño, la vista previa en tiempo real, los currículums en cinco idiomas, la posibilidad de añadir una foto, el guardado y la carga de archivos JSON, y un asistente de redacción basado en inteligencia artificial (el «asistente de IA»).",
          "No es necesario registrarse. Los datos de tu currículum los almacena tu navegador y el PDF se genera en tu dispositivo; el prestador no tiene acceso a estos datos. La única excepción es el asistente de IA, cuyo tratamiento de datos se describe en la Política de privacidad.",
        ],
      },
      {
        id: "acceptance",
        title: "Aceptación y ámbito de aplicación",
        blocks: [
          "Estos términos pasan a ser vinculantes desde que utilizas el Servicio por primera vez y se aplican durante todo el tiempo que lo utilices. El uso del Servicio da lugar a un contrato gratuito celebrado por vía electrónica entre tú y el prestador; el prestador no lo archiva por separado, y los términos están siempre disponibles en esta página.",
          "Para utilizar el Servicio debes tener al menos 16 años; los menores de esa edad solo pueden utilizarlo con el consentimiento de sus padres o tutores.",
        ],
      },
      {
        id: "use",
        title: "Tus obligaciones",
        blocks: [
          "Te comprometes a",
          {
            list: [
              "utilizar el Servicio únicamente con fines lícitos;",
              "utilizar solo contenidos (como fotos) sobre los que tengas derecho de uso y tratar los datos de otras personas de forma lícita;",
              "no sobrecargar el Servicio ni intentar eludir sus límites y, en particular, no enviar solicitudes automatizadas o masivas al asistente de IA;",
              "no intentar perturbar el funcionamiento del Servicio ni acceder sin autorización a los sistemas del prestador.",
            ],
          },
          "Solo tú eres responsable del contenido de tu currículum, de su veracidad y del uso que hagas de él.",
        ],
      },
      {
        id: "ai",
        title: "El asistente de IA",
        blocks: [
          "A petición expresa tuya (cuando pulsas su botón), el asistente de IA utiliza el servicio Google Gemini para proponer un texto para un campo. Ninguna sugerencia se añade a tu currículum sin tu aprobación.",
          "El texto generado por inteligencia artificial puede ser erróneo, inexacto o no ajustarse a la realidad. Debes revisar cada sugerencia antes de aceptarla y utilizarla; el prestador no asume ninguna responsabilidad por el contenido de las sugerencias.",
          "No introduzcas categorías especiales de datos personales (como datos de salud) en los campos que procesa el asistente de IA, ni datos de terceros que no tengas derecho a compartir.",
          "El uso del asistente de IA está sujeto a límites de uso y depende de un proveedor externo, por lo que en ocasiones puede ser lento o no estar disponible. El prestador puede modificar o suprimir esta función en cualquier momento.",
        ],
      },
      {
        id: "ip",
        title: "Propiedad intelectual",
        blocks: [
          "El software, el diseño, las plantillas y los textos del Servicio son propiedad intelectual del prestador o de sus licenciantes. Las fuentes incrustadas se utilizan conforme a la licencia SIL Open Font License.",
          "El contenido que introduces te pertenece. Puedes utilizar el currículum en PDF resultante —incluida la plantilla que emplea— de forma libre e ilimitada para tu propia búsqueda de empleo y tus fines profesionales, sin coste alguno y sin necesidad de citar la fuente.",
          "Queda prohibido copiar o revender el Servicio o sus plantillas, u ofrecerlos como servicio propio, sin permiso del prestador.",
        ],
      },
      {
        id: "data",
        title: "Tus datos y copias de seguridad",
        blocks: [
          "Los datos de tu currículum se almacenan únicamente en tu navegador. Pueden perderse si borras los datos de navegación, cambias de navegador o de dispositivo, o utilizas la navegación privada. Es responsabilidad tuya hacer copias de seguridad con «Guardar en archivo»; el prestador no puede recuperar los datos perdidos.",
        ],
      },
      {
        id: "liability",
        title: "Responsabilidad",
        blocks: [
          "El Servicio se ofrece «tal cual» y «según disponibilidad». El prestador procura que funcione de forma continua y sin errores, pero no lo garantiza: por tareas de mantenimiento, errores o caídas de proveedores externos (alojamiento, IA), el Servicio puede no estar disponible temporalmente.",
          "En la medida en que lo permita la ley, el prestador no será responsable, en particular, de lo siguiente:",
          {
            list: [
              "el resultado de las candidaturas a ofertas de empleo u otras solicitudes;",
              "el contenido y la exactitud de tu currículum;",
              "la pérdida de los datos almacenados en tu navegador;",
              "el contenido de las sugerencias del asistente de IA;",
              "los daños derivados de fallos de tu dispositivo o de tu conexión a internet.",
            ],
          },
          "Esta limitación no se aplica a la responsabilidad por incumplimientos dolosos o por negligencia grave, por incumplimientos que causen daños a la vida, la integridad física o la salud, ni a ninguna otra responsabilidad que no pueda excluirse legalmente.",
        ],
      },
      {
        id: "fees",
        title: "Precio",
        blocks: [
          "Actualmente, el Servicio es totalmente gratuito. Si en el futuro el prestador introduce funciones de pago, comunicará sus condiciones de forma clara y con antelación, y las funciones de pago solo podrán utilizarse si las aceptas expresamente.",
        ],
      },
      {
        id: "changes",
        title: "Modificación y cese",
        blocks: [
          "El prestador puede modificar estos términos. Los términos modificados se publicarán en esta página junto con su fecha de entrada en vigor; si sigues utilizando el Servicio después de esa fecha, se entenderá que aceptas los términos modificados.",
          "El prestador puede modificar, suspender o dejar de ofrecer el Servicio en cualquier momento. Como los datos de tu currículum están en tu navegador, esto no les afecta, y tu copia de seguridad en JSON sigue siendo utilizable con independencia del Servicio.",
        ],
      },
      {
        id: "law",
        title: "Legislación aplicable y reclamaciones",
        blocks: [
          "Estos términos se rigen por la legislación húngara. Si eres consumidor, ello no te priva de la protección que te otorgan las normas imperativas de protección de los consumidores del país en el que tengas tu residencia habitual.",
          `Para cualquier pregunta, reclamación o comentario, puedes escribir al prestador a ${site.operator.email}; recibirás una respuesta sobre el fondo del asunto en un plazo máximo de 30 días. Los litigios se resolverán ante el tribunal competente conforme a la legislación aplicable; los consumidores también pueden acudir al organismo de conciliación o de resolución alternativa de litigios competente en su lugar de residencia.`,
          "Estos términos están disponibles en varios idiomas; en caso de discrepancia, prevalecerá la versión en húngaro.",
        ],
      },
    ],
  },

  privacy: {
    title: "Política de privacidad",
    description: `Qué datos trata ${site.name} y qué derechos tienes.`,
    intro: [
      `${site.name} está diseñado para tratar la menor cantidad posible de datos personales: sin registro, sin base de datos, sin analítica y sin seguimiento. Conforme al Reglamento General de Protección de Datos de la UE (RGPD), esta política explica qué datos se tratan y qué derechos tienes.`,
    ],
    sections: [
      {
        id: "controller",
        title: "Responsable del tratamiento",
        blocks: [
          {
            list: [`Nombre: ${site.operator.name}`, `Dirección: ${site.operator.address}`, `Correo electrónico: ${site.operator.email}`],
          },
          "Para cualquier cuestión relacionada con la protección de datos, puedes ponerte en contacto con el responsable («nosotros») en la dirección de correo electrónico indicada.",
        ],
      },
      {
        id: "summary",
        title: "En resumen",
        blocks: [
          {
            list: [
              "Los datos de tu currículum, incluida tu foto, se almacenan únicamente en tu navegador; nunca los recibimos ni los vemos.",
              "El PDF se genera en tu dispositivo.",
              "El asistente de IA solo envía datos cuando pulsas su botón y, aun así, únicamente el texto del campo que estás editando y tu trayectoria profesional; nunca tu nombre, tus datos de contacto, tu fecha de nacimiento ni tu foto.",
              "Sin registro, sin analítica y sin cookies publicitarias ni de seguimiento.",
            ],
          },
        ],
      },
      {
        id: "local",
        title: "Datos almacenados en tu navegador",
        blocks: [
          "El Servicio guarda el contenido de tu currículum, tu foto y los ajustes de diseño en el almacenamiento local de tu navegador (localStorage) para que no pierdas tu trabajo. Salvo en el caso del asistente de IA descrito más abajo, estos datos no se transmiten ni a nosotros ni a ningún tercero, por lo que no los tratamos.",
          "El tema de color que elijas (claro u oscuro) también se guarda en el almacenamiento local. Puedes borrar estos datos en cualquier momento con «Archivo → Nuevo currículum vacío» o borrando los datos de tu navegador.",
        ],
      },
      {
        id: "cookie",
        title: "Preferencia de idioma (cookie)",
        blocks: [
          `Cuando cambias de idioma, el Servicio instala una cookie llamada «${cookie}» que guarda el código del idioma elegido (por ejemplo, «es») durante un máximo de un año, para que el sitio se muestre en el idioma correcto en tu próxima visita. Esta cookie es estrictamente necesaria para una función que has solicitado expresamente y no permite identificarte, por lo que no requiere consentimiento. El Servicio no utiliza ninguna otra cookie.`,
        ],
      },
      {
        id: "ai",
        title: "El asistente de IA",
        blocks: [
          "Cuando utilizas el asistente de IA, el Servicio envía los siguientes datos a nuestro servidor, que los reenvía a la API de Google Gemini:",
          {
            list: [
              "el texto actual del campo que estás editando (perfil o descripción de un elemento);",
              "tu trayectoria profesional: tu puesto, los nombres, organizaciones y fechas de tus entradas, descripciones abreviadas, tus habilidades y tus idiomas (al redactar tu perfil, un resumen de este tipo de todo tu currículum);",
              "el idioma de tu currículum y la acción solicitada.",
            ],
          },
          "Nunca se envían tu nombre, tu dirección de correo electrónico, tu número de teléfono, tu ciudad, tu página web y tus enlaces de perfil, tu fecha de nacimiento ni tu foto. No obstante, si escribes por tu cuenta datos personales en el campo, estos se envían como parte del texto.",
          "**Finalidad:** crear la sugerencia de texto que has solicitado. **Base jurídica:** la prestación de un servicio que has solicitado expresamente (artículo 6.1.b) del RGPD).",
          `**Conservación:** no almacenamos ni registramos el texto; solo existe en la memoria del servidor hasta que se completa la respuesta. Google trata las solicitudes conforme a las condiciones de la API de Gemini: ${site.ai.terms}`,
          "El uso del asistente de IA es opcional; todas las demás funciones del Servicio funcionan sin él.",
        ],
      },
      {
        id: "logs",
        title: "Datos técnicos y registros",
        blocks: [
          "Al servir las páginas y procesar las solicitudes del asistente de IA, los servidores del proveedor de alojamiento registran datos técnicos (dirección IP, hora, dirección solicitada, tipo de navegador) para mantener el Servicio en funcionamiento y prevenir abusos. En las solicitudes al asistente de IA, la dirección IP también se conserva en la memoria del servidor durante un máximo de 10 minutos para poder limitar el uso excesivo.",
          "**Base jurídica:** nuestro interés legítimo en explotar el Servicio de forma segura (artículo 6.1.f) del RGPD). **Conservación:** durante un breve período, según la configuración de registros del proveedor de alojamiento.",
        ],
      },
      {
        id: "contact",
        title: "Contacto por correo electrónico",
        blocks: [
          "Si nos escribes por correo electrónico, tratamos los datos de tu mensaje (nombre, dirección de correo electrónico, contenido) para responder a tu consulta, sobre la base de nuestro interés legítimo (artículo 6.1.f) del RGPD), durante un máximo de un año desde el cierre del asunto.",
        ],
      },
      {
        id: "processors",
        title: "Encargados del tratamiento y transferencias internacionales",
        blocks: [
          {
            list: [
              `${site.hosting.name} (${site.hosting.address}): alojamiento e infraestructura de servidores;`,
              `${site.ai.name} (${site.ai.address}): la API de Gemini, que genera las sugerencias del asistente de IA.`,
            ],
          },
          "Ambos proveedores también tratan datos en Estados Unidos. Las transferencias se basan en el Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework), en las cláusulas contractuales tipo adoptadas por la Comisión Europea o en ambos.",
          "No vendemos datos personales, no los utilizamos con fines de marketing ni de elaboración de perfiles y no tomamos decisiones automatizadas.",
        ],
      },
      {
        id: "rights",
        title: "Tus derechos",
        blocks: [
          "En virtud del RGPD, puedes solicitar el acceso a tus datos personales, su rectificación, su supresión o la limitación de su tratamiento, oponerte al tratamiento basado en el interés legítimo y ejercer tu derecho a la portabilidad de los datos. Respondemos a las solicitudes en el plazo máximo de un mes.",
          "Como no almacenamos los datos de tu currículum, los derechos sobre esos datos (por ejemplo, la supresión) los ejerces directamente en tu navegador.",
          `Si tienes una reclamación, puedes dirigirte a la autoridad de control: ${site.authority.name}, ${site.authority.address}, ${site.authority.email}, ${site.authority.website}. También puedes acudir a la autoridad de protección de datos del país de la UE en el que vivas o trabajes (en España, la Agencia Española de Protección de Datos) o a los tribunales.`,
        ],
      },
      {
        id: "children",
        title: "Menores",
        blocks: [
          "El Servicio no está dirigido específicamente a menores de 16 años. Los usuarios menores de 16 años solo pueden utilizar el asistente de IA con el consentimiento de sus padres o tutores.",
        ],
      },
      {
        id: "security",
        title: "Seguridad",
        blocks: [
          "La conexión entre el sitio y el servidor está cifrada (HTTPS), y las claves de API solo se almacenan en el servidor. Como los datos de tu currículum están en tu dispositivo, proteger ese dispositivo también protege tus datos (por ejemplo, con un bloqueo de pantalla o borrando los datos de navegación en un ordenador compartido).",
        ],
      },
      {
        id: "changes",
        title: "Cambios en esta política",
        blocks: ["Podemos actualizar esta política. La versión vigente, con su fecha de entrada en vigor, está siempre disponible en esta página."],
      },
    ],
  },
});

export default legal;
