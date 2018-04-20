import React, {Component} from 'react';
import {
  Text,
  View,
  Linking,
  WebView,
  Clipboard,
  FlatList,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import {CheckedPhone} from '../../../utils/Config';
import {getMyInfomation} from "../../../redux/actions/MineActions";

let left_html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Title</title></head><body style="background-color: #fff; overflow-y: visible;">`;
let right_html = `<script>window.onload=function(){document.title = document.body.clientHeight;}</script></body></html>`;
let htmlContent = '<div style="text-align: left;">' +
  '<p style="font-size: 14px; color: #333">当您完成下单并确认信息和价格后，请与我们联系确认相关事宜</p>' +
  '<p style="font-size: 14px; color: #333">选择您最方便的支付途径，切换至相应的支付平台完成付款。</p>' +
  '<p style="font-size: 14px; color: #333">线下支付方式注意事项：</p>' +
  '<p style="font-size: 14px; color: #333; line-height: 20px">1、进行银行转账时，付款金额与订单金额保持一致，请勿多转或者少转，避免付款不成功被退回。</p>' +
  '<p style="font-size: 14px; color: #333; line-height: 20px">2、资金成功转至指定银行账户后，我们将尽快确认订单并按商品矿机设置的启始挖矿时间开始工作。</p>' +
  '<p style="font-size: 14px; color: #333; line-height: 20px">3、付款到账时间：各付款银行具体转账限额请查询买家开户银行的公告说明。</p>' +
  '</div>';

class BuyingPatterns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WebViewHeight: 200
    }
  }

  componentDidMount() {
    this.props.dispatch(getMyInfomation());
  }

  renderSeparator() {
    return <View style={commonStyle.viewBorderBottom}/>;
  }

  renderHeader(data, text) {
    if (data && data.length > 0) {
      return (
        <View style={[commonStyle.paddingLR20, commonStyle.paddingTb10]}>
          <Text style={styles.headerText}>{text}</Text>
        </View>
      )
    } else {
      return <View/>
    }
  }

  renderItem(item) {
    let accountName;
    switch (item.name) {
      case "mobile":
        accountName = "手机号";
        break;
      case "wechat":
        accountName = "微信号";
        break;
      case "QQ":
        accountName = "QQ号";
        break;
      default:
        accountName = item.name
    }
    return (
      <View style={[styles.itemsContainer, commonStyle.between]}>
        <Text style={styles.headerTitle}>{accountName}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          delayLongPress={1500}
          onPress={() => this.callPhoneNum(item.value || item.account)}
          onLongPress={() => this.setClipboard(item.value || item.account)}
        >
          <Text style={styles.itemsText}>{item.value || item.account}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // 长按剪切
  setClipboard(value) {
    Clipboard.setString(value);
    ToastAndroid.showWithGravity("已复制 " + value, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  //拨打电话
  callPhoneNum(value) {
    if (value.length === 11 && CheckedPhone(value)) {
      Linking.openURL('tel:' + value)
    }
  }

  handRefresh() {
    this.props.dispatch(getMyInfomation());
  }

  render() {
    const {userInfo, mineRefreshing} = this.props.mineReducer;
    let paybyData = userInfo.platform && userInfo.platform.paymethods;
    let contactData = userInfo.platform && userInfo.platform.contacts;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={mineRefreshing}
            onRefresh={() => this.handRefresh()}
            colors={['#fff']}
            progressBackgroundColor={"#b9b9b9"}
          />
        }
      >
        <FlatList
          data={paybyData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderItem(item)}
          ItemSeparatorComponent={() => this.renderSeparator()}
          ListHeaderComponent={() => this.renderHeader(paybyData, "付款方式")}
        />
        <FlatList
          data={contactData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderItem(item)}
          ItemSeparatorComponent={() => this.renderSeparator()}
          ListHeaderComponent={() => this.renderHeader(contactData, "联系方式")}
        />
        <View style={[commonStyle.paddingLR20, commonStyle.paddingTb10]}>
          <Text style={styles.headerText}>注意事项</Text>
        </View>
        <WebView
          style={[styles.webViewStyle, {height: this.state.WebViewHeight}]}
          source={{html: left_html + `${htmlContent}` + right_html, baseUrl: ''}}
          onNavigationStateChange={(title) => {
            if (title.title && !isNaN(parseInt(title.title))) {
              this.setState({
                WebViewHeight: parseInt(title.title) + 50
              })
            }
          }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 14,
    color: "#9B9B9B"
  },
  itemsContainer: {
    height: 55,
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  headerTitle: {
    fontSize: 14,
    color: "#333"
  },
  itemsText: {
    fontSize: 14,
    color: "#747474"
  },
  webViewStyle: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

function select(state) {
  return {
    mineReducer: state.MineReducer
  }
}

export default connect(select)(BuyingPatterns);