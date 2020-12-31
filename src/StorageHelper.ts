import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

export default class StorageHelper {
  public static set = async (key: string, value: string) => {
    try {
      console.log(`Setting ${key} to ${value}`);
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(
        `Error encountered when setting key: ${key}. Value: ${value}`,
      );
      Sentry.captureException(err);
    }
  };

  public static get = async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (err) {
      console.log(`Error encountered when fetching key: ${key}`);
      Sentry.captureException(err);
      return null;
    }
  };
}
