import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

const TabIcon = (props) => {
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.iconText, {color: props.focused ? props.tintColor : "#999"}]}>
        {!props.focused ? props.activeIcon : props.inactiveIcon}
      </Text>
      <Text style={[styles.tabbarText, {color: props.tintColor}]}>
        {props.title}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center'
  },
  tabbarText: {
    fontSize: FONT_SIZE(12)
  },
  iconText: {
    fontSize: FONT_SIZE(20)
  }
});

export default TabIcon;