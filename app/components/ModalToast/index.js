import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

export default class ModalToast extends Component {
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {console.log("111")}}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => {console.log("closed-modal")}}
        >
          <View style={this.props.modalStyle}>
            {this.props.modalIcon === "loading" && <ActivityIndicator style={styles.iconStyle} color="red" size="large"/>}
            {this.props.modalIcon === "fail" && <Text style={styles.icon}>{IconStore.wrong}</Text>}
            <Text style={styles.tips}>{this.props.statusText}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    marginBottom: 20
  },
  tips: {
    fontSize: 18,
    color: '#4d4d4d'
  },
  icon: {
    fontSize: 40,
    color: "red"
  }
});