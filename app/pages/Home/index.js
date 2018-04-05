import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {connect} from "react-redux";
import WeChatShare from '../../components/WeChatShare';
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
      <WeChatShare/>
    )
  }
}

const styles = StyleSheet.create({

});

function select(state) {
  return {
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Home);