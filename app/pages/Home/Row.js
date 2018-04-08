import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default class Row extends Component {
  render() {
    const {titleRow, rowStyle, leftTxt, middleTxt, strongTxt, rightTxt, txtStyle, strongTxtStyle} = this.props;
    return (
      <View style={commonStyle.between}>
        {titleRow && <View style={styles.titleRect}/>}
        <View style={[commonStyle.between, {paddingHorizontal: 16, flex: 1},  rowStyle]}>
          <Text style={[styles.font12, txtStyle]}>{leftTxt}</Text>
          <Text style={[styles.font12, txtStyle]}>{middleTxt}<Text style={strongTxtStyle}> {strongTxt}</Text></Text>
          <Text style={[styles.font12, txtStyle]}>{rightTxt}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleRect: {
    position: 'absolute',
    left: 0,
    top: -1,
    width: 4,
    height: 20,
    backgroundColor: ColorStore.themeColor
  },
  font12: {
    fontSize: 12
  }
});