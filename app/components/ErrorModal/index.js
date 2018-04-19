import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';

class ErrorModal extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      Actions.pop();
    },3000)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const {icon_type, content} = this.props;
    console.log(this.props,'modal---------------->>>>>');
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.modalContainer}>
          <View style={styles.modalStyle}>
            {icon_type === "loading" && <ActivityIndicator style={styles.iconStyle} color="#fff" size="large"/>}
            {icon_type === "fail" && <Text style={styles.icon}>{IconStore.wrong}</Text>}
            {icon_type === "success" && <Text style={styles.icon}>{IconStore.right}</Text>}
            <Text style={styles.tips}>{content}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH/2,
    height: SCREEN_WIDTH/2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  iconStyle: {
    marginBottom: 20
  },
  tips: {
    fontSize: 18,
    color: '#fff'
  },
  icon: {
    fontSize: 40,
    color: "#fff"
  },
  modalStyle: {
    alignItems: 'center'
  }
});


function select(state) {
  return {
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(ErrorModal);