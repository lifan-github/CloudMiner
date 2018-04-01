import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

const TabIcon = (props) => {
  return (
    <View>
      <Image
        source={!props.focused ? props.image : props.selectedImage}
        style={[{height: 24, width: 24, tintColor: props.tintColor}]}
      />
      <Text style={{color: props.tintColor, marginTop: 5, fontSize: 12}}>
        {props.title}
      </Text>
    </View>
  )
};


export default TabIcon;