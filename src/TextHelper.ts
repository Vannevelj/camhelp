import translations from './translations.json';
import * as RNLocalize from 'react-native-localize';

type TranslationKeys = keyof typeof translations;

export default class TextHelper {
  private static locale: string = 'en';

  public static init = () => {
    console.log('initializing locale information');
    const locales = RNLocalize.getLocales();
    console.log(`found these locales: ${JSON.stringify(locales)}`);
    TextHelper.locale = locales[0]?.languageCode ?? 'en';
    console.log(`Enabling ${TextHelper.locale} as locale`);
  };

  public static t = (key: TranslationKeys) => {
    const text = translations[key];

    const preferredLanguage = (text as any)[TextHelper.locale];
    return preferredLanguage ?? text.en;
  };
}
