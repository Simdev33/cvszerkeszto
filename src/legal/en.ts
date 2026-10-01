import type { LegalContent } from "./types";

// English legal texts – the source for the other languages.
const legal: LegalContent = ({ site, email, price, cookies }) => {
  const operator = {
    list: [
      `Name: ${site.operator.name}`,
      `Registered office: ${site.operator.address}`,
      `Registration: ${site.operator.registry}`,
      `Tax number: ${site.operator.taxNumber}`,
      `Email: ${email}`,
    ],
  };

  return {
    terms: {
      title: "Terms of Service",
      description: `The terms for using ${site.name} and for the subscription to it.`,
      intro: [
        `These terms govern the use of the ${site.name} web service (https://${site.domain}, the “Service”) and the subscription to it. By using the Service or ordering the subscription, you accept these terms; if you do not agree with them, please do not use the Service.`,
      ],
      sections: [
        {
          id: "operator",
          title: "The operator",
          blocks: ["The Service is provided by the following operator (the “Operator”):", operator, `Hosting provider: ${site.hosting.name}, ${site.hosting.address}, ${site.hosting.website}`],
        },
        {
          id: "service",
          title: "The Service",
          blocks: [
            `${site.name} is an online tool for writing CVs and downloading them as PDF files. Its main features are templates and design settings, a live preview, CVs in five languages, photo support, saving and loading JSON files, and a writing assistant that uses artificial intelligence (the “AI assistant”).`,
            "Writing, designing and previewing a CV, the AI assistant and saving to a JSON file are free of charge. Downloading the CV as a PDF requires a subscription (see section 3).",
            "Your CV is stored and the PDF is created in your browser, on your own device; their content is not sent to the Operator. The only exception is the AI assistant – details are set out in the [Privacy Policy](privacy).",
          ],
        },
        {
          id: "subscription",
          title: "Subscription and fees",
          blocks: [
            `The subscription starts with an introductory period of ${price.days} days, the fee for which is ${price.trial}. During this period, the Service can be used in full, without any restrictions.`,
            `If you do not cancel the subscription by the end of the introductory period, from day ${price.next} it automatically continues as a subscription with a monthly fee of ${price.monthly}, and it renews every month until you cancel it. The monthly fee is charged at the start of each period to the payment method you provided when ordering.`,
            "The total amount payable is clearly shown on the payment page before you place your order. The order is placed when you press the button indicating the obligation to pay (or the button of the selected payment method).",
            "We notify subscribers by email of any change in fees at least 30 days before the change takes effect; if you do not accept it, you can cancel your subscription before then.",
          ],
        },
        {
          id: "payment",
          title: "Payment",
          blocks: [
            `Payments are processed by ${site.payments.name} (Ireland). Available payment methods depend on your device, browser and country and may include debit and credit cards, Apple Pay, Google Pay, PayPal and Link. The Operator does not see or store your card details.`,
            "Stripe sends you a receipt by email for each successful payment. The invoice required by law is issued by the Operator.",
            "If a monthly charge fails, Stripe will try again within a few days; if it still fails, the subscription ends together with your download access.",
          ],
        },
        {
          id: "cancellation",
          title: "Cancellation",
          blocks: [
            "You can cancel your subscription at any time, without giving a reason, on the [My account](account) page (sign in with a code sent to you by email), in one click, on Stripe’s secure interface.",
            `Cancellation takes effect at the end of the current period: until then you keep your access, and no further charges are made. If you cancel during the introductory period, no monthly fee is charged from day ${price.next}.`,
            "The fee for a period that has already started is not refunded, except where you exercise your right of withdrawal and in other cases required by law.",
          ],
        },
        {
          id: "withdrawal",
          title: "Right of withdrawal",
          blocks: [
            `If you order the subscription as a consumer, you may withdraw from the contract within 14 days of the order without giving any reason. You can inform the Operator of your decision to withdraw by an unequivocal statement (for example by email to ${email}); you may use the model withdrawal form in Annex I(B) of Directive 2011/83/EU, but you are not obliged to.`,
            "Since you expressly request the immediate start of the Service when ordering, if you withdraw you must pay a proportionate fee for the period used up to the withdrawal. We refund the remaining amount to the payment method used for the payment within 14 days of the day you inform us of your withdrawal.",
            "The right of withdrawal does not affect your option to cancel the subscription at any time (see section 5).",
          ],
        },
        {
          id: "account",
          title: "Account and sign-in",
          blocks: [
            "There is no separate registration with a password. Your account is linked to the email address you provide when paying: in the browser where you paid, you are signed in automatically, and on other devices you can sign in with a 6-digit code sent to you by email, which is valid for 10 minutes.",
            "Your CVs are not stored in your account: they stay in the browser in which you wrote them. To continue on another device, use “Save to file” and “Load from file”.",
            "Do not share your sign-in code with anyone. The subscription is for personal use; sharing or reselling access is not permitted.",
          ],
        },
        {
          id: "ai",
          title: "The AI assistant",
          blocks: [
            "At your explicit request (when you press its button), the AI assistant uses the Google Gemini service to suggest text for a field. A suggestion is never added to your CV without your approval.",
            "Text generated by artificial intelligence may be wrong, inaccurate or untrue. You must check every suggestion before accepting and using it; the Operator accepts no responsibility for the content of suggestions.",
            "Do not enter special categories of personal data (such as health data) into the fields processed by the AI assistant, nor any third-party data that you are not entitled to share.",
            "Use of the AI assistant is subject to usage limits and depends on an external provider, so it may sometimes be slow or unavailable. The Operator may change or discontinue this feature at any time.",
          ],
        },
        {
          id: "use",
          title: "Conditions of use",
          blocks: [
            "You may use the Service only for lawful purposes and in accordance with these terms. In particular, you undertake:",
            {
              list: [
                "to state true information in your CV, and to use only content (such as photos) that you have the right to use;",
                "to handle other people’s personal data (for example referees) lawfully;",
                "not to use the Service for fraud, impersonation or any other unlawful purpose;",
                "not to attempt to gain unauthorized access to the Service, circumvent its security or payment measures, or obstruct its operation (for example with automated mass requests to the AI assistant).",
              ],
            },
            "You alone are responsible for the content of your CV and for how you use it.",
            "The Operator may restrict or terminate access in order to prevent abuse; in the event of a serious breach of these terms, the subscription may be terminated with immediate effect.",
          ],
        },
        {
          id: "ownership",
          title: "Intellectual property",
          blocks: [
            "The software, design, logo, templates and texts of the Service are the intellectual property of the Operator; they may not be copied, resold or offered as a service of your own beyond the intended use of the Service.",
            "The Service also uses open-source components (such as React PDF and Mozilla pdf.js) and fonts licensed under the SIL Open Font License, which are subject to their own license terms.",
            "The content you enter remains yours. You may use the downloaded PDF CV – including the template it uses – freely for your own job search and professional purposes, without attribution.",
          ],
        },
        {
          id: "data",
          title: "Your data and backups",
          blocks: [
            "Your CV is stored only in your browser. It may be lost if you clear your browsing data, switch browser or device, or use private browsing. It is your responsibility to make backups with “Save to file”; the Operator cannot recover lost data.",
          ],
        },
        {
          id: "liability",
          title: "Liability",
          blocks: [
            "The Operator does its best to ensure the continuous and correct operation of the Service, but does not guarantee that it will be available without interruption or errors. Check the downloaded PDF before you send it.",
            "To the maximum extent permitted by law, the Operator is not liable for any indirect damage, loss of profit or data loss arising from the use of, or inability to use, the Service, nor for the outcome of job applications or for the content of AI suggestions. This limitation does not apply to liability for damage caused intentionally or by gross negligence, or for breach of contract resulting in harm to life, physical integrity or health, and it does not affect the rights to which consumers are entitled by law.",
          ],
        },
        {
          id: "changes-to-service",
          title: "Availability and changes",
          blocks: [
            "The Operator is entitled to develop and modify the Service. If the Service is permanently discontinued, we will terminate the subscriptions and refund the fee for the unused period on a pro rata basis. Your CVs remain in your browser and in your JSON backups.",
          ],
        },
        {
          id: "data-protection",
          title: "Data protection",
          blocks: ["Details of the processing of personal data are set out in the [Privacy Policy](privacy)."],
        },
        {
          id: "amendments",
          title: "Amendment of the terms",
          blocks: [
            "The Operator is entitled to amend these terms. Amendments take effect upon publication on this page, on the effective date shown at the top of the document. We notify subscribers by email at least 30 days in advance of any material changes that are disadvantageous to them; if they do not accept the changes, they can cancel their subscription before the changes take effect.",
          ],
        },
        {
          id: "law",
          title: "Governing law and disputes",
          blocks: [
            "Slovak law applies to these terms. If you use the Service as a consumer, this choice of law does not deprive you of the protection afforded to you by the mandatory consumer protection rules of your country of residence.",
            `We aim to settle any disputes amicably: you can send your complaint to ${email}, and we respond within 30 days. If we reject your complaint or do not respond within 30 days, as a consumer you can initiate alternative dispute resolution with the Slovak Trade Inspection (${site.adr.name}, ${site.adr.website}) or with another dispute resolution body on the list of the Slovak Ministry of Economy. You can also turn to the consumer protection authority and the courts of your place of residence.`,
            "These terms are available in several languages; in case of any discrepancy, the English version prevails.",
          ],
        },
        {
          id: "contact",
          title: "Contact",
          blocks: [`You can contact the Operator with questions, comments or complaints at the following email address: ${email}.`],
        },
      ],
    },

    privacy: {
      title: "Privacy Policy",
      description: `What personal data ${site.name} processes, why, and what rights you have.`,
      intro: [
        `In accordance with Regulation (EU) 2016/679 (General Data Protection Regulation, GDPR), this notice explains what personal data we process when you use ${site.name} (https://${site.domain}), for what purpose, on what legal basis and for how long, as well as what rights you have.`,
      ],
      sections: [
        {
          id: "controller",
          title: "The data controller",
          blocks: [operator, `For data protection matters, you can reach us at ${email}.`],
        },
        {
          id: "summary",
          title: "In brief",
          blocks: [
            {
              list: [
                "Your CV – including your photo – is stored and turned into a PDF in your browser, on your own device; we never receive it.",
                "The AI assistant only sends data when you press its button, and even then only the text of the field you are editing and your professional background – never your name, contact details, date of birth or photo.",
                "There is no registration with a password. If you subscribe, we process your email address and your subscription details.",
                "Payments are processed by Stripe; we do not see or store your card details.",
                "We do not use analytics or advertising tracking. We only use cookies that are necessary for signing in, payment and your language choice.",
              ],
            },
          ],
        },
        {
          id: "cv-data",
          title: "Your CV",
          blocks: [
            "The Service saves the content of your CV, your photo and your design settings in your browser’s local storage (localStorage), so that your work is not lost. The PDF is also created in your browser. Apart from the AI assistant case described below, this data is not transmitted to us or to anyone else, so we do not process it.",
            "You can delete this data at any time with “File → New, empty CV” or by clearing your browser data. Your chosen colour theme (light or dark) is also kept in local storage.",
          ],
        },
        {
          id: "ai",
          title: "The AI assistant",
          blocks: [
            "When you use the AI assistant, the Service sends the following data to our server, which forwards it to the Google Gemini API:",
            {
              list: [
                "the current text of the field you are editing (profile or item description);",
                "your professional background: your job title, the names, organisations and dates of your entries, shortened descriptions, your skills and languages (when writing your profile, such a summary of your whole CV);",
                "the language of your CV and the requested action.",
              ],
            },
            "Your name, email address, phone number, city, website and profile links, date of birth and photo are never sent. However, if you type personal data into the field yourself, it is sent as part of the text.",
            "**Purpose:** creating the text suggestion you asked for. **Legal basis:** providing a service you explicitly requested (Article 6(1)(b) GDPR).",
            `**Retention:** we do not store or log the text; it exists in the server’s memory only until the response is complete. Google processes requests under the Gemini API terms: ${site.ai.terms}`,
            "Using the AI assistant is optional; every other feature of the Service works without it.",
          ],
        },
        {
          id: "subscription",
          title: "Subscription and payment",
          blocks: [
            "If you subscribe, the data you enter on the payment page is processed by Stripe; what we receive is the data needed to keep a record of your subscription.",
            {
              list: [
                "Data processed: email address, the customer and subscription identifiers assigned by Stripe, the status and periods of the subscription, the amount and date of payments, the type of payment method (for example card, and its last 4 digits) and – if the payment page asks for them – the billing country and postal code.",
                "Purpose: creating and fulfilling the subscription, collecting fees, verifying access, invoicing and customer service.",
                "Legal basis: performance of a contract (Article 6(1)(b) GDPR); for keeping accounting records, a legal obligation (Article 6(1)(c) GDPR).",
                "Retention: for as long as the subscription exists; after it ends, we keep the accounting records for 10 years under section 35 of the Slovak Accounting Act (Act No. 431/2002 Coll.). We delete the other data at your request after the subscription ends.",
              ],
            },
            `Payments are processed by ${site.payments.name} (${site.payments.address}), which is an independent controller with regard to payment data and fraud prevention. You can find information about its data processing at ${site.payments.privacy}.`,
          ],
        },
        {
          id: "sign-in",
          title: "Sign-in with an email code",
          blocks: [
            "On other devices, you can sign in with a single-use code sent to you by email.",
            {
              list: [
                "Data processed: email address, the hashed form of the sign-in code, its expiry time and the number of attempts.",
                "Purpose: signing in and protecting your account.",
                "Legal basis: performance of a contract (Article 6(1)(b) GDPR).",
                "Retention: the code is valid for 10 minutes, and we delete it immediately after use.",
              ],
            },
            `Sign-in emails are sent by ${site.email.name} (${site.email.website}) as a data processor.`,
          ],
        },
        {
          id: "logs",
          title: "Technical logs",
          blocks: [
            "When the site is served – as with any website – the hosting provider’s servers record technical data.",
            {
              list: [
                "Data processed: IP address, time of the request, address of the requested page, browser type and version.",
                "Purpose: the secure and uninterrupted operation of the Service, and the detection of errors and abuse. For AI assistant, sign-in and payment requests, the IP address is also kept in the server’s memory for up to 15 minutes so that excessive use can be limited.",
                "Legal basis: the Operator’s legitimate interest (Article 6(1)(f) GDPR).",
                "Retention: for a short time, in accordance with the hosting provider’s data retention rules.",
              ],
            },
          ],
        },
        {
          id: "cookies",
          title: "Cookies and local storage",
          blocks: [
            "We only use cookies that are necessary for the Service to work; these do not require consent:",
            {
              list: [
                `${cookies.session}: keeps you signed in (180 days);`,
                `${cookies.signedIn}: tells the site that you are signed in (180 days);`,
                `${cookies.login}: the sign-in code process (10 minutes);`,
                `${cookies.locale}: remembers the language you picked in the language switcher (1 year).`,
              ],
            },
            "On the payment page, Stripe uses its own cookies to process the payment securely and to prevent fraud. We do not use analytics or advertising cookies. We load fonts from our own server, so no external font provider receives data about you.",
          ],
        },
        {
          id: "processors",
          title: "Data processors and data transfers",
          blocks: [
            "The following data processors process data on our behalf:",
            {
              list: [
                `hosting and application server: ${site.hosting.name}, ${site.hosting.address};`,
                `the AI assistant’s suggestions: ${site.ai.name}, ${site.ai.address} (Gemini API);`,
                `sending sign-in emails: ${site.email.name}, USA.`,
              ],
            },
            "These providers are headquartered in the United States of America, so data may also be transferred outside the European Economic Area. Such transfers take place with appropriate safeguards (the EU–US Data Privacy Framework and/or the standard contractual clauses adopted by the European Commission).",
            "We do not share your data with any other third party, we do not sell it, and we do not use it for marketing, profiling or automated decision-making.",
          ],
        },
        {
          id: "security",
          title: "Data security",
          blocks: [
            "All connections between the site and the server are encrypted (HTTPS). Sign-in cookies are signed and cannot be read by scripts, and API keys are stored only on the server. Because your CV is on your device, protecting that device also protects your data (for example a screen lock, or clearing your browsing data on a shared computer).",
          ],
        },
        {
          id: "rights",
          title: "Your rights",
          blocks: [
            "Under the GDPR, you have the following rights:",
            {
              list: [
                "right to information and access (Article 15);",
                "right to rectification (Article 16);",
                "right to erasure (Article 17);",
                "right to restriction of processing (Article 18);",
                "right to data portability (Article 20);",
                "right to object to processing based on legitimate interest (Article 21).",
              ],
            },
            `You can send your request to ${email}; we respond within one month at the latest. You can also change your email address yourself on the [My account](account) page, on Stripe’s interface. Because we do not store your CV, you exercise these rights for it directly in your browser.`,
          ],
        },
        {
          id: "remedies",
          title: "Remedies",
          blocks: [
            `If you feel that the processing of your personal data violates the law, you can lodge a complaint with the supervisory authority of the controller’s registered office, the Office for Personal Data Protection of the Slovak Republic (${site.authority.name}; ${site.authority.address}; ${site.authority.website}), or with the data protection authority of your place of residence or place of work – in Hungary, for example, the Hungarian National Authority for Data Protection and Freedom of Information (Nemzeti Adatvédelmi és Információszabadság Hatóság, NAIH; 1055 Budapest, Falk Miksa utca 9–11.; https://naih.hu).`,
            "If your rights are violated, you can also go to court; you may bring the action before the courts of the member state of your place of residence.",
          ],
        },
        {
          id: "children",
          title: "Children",
          blocks: ["The Service is not intended for children under 16, and we do not knowingly process their data."],
        },
        {
          id: "changes",
          title: "Changes to this notice",
          blocks: [
            "We update this notice whenever the Service changes; the effective date is shown at the top of the document. The terms of use of the Service are set out in the [Terms of Service](terms).",
          ],
        },
      ],
    },
  };
};

export default legal;
