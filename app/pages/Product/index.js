import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';

class Product extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={commonStyle.pageColor}>
        <Text>商品页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

function select(state) {
  return {
    productReducer: state.ProductReducer,
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Product);