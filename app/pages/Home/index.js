import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import WeChatShare from '../../components/WeChatShare';
import {connect} from "react-redux";
import {getExchangeRate, getNotice, getMiningSpeed, getNetWorker} from '../../redux/actions/HomeActions';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getExchangeRate({code: "CNY"}));
    this.props.dispatch(getNetWorker());
    this.props.dispatch(getNotice({status: ["published"]}));
    this.props.dispatch(getMiningSpeed({categories: ["hashes", "revenues", "workers"]}));
  }

  render() {
    return (
      <View style={styles.container}>
        <WeChatShare/>
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