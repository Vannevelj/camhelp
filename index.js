/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { name as appName } from './app.json';
import Camera from './src/Camera/Camera';
import Picker from './src/Picker/Picker';

Navigation.registerComponent('Camera', () => Camera);
Navigation.registerComponent('Picker', () => Picker);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Camera'
                        }
                    }
                ]
            }
        }
    });
})

AppRegistry.registerComponent(appName, () => Camera);
