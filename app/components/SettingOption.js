import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class SettingOption extends Component {
  static defaultProps = {
    borderBottom: true
  };

  render() {
    const {iconFont, optionText, onPress, rightTopDot} = this.props;
    const borderBottomWidth = this.props.borderBottom ? StyleSheet.hairlineWidth : 0;
    return (
      <View style={{borderBottomWidth: borderBottomWidth, borderColor: "#ddd"}}>
        <TouchableOpacity
          style={[commonStyle.between, styles.viewHeight54]}
          activeOpacity={.6}
          onPress={onPress}
        >
          <View style={styles.rowList}>
            <View style={styles.leftLabel}>
              {
                rightTopDot ?
                  <View style={styles.dotStyle}/>
                  : null
              }
              <Text style={styles.iconStyle}>{iconFont}</Text>
            </View>
            <Text style={styles.optionTextStyle}>{optionText}</Text>
          </View>
          <Text style={styles.rightArrowStyle}>{IconStore.arrowright}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 18
  },
  optionTextStyle: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10
  },
  leftLabel: {
    padding: 5,
    paddingLeft: 0
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: "#e4393c"
  },
  viewHeight54: {
    height: 54
  },
  rowList: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightArrowStyle: {
    fontSize: 14
  }
});
