import en from './locales/en.json'
import de from './locales/de.json'

export const locales = {
  en: { name: 'English', label: 'EN', path: '', ogLocale: 'en_GB' },
  de: { name: 'Deutsch', label: 'DE', path: 'de/', ogLocale: 'de_DE' },
} as const

export type Locale = keyof typeof locales

// Every language must implement the English message catalog.
export const messages: Record<Locale, typeof en> = { en, de }
