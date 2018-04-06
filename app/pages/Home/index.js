import React, {Component} from 'react';
import {
  Text,
  View,
  NetInfo,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import AnimNum from './AnimNum';
import Wave from './Wave';
import {getExchangeRate, getNotice, getMiningSpeed, getNetWorker} from '../../redux/actions/HomeActions';


class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getExchangeRate({code: "CNY"}));
    this.props.dispatch(getNetWorker());
    this.props.dispatch(getNotice({status: ["published"]}));
    this.props.dispatch(getMiningSpeed({categories: ["hashes", "revenues", "workers"]}));
  }

  render() {
    const {rateCny, miningSpeed} = this.props.homeReducer;
    console.log(this.props.homeReducer,'this.props.homeReducer');
    return (
      <View style={styles.container}>
        <LinearGradient
          style={[styles.topTodayIncome, commonStyle.center]}
          colors={[ColorStore.startColor, ColorStore.endColor]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
        >
          <View style={styles.absoluteView}>
            <AnimNum rateCnyData={rateCny} miningSpeedData={miningSpeed}/>
          </View>
          <View style={styles.waterAnimate}>
            <Wave/>
          </View>
        </LinearGradient>

        {/*<ScrollView
          style={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onPullRefresh()}
              colors={['#fff']}
              progressBackgroundColor={"#B9B9B9"}
            />
          }
        >
          <View style={[common.paddingTopBottom10]}>
            {this.speedCard(currHashes)}
          </View>
          <TouchableOpacity
            style={styles.noticeBox}
            activeOpacity={0.6}
            onPress={() => Actions.theNoticeHome()}
          >
            <Text style={styles.noticeIcon}>{theIco.gi('icon-announcement')}</Text>
            <Text style={[common.font14, common.fontColor333]}>{noticeShow}</Text>
          </TouchableOpacity>

          <View style={styles.feeBox}>
            <Text style={[common.font12, common.fontColor999]}>当前汇率</Text>
            <Text style={[common.font14, common.fontColor333, styles.rateCurr]}>
              <Text>{theIco.gi('icon-RMB')}</Text>{currRmb}
            </Text>
          </View>
          <View style={[styles.incomeContainer]}>
            <Text style={[common.fontColor333, common.font14, common.fontWeight]}>收益统计</Text>
          </View>

          <View style={[common.paddingLR16, styles.cardBox]}>
            <Text style={[common.font14, common.fontColor333]}>总收益</Text>
            <View style={styles.rightCard}>
              <Text style={[common.fontColor333, common.font14]}>
                <Text style={[common.fontColor333, common.font12]}>{theIco.gi('icon-RMB')}</Text>{totalRevCny}
              </Text>
              <Text style={[common.fontColor999, common.font12]}>
                <Text style={[common.fontColor999, common.font12]}>{theIco.gi('icon-BTC')}</Text>{totalRevenue}
              </Text>
            </View>
          </View>
          <View style={styles.midLine}/>
          <View style={[common.paddingLR16, styles.cardBox]}>
            <Text style={[common.font14, common.fontColor333]}>余额</Text>
            <View style={styles.rightCard}>
              <Text style={[common.fontColor333, common.font14]}>
                <Text style={[common.fontColor333, common.font12]}>{theIco.gi('icon-RMB')}</Text>{unSettleCny}
              </Text>
              <Text style={[common.fontColor999, common.font12]}>
                <Text style={[common.fontColor999, common.font12]}>{theIco.gi('icon-BTC')}</Text>{unSettle}
              </Text>
            </View>
          </View>

          <MiddleCard data={netWorkerData} hashSpeed={currHashes} cnyData={currRmb}/>
        </ScrollView>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topTodayIncome: {
    height: '32%'
  },
  scrollViewContent: {
    height: '68%'
  },
  absoluteView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 30
  },
  waterAnimate: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  slash: {
    fontSize: 20,
    color: "#ddd",
    alignSelf: 'center'
  },
  speedBox: {
    flexGrow: 1
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5'
  },
  incomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: ColorStore.themeColor,
    paddingLeft: 12
  },
  noticeIcon: {
    fontSize: 18,
    color: "#EAA794",
    marginRight: 10
  },
  feeBox: {
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rateCurr: {
    marginTop: 10
  },
  midLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5
  },
  cardBox: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightCard: {
    height: 45,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  }
});

function select(state) {
  return {
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Home);