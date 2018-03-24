import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    console.log("componentWillMount222")
  }

  componentDidMount() {
    console.log("componentDidMount222")
  }

  componentWillUnmount() {
    console.log("componentWillUnmount222")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>欢迎来到shangpin</Text>
        <TouchableOpacity
          onPress={() => Actions.product2()}
        >
          <Text>商品内页</Text>
        </TouchableOpacity>
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