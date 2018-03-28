import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import WeChatShare from '../../components/WeChatShare';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <WeChatShare/>
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