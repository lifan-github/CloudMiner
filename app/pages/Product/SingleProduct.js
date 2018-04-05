import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  TouchableOpacity
} from 'react-native';
import ProductDetails from './ProductDetails';
import ProductTextDetails from './ProductTextDetails';
import {getProductById, slectedNavBar} from '../../redux/actions/ProductActions';
import {connect} from "react-redux";
import ColorStore from "../../color";
import {getMyInfomation} from "../../redux/actions/MineActions";

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.productId;
    this.props.dispatch(getProductById({Id: productId}));
    this.props.dispatch(getMyInfomation()); // 购买方式获取
  }

  componentWillReceiveProps(nextProps) {
    const navBarSlected = nextProps.productReducer.navBarSlected;
    if (navBarSlected === 0) {
      this.viewPager.setPage(0);
    } else {
      this.viewPager.setPage(1);
    }
  }

  componentWillUnmount() {
    // 恢复store中的初始值
    this.props.dispatch(slectedNavBar(0))
  }

  //下单按钮
  orderButton(status) {
    console.log(status, 'status---->>>>>')
  }

  render() {
    const {singleProductData} = this.props.productReducer;
    const {netWorker} = this.props.homeReducer;
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
          ref={viewPager => {
            this.viewPager = viewPager
          }}
        >
          <View style={styles.productsContainer}>
            <ProductDetails data={singleProductData} netWorker={netWorker}/>
          </View>
          <View style={styles.detailsContainer}>
            <ProductTextDetails data={singleProductData}/>
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
  }
});

function select(state) {
  return {
    productReducer: state.ProductReducer,
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(SingleProduct);