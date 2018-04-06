import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {satoBtc, absFloorNumber, btcVsRmb, btcExRmb} from '../../utils/Config';

export default class AnimNum extends Component {
  render() {
    const {rateCnyData, miningSpeedData} = this.props;
    console.log(rateCnyData,'rateCnyData', miningSpeedData);

    /*let revenues = this.props.data;
    let cny = this.props.cnyData;
    let oneTEarnings = this.props.oneTEarnings;
    let today = revenues.today;
    let todayCny = {};
    let expectToday = btcExRmb(oneTEarnings, cny);

    if (today) {
      today = absFloorNumber(revenues.today);
      today = satoBtc(today);
      todayCny = btcVsRmb(today, cny);
    } else {
      today = 0;
      todayCny.dotLeft = 0;
      todayCny.dotRight = .00;
    }*/
    return (
      <View style={styles.indexBanner}>
        <Text style={styles.headerTitle}>今日收益</Text>
        <View style={styles.todayEarnings}>
          <View style={styles.todayIncome}>
            <Text style={styles.rmbIcon}>{IconStore.rmb}</Text>
            <Text style={styles.comStyleOne}>{2222}</Text>
            <Text style={[styles.comStyleTwo, styles.decimal]}>{".9"}</Text>
          </View>
          <Text style={styles.comStyleTwo}>{IconStore.btc}{0.12345678}</Text>
        </View>
        <Text style={styles.comStyleTwo}>
          <Text>预计每T收益 {" "}</Text>
          <Text style={styles.todayT}>{IconStore.rmb}</Text>
          {4.23}
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
