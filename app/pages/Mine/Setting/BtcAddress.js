import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class BtcAddress extends Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>欢迎</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});