import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  Switch,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ListComponent from '../../../components/ListComponent';
import {connect} from "react-redux";
import {exitLogin} from "../../../redux/actions/LoginActions";
import LocalStore from '../../../utils/LocalStore';

class Setting extends Component {
  // 钱包下载
  downLoadWallet(url) {
    if (url) {
      Alert.alert('温馨提醒', "您是否需要下载钱包?", [
        {text: '确认', onPress: () => Linking.openURL(url)}
      ]);
    }
  }

  checkSwitchNews() {

  }

  signOutBtn(){
    Alert.alert('温馨提醒', "您确定退出登录吗?", [
      {text: '确认', onPress: () => this.props.dispatch(exitLogin())}
    ]);
  }

  render() {
    const {userInfo} = this.props.mineReducer;
    let walletURL, walletText, btcAddress;
    if(!userInfo.platform.walletDownloadURL){
      walletText = "暂无钱包";
      walletURL = ""
    }else{
      walletURL = userInfo.platform.walletDownloadURL;
    }
    // 比特币地址
    if(userInfo.btcRevenueAddress){
      btcAddress = userInfo.btcRevenueAddress.substring(0, 10) + "..." + userInfo.btcRevenueAddress.substring(20)
    }else{
      btcAddress = "填写地址以获取收益"
    }

    return (
      <View style={commonStyle.pageColor}>
        <View style={commonStyle.intervalView20}/>
        <View style={styles.rowListContainer}>
          <ListComponent
            borderBottom={true}
            rightArrowIcon={true}
            leftText="收币地址"
            rightText={btcAddress}
            bindDetails={() => Actions.btcAddress()}
          />
          <ListComponent
            borderBottom={false}
            rightArrowIcon={true}
            leftText={"钱包下载"}
            rightText={walletText}
            bindDetails={() => this.downLoadWallet(walletURL)}
          />
        </View>
        <View style={commonStyle.intervalView20}/>
        <View style={styles.rowListContainer}>
          <View style={[commonStyle.between, commonStyle.listHeight55]}>
            <Text style={styles.newsTips}>消息提醒</Text>
            <Switch
              onValueChange={(value) => this.checkSwitchNews(value)}
              value={true}
            />
          </View>
        </View>
        <View style={commonStyle.intervalView20}/>
        <View style={styles.rowListContainer}>
          <ListComponent
            borderBottom={true}
            rightArrowIcon={false}
            leftText={'当前版本'}
            rightText={LocalStore.deviceInfo.version}
          />
          <ListComponent
            borderBottom={false}
            rightArrowIcon={true}
            leftText={"关于我们"}
            rightText={false}
            bindDetails={() => Actions.aboutUs()}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.signOutBtn()}
          style={[commonStyle.center, styles.exitBtn, commonStyle.viewBorderTop]}
        >
          <Text style={styles.exitText}>退出登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowListContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  newsTips: {
    fontSize: 14,
    color: "#4d4d4d"
  },
  exitBtn: {
    width: SCREEN_WIDTH,
    height: 55,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
  exitText: {
    fontSize: 14,
    color: "#666"
  }
});

function select(state) {
  return {
    mineReducer: state.MineReducer,
  }
}

export default connect(select)(Setting);