/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  NativeModules,
  PermissionsAndroid,
  NativeEventEmitter,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import BackgroundService from 'react-native-background-actions';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 3000,
  },
};
BleManager.start({showAlert: false}).then(() => {
  // Success code
  console.log('Module initialized');
});
BleManager.scan([], 10, true).then(data => {
  // Success code
  console.log('Scan started');
});
async function discover() {
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
    BleManager.getDiscoveredPeripherals().then(results => {
      console.log(results);
    });
  }
}
discover();
function handleOpenURL(evt) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

class App extends React.Component {
  playing = BackgroundService.isRunning();

  /**
   * Toggles the background task
   */
  veryIntensiveTask = async taskDataArguments => {
    console.log('runninn');
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        await sleep(delay);
      }
    });
  };

  toggleBackground = async () => {
    this.playing = !this.playing;
    console.log(this.playing);
    if (this.playing) {
      try {
        console.log('Trying to start background service');
        await BackgroundService.start(this.veryIntensiveTask, options);
        await BackgroundService.updateNotification({
          taskDesc: 'New ExampleTask description',
        });
        console.log(BackgroundService.isRunning());
        console.log('Successful start!');
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      console.log('Stop background service');
      await BackgroundService.stop();
    }
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <TouchableOpacity
                // eslint-disable-next-line react-native/no-inline-styles
                style={{height: 100, width: 100, backgroundColor: 'red'}}
                onPress={this.toggleBackground}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
export default App;
