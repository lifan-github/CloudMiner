import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  WebView,
  ScrollView,
  StyleSheet,
  ViewPagerAndroid
} from 'react-native';
import Swiper from 'react-native-swiper';
import {speedChange, dayGains, powerKWh, ServiceFeePercent, pointsToYuan} from '../../utils/Config';

let left_html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Title</title></head><body style="background-color: #fff; overflow-y: visible;">`;
let right_html = `<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`;

const renderPagination = (index, total) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{color: 'grey'}}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
};

/**
 * SwiperImage 组件动态setState不起作用，
 * 必须判断有数据存在时，才能渲染该组件，
 * 否则该组件渲染图片不稳定
 */
class SwiperImage extends Component {
  render() {
    const {imgArr} = this.props;
    console.log(imgArr, 'imgArr---->>>>>');
    return (
      <Swiper
        style={{flex: 1}}
        index={0}
        loop={true}
        renderPagination={renderPagination}>
        {
          imgArr.length > 0 && imgArr.map((item, index) => {
            return (
              <View style={{flex: 1}} key={index}>
                <Image style={styles.swiperImage} source={{uri: item.url}}/>
              </View>
            )
          })
        }
      </Swiper>
    )
  }
}

export default class ToDetailVia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSelected: 0
    }
  }

  componentDidMount() {
    const productId = this.props.productId;
    console.log(productId, 'productId12345')
    // Action.getProductId(productId);
  }

  bindOnPageSelected(e) {
    let index = e.nativeEvent.position;
    this.setState({
      pageSelected: index
    })
  }

  render() {
    return (
      <View style={commonStyle.pageColor}>
        <ViewPagerAndroid
          style={{flex: 1}}
          initialPage={0}
          peekEnabled={true}
          onPageSelected={(e) => this.bindOnPageSelected(e)}
          ref={viewPager => {
            this.viewPager = viewPager
          }}
        >
          <View style={styles.productsContainer}>
            <ScrollView>
              <View style={[commonStyle.viewBorderBottom, styles.swiperContent]}>
                {/*{productImgs.length !== 0 && <SwiperImage imgArr={productImgs}/>}*/}
              </View>
              <View style={[styles.productDetailContainer]}>

              </View>
            </ScrollView>
          </View>
          <View style={styles.detailsContainer}>

          </View>
        </ViewPagerAndroid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  productDetailContainer: {
    width: SCREEN_WIDTH,
    paddingTop: 10
  },
  bottomView: {
    height: 46,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  },
  productsContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  detailsContainer: {},
  noProductDetails: {
    width: 100,
    height: 100
  },
  //swiper
  swiperContent: {
    width: SCREEN_WIDTH,
    height: 240
  },
  swiperImage: {
    width: SCREEN_WIDTH,
    height: 238,
    resizeMode: 'contain'
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: '#666',
    fontSize: 20
  }
});
