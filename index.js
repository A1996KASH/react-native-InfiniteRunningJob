/**
 * @format
 */

import {AppRegistry} from 'react-native';
import BleManager from 'react-native-ble-manager';
import App from './App';
import {name as appName} from './app.json';
import {PermissionsAndroid} from 'react-native';

BleManager.start({showAlert: true}).then(async () => {
  // Success code
  BleManager.enableBluetooth().then(async () => {
    // Success code
    console.log('The bluetooth is already enabled or the user confirm');
    BleManager.scan([], 5, true).then(() => {
      // Success code
      console.log('Scan started');
    });
    const data = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Bluetooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log(data);
    if (data === 'granted') {
      console.log('in');
      BleManager.getDiscoveredPeripherals().then(results => {
        console.log(results);
      });
    }
  });
  console.log('Module initialized');
});
AppRegistry.registerComponent(appName, () => App);
