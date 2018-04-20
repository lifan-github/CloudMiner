import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {pointsToYuan, speedChange} from '../../utils/Config';

export default class OrderModal extends Component {
  render() {
    const {data, bingAdd, bindReduce, bindBuyNow} = this.props;

    console.log(data,'单个商品数据------->>>>>>>>>>>>');

    let minQtyOfSale, productPrice, qtyInStockNum, totalPrice, hasBuySpeed, orderNum;
    totalPrice = pointsToYuan(data.price) * data.orderNum;
    hasBuySpeed = speedChange(data.hasBuySpeed);
    orderNum = data.orderNum;
    if (data.salesMethod && data.salesMethod === "byEquipment") {
      minQtyOfSale = "最低" + data.minQtyOfSale + "台起售";
      productPrice = pointsToYuan(data.price) + " /台";
      qtyInStockNum = "剩余" + data.inventory + "台";
    } else {
      minQtyOfSale = "最低" + data.minQtyOfSale + "份起售";
      productPrice = pointsToYuan(data.price) + " /份";
      qtyInStockNum = "剩余" + data.inventory + "份";
    }
    return (
      <View style={styles.animateModal}>
        <View style={[styles.modalTitle, commonStyle.between]}>
          <Text style={styles.priceText}>{IconStore.rmb}{productPrice}</Text>
          <Text style={styles.qtyNum}>{qtyInStockNum}</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.minQtyOfSale}>{minQtyOfSale}</Text>
        </View>
        <View style={[styles.modalOrderNum, commonStyle.between]}>
          <View style={commonStyle.row}>
            <Text style={styles.currSpeedStyle}>当前购买算力</Text>
            <Text style={styles.currSpeed}>{hasBuySpeed}</Text>
          </View>
          <View style={styles.OrderNum}>
            <View style={styles.numBox}>
              <TouchableOpacity
                onPress={bindReduce}
              >
                <Text style={styles.addReduceBtn}>{IconStore.minus}</Text>
              </TouchableOpacity>
              <Text style={styles.orderNumber}>{orderNum}</Text>
              <TouchableOpacity
                onPress={bingAdd}
              >
                <Text style={styles.addReduceBtn}>{IconStore.add}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[commonStyle.viewBorderTop, styles.orderPayment]}>
          <Text style={styles.totalPrice}>总价</Text>
          <Text style={styles.paymentTotal}>{IconStore.rmb}{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.submitOrder}
          onPress={bindBuyNow}
          activeOpacity={0.6}
        >
          <Text style={styles.buyNowStyles}>立即购买</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  animateModal: {
    width: SCREEN_WIDTH,
    height: 250,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    elevation: 4
  },
  modalTitle: {
    paddingTop: 20,
    marginHorizontal: 20
  },
  priceText: {
    fontSize: 16,
    color: "#F5A623"
  },
  qtyNum: {
    fontSize: 14,
    color: "#333"
  },
  minQtyOfSale: {
    fontSize: 12,
    color: "#999"
  },
  modalOrderNum: {
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 20
  },
  currSpeed: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333"
  },
  currSpeedStyle: {
    fontSize: 14,
    color: "#333"
  },
  OrderNum: {
    backgroundColor: "#fff"
  },
  numBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d2d2d2",
    borderRadius: 20,
    alignItems: 'center'
  },
  orderNumber: {
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ececec",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },
  addReduceBtn: {
    paddingHorizontal: 10,
    fontFamily: 'cloud',
    fontSize: 18,
    color: "#666"
  },
  orderPayment: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-end',
    marginTop: 20,
    marginHorizontal: 20
  },
  paymentTotal: {
    marginLeft: 15,
    fontSize: 16,
    color: "#F5A623"
  },
  totalPrice: {
    fontSize: 14,
    color: "#333"
  },
  submitOrder: {
    height: 50,
    backgroundColor: ColorStore.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 500
  },
  buyNowStyles: {
    fontSize: 16,
    color: "#fff"
  }
});