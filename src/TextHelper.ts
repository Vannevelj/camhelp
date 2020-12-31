import translations from './translations.json';
import * as RNLocalize from 'react-native-localize';

type TranslationKeys = keyof typeof translations;

export default class TextHelper {
  public static locale: string = 'en';

  public static init = () => {
    console.log('initializing locale information');
    const locales = RNLocalize.getLocales();
    console.log(`found these locales: ${JSON.stringify(locales)}`);
    TextHelper.locale = locales[0]?.languageCode ?? 'en';
    console.log(`Enabling ${TextHelper.locale} as locale`);
  };

  public static t = (key: TranslationKeys) => {
    const text = (translations as any)[key];

    const preferredLanguage = text[TextHelper.locale];
    if (preferredLanguage) {
      return preferredLanguage;
    }

    return text['en'];
  };
}
