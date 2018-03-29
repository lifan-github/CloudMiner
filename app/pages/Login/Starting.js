import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Animation from 'lottie-react-native';

export default class Starting extends Component {
  componentDidMount() {
    const that = this;
    that.animation.play();
    storage.load({
      key: "accessToken"
    }).then(ret => {
      if(ret.accessToken){
        that.timerOut = setTimeout(() => {
          Actions.tabbar();
        },2000);
      }
    }).catch(err1 => {
      storage.load({
        key: "isGuide"
      }).then(ret => {
        // 如果***找到数据***，则在then方法中返回
        console.log(ret,'ret--->>>');
        if(ret.guideIn){
          that.timerOut = setTimeout(() => {
            Actions.login();
          },2000);
        }
      }).catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        that.timerOut = setTimeout(() => {
          Actions.guide();
        },2000);
        console.log(err,'err--->>>');
      });
    });
  }

  componentWillUnmount(){
    this.timerOut && clearTimeout(this.timerOut)
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