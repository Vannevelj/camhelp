import buildinfo from './buildinfo.json';
import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {name as appName} from './app.json';
import Camera from './src/Camera/Camera';
import Picker from './src/Picker/Picker';
import * as Sentry from '@sentry/react-native';
import TextHelper from './src/TextHelper';

if (!__DEV__) {
  Sentry.init({
    dsn: buildinfo.sentryDsn,
  });
}

TextHelper.init();

Navigation.registerComponent('Camera', () => Camera);
Navigation.registerComponent('Picker', () => Picker);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Camera',
            },
          },
        ],
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => Camera);
