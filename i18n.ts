import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
const LanguageDetector = require('i18next-react-native-language-detector');
import en from './translations/en';
import de from './translations/de';
import uk from './translations/uk';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
      uk: {
        translation: uk,
      },
    },
  });

export default i18n;
