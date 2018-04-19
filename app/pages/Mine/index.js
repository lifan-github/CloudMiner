import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {connect} from "react-redux";
import {getMyInfomation} from "../../redux/actions/MineActions";


class Mine extends Component {
  componentDidMount() {
    // this.props.dispatch(getMyInfomation());
  }

  render() {
    return (
      <View>
        <Text>mineinnnnnnnnnnnnnn</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});


function select(state) {
  return {
    mineReducer: state.MineReducer
  }
}

export default connect(select)(Mine);