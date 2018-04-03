import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LocalStore from '../../../utils/LocalStore';

export default class AboutUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logoImage} source={ImageStore.commonPic.logo}/>
        <Text style={styles.version}>{TextStore.appName} {LocalStore.deviceInfo.version}</Text>
        <TouchableOpacity
          style={[styles.clauseBox, commonStyle.center, commonStyle.paddingTb10]}
          onPress={() => Actions.clause()}
        >
          <Text style={styles.buttonText}>服务条款及隐私政策</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  logoImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: "20%"
  },
  version: {
    marginTop: 50,
    fontSize: 14,
    color: "#747474"
  },
  clauseBox: {
    width: '60%',
    marginTop: 50,
    borderRadius: 4,
    backgroundColor: ColorStore.themeColor
  },
  buttonText: {
    fontSize: 16,
    color: "#fff"
  }
});