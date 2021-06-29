import BleManager from 'react-native-ble-manager';
import {PermissionsAndroid, NativeAppEventEmitter} from 'react-native';
import {Buffer} from 'buffer';
import {backgroundJob} from './backGroundJob';
export const BleScanner = async () => {
  //const BleManagerModule = NativeModules.BleManager;
  //const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  BleManager.enableBluetooth()
    .then(async () => {
      // Success code
      NativeAppEventEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        async data => {
          if (data.name === 'GyroPalm Wearable') {
            console.log('device found connecting');
            BleManager.connect(data.id)
              .then(() => {
                // Success code
                console.log('connected');
                backgroundJob();
              })
              .catch(error => {
                // Failure code
                console.log(error);
              });
            await BleManager.stopScan();
          }
          // Name of peripheral device
        },
      );
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
      if (data === 'granted') {
        //   setTimeout(5000,()=>{
        //     await BleManager.getDiscoveredPeripherals();
        //   })
        //  // const data =
      }
    })
    .catch(error => {
      // Failure code
      console.log('The user refuse to enable bluetooth');
    });
};
