import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import {sendVcode, loginApp} from '../../redux/actions/LoginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      name: "lifan"
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.dispatch(sendVcode({lifan: 'name'}));
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
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

//基于全局 state ，哪些是我们想注入的 props
function select(state) {
  console.log(state, 'store-------9999999');
  return {
    loginReducer: state.LoginReducer
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Login);