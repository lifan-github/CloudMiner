import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ProgressBarAndroid
} from "react-native";
import Row from './Row';
import {diffExt, dayGains, formatDayHours, btcExRmb} from '../../utils/Config';

export default class NetWorkDiff extends Component {
  render() {
    let netWorkerData = this.props.data;
    let current_diff = netWorkerData.difficulty ? diffExt(netWorkerData.difficulty.current) : ""; // 当前难度

    let hashSpeed = this.props.hashSpeed; // hash算力(GHash/s--->>转换PT/s)
    let percentage,
      cycle_time = 1209600, //周期2个星期
      progress_bar,
      remaining_time,
      blockSubsidy, // 区块值
      nextIncomCny, //下一难度收益RMB
      nextIncomBtc,
      estimateNext; // 下次难度

    if (netWorkerData.difficulty && netWorkerData.blockSubsidy) {
      const diff_number = netWorkerData.difficulty;
      percentage = ((diff_number.estimateNext) - (diff_number.current)) / (diff_number.current) * 100;
      percentage = percentage > 0 ? " + " + percentage.toFixed(2) + "%" : " - " + (Math.abs(percentage)).toFixed(2) + "%";
      progress_bar = (cycle_time - (diff_number.estimateAdjustTimesAway)) / cycle_time;
      progress_bar = Number(progress_bar.toFixed(2));
      remaining_time = formatDayHours(diff_number.estimateAdjustTimesAway);
      estimateNext = diff_number.estimateNext;
      blockSubsidy = netWorkerData.blockSubsidy;
    }else{
      percentage = 0;
      progress_bar = 0;
      remaining_time = 0;
      estimateNext = 0;
      blockSubsidy = 0;
    }

    if (hashSpeed.workingHashrate) {
      nextIncomBtc = dayGains(1000, estimateNext, blockSubsidy);
      nextIncomCny = btcExRmb(nextIncomBtc, this.props.cnyData);
    }else{
      nextIncomBtc = 0;
      nextIncomCny = 0;
    }


    return (
      <View style={styles.content}>
        <Row
          titleRow
          leftTxt="全网难度"
          rightTxt={current_diff}
          rowStyle={{paddingBottom: 10}}
          txtStyle={styles.headerText}
        />
        <View style={styles.paddingH16}>
          <View style={commonStyle.between}>
            <View style={[styles.comStyle]}>
              <Text style={styles.leftLabelText}>距离下次调整约</Text>
              <Text style={styles.font14Color333}>{remaining_time}</Text>
            </View>
            <View style={[styles.comStyle]}>
              <Text style={styles.leftLabelText}>难度变化</Text>
              <Text style={styles.font14Color333}>{percentage}</Text>
            </View>
          </View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            color={ColorStore.startColor}
            progress={progress_bar}
            style={styles.progressBar}
          />
          <View style={[commonStyle.between, styles.comStyle]}>
            <Text style={styles.font14Color333}>下一难度预计每T收益</Text>
            <View style={styles.nextIncome}>
              <Text style={styles.font14Color333}>{IconStore.rmb}{nextIncomCny}</Text>
              <Text style={styles.nextIncomeStyle}>{IconStore.btc}{nextIncomBtc}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 30,
  },
  paddingH16: {
    paddingHorizontal: 16,
  },
  progressBar: {
    height: 20
  },
  leftLabelText: {
    fontSize: 12,
    color: "#999",
    marginRight: 10
  },
  nextIncome: {
    alignItems: 'flex-end'
  },
  headerText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500"
  },
  font14Color333: {
    fontSize: 14,
    color: "#333",
  },
  nextIncomeStyle: {
    fontSize: 12,
    color: "#999",
  },
  comStyle: {
    flexDirection: "row",
    alignItems: "center"
  }
});
