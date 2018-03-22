import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class Sigin extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>欢迎来到登录页</Text>
        <TouchableOpacity
          style={styles.botton}
          onPress={() => Actions.tabbar()}
        >
          <Text style={styles.entryText}>进入APP内页</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ddd'
  },
  botton: {
    height: 40,
    width: 120,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  entryText: {
    color: '#fff'
  }
});