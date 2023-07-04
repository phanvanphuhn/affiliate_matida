import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './locales/en/index';
import {vi} from './locales/vi/index';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
let arrLangs = ['en', 'vi'];
type languageDetectorType = {
  type:
    | 'backend'
    | 'logger'
    | 'languageDetector'
    | 'postProcessor'
    | 'i18nFormat'
    | 'formatter'
    | '3rdParty';
  async: boolean;
  detect: (cb: (value: string) => void) => void;
  init: () => void;
  cacheUserLanguage: () => void;
};

const getLocalize = async (callback: any) => {
  let data = await AsyncStorage.getItem('LANGUAGE');
  if (data) {
    return callback(data);
  } else {
    callback('vi');
  }
};

const languageDetector: languageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    getLocalize(callback);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const initI18n = () => {
  i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: 'vi',
      debug: true,
      resources: {
        en: {translation: en},
        vi: {translation: vi},
      },
    });
};

export {initI18n};
