import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  StyleSheet,
  ViewPagerAndroid,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {connect} from "react-redux";
import ModalBox from 'react-native-modalbox';
import ProductDetails from './ProductDetails';
import ProductTextDetails from './ProductTextDetails';
import OrderModal from './OrderModal';
import {getProductById, slectedNavBar, singleProduct, showShareModal} from '../../redux/actions/ProductActions';
import store from "../../redux/store";

/**
 * renderTitle 渲染不同状态的renderTitle
 * @returns {*}
 */
const renderTitle = () => {
  return (
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
  return (
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
  constructor(props) {
    super(props);
    this.state = {
      orderModalBox: false
    }
  }

  componentDidMount() {
    const productId = this.props.productId;
    store.dispatch(getProductById({Id: productId}));
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
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
    store.dispatch(slectedNavBar(0));
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    const {orderModalBox} = this.state;
    //在当前页面下监听
    if (orderModalBox) {
      this.setState({
        orderModalBox: false
      });
      return true;
    }
  };

  bindOnPageSelected(e) {
    let index = e.nativeEvent.position;
    if (index === 0) {
      store.dispatch(slectedNavBar(0));
    } else {
      store.dispatch(slectedNavBar(1));
    }
  }

  //下单按钮
  orderButton(status) {
    if (status !== "outOfStock") {
      this.setState({
        orderModalBox: true
      });
    }
  }

  //点击透明背景关闭状态
  onClosed() {
    this.setState({
      orderModalBox: false
    });
  }

  //关闭分享商品modal
  onClosedShare(){
    store.dispatch(showShareModal(false))
  }

  //增加订单
  addAmount() {
    const {singleProductData} = this.props.productReducer;

    if (singleProductData.inventory > 0) {
      singleProductData.inventory--;
      singleProductData.orderNum++;
      singleProductData.hasBuySpeed = singleProductData.salesMethod === "byEquipment" ?
                    singleProductData.orderNum * singleProductData.equipment.hashRate :
                    singleProductData.orderNum * singleProductData.salesUnit;
      store.dispatch(singleProduct(singleProductData));
      console.log(singleProductData, '单个商品数据+++++++++')
    } else {
      ToastAndroid.showWithGravity('库存不够啦', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  }

  //减少订单
  reduceAmount() {
    const {singleProductData} = this.props.productReducer;

    if (singleProductData.orderNum > singleProductData.minQtyOfSale) {
      singleProductData.orderNum--;
      singleProductData.inventory++;
      singleProductData.hasBuySpeed = singleProductData.salesMethod === "byEquipment" ?
        singleProductData.orderNum * singleProductData.equipment.hashRate :
        singleProductData.orderNum * singleProductData.salesUnit;
      store.dispatch(singleProduct(singleProductData));
    } else {
      ToastAndroid.showWithGravity('不能小于最低起售量', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  }

  //立即购买按钮
  buyNow() {
    this.setState({
      orderModalBox: false
    });
  }

  render() {
    const {singleProductData, shareModal} = this.props.productReducer;
    const {netWorker} = this.props.homeReducer;
    let orderButtonBg = singleProductData.status === "outOfStock" ? "#FFF0E9" : ColorStore.themeColor;
    let orderButtonTextColor = singleProductData.status === "outOfStock" ? "#EAA794" : "#fff";
    let orderButtonText = singleProductData.status === "outOfStock" ? "已售罄" : "去下单";
    console.log('fffff----->>>>>>>>');
    return (
      <View style={commonStyle.pageColor}>
        <ViewPagerAndroid
          style={{flex: 1}}
          initialPage={0}
          peekEnabled={true}
          ref={viewPager => {
            this.viewPager = viewPager
          }}
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

        <ModalBox
          style={styles.orderModal}
          position={"bottom"}
          ref={"orderModal"}
          isOpen={this.state.orderModalBox}
          onClosed={() => this.onClosed()}
          coverScreen={true}
        >
          <OrderModal
            data={singleProductData}
            bingAdd={() => this.addAmount()}
            bindReduce={() => this.reduceAmount()}
            bindBuyNow={() => this.buyNow()}
          />
        </ModalBox>

        <ModalBox
          style={styles.shareModal}
          position={"bottom"}
          ref={"shareModal"}
          isOpen={shareModal}
          onClosed={() => this.onClosedShare()}
          coverScreen={true}
        >
          <View style={styles.shareWay}>
            <TouchableOpacity
              style={styles.shareImgBox}
              onPress={() => alert("分享至微信好友")}
            >
              <Image style={styles.shareImg} source={ImageStore.commonPic.wechat}/>
            </TouchableOpacity>
            <Text>微信好友</Text>
          </View>
          <View style={styles.shareWay}>
            <TouchableOpacity
              style={styles.shareImgBox}
              onPress={() => alert("分享至朋友圈")}
            >
              <Image style={styles.shareImg} source={ImageStore.commonPic.moment}/>
            </TouchableOpacity>
            <Text>微信好友</Text>
          </View>

        </ModalBox>
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
  },
  orderModal: {
    height: 250,
    flexDirection: "row",
    alignItems: 'center',
  },
  shareModal: {
    height: 150,
    flexDirection: "row",
    alignItems: 'center',
  },
  shareWay: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center"
  },
  shareImgBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 5
  },
  shareImg: {
    width: 40,
    height: 40
  },
});

function select(state) {
  return {
    productReducer: state.ProductReducer,
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(SingleProduct);