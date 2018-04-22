import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import SettingOption from '../../components/SettingOption';
import {getMyInfomation} from '../../redux/actions/MineActions';
import {connect} from "react-redux";
import {satoBtc, absFloorNumber, speedChange} from '../../utils/Config';

class SpeedComponent extends Component {
  render() {
    const {upTextStyle, upValue, downText, downTextStyle} = this.props;
    return (
      <View style={styles.midCommomStyle}>
        <Text style={[styles.fontS14, {color: upTextStyle}]}>{upValue}</Text>
        <Text style={[styles.fontS14, {color: downTextStyle}]}>{downText}</Text>
      </View>
    )
  }
}

class IconTextComponent extends Component {
  render() {
    const {iconUrl, downText, downTextStyle, bindOnPress} = this.props;
    return (
      <TouchableOpacity
        style={styles.midCommomStyle}
        onPress={bindOnPress}
      >
        <Text style={styles.rowViewTextItemIcon}>{iconUrl}</Text>
        <Text style={[styles.fontS14, {color: downTextStyle}]}>{downText}</Text>
      </TouchableOpacity>
    )
  }
}

class Mine extends Component {
  componentDidMount() {
    this.props.dispatch(getMyInfomation());
  }

  onPullRefresh() {
    this.props.dispatch(getMyInfomation());
  }

  render() {
    console.log('renderrenderrenderrenderrender');
    const {userInfo, mineRefreshing} = this.props.mineReducer;
    const {miningSpeed} = this.props.homeReducer;
    let avatar_url, nick_name, unSettle, myHash, transferIn, transferOut;
    // 头像
    if (userInfo.avatar && userInfo.avatar.url) {
      avatar_url = {uri: userInfo.avatar.url}
    } else {
      avatar_url = ImageStore.commonPic.userPhoto;
    }
    // 名称
    nick_name = userInfo.nickName;
    // 余额
    if (miningSpeed.revenues && miningSpeed.revenues.unSettle) {
      unSettle = satoBtc(absFloorNumber(miningSpeed.revenues.unSettle)) + " BTC";
    } else {
      unSettle = "N/A";
    }
    // 我的算力
    let workers = miningSpeed.workers;
    myHash = workers && workers.workingHashrate ? speedChange(workers.workingHashrate) : "N/A";
    transferIn = workers && workers.transferInHashrate ? speedChange(workers.transferInHashrate) : "N/A";
    transferOut = workers && workers.transferOutHashrate ? speedChange(workers.transferOutHashrate) : "N/A";
    return (
      <ScrollView
        style={commonStyle.pageColor}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={mineRefreshing}
            onRefresh={() => this.onPullRefresh()}
            colors={['#fff']}
            progressBackgroundColor={'#B9B9B9'}
          />
        }
      >
        <TouchableOpacity
          onPress={() => Actions.userInfoPage()}
          activeOpacity={1}
          style={styles.topUserInfoContent}
        >
          <View style={styles.userInfoBox}>
            <Image style={styles.avatarStyle} source={avatar_url}/>
            <View style={styles.userNameContent}>
              <Text style={styles.userName}>{nick_name}</Text>
              <Text style={styles.editorTips}>点击查看或编辑个人信息</Text>
            </View>
          </View>
          <View style={styles.userTotalSpeed}>
            <Text style={styles.balance}>余额</Text>
            <Text style={styles.unSettle}>{unSettle}</Text>
          </View>
        </TouchableOpacity>
        <View style={commonStyle.intervalView}/>
        <View style={[commonStyle.between, commonStyle.bgColor, commonStyle.paddingTb10]}>
          <SpeedComponent
            upTextStyle={"#F5A623"}
            upValue={myHash}
            downText="我的算力"
            downTextStyle={"#999"}
          />
          <SpeedComponent
            upTextStyle={"#333"}
            upValue={transferIn}
            downText="转入"
            downTextStyle={"#999"}
          />
          <SpeedComponent
            upTextStyle={"#333"}
            upValue={transferOut}
            downText="转出"
            downTextStyle={"#999"}
          />
        </View>
        <View style={commonStyle.intervalView}/>
        <View style={[commonStyle.between, commonStyle.bgColor, commonStyle.paddingTb10]}>
          <IconTextComponent
            iconUrl={IconStore.orders}
            downText="订单"
            downTextStyle={"#333"}
            bindOnPress={() => Actions.orderPage()}
          />
          <IconTextComponent
            iconUrl={IconStore.benifits}
            downText="总收益"
            downTextStyle={"#333"}
            bindOnPress={() => Actions.earningPage()}
          />
          <IconTextComponent
            iconUrl={IconStore.records}
            downText="收币记录"
            downTextStyle={"#333"}
            bindOnPress={() => Actions.collectRecord()}
          />
        </View>
        <View style={commonStyle.intervalView}/>
        <View style={[styles.listBgColor]}>
          <SettingOption
            onPress={() => Actions.buyingPatterns()}
            iconFont={IconStore.payment}
            optionText="购买方式"
            rightTopDot={false}
          />
          <SettingOption
            onPress={() => Actions.noticePage()}
            iconFont={IconStore.notice}
            optionText="公告"
            rightTopDot={true}
          />
          <SettingOption
            onPress={() => Actions.exchRate()}
            iconFont={IconStore.exchange}
            optionText="汇率"
            borderBottom={false}
            rightTopDot={false}
          />
        </View>
        <View style={commonStyle.intervalView}/>
        <View style={[styles.listBgColor]}>
          <SettingOption
            onPress={() => Actions.setting()}
            iconFont={IconStore.settings}
            optionText="设置"
            borderBottom={false}
            rightTopDot={false}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 50
  },
  topUserInfoContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20
  },
  userInfoBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarStyle: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  userNameContent: {
    height: 76,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20
  },
  userName: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5
  },
  editorTips: {
    fontSize: 12,
    color: "#999",
  },
  userTotalSpeed: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 84,
    alignItems: 'center'
  },
  balance: {
    marginRight: 10,
    fontSize: 14
  },
  unSettle: {
    fontSize: 20,
    color: "#333",
  },
  midCommomStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  fontS14: {
    fontSize: 14
  },
  rowViewTextItemIcon: {
    fontSize: 24,
    color: ColorStore.themeColor,
    marginBottom: 5
  },
  listBgColor: {
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
});


function select(state) {
  return {
    mineReducer: state.MineReducer,
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Mine);