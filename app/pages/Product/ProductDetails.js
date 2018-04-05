import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';
import TextIconComponent from './TextIconComponent';
import {pointsToYuan, dayGains, speedChange, powerKWh, ServiceFeePercent} from '../../utils/Config';

export default class ProductDetails extends Component {
  render() {
    const {data, netWorker} = this.props;
    console.log(data, 'dadadadaadada----->>>>>', netWorker);
    let productName, productPrice, minQtyOfSale, dayEarnings, blockDiff, blockSubsidy, goodsSpeed, powerWatts,
      serviceFee;

    blockDiff = netWorker.difficulty.current;
    blockSubsidy = netWorker.blockSubsidy;
    //服务费
    serviceFee = data.serviceFeePercent > 0 ? ServiceFeePercent(data.serviceFeePercent) + "%" : 0;
    // 商品名称
    productName = data.name;
    // 单价...换算
    if (data.salesMethod === "byEquipment") {
      productPrice = pointsToYuan(data.price) + " /台";
      minQtyOfSale = data.minQtyOfSale > 0 ? data.minQtyOfSale + "台起售" : "";
      //每天预计收益
      dayEarnings = dayGains(data.equipment.hashRate, blockDiff, blockSubsidy);
      dayEarnings = (dayEarnings * (1 - data.serviceFeePercent / 1000)).toFixed(8) + " BTC";
      //每台算力
      goodsSpeed = speedChange(data.equipment.hashRate);
      //功耗
      powerWatts = powerKWh(data.equipment.powerWatts) + " kW";
    } else {
      productPrice = pointsToYuan(data.price) + " /份";
      minQtyOfSale = data.minQtyOfSale > 0 ? data.minQtyOfSale + "份起售" : "";
      //每天预计收益
      dayEarnings = dayGains(data.salesUnit, blockDiff, blockSubsidy);
      dayEarnings = (dayEarnings * (1 - data.serviceFeePercent / 1000)).toFixed(8) + " BTC";
      //每台算力
      goodsSpeed = speedChange(data.salesUnit);
      //功耗
      powerWatts = null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.swiperBox}>
          <Image style={styles.imgStyle} source={ImageStore.commonPic.defaultGood}/>
        </View>
        <View style={styles.productsInfo}>
          <View style={[commonStyle.viewBorderBottom, styles.namePrice]}>
            <Text style={styles.proName}>{productName}</Text>
            <View style={[commonStyle.between, commonStyle.paddingTb10]}>
              <Text style={styles.proPrice}>{IconStore.rmb}{productPrice}</Text>
              <View style={[styles.saleNum, commonStyle.center]}>
                <Text style={styles.saleNumText}>{minQtyOfSale}</Text>
              </View>
            </View>
          </View>
          <TextIconComponent
            petIcon={IconStore.benifits}
            petText={"预计每日收益"}
            petValue={dayEarnings}
          />
          <TextIconComponent
            petIcon={IconStore.pow}
            petText={"每台算力"}
            petValue={goodsSpeed}
          />
          {!!powerWatts &&
          <TextIconComponent
            petIcon={IconStore.power}
            petText={"功耗"}
            petValue={powerWatts}
          />
          }
          <TextIconComponent
            petIcon={IconStore.management}
            petText={"管理费"}
            petValue={serviceFee}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swiperBox: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd"
  },
  imgStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3,
  },
  productsInfo: {
    paddingHorizontal: 20
  },
  saleNum: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  saleNumText: {
    color: "#999",
    fontSize: 14
  },
  namePrice: {
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 15
  },
  proName: {
    fontSize: 18,
    color: "#333"
  },
  proPrice: {
    fontSize: 16,
    color: "#F5A623"
  }
});