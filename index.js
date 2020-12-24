import buildinfo from './buildinfo.json';
import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {name as appName} from './app.json';
import Camera from './src/Camera/Camera';
import Picker from './src/Picker/Picker';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: buildinfo.sentryDsn,
});

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
