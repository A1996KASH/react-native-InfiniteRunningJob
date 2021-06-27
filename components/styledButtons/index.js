import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './style';
import {notificationListner} from '../../services/notificationListner';
import {BleScanner} from '../../services/scanBleDevices';
import {backgroundJob} from '../../services/backGroundJob';
const button = props => {
  const type = props.type;
  const backgroundColor = type === 'primary' ? '#4a90e2' : 'blue';
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, {backgroundColor}]}
        onPress={() => {
          BleScanner();
          //backgroundJob();
        }}>
        <Text style={styles.text}>Scan Devices</Text>
      </Pressable>
    </View>
  );
};
export default button;
