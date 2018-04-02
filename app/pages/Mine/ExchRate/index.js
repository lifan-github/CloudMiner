import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl
} from 'react-native';
import {connect} from "react-redux";
import ListComponent from '../../../components/ListComponent';
import {pointsToYuan, speedChange, diffFun, diffExt} from '../../../utils/Config';
import {getExchangeRate, getNetWorker} from "../../../redux/actions/HomeActions";

class ExchRate extends Component {
  onPullRefresh(){
    this.props.dispatch(getExchangeRate({code: "CNY"}));
    this.props.dispatch(getNetWorker());
  }

  render() {
    const {rateCny, netWorker, rateRefreshing} = this.props.homeRuducers;
    let cny = rateCny.rate ? "1BTC / " + pointsToYuan(rateCny.rate) + " CNY" : "N/A";
    let difficult, networkHashPs;
    // 全网算力
    networkHashPs = netWorker && netWorker.networkHashPs ? speedChange(netWorker.networkHashPs) : "N/A";
    // 当前难度
    if(netWorker.difficulty && netWorker.difficulty.current){
      difficult = diffFun(netWorker.difficulty.current) + " - " + diffExt(netWorker.difficulty.current)
    }else{
      difficult = "N/A"
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={rateRefreshing}
            onRefresh={() => this.onPullRefresh()}
            colors={['#fff']}
            progressBackgroundColor={"#b9b9b9"}
          />
        }
      >
        <View style={commonStyle.intervalView20}/>
        <View style={styles.rowListContainer}>
          <ListComponent
            borderBottom={true}
            rightArrowIcon={false}
            leftText="当前价格"
            rightText={cny}
          />
          <ListComponent
            borderBottom={true}
            rightArrowIcon={false}
            leftText="全网难度"
            rightText={difficult}
          />
          <ListComponent
            borderBottom={false}
            rightArrowIcon={false}
            leftText="全网算力"
            rightText={networkHashPs}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rowListContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
});

function select(state) {
  return {
    homeRuducers: state.HomeReducer
  }
}

export default connect(select)(ExchRate);