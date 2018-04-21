import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

class ListComponent extends Component {
  render() {
    const {leftText, rightText} = this.props;
    return (
      <View style={[commonStyle.between, commonStyle.paddingTb5]}>
        <Text style={styles.leftTextStyle}>{leftText}</Text>
        <Text style={styles.rightTextStyle}>{rightText}</Text>
      </View>
    )
  }
}

export default class OrderProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  userLeaveMsg(){

  }

  submitProduct(){

  }

  render() {
    return (
      <View style={styles.container}>

        <View style={commonStyle.intervalView}/>
        <View style={styles.coinAddressBox}>
          <View style={styles.leftBorder}/>
          <Text style={[commonStyle.paddingTb10, styles.addrText]}>收币地址</Text>
          <View style={styles.lineStyle}/>
          <Text style={[styles.editorAddr]}>fghjk7897889312hjkfda67</Text>
        </View>

        <View style={commonStyle.intervalView}/>
        <View style={styles.orderDetailsBox}>
          <Text style={[commonStyle.paddingTb10, styles.addrText]}>商品信息</Text>
          <View style={styles.lineStyle}/>
          <View style={styles.proImgName}>
            <Image style={styles.proImg} source={ImageStore.commonPic.defaultGood}/>
            <View>
              <Text style={styles.proName}>6号商品</Text>
              <Text style={[styles.proPrice, commonStyle.yellowColor]}>￥5000</Text>
            </View>
          </View>
          <ListComponent
            leftText={"每份算力"}
            rightText={"12.5 THs"}
          />
          <ListComponent
            leftText={"购买数量"}
            rightText={"2"}
          />
          <ListComponent
            leftText={"总算力"}
            rightText={"12.5 THs"}
          />
          <View style={[commonStyle.between, commonStyle.paddingTb5]}>
            <Text style={styles.totalPriceText}>总价</Text>
            <Text style={styles.totalPriceValue}>{IconStore.rmb} {"5000"}</Text>
          </View>
        </View>

        <View style={commonStyle.intervalView}/>
        <View style={styles.leaveMsgBox}>
          <Text style={[commonStyle.paddingTb10, styles.addrText]}>留言</Text>
          <View style={styles.lineStyle}/>
          <TextInput
            placeholder={"点击此处添加留言，最多50个字"}
            underlineColorAndroid="transparent"
            style={{height: 60, width: "100%"}}
            multiline={true}
            maxLength={50}
            onChangeText={(text) => this.userLeaveMsg(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.submitOrder}
          onPress={() => this.submitProduct()}
        >
          <Text style={styles.submitBtn}>提交订单</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  coinAddressBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  leftBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 5,
    height: "100%",
    backgroundColor: "red"
  },
  lineStyle: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd"
  },
  addrText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500"
  },
  editorAddr: {
    fontSize: 16,
    color: "#666",
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "center"
  },
  orderDetailsBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  proImg: {
    width: 60,
    height: 60,
    marginRight: 20
  },
  proImgName: {
    flexDirection: 'row',
    alignItems: "center"
  },
  proName: {
    fontSize: 14,
    color: "#333"
  },
  proPrice: {
    fontSize: 14
  },
  leftTextStyle: {
    fontSize: 12,
    color: "#4d4d4d"
  },
  rightTextStyle: {
    fontSize: 12,
    color: "#747474"
  },
  totalPriceText: {
    fontSize: 16,
    color: "#4d4d4d"
  },
  totalPriceValue: {
    fontSize: 16,
    color: "#F5A623"
  },
  leaveMsgBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  submitOrder: {
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: ColorStore.themeColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtn: {
    fontSize: 16,
    color: "#fff"
  }
});