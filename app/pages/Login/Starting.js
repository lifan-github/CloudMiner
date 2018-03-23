import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Animation from 'lottie-react-native';

export default class Starting extends Component {
  componentDidMount() {
    this.animation.play();
    this.timerout = setTimeout(function(){
      Actions.guide();
    },3000)
  }

  componentWillUnmount(){
    this.animation.stop();
    this.timerout && clearTimeout(this.timerout)
  }

  render() {
    return (
      <View style={styles.container}>
        <Animation
          ref={animation => {this.animation = animation}}
          style={{width: 300, height: 300}}
          source={require('../../images/starting')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#01cec3'
  }
});