import en from './en';
import de from './de';
import uk from './uk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';

const languages = {
  en: {translation: en},
  de: {translation: de},
  uk: {translation: uk},
};
const language_codes = Object.keys(languages);

const LANGUAGE_DETECTOR: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(language_codes);

        console.log(findBestAvailableLanguage);
        callback(findBestAvailableLanguage!.languageTag || 'en');
        return;
      }
      callback(language);
    });
  },
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: languages,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
