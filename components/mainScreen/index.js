import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from './style';
const MainScreen = () => {
  return (
    <View style={styles.gyropalmContainer}>
      <ImageBackground
        source={{uri: 'https://gyropalm.com/img/GPbackground.jpg'}}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titles}> Gyropalm</Text>
        <Text style={styles.subTitles}>
          The Universal Interface for Your Wrist
        </Text>
      </View>
    </View>
  );
};

export default MainScreen;
