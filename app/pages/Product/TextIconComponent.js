import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class TextIconComponent extends Component {
  render() {
    const {petIcon, petText, petValue} = this.props;
    return (
      <View style={[commonStyle.between, {paddingBottom: 15}]}>
        <View style={styles.leftLabel}>
          <Text style={styles.leftIcon}>{petIcon}</Text>
          <Text style={styles.leftText}>{petText}</Text>
        </View>
        <Text style={styles.rightLable}>{petValue}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  leftLabel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftIcon: {
    fontSize: 16,
    color: "#4d4d4d",
    marginRight: 10
  },
  leftText: {
    fontSize: 16,
    color: "#4d4d4d",
  },
  rightLable: {
    fontSize: 16,
    color: "#333"
  }
});