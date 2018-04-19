import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {connect} from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import AnimNum from './AnimNum';
import Wave from './Wave';
import UserHashRate from './UserHashRate';
import UserIncome from './UserIncome';
import NetWorkDiff from './NetWorkDiff';
import {getExchangeRate, getNotice, getMiningSpeed, getNetWorker} from '../../redux/actions/HomeActions';
import {formatDateDay} from '../../utils/Config';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getExchangeRate({code: "CNY"}));
    this.props.dispatch(getNetWorker());
    this.props.dispatch(getNotice({status: ["published"]}));
    this.props.dispatch(getMiningSpeed({categories: ["hashes", "revenues", "workers"]}));
  }

  onPullRefresh() {
    this.props.dispatch(getExchangeRate({code: "CNY"}));
    this.props.dispatch(getNetWorker());
    this.props.dispatch(getNotice({status: ["published"]}));
    this.props.dispatch(getMiningSpeed({categories: ["hashes", "revenues", "workers"]}));
  }

  render() {
    //页面需要的数据
    const {
      rateCny,
      miningSpeed,
      netWorker,
      notices,
      isRefreshing
    } = this.props.homeReducer;
    //公告显示状态
    let noticeShow;
    if (notices.length > 0) {
      noticeShow = formatDateDay(notices[0].publishedAt) + " - " + (notices[0].title).substring(0, 10) + "..."
    } else {
      noticeShow = "暂无公告"
    }
    return (
      <View style={styles.container}>
        <LinearGradient
          style={[styles.topTodayIncome, commonStyle.center]}
          colors={[ColorStore.startColor, ColorStore.endColor]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
        >
          <View style={styles.absoluteView}>
            <AnimNum
              rateCnyData={rateCny}
              miningSpeedData={miningSpeed}
              netWorkerData={netWorker}
            />
          </View>
          <View style={styles.waterAnimate}>
            <Wave/>
          </View>
        </LinearGradient>
        <ScrollView
          style={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => this.onPullRefresh()}
              colors={['#fff']}
              progressBackgroundColor={"#B9B9B9"}
            />
          }
        >
          <UserHashRate data={miningSpeed}/>
          <TouchableOpacity
            style={styles.noticeBox}
            activeOpacity={0.6}
            onPress={() => Actions.theNoticeHome()}
          >
            <Text style={styles.noticeIcon}>{IconStore.notice}</Text>
            <Text style={styles.noticeContent}>{noticeShow}</Text>
          </TouchableOpacity>
          <UserIncome
            rateCnyData={rateCny}
            miningSpeedData={miningSpeed}
            netWorkerData={netWorker}
          />
          <NetWorkDiff
            netWorkerData={netWorker}
            hashSpeed={miningSpeed}
            cnyData={rateCny}
          />
        </ScrollView>
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
  noticeIcon: {
    fontSize: 18,
    color: "#EAA794",
    marginRight: 10
  },
  noticeContent: {
    fontSize: 14,
    color: "#333"
  },
});

function select(state) {
  return {
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Home);