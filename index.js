/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import RNAndroidNotificationListener, {
//   RNAndroidNotificationListenerHeadlessJsName,
// } from 'react-native-android-notification-listener';
// import PushNotification from 'react-native-push-notification';
// // To check if the user has permission
// const getStatus = async () => {
//   const status = await RNAndroidNotificationListener.getPermissionStatus();
//   if (status !== 'authorized') {
//     RNAndroidNotificationListener.requestPermission();
//   }
// }; // Result can be 'authorized', 'denied' or 'unknown'
// getStatus();
// const headlessNotificationListener = async ({notification}) => {
//   const notif = JSON.parse(notification);
//   if (notification) {
//     if (notif.app === 'com.whatsapp.w4b') {
//       console.log(notif);
//     }
//   }
// };

// AppRegistry.registerHeadlessTask(
//   RNAndroidNotificationListenerHeadlessJsName,
//   () => headlessNotificationListener,
// );
AppRegistry.registerComponent(appName, () => App);
