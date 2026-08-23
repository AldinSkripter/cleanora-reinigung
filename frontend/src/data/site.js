export const SITE = {
  name: "Cleanora",
  legalName: "Cleanora Gebäudereinigung",
  tagline: "Gebäudereinigung & Reinigungsservice — Achern & Umgebung",
  email: "kontak@cleanora-reinigung.de",
  phone: "+49 (0) 7841 000 000",
  phoneHref: "+497841000000",
  street: "Musterstraße 12",
  city: "77855 Achern",
  domain: "https://cleanora-reinigung.de",
};

export const IMAGES = {
  hero: "https://images.pexels.com/photos/38921234/pexels-photo-38921234.jpeg?auto=compress&cs=tinysrgb&w=1600",
  office: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1600&q=80",
  desk: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?auto=format&fit=crop&w=1600&q=80",
  living: "https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&w=1600",
  window: "https://images.pexels.com/photos/16898976/pexels-photo-16898976.jpeg?auto=compress&cs=tinysrgb&w=1600",
  cleaning: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
  interior: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  building: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
};

export const SERVICES = [
  {
    slug: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    short: "Regelmäßige Werterhaltung für Gewerbe, Büros und Wohnanlagen — zuverlässig im vereinbarten Rhythmus.",
    intro: "Die Unterhaltsreinigung bildet das Rückgrat gepflegter Immobilien. In fest vereinbarten Intervallen halten wir Ihre Räume dauerhaft sauber — ohne dass Sie sich um etwas kümmern müssen.",
    text: "Ob täglich, wöchentlich oder nach individuellem Turnus: Wir erstellen einen Reinigungsplan, der exakt auf Ihr Objekt in Achern und Umgebung zugeschnitten ist. So bleiben Böden, Sanitärbereiche und Verkehrsflächen dauerhaft gepflegt, und der Wert Ihrer Immobilie wird nachhaltig gesichert.",
    includes: ["Reinigung aller Verkehrs- und Nutzflächen", "Sanitärreinigung inkl. Nachfüllservice", "Staubwischen und Oberflächenpflege", "Papierkörbe leeren, Mülltrennung", "Individueller Reinigungsplan & fester Ansprechpartner"],
    image: IMAGES.cleaning,
  },
  {
    slug: "bueroreinigung",
    title: "Büroreinigung",
    short: "Saubere Arbeitsplätze für produktive Teams — diskret, gründlich und außerhalb Ihrer Kernarbeitszeiten.",
    intro: "Ein sauberes Büro ist die Visitenkarte Ihres Unternehmens — gegenüber Mitarbeitern wie Kunden. Wir reinigen Ihre Büroflächen in Achern gründlich, diskret und zu Zeiten, die Ihren Betrieb nicht stören.",
    text: "Von Arbeitsplätzen über Besprechungsräume bis zur Teeküche: Unsere Büroreinigung umfasst alle Bereiche, die täglich genutzt werden. Auf Wunsch übernehmen wir auch die Pflege von Empfangsbereichen und die Reinigung von EDV-Oberflächen nach Herstellervorgaben.",
    includes: ["Arbeitsplätze, Tische und Oberflächen", "Besprechungs- und Konferenzräume", "Teeküchen und Sozialräume", "Sanitäranlagen", "Fußböden und Treppenbereiche"],
    image: IMAGES.office,
  },
  {
    slug: "gebaeudereinigung",
    title: "Gebäudereinigung",
    short: "Komplette Gebäudereinigung aus einer Hand — für Verwaltungen, Hausverwaltungen und Eigentümer in der Ortenau.",
    intro: "Als Reinigungsfirma für Achern und Umgebung übernehmen wir die komplette Gebäudereinigung: von der Eingangshalle bis zum Dachgeschoss, von der einmaligen Aktion bis zum Rahmenvertrag.",
    text: "Wir analysieren Ihr Objekt vor Ort, definieren gemeinsam den Leistungsumfang und setzen die Reinigung mit geschultem Personal und geeigneten Maschinen um. Das Ergebnis: ein durchgängig gepflegtes Gebäude, mit dem Eigentümer, Mieter und Besucher gleichermaßen zufrieden sind.",
    includes: ["Objektaufnahme und Leistungsverzeichnis", "Alle Innen- und Verkehrsflächen", "Sonderreinigungen nach Bedarf", "Qualitätskontrollen durch feste Objektleitung", "Ein Ansprechpartner für das gesamte Gebäude"],
    image: IMAGES.building,
  },
  {
    slug: "fenster-glasreinigung",
    title: "Fenster- & Glasreinigung",
    short: "Streifenfreie Fenster, Glasfassaden und Glasdächer — für klare Sicht und gepflegte Fassaden.",
    intro: "Saubere Fenster verändern den gesamten Eindruck eines Gebäudes. Wir reinigen Fenster, Rahmen, Falze und Glasflächen jeder Art — streifenfrei und materialschonend.",
    text: "Ob Schaufenster im Einzelhandel, Glasfassaden am Bürogebäude oder Wintergärten im privaten Bereich: Mit professioneller Technik erreichen wir auch schwer zugängliche Flächen. Auf Wunsch richten wir feste Intervalle ein, damit Ihre Glasflächen das ganze Jahr überzeugen.",
    includes: ["Fenster inkl. Rahmen und Falze", "Schaufenster und Glasfassaden", "Glasdächer, Wintergärten, Vordächer", "Trennwände und Glastüren", "Festintervalle oder Einmalreinigung"],
    image: IMAGES.window,
  },
  {
    slug: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    short: "Gepflegte Treppenhäuser für Mieter und Eigentümer — zuverlässig und im festen Turnus.",
    intro: "Das Treppenhaus ist der erste Eindruck jedes Wohn- und Geschäftshauses. Wir sorgen dafür, dass dieser Eindruck stimmt — Woche für Woche, zuverlässig und gründlich.",
    text: "Für Hausverwaltungen und Eigentümergemeinschaften in Achern und Umgebung übernehmen wir die regelmäßige Treppenhausreinigung inklusive Geländer, Haustüren und Eingangsbereich. Feste Termine, feste Ansprechpartner, transparente Preise.",
    includes: ["Treppen, Podeste und Aufzüge", "Geländer, Handläufe und Haustüren", "Eingangsbereich und Briefkastenanlagen", "Kellerflure auf Wunsch", "Fester Reinigungsturnus"],
    image: IMAGES.interior,
  },
  {
    slug: "praxisreinigung",
    title: "Praxisreinigung",
    short: "Hygienische Reinigung für Arzt-, Zahnarzt- und Therapiepraxen — nach festen Hygieneplänen.",
    intro: "In medizinischen Einrichtungen ist Sauberkeit nicht nur eine Frage des Eindrucks, sondern der Hygiene. Wir reinigen Praxen in Achern und der Ortenau nach dokumentierten Hygieneplänen.",
    text: "Wartezimmer, Behandlungsräume, Labor- und Sanitärbereiche: Jede Zone wird nach den Anforderungen Ihrer Praxis gereinigt — mit geeigneten Reinigungs- und Desinfektionsmitteln, geschultem Personal und nachvollziehbaren Checklisten.",
    includes: ["Behandlungs- und Untersuchungsräume", "Wartezimmer und Empfang", "Flächendesinfektion nach Hygieneplan", "Sanitär- und Personalbereiche", "Dokumentierte Reinigungsnachweise"],
    image: IMAGES.desk,
  },
  {
    slug: "gewerbereinigung",
    title: "Gewerbereinigung",
    short: "Reinigungslösungen für Handel, Produktion und Dienstleistung — flexibel auf Ihren Betrieb abgestimmt.",
    intro: "Jeder Gewerbebetrieb hat eigene Anforderungen an Sauberkeit und Hygiene. Wir entwickeln Reinigungskonzepte, die zu Ihren Abläufen passen — vom Ladenlokal bis zur Produktionshalle.",
    text: "Ob Verkaufsfläche, Werkstatt oder Lager: Wir reinigen zu Zeiten, in denen Ihr Betrieb ruht, und mit Methoden, die zu Ihren Böden, Maschinen und Oberflächen passen. Transparent kalkuliert, zuverlässig umgesetzt.",
    includes: ["Verkaufs- und Ausstellungsflächen", "Werkstätten und Produktionsbereiche", "Lager- und Logistikflächen", "Sanitär- und Pausenräume", "Reinigung außerhalb der Betriebszeiten"],
    image: IMAGES.cleaning,
  },
  {
    slug: "grundreinigung",
    title: "Grundreinigung",
    short: "Intensive Tiefenreinigung für alle Oberflächen — die Basis für dauerhaft gepflegte Räume.",
    intro: "Wenn die reguläre Reinigung nicht mehr ausreicht, kommt die Grundreinigung zum Einsatz: eine intensive Tiefenreinigung aller Flächen, Böden und schwer erreichbaren Bereiche.",
    text: "Wir entfernen hartnäckige Verschmutzungen, alte Pflegefilme und Ablagerungen — maschinell und von Hand. Die Grundreinigung eignet sich als Auftakt eines neuen Reinigungsvertrags ebenso wie als Frühjahrsputz für Büro, Praxis oder Privathaushalt.",
    includes: ["Tiefenreinigung aller Bodenbeläge", "Entfernung hartnäckiger Verschmutzungen", "Heizkörper, Leisten, Rahmen und Ecken", "Sanitärbereiche inkl. Armaturen und Fugen", "Ideal vor Vertragsstart oder Saisonwechsel"],
    image: IMAGES.living,
  },
  {
    slug: "bauendreinigung",
    title: "Bauendreinigung",
    short: "Bezugsfertige Übergabe nach Neubau oder Renovierung — vom Bauschutt bis zum Feinschliff.",
    intro: "Nach Handwerkern kommen wir: Die Bauendreinigung macht Neubauten und renovierte Flächen bezugsfertig — von der groben Zwischenreinigung bis zur glänzenden Übergabe.",
    text: "Wir entfernen Bauschmutz, Staub, Farb- und Mörtelreste von Böden, Fenstern und Oberflächen. Auf Wunsch begleiten wir Ihr Bauprojekt in Achern und Umgebung mit Bauzwischenreinigungen, damit die Gewerke sauber aufeinander folgen können.",
    includes: ["Baugrobreinigung und Zwischenreinigung", "Entfernung von Staub, Farb- und Mörtelresten", "Fenster inkl. Rahmen und Falze", "Feinreinigung zur bezugsfertigen Übergabe", "Für Bauherren, Handwerker und Hausverwaltungen"],
    image: IMAGES.building,
  },
  {
    slug: "haushalt-privatreinigung",
    title: "Haushalts- & Privatreinigung",
    short: "Mehr Freizeit durch professionelle Haushaltshilfe — diskret, gründlich und nach Ihren Wünschen.",
    intro: "Sie möchten Ihre Zeit lieber anders verbringen als mit Putzen? Wir übernehmen die regelmäßige Reinigung Ihrer Wohnung oder Ihres Hauses — diskret, sorgfältig und genau so, wie Sie es wünschen.",
    text: "Vom wöchentlichen Basis-Service bis zur gelegentlichen Intensivreinigung: Gemeinsam legen wir fest, welche Bereiche gereinigt werden und worauf Sie besonderen Wert legen. Selbstverständlich mit Rücksicht auf Ihre Privatsphäre und Ihr Zuhause.",
    includes: ["Regelmäßige Wohnungs- und Hausreinigung", "Küche und Bad inkl. Armaturen", "Staubsaugen, Wischen, Staubwischen", "Fensterreinigung auf Wunsch", "Individuell vereinbarer Leistungsumfang"],
    image: IMAGES.living,
  },
];

export const FAQS = [
  {
    q: "In welchen Orten ist Cleanora im Einsatz?",
    a: "Unser Schwerpunkt liegt in Achern und der näheren Umgebung der Ortenau — unter anderem Oberachern, Sasbach, Lauf, Renchen, Kappelrodeck, Ottenhöfen und Seebach. Sprechen Sie uns an, wenn Ihr Objekt außerhalb liegt — wir prüfen gern, ob ein Einsatz möglich ist.",
  },
  {
    q: "Wie erhalte ich ein Angebot?",
    a: "Am schnellsten über unser Kontaktformular: Beschreiben Sie kurz Ihr Objekt und die gewünschte Leistung. Wir melden uns zeitnah bei Ihnen, besprechen die Details und erstellen ein kostenloses, unverbindliches Angebot — auf Wunsch nach einer Besichtigung vor Ort.",
  },
  {
    q: "Kann der Reinigungsrhythmus individuell festgelegt werden?",
    a: "Ja. Ob täglich, wöchentlich, vierzehntägig oder nach Bedarf — der Turnus richtet sich nach Ihrem Objekt und Ihren Anforderungen. Auch Reinigungen am frühen Morgen, abends oder am Wochenende sind möglich.",
  },
  {
    q: "Bringt Cleanora Reinigungsmittel und Geräte mit?",
    a: "Selbstverständlich. Wir arbeiten mit professionellen Geräten und geeigneten, materialschonenden Reinigungsmitteln. Auf Wunsch setzen wir auch umweltschonende Produkte ein.",
  },
  {
    q: "Was kostet eine Reinigung?",
    a: "Der Preis hängt von Objektgröße, Leistungsumfang und Turnus ab. Nach einer kurzen Besichtigung oder Objektbeschreibung erhalten Sie von uns ein transparentes Festpreis- oder Stundenangebot — ohne versteckte Kosten.",
  },
  {
    q: "Sind Sie auch kurzfristig verfügbar, etwa nach einem Umzug oder einer Renovierung?",
    a: "Für Grund- und Bauendreinigungen finden wir in der Regel zeitnah einen Termin. Rufen Sie uns einfach an oder schreiben Sie uns — gemeinsam finden wir eine Lösung.",
  },
];

export const PROCESS_STEPS = [
  { n: "01", title: "Anfrage", text: "Sie schildern uns Ihr Objekt und Ihren Wunsch — per Formular, E-Mail oder Telefon." },
  { n: "02", title: "Besichtigung", text: "Auf Wunsch schauen wir uns Ihr Objekt in Achern & Umgebung persönlich an." },
  { n: "03", title: "Angebot", text: "Sie erhalten ein transparentes, kostenloses Angebot mit klarem Leistungsumfang." },
  { n: "04", title: "Reinigung", text: "Wir starten zum vereinbarten Termin — zuverlässig, gründlich und mit festem Ansprechpartner." },
];

export const SERVICE_AREA_PLACES = [
  "Achern", "Oberachern", "Fautenbach", "Großweier", "Mösbach", "Önsbach",
  "Sasbach", "Lauf", "Renchen", "Kappelrodeck", "Ottenhöfen", "Seebach", "Ortenau",
];

export const MARQUEE_ITEMS = ["Sauberkeit", "Qualität", "Zuverlässigkeit", "Vertrauen", "Professionalität", "Achern & Umgebung"];
