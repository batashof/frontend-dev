import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Load translations using http (default public/locales/en/translation.json)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Default language
    debug: false, // Set to true for debugging
    interpolation: {
      escapeValue: false // React already escapes values
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // Path to translation files
    }
  });

export default i18n;
