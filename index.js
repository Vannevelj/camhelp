/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {name as appName} from './app.json';
import Camera from './src/Camera/Camera';
import Picker from './src/Picker/Picker';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:
    'https://a866d5f3aa2c42209cd5b872091c3d31@o494690.ingest.sentry.io/5566195',
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
