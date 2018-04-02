import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import WeChatShare from '../../components/WeChatShare';
import {connect} from "react-redux";
import {exitLogin} from '../../redux/actions/LoginActions';
import {getExchangeRate, getNotice, getMiningSpeed, getNetWorker} from '../../redux/actions/HomeActions';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getExchangeRate({code: "CNY"}));
    this.props.dispatch(getNetWorker());
    this.props.dispatch(getNotice({status: ["published"]}));
    this.props.dispatch(getMiningSpeed({categories: ["hashes", "revenues", "workers"]}));
  }

  exitLogin(){
    this.props.dispatch(exitLogin())
  }

  render() {
    return (
      <View style={styles.container}>
        <WeChatShare/>
        <TouchableOpacity
          style={{padding: 20, backgroundColor: 'red'}}
          onPress={() => this.exitLogin()}
        >
          <Text>退出登录</Text>
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

function select(state) {
  console.log(state.HomeReducer,'Home111111');
  return {
    homeRuducers: state.HomeReducer
  }
}

export default connect(select)(Home);