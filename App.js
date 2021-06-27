/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainScreen from './components/mainScreen/';
import {View, StyleSheet} from 'react-native';
import BleManager from 'react-native-ble-manager';

BleManager.start({showAlert: false}).then(() => {
  // Success code
  console.log('Module initialized');
});
const App = () => {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
    alignItems: 'center',
  },
});
export default App;
