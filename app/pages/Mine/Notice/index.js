import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet, InteractionManager
} from 'react-native';
import {connect} from "react-redux";
import {getExchangeRate} from "../../../redux/actions/HomeActions";

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(getExchangeRate({code: "CNY"}));
    });
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>欢迎</Text>
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
  return {
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Notice);