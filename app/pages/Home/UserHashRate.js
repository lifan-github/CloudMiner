import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {speedChange} from '../../utils/Config';

export default class UserHashRate extends Component {
  render() {
    const {data} = this.props;
    let workingHashrate, stoppedHashrate, HashrateStyle;
    // 当前算力
    if (data.workers && data.workers.workingHashrate) {
      workingHashrate = speedChange(data.workers.workingHashrate);
    } else {
      workingHashrate = "N/A";
    }
    // 不同的样式
    if (data.workers && data.workers.stoppedHashrate === 0) {
      stoppedHashrate = speedChange(data.workers.stoppedHashrate);
      HashrateStyle = 24;
    } else {
      stoppedHashrate = 0;
      HashrateStyle = 16;
    }
    return (
      <View style={styles.speedBox}>
        <View style={styles.hashrateBox}>
          <Text style={[styles.speedText, {fontSize: HashrateStyle}]}>{workingHashrate}</Text>
          <Text style={styles.tipsText}>当前算力</Text>
        </View>
        {
          stoppedHashrate !== 0 ?
            <View style={styles.hashrateBox}>
              <Text style={styles.speedText}>{stoppedHashrate}</Text>
              <Text style={styles.tipsText}>离线算力</Text>
            </View>
            :
            null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  speedBox: {
    height: 60,
    flexDirection: "row",
  },
  hashrateBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tipsText: {
    fontSize: 12,
    color: "#999"
  },
  speedText: {
    fontSize: 16,
    color: "#333"
  }
});