import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    console.log("componentDidMount333")
  }

  componentWillUnmount() {
    console.log("componentWillUnmount333")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>欢迎来到mine</Text>
        <TouchableOpacity
          style={styles.botton}
          onPress={() => Actions.errorModal()}
        >
          <Text style={styles.entryText}>errorModal</Text>
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