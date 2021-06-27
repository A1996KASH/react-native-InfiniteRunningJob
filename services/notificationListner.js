import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';

import {AppRegistry} from 'react-native';
// To check if the user has permission
export const notificationListner = async () => {
  const status = await RNAndroidNotificationListener.getPermissionStatus();
  if (status !== 'authorized') {
    RNAndroidNotificationListener.requestPermission();
  }
  const headlessNotificationListener = async ({notification}) => {
    const notif = JSON.parse(notification);
    if (notification) {
      if (notif.app === 'com.whatsapp.w4b') {
        console.log(notif);
      }
    }
  };
  AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener,
  );
};
