import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  TouchableOpacity,
} from 'react-native';
import {connect} from "react-redux";
import ProductDetails from './ProductDetails';
import ProductTextDetails from './ProductTextDetails';
import {getProductById, slectedNavBar} from '../../redux/actions/ProductActions';
import store from "../../redux/store";

/**
 * renderTitle 渲染不同状态的renderTitle
 * @returns {*}
 */
const renderTitle = () => {
  return(
    <View style={styles.productNavBar}>
      <TouchableOpacity
        style={[styles.leftNav, styles.slecteBorder]}
        onPress={() => store.dispatch(slectedNavBar(0))}
      >
        <Text style={[styles.navBarText]}>商品</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.leftNav]}
        onPress={() => store.dispatch(slectedNavBar(1))}
      >
        <Text style={[styles.navBarText]}>详情</Text>
      </TouchableOpacity>
    </View>
  )
};

const renderTitle1 = () => {
  return(
    <View style={styles.productNavBar}>
      <TouchableOpacity
        style={[styles.leftNav]}
        onPress={() => store.dispatch(slectedNavBar(0))}
      >
        <Text style={[styles.navBarText]}>商品</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.leftNav, styles.slecteBorder]}
        onPress={() => store.dispatch(slectedNavBar(1))}
      >
        <Text style={[styles.navBarText]}>详情</Text>
      </TouchableOpacity>
    </View>
  )
};

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.productId;
    store.dispatch(getProductById({Id: productId}));
  }

  componentWillReceiveProps(nextProps) {
    const navBarSlected = nextProps.productReducer.navBarSlected;
    if (navBarSlected === 0) {
      this.viewPager.setPage(0);
      Actions.refresh({renderTitle: renderTitle});
    } else {
      this.viewPager.setPage(1);
      Actions.refresh({renderTitle: renderTitle1});
    }
  }

  componentWillUnmount() {
    // 恢复store中的初始值
    store.dispatch(slectedNavBar(0))
  }

  bindOnPageSelected(e) {
    let index = e.nativeEvent.position;
    if(index === 0){
      store.dispatch(slectedNavBar(0));
    }else{
      store.dispatch(slectedNavBar(1));
    }
  }

  //下单按钮
  orderButton() {

  }

  render() {
    const {singleProductData, navBarSlected} = this.props.productReducer;
    const {netWorker} = this.props.homeReducer;
    console.log(navBarSlected,'navBarSlected------->>>>>>>');

    let orderButtonBg = singleProductData.status === "outOfStock" ? "#FFF0E9" : ColorStore.themeColor;
    let orderButtonTextColor = singleProductData.status === "outOfStock" ? "#EAA794" : "#fff";
    let orderButtonText = singleProductData.status === "outOfStock" ? "已售罄" : "去下单";
    console.log(singleProductData, 'singleProductData-----------');
    return (
      <View style={commonStyle.pageColor}>
        <ViewPagerAndroid
          style={{flex: 1}}
          initialPage={0}
          peekEnabled={true}
          ref={viewPager => {this.viewPager = viewPager}}
          onPageSelected={(e) => this.bindOnPageSelected(e)}
        >
          <View style={styles.productsContainer}>
            <ProductDetails
              data={singleProductData}
              netWorker={netWorker}
            />
          </View>
          <View style={styles.detailsContainer}>
            <ProductTextDetails
              data={singleProductData}
            />
          </View>
        </ViewPagerAndroid>

        <View style={[styles.bottomFooter, commonStyle.viewBorderTop, commonStyle.between]}>
          <TouchableOpacity
            style={[commonStyle.center, styles.footBox]}
            onPress={() => Actions.proToPayment()}
          >
            <Text style={[styles.footText, styles.color333]}>{IconStore.payment} 购买方式</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[commonStyle.center, styles.footBox, {backgroundColor: orderButtonBg}]}
            onPress={() => this.orderButton(singleProductData.status)}
          >
            <Text style={[styles.footText, {color: orderButtonTextColor}]}>{orderButtonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  productDetailContainer: {
    width: SCREEN_WIDTH,
    paddingTop: 10
  },
  productsContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bottomFooter: {
    height: 50,
    backgroundColor: "#fff",
  },
  footBox: {
    flex: 1,
    height: "100%"
  },
  footText: {
    fontSize: 16
  },
  color333: {
    color: "#333"
  },
  //定制的导航
  productNavBar: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: SCREEN_WIDTH / 5,
    paddingRight: SCREEN_WIDTH / 5
  },
  leftNav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slecteBorder: {
    borderBottomWidth: 2,
    borderColor: ColorStore.themeColor
  },
  navBarText: {
    fontSize: 18
  }
});

function select(state) {
  return {
    productReducer: state.ProductReducer,
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(SingleProduct);