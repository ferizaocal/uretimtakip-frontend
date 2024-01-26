import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';

import en from './en';
import tr from './tr';
import de from './de';
import zh from './zh';
import {store} from '../store';

const locales = RNLocalize.getLocales();
export const isRtl = locales[0].isRTL;
I18nManager.forceRTL(isRtl);
I18n.fallbacks = true;
I18n.translations = {
  tr,
  en,
  de,
  zh,
};
store.subscribe(() => {
  const state = store.getState();
  I18n.locale = state.app.language;
});
export default I18n;
