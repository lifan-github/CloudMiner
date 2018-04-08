import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {satoBtc, absFloorNumber, dayGains, btcVsRmb, btcExRmb, pointsToYuan} from '../../utils/Config';

export default class AnimNum extends Component {
  render() {
    const {rateCnyData, miningSpeedData, netWorkerData} = this.props;
    console.log(rateCnyData, 'rateCnyData', miningSpeedData);
    let todayBtc, oneTEarnings, todayCny = {};
    // 每天收益btc
    if (miningSpeedData && miningSpeedData.revenues && miningSpeedData.revenues.today) {
      todayBtc = absFloorNumber(miningSpeedData.revenues.today);
      todayBtc = satoBtc(todayBtc);
      todayCny = rateCnyData.rate ? btcVsRmb(todayBtc, pointsToYuan(rateCnyData.rate)) : 0;
    } else {
      todayBtc = 0;
      todayCny.dotLeft = 0;
      todayCny.dotRight = .00;
    }
    // 预计每天每T收益
    if (netWorkerData.blockSubsidy && (netWorkerData.difficulty && netWorkerData.difficulty.current)) {
      oneTEarnings = dayGains(1000, netWorkerData.difficulty.current, netWorkerData.blockSubsidy); // 1000GH/s代表1T
      oneTEarnings = rateCnyData.rate ? btcExRmb(oneTEarnings, pointsToYuan(rateCnyData.rate)) : 0;
    } else {
      oneTEarnings = 0;
    }

    return (
      <View style={styles.indexBanner}>
        <Text style={styles.headerTitle}>今日收益</Text>
        <View style={styles.todayEarnings}>
          <View style={styles.todayIncome}>
            <Text style={styles.rmbIcon}>{IconStore.rmb}</Text>
            <Text style={styles.comStyleOne}>{todayCny.dotLeft}</Text>
            {
              todayCny.dotLeft !==0 &&
                <Text style={[styles.comStyleTwo, styles.decimal]}>{todayCny.dotRight}</Text>
            }
          </View>
          <Text style={styles.comStyleTwo}>{IconStore.btc}{todayBtc}</Text>
        </View>
        <Text style={styles.comStyleTwo}>
          <Text>预计每T收益{" "}</Text>
          <Text style={styles.todayT}>{IconStore.rmb}</Text>
          {oneTEarnings}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  indexBanner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    color: "#fff"
  },
  todayEarnings: {
    alignItems: 'center'
  },
  todayIncome: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  rmbIcon: {
    marginTop: 24 / 3,
    marginRight: 5,
    fontSize: 12,
    color: "#fff"
  },
  comStyleOne: {
    fontSize: 24,
    color: "#fff"
  },
  comStyleTwo: {
    fontSize: 14,
    color: "#fff"
  },
  todayT: {
    fontSize: 12,
    color: "#fff"
  },
  decimal: {
    marginTop: 24 / 2,
  },
  btcIcon: {
    marginRight: 10
  }
});
