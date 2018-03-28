import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';
let WeChat=require('react-native-wechat');

class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default class WeChatShare extends Component {
  constructor(props) {
    super(props);
    // 注册APP(appid) ===> 建议在路由中初始化
    WeChat.registerApp('wx8d560da3ba038e7e');
    this.state = {}
  }

  render() {
    return (
      <View style={{margin: 20}}>
        <Text style={styles.welcome}>
          微信好友/朋友圈分享实例
        </Text>
        <CustomButton
          text='微信好友分享-文本'
          onPress={() => {
            WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToSession({type: 'text', description: '测试微信好友分享文本'})
                    .catch((error) => {
                      ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    });
                } else {
                  ToastAndroid.showWithGravity('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
              });
          }}
        />
        <CustomButton
          text='微信好友分享-链接'
          onPress={() => {
            WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToSession({
                    title: '微信好友测试链接',
                    description: '分享自:江清清的技术专栏(www.lcode.org)',
                    thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                    type: 'news',
                    webpageUrl: 'http://www.lcode.org'
                  })
                    .catch((error) => {
                      ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    });
                } else {
                  ToastAndroid.showWithGravity('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
              });
          }}
        />
        <CustomButton
          text='微信朋友圈分享-文本'
          onPress={() => {
            WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享文本'})
                    .catch((error) => {
                      ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    });
                } else {
                  ToastAndroid.showWithGravity('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
              });
          }}
        />
        <CustomButton
          text='微信朋友圈分享-链接'
          onPress={() => {
            WeChat.isWXAppInstalled()
              .then((isInstalled) => {
                if (isInstalled) {
                  WeChat.shareToTimeline({
                    title: '微信朋友圈测试链接',
                    description: '分享自:江清清的技术专栏(www.lcode.org)',
                    thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                    type: 'news',
                    webpageUrl: 'http://www.lcode.org'
                  })
                    .catch((error) => {
                      ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    });
                } else {
                  ToastAndroid.showWithGravity('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
              });
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    margin: 5,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
});