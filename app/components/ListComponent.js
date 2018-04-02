import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class ListComponent extends Component {
  render() {
    const {borderBottom, rightArrowIcon, leftText, rightText, bindDetails} = this.props;
    let borderBottomStyle = borderBottom ? (commonStyle.viewBorderBottom) : (styles.noBorderBottom);
    return (
      <TouchableOpacity
        style={[commonStyle.between, styles.rowListHeight, borderBottomStyle]}
        activeOpacity={0.6}
        onPress={bindDetails}
      >
        <Text style={[styles.font14, styles.fontColor4d, {flex: 1}]}>{leftText}</Text>
        {
          rightText ?
            <Text style={[styles.font14, styles.fontColor74]}>{rightText}</Text>
            :
            null
        }
        {
          rightArrowIcon ?
            <Text style={styles.rightArrowStyle}>{IconStore.arrowright}</Text>
            :
            null
        }
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  noBorderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#fff"
  },
  font14: {
    fontSize: 14
  },
  fontColor4d: {
    color: "#4d4d4d"
  },
  rightArrowStyle: {
    fontSize: 14,
    marginLeft: 8
  },
  rowListHeight: {
    height: 55
  },
  fontColor74: {
    color: "#747474"
  }
});