import type { LegalContent } from "./types";

// Textos legales en español – traducción de la versión inglesa (en.ts).
const legal: LegalContent = ({ site, email, price, cookies }) => {
  const operator = {
    list: [
      `Nombre: ${site.operator.name}`,
      `Domicilio social: ${site.operator.address}`,
      `Número de registro: ${site.operator.registry}`,
      `Número de identificación fiscal: ${site.operator.taxNumber}`,
      `Correo electrónico: ${email}`,
    ],
  };

  return {
    terms: {
      title: "Términos y condiciones de uso",
      description: `Las condiciones de uso de ${site.name} y de la suscripción a este servicio.`,
      intro: [
        `Estas condiciones regulan el uso del servicio web ${site.name} (https://${site.domain}, en adelante, el «Servicio») y la suscripción a este. Al utilizar el Servicio o contratar la suscripción, aceptas estas condiciones; si no estás de acuerdo con ellas, te rogamos que no utilices el Servicio.`,
      ],
      sections: [
        {
          id: "operator",
          title: "El operador",
          blocks: ["El Servicio lo presta el siguiente operador (en adelante, el «Operador»):", operator, `Proveedor de alojamiento: ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`],
        },
        {
          id: "service",
          title: "El Servicio",
          blocks: [
            `${site.name} es una herramienta en línea para redactar currículums y descargarlos en archivos PDF. Sus funciones principales son las plantillas y los ajustes de diseño, la vista previa en tiempo real, los currículums en cinco idiomas, la posibilidad de añadir una foto, el guardado y la carga de archivos JSON, y un asistente de redacción basado en inteligencia artificial (el «asistente de IA»).`,
            "Redactar, diseñar y previsualizar un currículum, el asistente de IA y el guardado en un archivo JSON son gratuitos. Para descargar el currículum en PDF es necesaria una suscripción (véase la sección 3).",
            "Tu currículum se almacena y el PDF se genera en tu navegador, en tu propio dispositivo; su contenido no se envía al Operador. La única excepción es el asistente de IA, cuyos detalles figuran en la [Política de privacidad](privacy).",
          ],
        },
        {
          id: "subscription",
          title: "Suscripción y tarifas",
          blocks: [
            `La suscripción comienza con un periodo introductorio de ${price.days} días, cuya tarifa es de ${price.trial}. Durante este periodo, el Servicio puede utilizarse en su totalidad, sin ninguna restricción.`,
            `Si no cancelas la suscripción antes de que finalice el periodo introductorio, a partir del día ${price.next} esta continúa automáticamente como suscripción con una tarifa mensual de ${price.monthly}, y se renueva cada mes hasta que la canceles. La tarifa mensual se cobra al inicio de cada periodo en el método de pago que hayas indicado al realizar el pedido.`,
            "El importe total a pagar se muestra claramente en la página de pago antes de que realices el pedido. El pedido se realiza al pulsar el botón que indica la obligación de pago (o el botón del método de pago seleccionado).",
            "Notificaremos a los suscriptores por correo electrónico cualquier modificación de las tarifas con al menos 30 días de antelación a su entrada en vigor; si no la aceptas, podrás cancelar tu suscripción antes de esa fecha.",
          ],
        },
        {
          id: "payment",
          title: "Pago",
          blocks: [
            `Los pagos los procesa ${site.payments.name} (Irlanda). Los métodos de pago disponibles dependen de tu dispositivo, navegador y país, y pueden incluir tarjetas de débito y crédito, Apple Pay, Google Pay, PayPal y Link. El Operador no ve ni almacena los datos de tu tarjeta.`,
            "Stripe te envía por correo electrónico un recibo por cada pago realizado correctamente. La factura exigida por la ley la emite el Operador.",
            "Si falla un cobro mensual, Stripe volverá a intentarlo en unos días; si sigue fallando, la suscripción finaliza junto con tu acceso a las descargas.",
          ],
        },
        {
          id: "cancellation",
          title: "Cancelación",
          blocks: [
            "Puedes cancelar tu suscripción en cualquier momento, sin necesidad de indicar el motivo, en la página [Mi cuenta](account) (tras iniciar sesión con un código que te enviamos por correo electrónico), con un solo clic, en la interfaz segura de Stripe.",
            `La cancelación surte efecto al final del periodo en curso: hasta entonces conservas el acceso y no se realizan más cobros. Si cancelas durante el periodo introductorio, no se te cobrará ninguna tarifa mensual a partir del día ${price.next}.`,
            "La tarifa de un periodo ya iniciado no se reembolsa, salvo cuando ejerzas tu derecho de desistimiento y en los demás casos exigidos por la ley.",
          ],
        },
        {
          id: "withdrawal",
          title: "Derecho de desistimiento",
          blocks: [
            `Si contratas la suscripción como consumidor, puedes desistir del contrato en un plazo de 14 días desde el pedido, sin necesidad de indicar el motivo. Puedes comunicar al Operador tu decisión de desistir mediante una declaración inequívoca (por ejemplo, por correo electrónico a ${email}); puedes utilizar el modelo de formulario de desistimiento que figura en el anexo I, parte B, de la Directiva 2011/83/UE, aunque no estás obligado a ello.`,
            "Dado que, al realizar el pedido, solicitas expresamente que la prestación del Servicio comience de inmediato, si desistes deberás abonar una tarifa proporcional al periodo utilizado hasta el desistimiento. Te reembolsaremos el importe restante en el método de pago utilizado para el pago en un plazo de 14 días a partir del día en que nos comuniques tu desistimiento.",
            "El derecho de desistimiento no afecta a tu posibilidad de cancelar la suscripción en cualquier momento (véase la sección 5).",
          ],
        },
        {
          id: "account",
          title: "Cuenta e inicio de sesión",
          blocks: [
            "No existe un registro independiente con contraseña. Tu cuenta está vinculada a la dirección de correo electrónico que indiques al pagar: en el navegador en el que hayas pagado, la sesión se inicia automáticamente, y en otros dispositivos puedes iniciar sesión con un código de 6 dígitos que te enviamos por correo electrónico y que es válido durante 10 minutos.",
            "Tus currículums no se guardan en tu cuenta: permanecen en el navegador en el que los redactaste. Para continuar en otro dispositivo, usa «Guardar en archivo» y «Cargar desde archivo».",
            "No compartas tu código de inicio de sesión con nadie. La suscripción es para uso personal; no está permitido compartir ni revender el acceso.",
          ],
        },
        {
          id: "ai",
          title: "El asistente de IA",
          blocks: [
            "A petición expresa tuya (cuando pulsas su botón), el asistente de IA utiliza el servicio Google Gemini para proponer un texto para un campo. Ninguna sugerencia se añade a tu currículum sin tu aprobación.",
            "El texto generado por inteligencia artificial puede ser erróneo, inexacto o no ajustarse a la realidad. Debes revisar cada sugerencia antes de aceptarla y utilizarla; el Operador no asume ninguna responsabilidad por el contenido de las sugerencias.",
            "No introduzcas categorías especiales de datos personales (como datos de salud) en los campos que procesa el asistente de IA, ni datos de terceros que no tengas derecho a compartir.",
            "El uso del asistente de IA está sujeto a límites de uso y depende de un proveedor externo, por lo que en ocasiones puede ser lento o no estar disponible. El Operador puede modificar o suprimir esta función en cualquier momento.",
          ],
        },
        {
          id: "use",
          title: "Condiciones de uso",
          blocks: [
            "Solo puedes utilizar el Servicio con fines lícitos y de conformidad con estas condiciones. En particular, te comprometes a:",
            {
              list: [
                "incluir información veraz en tu currículum y utilizar solo contenidos (como fotos) sobre los que tengas derecho de uso;",
                "tratar de forma lícita los datos personales de otras personas (por ejemplo, de tus referencias);",
                "no utilizar el Servicio para cometer fraude, suplantar la identidad de otras personas ni con ningún otro fin ilícito;",
                "no intentar acceder al Servicio sin autorización, eludir sus medidas de seguridad o de pago ni obstaculizar su funcionamiento (por ejemplo, mediante solicitudes masivas automatizadas al asistente de IA).",
              ],
            },
            "Solo tú eres responsable del contenido de tu currículum y del uso que hagas de él.",
            "El Operador podrá restringir o suprimir el acceso para evitar abusos; en caso de incumplimiento grave de estas condiciones, la suscripción podrá resolverse con efecto inmediato.",
          ],
        },
        {
          id: "ownership",
          title: "Propiedad intelectual",
          blocks: [
            "El software, el diseño, el logotipo, las plantillas y los textos del Servicio son propiedad intelectual del Operador; no podrás copiarlos, revenderlos ni ofrecerlos como servicio propio más allá del uso conforme a la finalidad del Servicio.",
            "El Servicio también utiliza componentes de código abierto (como React PDF y Mozilla pdf.js) y fuentes tipográficas con licencia SIL Open Font License, que están sujetos a sus propias condiciones de licencia.",
            "El contenido que introduces sigue siendo tuyo. Puedes utilizar libremente el currículum en PDF descargado —incluida la plantilla que emplea— para tu propia búsqueda de empleo y tus fines profesionales, sin necesidad de citar la fuente.",
          ],
        },
        {
          id: "data",
          title: "Tus datos y copias de seguridad",
          blocks: [
            "Tu currículum se almacena únicamente en tu navegador. Puede perderse si borras los datos de navegación, cambias de navegador o de dispositivo, o utilizas la navegación privada. Es responsabilidad tuya hacer copias de seguridad con «Guardar en archivo»; el Operador no puede recuperar los datos perdidos.",
          ],
        },
        {
          id: "liability",
          title: "Responsabilidad",
          blocks: [
            "El Operador hace todo lo posible por garantizar el funcionamiento continuo y correcto del Servicio, pero no garantiza que esté disponible sin interrupciones ni errores. Revisa el PDF descargado antes de enviarlo.",
            "En la máxima medida permitida por la ley, el Operador no será responsable de los daños indirectos, el lucro cesante ni la pérdida de datos derivados del uso del Servicio o de la imposibilidad de utilizarlo, ni del resultado de las candidaturas a ofertas de empleo ni del contenido de las sugerencias de la IA. Esta limitación no se aplica a la responsabilidad por los daños causados de forma dolosa o por negligencia grave, ni por incumplimientos contractuales que atenten contra la vida, la integridad física o la salud, y no afecta a los derechos que la ley reconoce a los consumidores.",
          ],
        },
        {
          id: "changes-to-service",
          title: "Disponibilidad y cambios",
          blocks: [
            "El Operador tiene derecho a desarrollar y modificar el Servicio. Si el Servicio se interrumpe de forma definitiva, resolveremos las suscripciones y reembolsaremos de forma proporcional la tarifa correspondiente al periodo no utilizado. Tus currículums permanecen en tu navegador y en tus copias de seguridad en JSON.",
          ],
        },
        {
          id: "data-protection",
          title: "Protección de datos",
          blocks: ["Los detalles del tratamiento de los datos personales figuran en la [Política de privacidad](privacy)."],
        },
        {
          id: "amendments",
          title: "Modificación de las condiciones",
          blocks: [
            "El Operador tiene derecho a modificar estas condiciones. Las modificaciones entran en vigor con su publicación en esta página, en la fecha de entrada en vigor indicada al principio del documento. Notificaremos a los suscriptores por correo electrónico, con al menos 30 días de antelación, cualquier modificación sustancial que les resulte desfavorable; si no aceptan las modificaciones, podrán cancelar su suscripción antes de que entren en vigor.",
          ],
        },
        {
          id: "law",
          title: "Legislación aplicable y litigios",
          blocks: [
            "Estas condiciones se rigen por la legislación eslovaca. Si utilizas el Servicio como consumidor, esta elección de ley no te priva de la protección que te otorgan las normas imperativas de protección de los consumidores de tu país de residencia.",
            `Procuramos resolver cualquier litigio de forma amistosa: puedes enviar tu reclamación a ${email}, y te responderemos en un plazo de 30 días. Si rechazamos tu reclamación o no respondemos en un plazo de 30 días, como consumidor puedes iniciar un procedimiento de resolución alternativa de litigios ante la Inspección de Comercio de Eslovaquia (${site.adr.name}, ${site.adr.website}) o ante otra entidad de resolución de litigios incluida en la lista del Ministerio de Economía de Eslovaquia. También puedes dirigirte a la autoridad de protección de los consumidores y a los tribunales de tu lugar de residencia.`,
            "Estas condiciones están disponibles en varios idiomas; en caso de discrepancia, prevalecerá la versión en inglés.",
          ],
        },
        {
          id: "contact",
          title: "Contacto",
          blocks: [`Puedes dirigir al Operador tus preguntas, observaciones o reclamaciones a la siguiente dirección de correo electrónico: ${email}.`],
        },
      ],
    },

    privacy: {
      title: "Política de privacidad",
      description: `Qué datos personales trata ${site.name}, con qué fin y qué derechos tienes.`,
      intro: [
        `De conformidad con el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos, RGPD), esta política explica qué datos personales tratamos cuando utilizas ${site.name} (https://${site.domain}), con qué finalidad, sobre qué base jurídica y durante cuánto tiempo, así como los derechos que te asisten.`,
      ],
      sections: [
        {
          id: "controller",
          title: "El responsable del tratamiento",
          blocks: [operator, `Para cualquier cuestión relacionada con la protección de datos, puedes escribirnos a ${email}.`],
        },
        {
          id: "summary",
          title: "En resumen",
          blocks: [
            {
              list: [
                "Tu currículum, incluida tu foto, se almacena y se convierte en PDF en tu navegador, en tu propio dispositivo; nunca llega a nosotros.",
                "El asistente de IA solo envía datos cuando pulsas su botón y, aun así, únicamente el texto del campo que estás editando y tu trayectoria profesional; nunca tu nombre, tus datos de contacto, tu fecha de nacimiento ni tu foto.",
                "No hay registro con contraseña. Si te suscribes, tratamos tu dirección de correo electrónico y los datos de tu suscripción.",
                "Los pagos los procesa Stripe; no vemos ni almacenamos los datos de tu tarjeta.",
                "No utilizamos herramientas de analítica ni de seguimiento publicitario. Solo utilizamos las cookies necesarias para el inicio de sesión, el pago y la elección de idioma.",
              ],
            },
          ],
        },
        {
          id: "cv-data",
          title: "Tu currículum",
          blocks: [
            "El Servicio guarda el contenido de tu currículum, tu foto y los ajustes de diseño en el almacenamiento local de tu navegador (localStorage) para que no pierdas tu trabajo. El PDF también se genera en tu navegador. Salvo en el caso del asistente de IA descrito más abajo, estos datos no se transmiten ni a nosotros ni a ningún tercero, por lo que no los tratamos.",
            "Puedes borrar estos datos en cualquier momento con «Archivo → Nuevo currículum vacío» o borrando los datos de tu navegador. El tema de color que elijas (claro u oscuro) también se guarda en el almacenamiento local.",
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
          id: "subscription",
          title: "Suscripción y pago",
          blocks: [
            "Si te suscribes, los datos que introduzcas en la página de pago los trata Stripe; nosotros recibimos los datos necesarios para llevar el registro de tu suscripción.",
            {
              list: [
                "Datos tratados: dirección de correo electrónico, los identificadores de cliente y de suscripción asignados por Stripe, el estado y los periodos de la suscripción, el importe y la fecha de los pagos, el tipo de método de pago (por ejemplo, tarjeta, y sus 4 últimas cifras) y, si la página de pago los solicita, el país y el código postal de facturación.",
                "Finalidad: la formalización y ejecución de la suscripción, el cobro de las tarifas, la verificación del acceso, la facturación y la atención al cliente.",
                "Base jurídica: la ejecución de un contrato (artículo 6.1.b) del RGPD); para la conservación de los registros contables, el cumplimiento de una obligación legal (artículo 6.1.c) del RGPD).",
                "Plazo de conservación: mientras exista la suscripción; una vez finalizada, conservamos los registros contables durante 10 años conforme al artículo 35 de la Ley eslovaca de contabilidad (Ley n.º 431/2002 Coll.). Los demás datos los suprimimos a petición tuya una vez finalizada la suscripción.",
              ],
            },
            `Los pagos los procesa ${site.payments.name} (${site.payments.address}), que es responsable independiente del tratamiento en lo que respecta a los datos de pago y a la prevención del fraude. Puedes consultar información sobre su tratamiento de datos en ${site.payments.privacy}.`,
          ],
        },
        {
          id: "sign-in",
          title: "Inicio de sesión con un código por correo electrónico",
          blocks: [
            "En otros dispositivos, puedes iniciar sesión con un código de un solo uso que te enviamos por correo electrónico.",
            {
              list: [
                "Datos tratados: dirección de correo electrónico, el código de inicio de sesión en forma de hash, su hora de caducidad y el número de intentos.",
                "Finalidad: el inicio de sesión y la protección de tu cuenta.",
                "Base jurídica: la ejecución de un contrato (artículo 6.1.b) del RGPD).",
                "Plazo de conservación: el código es válido durante 10 minutos, y lo suprimimos inmediatamente después de su uso.",
              ],
            },
            `Los correos electrónicos de inicio de sesión los envía ${site.email.name} (${site.email.website}) en calidad de encargado del tratamiento.`,
          ],
        },
        {
          id: "logs",
          title: "Registros técnicos",
          blocks: [
            "Al servir el sitio, como ocurre con cualquier sitio web, los servidores del proveedor de alojamiento registran datos técnicos.",
            {
              list: [
                "Datos tratados: dirección IP, hora de la solicitud, dirección de la página solicitada, tipo y versión del navegador.",
                "Finalidad: el funcionamiento seguro e ininterrumpido del Servicio y la detección de errores y abusos. En las solicitudes al asistente de IA, de inicio de sesión y de pago, la dirección IP también se conserva en la memoria del servidor durante un máximo de 15 minutos para poder limitar el uso excesivo.",
                "Base jurídica: el interés legítimo del Operador (artículo 6.1.f) del RGPD).",
                "Plazo de conservación: un breve periodo, conforme a las normas de conservación de datos del proveedor de alojamiento.",
              ],
            },
          ],
        },
        {
          id: "cookies",
          title: "Cookies y almacenamiento local",
          blocks: [
            "Solo utilizamos las cookies necesarias para el funcionamiento del Servicio; estas no requieren consentimiento:",
            {
              list: [
                `${cookies.session}: mantiene tu sesión iniciada (180 días);`,
                `${cookies.signedIn}: indica al sitio que has iniciado sesión (180 días);`,
                `${cookies.login}: el proceso de inicio de sesión con código (10 minutos);`,
                `${cookies.locale}: recuerda el idioma que has elegido en el selector de idioma (1 año).`,
              ],
            },
            "En la página de pago, Stripe utiliza sus propias cookies para procesar el pago de forma segura y prevenir el fraude. No utilizamos cookies de analítica ni publicitarias. Cargamos las fuentes tipográficas desde nuestro propio servidor, por lo que ningún proveedor externo de fuentes recibe datos sobre ti.",
          ],
        },
        {
          id: "processors",
          title: "Encargados del tratamiento y transferencias de datos",
          blocks: [
            "Los siguientes encargados del tratamiento tratan datos por cuenta nuestra:",
            {
              list: [
                `alojamiento y servidor de aplicaciones: ${site.hosting.name}, ${site.hosting.address};`,
                `las sugerencias del asistente de IA: ${site.ai.name}, ${site.ai.address} (API de Gemini);`,
                `envío de los correos electrónicos de inicio de sesión: ${site.email.name}, EE. UU.`,
              ],
            },
            "Estos proveedores tienen su sede en los Estados Unidos de América, por lo que los datos también pueden transferirse fuera del Espacio Económico Europeo. Dichas transferencias se realizan con las garantías adecuadas (el Marco de Privacidad de Datos UE-EE. UU. y/o las cláusulas contractuales tipo adoptadas por la Comisión Europea).",
            "No compartimos tus datos con ningún otro tercero, no los vendemos y no los utilizamos con fines de marketing, elaboración de perfiles ni decisiones automatizadas.",
          ],
        },
        {
          id: "security",
          title: "Seguridad de los datos",
          blocks: [
            "Todas las conexiones entre el sitio y el servidor están cifradas (HTTPS). Las cookies de inicio de sesión están firmadas y no pueden leerse mediante scripts, y las claves de API solo se almacenan en el servidor. Como tu currículum está en tu dispositivo, proteger ese dispositivo también protege tus datos (por ejemplo, con un bloqueo de pantalla o borrando los datos de navegación en un ordenador compartido).",
          ],
        },
        {
          id: "rights",
          title: "Tus derechos",
          blocks: [
            "En virtud del RGPD, tienes los siguientes derechos:",
            {
              list: [
                "derecho de información y de acceso (artículo 15);",
                "derecho de rectificación (artículo 16);",
                "derecho de supresión (artículo 17);",
                "derecho a la limitación del tratamiento (artículo 18);",
                "derecho a la portabilidad de los datos (artículo 20);",
                "derecho de oposición al tratamiento basado en el interés legítimo (artículo 21).",
              ],
            },
            `Puedes enviar tu solicitud a ${email}; te responderemos en el plazo máximo de un mes. También puedes cambiar tú mismo tu dirección de correo electrónico en la página [Mi cuenta](account), en la interfaz de Stripe. Como no almacenamos tu currículum, los derechos sobre esos datos los ejerces directamente en tu navegador.`,
          ],
        },
        {
          id: "remedies",
          title: "Vías de recurso",
          blocks: [
            `Si consideras que el tratamiento de tus datos personales infringe la ley, puedes presentar una reclamación ante la autoridad de control del domicilio social del responsable, la Oficina de Protección de Datos Personales de la República Eslovaca (${site.authority.name}; ${site.authority.address}; ${site.authority.website}), o ante la autoridad de protección de datos de tu lugar de residencia o de trabajo; en Hungría, por ejemplo, la Autoridad Nacional de Protección de Datos y Libertad de Información (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).`,
            "Si se vulneran tus derechos, también puedes acudir a los tribunales; puedes interponer la demanda ante los tribunales del Estado miembro de tu lugar de residencia.",
          ],
        },
        {
          id: "children",
          title: "Menores",
          blocks: ["El Servicio no está dirigido a menores de 16 años, y no tratamos a sabiendas datos sobre ellos."],
        },
        {
          id: "changes",
          title: "Cambios en esta política",
          blocks: [
            "Actualizamos esta política cada vez que cambia el Servicio; la fecha de entrada en vigor figura al principio del documento. Las condiciones de uso del Servicio se recogen en los [Términos y condiciones de uso](terms).",
          ],
        },
      ],
    },
  };
};

export default legal;
