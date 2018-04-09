import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {pointsToYuan, btcExRmb, absFloorNumber, satoBtc} from '../../utils/Config';

export default class UserIncome extends Component {
  render() {
    const {rateCnyData, miningSpeedData} = this.props;
    let currRmb, totalRevCny, totalRevenue, unSettleCny, unSettle;
    if(rateCnyData.rate){
      currRmb = pointsToYuan(rateCnyData.rate);
    }else{
      currRmb = "N/A";
    }
    // 总收益
    if(miningSpeedData.revenues && miningSpeedData.revenues.total){
      totalRevenue = satoBtc(absFloorNumber(miningSpeedData.revenues.total));
      totalRevCny = btcExRmb(satoBtc(absFloorNumber(miningSpeedData.revenues.total)), currRmb);
    }else{
      totalRevenue = 0;
      totalRevCny = 0
    }
    //余额
    if(miningSpeedData.revenues && miningSpeedData.revenues.unSettle){
      unSettle = satoBtc(absFloorNumber(miningSpeedData.revenues.unSettle));
      unSettleCny = btcExRmb(satoBtc(absFloorNumber(miningSpeedData.revenues.unSettle)), currRmb);
    }else{
      unSettle = 0;
      unSettleCny = 0
    }
    return (
      <View style={styles.container}>
        <View style={styles.feeBox}>
          <Text style={styles.color999Size12}>当前汇率</Text>
          <Text style={styles.rateCurr}>{IconStore.rmb}{currRmb}</Text>
        </View>
        <View style={styles.incomeContainer}>
          <Text style={[styles.color333Size14, styles.fontWeight500]}>收益统计</Text>
        </View>
        <View style={styles.cardBox}>
          <Text style={styles.color333Size14}>总收益</Text>
          <View style={styles.rightCard}>
            <Text style={styles.color333Size14}>{IconStore.rmb}{totalRevCny}</Text>
            <Text style={styles.color999Size12}>{IconStore.btc}{totalRevenue}</Text>
          </View>
        </View>
        <View style={styles.midLine}/>
        <View style={styles.cardBox}>
          <Text style={styles.color333Size14}>余额</Text>
          <View style={styles.rightCard}>
            <Text style={styles.color333Size14}>{IconStore.rmb}{unSettleCny}</Text>
            <Text style={styles.color999Size12}>{IconStore.rmb}{unSettle}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  feeBox: {
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  color999Size12: {
    fontSize: 12,
    color: "#999"
  },
  color333Size14: {
    fontSize: 14,
    color: "#333"
  },
  rightCard: {
    height: 45,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  rateCurr: {
    marginTop: 10,
    fontSize: 14,
    color: "#333"
  },
  incomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: ColorStore.themeColor,
    paddingLeft: 12
  },
  fontWeight500: {
    fontWeight: "500"
  },
  cardBox: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  midLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5
  },
});