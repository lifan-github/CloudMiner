import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    console.log("componentWillMount--->Notice")
  }

  componentDidMount() {
    console.log("componentDidMount--->Notice")
  }

  componentWillUnmount() {
    console.log("componentWillUnmount--->Notice")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Notice</Text>
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