import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

let countNum = 5;
export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeText: "获取验证码",
      countNum: 5
    }
  }

  componentWillReceiveProps({statrTheTime, statrSendCode}){
    console.log(statrSendCode,'statrSendCode');
    console.log(statrTheTime,'statrTheTime');
    statrSendCode(false)
    /* console.log(this.props.statrTheTime, '=====>>>', nextProps.statrTheTime)
    if(nextProps.statrTheTime){
      this.timer = setInterval(() => {
        this.countDown();
      }, 1000);
    }*/
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.statrTheTime, '=====>>>', nextProps.statrTheTime)
    console.log(this.state.countNum, '===countNum==>>>', nextState.countNum)
    if (nextProps.statrTheTime && this.state.countNum > 0) {
      this.timer = setInterval(() => {
        this.countDown();
      }, 1000);
      console.log("需要更新这个组件");
      return true;
    }
    console.log("不需要更新");
    return false;
  }

  componentDidUpdate() {
    console.log("组件更新完毕");
  }*/

  countDown = () => {
    if (countNum === 0) {
      this.setState({ // 时间为0时, 并可以重新发送code
        codeText: "获取验证码"
      });
      this.timer && clearInterval(this.timer);
      countNum = 5;
    } else {
      this.setState({
        codeText: countNum + " 秒可重新获取"
      });
      countNum--;
    }
    console.log(countNum)
  };

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  render() {
    console.log("render");
    return (
      <TouchableOpacity
        style={styles.codeContent}
        onPress={this.props.statrSendCode}
      >
        <Text>{this.state.codeText}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  codeContent: {
    backgroundColor: 'red',
    padding: 5
  }
});