import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickText: "开始点击按钮",
      count: 1
    }
  }

  componentWillMount() {
    console.log("componentWillMount1111");
  }

  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps1111", nextProps);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state.count !== nextState.count) {
      console.log("shouldComponentUpdate1111---组件需要更新");
      return true;
    }
    return false;
  }

  componentWillUpdate(){
    console.log("componentWillUpdate1111---组件将要更新");
  }

  componentDidUpdate(){
    console.log("componentDidUpdate1111---组件更新完毕");
  }

  componentDidMount() {
    console.log("componentDidMount1111");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount1111");
  }

  clickButton(){
    const { count } = this.state;
    this.setState({
      clickText: "我点击了按钮",
      count: count + 1
    })
  }

  render() {
    console.log("render1111");
    return (
      <View style={styles.container}>
        <Text>欢迎来到首页</Text>
        <TouchableOpacity
          onPress={() => Actions.notice()}
        >
          <Text>跳转到公告页</Text>
        </TouchableOpacity>
        <Text style={{color: 'blue', fontSize: 40}}>{this.state.count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.clickButton()}
        >
          <Text>{this.state.clickText}</Text>
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
  button: {
    width: 250,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});