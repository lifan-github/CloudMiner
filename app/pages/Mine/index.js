import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ViewPagerAndroid
} from 'react-native';
import {connect} from "react-redux";
import Swiper from 'react-native-swiper';
import {getMyInfomation} from "../../redux/actions/MineActions";

const renderPagination = (index, total) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{color: 'grey'}}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
};

class Mine extends Component {
  componentDidMount() {
    // this.props.dispatch(getMyInfomation());
  }

  render() {
    return (
      <ViewPagerAndroid
        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}
        initialPage={0}
        peekEnabled={true}
        ref={viewPager => {
          this.viewPager = viewPager
        }}
      >
        <View style={{backgroundColor: 'red'}}>
          <Swiper
            index={0}
            loop={true}
            renderPagination={renderPagination}
          >
            <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}>
              <Image style={styles.imgStyle} source={ImageStore.commonPic.defaultGood}/>
            </View>
            <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}>
              <Image style={styles.imgStyle} source={ImageStore.commonPic.defaultGood}/>
            </View>
            <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}>
              <Image style={styles.imgStyle} source={ImageStore.commonPic.defaultGood}/>
            </View>
          </Swiper>
        </View>

        <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3, backgroundColor: 'blue'}}>
          <Swiper
            style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}
            index={0}
            loop={true}
            renderPagination={renderPagination}
          >
            <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}>
              <Image style={styles.imgStyle} source={ImageStore.commonPic.defaultGood}/>
            </View>
            <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}>
              <Image style={styles.imgStyle} source={ImageStore.commonPic.defaultGood}/>
            </View>
            <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 3}}>
              <Image style={styles.imgStyle} source={ImageStore.commonPic.defaultGood}/>
            </View>
          </Swiper>
        </View>

      </ViewPagerAndroid>
    )
  }
}

const styles = StyleSheet.create({
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: '#666',
    fontSize: 20
  },
  imgStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
    backgroundColor: 'red'
  },
});


function select(state) {
  return {
    mineReducer: state.MineReducer
  }
}

export default connect(select)(Mine);