import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ProgressBarAndroid
} from "react-native";
import Row from './Row';
import {diffExt, dayGains, formatDayHours, btcExRmb, pointsToYuan} from '../../utils/Config';

export default class NetWorkDiff extends Component {
  render() {
    let netWorkerData = this.props.netWorkerData; // 全网数据
    let cnyData = this.props.cnyData; // 汇率数据

    let cnyExt = cnyData.rate ? pointsToYuan(cnyData.rate) : 0;
    let current_diff = netWorkerData.difficulty ? diffExt(netWorkerData.difficulty.current) : ""; // 当前难度

    let percentage,
      cycle_time = 1209600, //周期2个星期
      progress_bar,
      remaining_time,
      nextIncomCny, //下一难度收益RMB
      nextIncomBtc;

    if (netWorkerData.difficulty && netWorkerData.blockSubsidy) {
      const diff_number = netWorkerData.difficulty;
      percentage = ((diff_number.estimateNext) - (diff_number.current)) / (diff_number.current) * 100;
      percentage = percentage > 0 ? " + " + percentage.toFixed(2) + "%" : " - " + (Math.abs(percentage)).toFixed(2) + "%";
      progress_bar = (cycle_time - (diff_number.estimateAdjustTimesAway)) / cycle_time;
      progress_bar = Number(progress_bar.toFixed(2));
      remaining_time = formatDayHours(diff_number.estimateAdjustTimesAway);
    }else{
      percentage = 0;
      progress_bar = 0;
      remaining_time = 0;
    }

    // 下一难度收益
    if (netWorkerData.blockSubsidy && (netWorkerData.difficulty && netWorkerData.difficulty.estimateNext)) {
      nextIncomBtc = dayGains(1000, netWorkerData.difficulty.estimateNext, netWorkerData.blockSubsidy);
      nextIncomCny = btcExRmb(nextIncomBtc, cnyExt);
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
