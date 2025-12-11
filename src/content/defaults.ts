import { locales } from '@/i18n/config'

export type PageKey = 'home' | 'about' | 'services' | 'symptoms' | 'appointment' | 'contact'

const DEFAULT_LOCALE = locales[0]

const fallbackLocale = (locale?: string) =>
  locales.includes((locale || '') as any) ? locale! : DEFAULT_LOCALE

export const homeDefaults = (locale?: string) => ({
  locale: fallbackLocale(locale),
  hero: {
    title: 'TCM Weissenberger',
    subtitle: 'Ganzheitliche Medizin mit 2.000 Jahren Erfahrung',
    tagline: 'Modern integriert. Wissenschaftlich orientiert.',
    description: 'Individuelle Behandlung nach TCM und WHO-ICD-11.',
    ctaLabel: 'Termin vereinbaren',
    insurance: 'ASCA / EMR anerkannt',
    heroImage: '',
    youtubeId: '',
  },
  uniqueFeaturesTitle: 'Unsere Besonderheiten',
  uniqueFeatures: [
    {
      title: 'ICD-11 System',
      description: 'Schweizweit erstes ICD-11-basiertes intelligentes TCM-Dossier',
    },
    {
      title: 'AI Analyse',
      description: 'KI-unterstützte Gesundheitsanalyse',
    },
    {
      title: 'Transparenz',
      description: 'Transparente Behandlungsprozesse',
    },
  ],
  coreServicesTitle: 'Unsere Behandlungen',
  coreServicesNote: 'Wird stetig ergänzt',
  services: [
    { title: 'Akupunktur', description: 'Schmerzlinderung und Regulation', icon: '📍' },
    { title: 'Chinesische Kräuter', description: 'Individuelle Rezepturen', icon: '🌿' },
    { title: 'Tuina', description: 'Entspannung und Regeneration', icon: '💆' },
  ],
})

export const aboutDefaults = (locale?: string) => ({
  locale: fallbackLocale(locale),
  hero: {
    title: 'Über uns',
    subtitle: 'Ganzheitliche Medizin mit wissenschaftlicher Basis',
  },
  mission: {
    title: 'Mission',
    body: 'Ganzheitliche Medizin mit wissenschaftlicher Basis und moderner Transparenz.',
  },
  values: {
    title: 'Werte',
    body: 'Transparente Behandlung nach modernen Standards.',
  },
  qualificationsTitle: 'Qualifikationen & Zertifizierungen',
  qualifications: [
    {
      title: 'Ausbildung',
      items: ['TCM Bachelor / Master', 'Kontinuierliche Weiterbildung', 'Evidenzbasierte Methoden'],
    },
    {
      title: 'Zertifizierungen',
      items: ['ASCA anerkannt', 'EMR anerkannt', 'LCC anerkannt', 'TCM-Fachverband Mitglied'],
    },
  ],
  languagesTitle: 'Sprachen',
  languages: ['Deutsch', 'English', '中文'],
  heroVideoId: '',
  heroImage: '',
})

export const servicesDefaults = (locale?: string) => ({
  locale: fallbackLocale(locale),
  hero: {
    title: 'Leistungen',
    subtitle: 'Professionelle TCM-Behandlungen für Ihre Gesundheit',
    youtubeId: '',
    heroImage: '',
  },
  services: [
    {
      title: 'Akupunktur',
      description: 'Traditionelle Akupunktur für Schmerzreduktion und Regulation',
      icon: '📍',
    },
    {
      title: 'Chinesische Kräuter',
      description: 'Individuelle Kräuterrezepturen zur Konstitutionsregulation',
      icon: '🌿',
    },
    { title: 'Tuina', description: 'Tuina Techniken für Entspannung', icon: '💆' },
    { title: 'Schröpfen', description: 'Meridiane klären und Durchblutung aktivieren', icon: '🔥' },
    { title: 'Moxibustion', description: 'Wärmen und Qi stärken', icon: '🌡️' },
    { title: 'TCM Konsultation', description: 'Gesundheitsbewertung & Lifestyle-Beratung', icon: '💬' },
  ],
  cta: {
    title: 'Bereit für eine Behandlung?',
    body: 'Vereinbaren Sie noch heute einen Termin',
    label: 'Termin vereinbaren',
  },
})

export const symptomsDefaults = (locale?: string) => ({
  locale: fallbackLocale(locale),
  hero: {
    title: 'Beschwerden',
    subtitle: 'Wie TCM bei verschiedenen Beschwerden helfen kann',
    youtubeId: '',
    heroImage: '',
  },
  symptoms: [
    { title: 'Rückenschmerzen', description: 'TCM Behandlung für Rückenbeschwerden', icon: '🔹' },
    { title: 'Migräne', description: 'TCM & Studien zu Kopfschmerzen', icon: '🔹' },
    { title: 'Stress & Schlaf', description: 'Ganzheitliche Behandlung von Stress & Schlaf', icon: '🔹' },
    { title: 'Verdauung', description: 'TCM Perspektive und Therapie', icon: '🔹' },
  ],
  cta: {
    title: 'Fragen zu Ihrer Beschwerde?',
    body: 'Buchen Sie eine Beratung für eine individuelle Behandlung',
    label: 'Termin vereinbaren',
  },
})

export const appointmentDefaults = (locale?: string) => ({
  locale: fallbackLocale(locale),
  hero: {
    title: 'Termin buchen',
    subtitle: 'Einfache Terminbuchung ohne Registrierung',
    youtubeId: '',
    heroImage: '',
  },
  calendarUrl:
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1it6AjotMsExF6VbZH6WcVYds3A4ElpTdbpXh668CxO7MTdxskRnyplsLs9PNv3ZCp4bK2ZA76?gv=true&hl=de',
})

export const contactDefaults = (locale?: string) => ({
  locale: fallbackLocale(locale),
  hero: {
    title: 'Kontakt',
    subtitle: '',
    youtubeId: '',
    heroImage: '',
  },
  details: {
    addressLabel: 'Adresse',
    address: 'Adresse wird noch hinzugefügt',
    phoneLabel: 'Telefon',
    phone: 'Telefonnummer wird noch hinzugefügt',
    emailLabel: 'E-Mail',
    email: 'E-Mail-Adresse wird noch hinzugefügt',
  },
  hours: {
    title: 'Öffnungszeiten',
    rows: [
      { label: 'Montag - Freitag', value: '09:00 - 18:00' },
      { label: 'Samstag', value: 'Nach Vereinbarung' },
      { label: 'Sonntag', value: 'Geschlossen' },
    ],
  },
  infoCards: [
    {
      title: 'ÖV',
      body: 'Öffentliche Verkehrsmittel Informationen werden noch hinzugefügt',
    },
    {
      title: 'Parkplätze',
      body: 'Parkmöglichkeiten Informationen werden noch hinzugefügt',
    },
    {
      title: 'Versicherung',
      body: 'ASCA / EMR / LCC anerkannt. Bitte Versicherung kontaktieren.',
    },
  ],
  mapTitle: 'Anfahrt',
  mapEmbedUrl: '',
})

export function getDefaultContent(page: PageKey, locale?: string) {
  switch (page) {
    case 'home':
      return homeDefaults(locale)
    case 'about':
      return aboutDefaults(locale)
    case 'services':
      return servicesDefaults(locale)
    case 'symptoms':
      return symptomsDefaults(locale)
    case 'appointment':
      return appointmentDefaults(locale)
    case 'contact':
      return contactDefaults(locale)
    default:
      return homeDefaults(locale)
  }
}

