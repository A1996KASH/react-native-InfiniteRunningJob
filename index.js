/**
 * @format
 */

import {AppRegistry} from 'react-native';
import BleManager from 'react-native-ble-manager';
import App from './App';
import {name as appName} from './app.json';
import {PermissionsAndroid} from 'react-native';

BleManager.start({showAlert: true}).then(async () => {});
AppRegistry.registerComponent(appName, () => App);
