import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import ImageStore from '../../images';
import {Actions} from 'react-native-router-flux';

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dotActiveColor: "#F95919",
      guideDotsActive: ['#F95919', '#345082', '#99D0AF', '#42BAFC']
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onIndexChanged(index){
    let {guideDotsActive} = this.state;
    this.setState({
      dotActiveColor: guideDotsActive[index]
    })
  }

  enter(){
    Actions.login();
  }

  render() {
    return (
      <Swiper
        loop={false}
        onIndexChanged={(index) => this.onIndexChanged(index)}
        activeDotColor={this.state.dotActiveColor}
      >
        <View style={styles.slide}>
          <Image source={ImageStore.guidePic.guidePic1} style={styles.imgs}/>
        </View>
        <View style={styles.slide}>
          <Image source={ImageStore.guidePic.guidePic2} style={styles.imgs}/>
        </View>
        <View style={styles.slide}>
          <Image source={ImageStore.guidePic.guidePic3} style={styles.imgs}/>
        </View>
        <View style={styles.slide}>
          <Image source={ImageStore.guidePic.guidePic4} style={styles.imgs}/>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.enter()}
          >
            <Text style={styles.entryApp}>立即体验</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgs: {
    height: '100%',
    resizeMode: 'contain'
  },
  buttonStyle: {
    position: 'absolute',
    zIndex: 100,
    bottom: 100,
    backgroundColor: '#42BAFC',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4
  },
  entryApp: {
    fontSize: 16,
    color: "#fff"
  }
});