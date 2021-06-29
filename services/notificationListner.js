import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';
import {stringToBytes} from 'convert-string';
import {AppRegistry} from 'react-native';
import BleManager from 'react-native-ble-manager';
// To check if the user has permission
export const notificationListner = async () => {
  const status = await RNAndroidNotificationListener.getPermissionStatus();
  if (status !== 'authorized') {
    RNAndroidNotificationListener.requestPermission();
  }
  const headlessNotificationListener = async ({notification}) => {
    const notif = JSON.parse(notification);
    if (notification) {
      // Convert data to byte array before write/writeWithoutResponse
      const notificationMsg = stringToBytes(notif.text);
      if (notif.app === 'com.whatsapp.w4b') {
        BleManager.getConnectedPeripherals([]).then(data => {
          BleManager.retrieveServices(data[0].id).then(peripheralData => {
            BleManager.write(
              data[0].id,
              peripheralData.services[2].uuid,
              peripheralData.characteristics[4].characteristic,
              notificationMsg,
            )
              .then(() => {
                // Success code
              })
              .catch(error => {
                // Failure code
                console.log(error);
              });
          });
        });
      }
    }
  };
  AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener,
  );
};
