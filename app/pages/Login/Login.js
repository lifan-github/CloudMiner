import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import {sendVcode, loginApp} from '../../redux/actions/LoginActions';
import {CheckedPhone, CheckedEmail} from '../../utils/Config';

let wait;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: "",
      emailNum: "",
      codeNum: "",
      vcodeText: "获取验证码",
      userTextInputBorder: "#ddd",
      codeTextInputBorder: "#ddd",
      vcode_disabled: false,
      phoneNumSigin: true,
      clearIcon: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(sendVcode({lifan: 'name'}));
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  waitTime = () => {
    const that = this;
    if (wait === 0) {
      that.setState({ // 时间为0时, 并可以重新发送code
        vcode_disabled: false,
        vcodeText: "重新发送"
      });
      that.timer && clearInterval(that.timer)
    } else {
      that.setState({
        vcode_disabled: true,
        vcodeText: wait + " 秒"
      });
      wait--;
    }
    console.log(wait)
  };

  _userOnFocus() {
    this.setState({
      userTextInputBorder: "red"
    })
  }

  _userOnBlur() {
    this.setState({
      userTextInputBorder: "#ddd"
    })
  }

  onPhoneNumChange(value) {
    console.log(value, 'phone--->>>');
    this.setState({
      phoneNum: value,
      clearIcon: true
    });
  }

  _codeOnFocus() {
    this.setState({
      codeTextInputBorder: "red"
    })
  }

  _codeOnBlur() {
    this.setState({
      codeTextInputBorder: "#ddd"
    })
  }

  onEmailTextInput(value) {
    console.log(value, 'eamil--->>>');
    this.setState({
      emailNum: value,
      clearIcon: true
    });
  }

  // 清空输入框
  clearPhoneNum() {
    this.setState({
      phoneNum: "",
      emailNum: ""
    });
  }

  // 切换注册方式
  changeSiginType() {
    const {phoneNumSigin} = this.state;
    this.setState({
      phoneNumSigin: !phoneNumSigin
    })
  }

  // 发送验证码按钮并检测手机号/邮箱
  bindSendCodeNum() {
    const that = this;
    const {phoneNum, emailNum, phoneNumSigin} = this.state;
    console.log(phoneNumSigin, '登录方式');
    if (phoneNumSigin) {
      if (!CheckedPhone(phoneNum)) {
        ToastAndroid.showWithGravity('手机号格式不正确', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        that.setState({vcode_disabled: true});
        wait = 60; //重新赋值
        that.refs["vcode"].focus();
        // Action.sendVerifyCode({mobile: phoneNum});
        that.timer = setInterval(() => {
          that.waitTime();
        }, 1000);
      }
    } else {
      if (!CheckedEmail(emailNum)) {
        ToastAndroid.showWithGravity('邮箱格式不正确', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        console.log(emailNum, 'emailNum--->>>');
        that.setState({vcode_disabled: true});
        wait = 60; //重新赋值
        that.refs["vcode"].focus();
        // Action.sendVerifyCode({email: emailNum});
        that.timer = setInterval(() => {
          that.waitTime();
        }, 1000);
      }
    }
  }

  onVcodeNumChange(value) {
    this.setState({
      codeNum: value
    })
  }

  // 登录APP
  bindSignInBtn() {
    Actions.tabbar();

    const {phoneNumSigin, phoneNum, emailNum, codeNum} = this.state;
    if (phoneNumSigin) { // 手机号登录
      if (!phoneNum) {
        ToastAndroid.showWithGravity('请输入手机号', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else if (CheckedPhone(phoneNum) && !codeNum) {
        ToastAndroid.showWithGravity('请输入验证码', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else if ((codeNum.length === 6) && CheckedPhone(phoneNum)) {
        Keyboard.dismiss();
        // Action.signInApp({mobile: phoneNum, vcode: codeNum});
      }
    } else { // 邮箱登录
      if (!emailNum) {
        ToastAndroid.showWithGravity('请输入邮箱', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else if (CheckedEmail(emailNum) && !codeNum) {
        ToastAndroid.showWithGravity('请输入验证码', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else if ((codeNum.length === 6) && CheckedEmail(emailNum)) {
        Keyboard.dismiss();
        // Action.signInApp({email: emailNum, vcode: codeNum});
      }
    }
  }

  render() {
    const {
      phoneNumSigin,
      clearIcon,
      vcodeText,
      vcode_disabled,
      userTextInputBorder,
      codeTextInputBorder
    } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={[styles.topLogoContainer]}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImg} source={ImageStore.commonPic.logo}/>
          </View>
          <Text
            style={[commonStyle.fontSize24, commonStyle.color333, commonStyle.fontWeight]}>{TextStore.welcome}</Text>
        </View>

        <View style={[styles.inputContainer, {borderColor: userTextInputBorder}]}>
          {
            !phoneNumSigin &&
            <TextInput
              placeholder={TextStore.emailPlaceholder}
              placeholderTextColor={'red'}
              underlineColorAndroid="transparent"
              maxLength={40}
              keyboardType={'email-address'}
              style={[commonStyle.flex1, commonStyle.fontSize16, {padding: 0}]}
              onChangeText={(text) => this.onEmailTextInput(text)}
              value={this.state.emailNum}
              onFocus={() => this._userOnFocus()}
              onBlur={() => this._userOnBlur()}
            />
          }

          {
            phoneNumSigin &&
            <View style={[commonStyle.row, commonStyle.flex1, commonStyle.alignItem]}>
              <Text style={commonStyle.fontSize16}>+86</Text>
              <TextInput
                placeholder={TextStore.phonePlaceholder}
                placeholderTextColor={'red'}
                underlineColorAndroid="transparent"
                maxLength={11}
                keyboardType={'numeric'}
                style={[commonStyle.flex1, commonStyle.fontSize16, {padding: 0, paddingLeft: 10}]}
                onChangeText={(text) => this.onPhoneNumChange(text)}
                value={this.state.phoneNum}
                onFocus={() => this._userOnFocus()}
                onBlur={() => this._userOnBlur()}
              />
            </View>
          }

          {
            clearIcon ?
              <TouchableOpacity
                style={[styles.wrongIconContent]}
                activeOpacity={0.5}
                onPress={() => this.clearPhoneNum()}
              >
                <Text style={styles.wrongIcon}>{IconStore.clear}</Text>
              </TouchableOpacity>
              :
              null
          }
        </View>

        <View style={[styles.inputContainer, {borderColor: codeTextInputBorder}]}>
          <TextInput
            ref="vcode"
            placeholder={TextStore.vCodePlaceholder}
            placeholderTextColor={'red'}
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            maxLength={6}
            style={[commonStyle.flex1, commonStyle.fontSize16, {padding: 0}]}
            onChangeText={(text) => this.onVcodeNumChange(text)}
            value={this.state.codeNum}
            onFocus={() => this._codeOnFocus()}
            onBlur={() => this._codeOnBlur()}
          />
          <View style={[styles.sendCodeContainer]}>
            <TouchableOpacity
              style={[commonStyle.flex1, commonStyle.center]}
              disabled={vcode_disabled}
              onPress={() => this.bindSendCodeNum()}
            >
              <Text style={[commonStyle.fontSize16]}>{vcodeText}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signInbtn}
          onPress={() => this.bindSignInBtn()}
        >
          <Text style={[commonStyle.fontSize16, commonStyle.color255]}>{TextStore.login}</Text>
        </TouchableOpacity>
        <Text style={styles.tipsText}>{TextStore.loginDynamically}</Text>

        <View style={styles.selectBottomContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.changeSiginType()}
          >
            <Text style={[styles.selectIcon, phoneNumSigin && styles.selectIconColor]}>{IconStore.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.changeSiginType()}
          >
            <Text style={[styles.selectIcon, !phoneNumSigin && styles.selectIconColor]}>{IconStore.email}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  topLogoContainer: {
    marginBottom: 60
  },
  logoContainer: {
    width: 60,
    height: 60,
    marginBottom: 30
  },
  logoImg: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  textInput: {
    height: 50,
    marginBottom: 30
  },
  signInbtn: {
    height: 45,
    marginTop: 30,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  tipsText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: FONT_SIZE(14),
    color: "#999"
  },
  selectBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH - 40,
    position: 'absolute',
    bottom: 30,
    marginLeft: 20
  },
  selectIcon: {
    fontSize: 40,
    color: '#d8d8d8'
  },
  selectIconColor: {
    color: 'red'
  },
  inputContainer: {
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 1.5,
    marginBottom: 30,
    alignItems: 'center'
  },
  wrongIconContent: {
    width: 60,
    height: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  wrongIcon: {
    fontSize: 22,
    color: '#999'
  },
  sendCodeContainer: {
    height: 40,
    width: 100
  },
});

//基于全局 state ，哪些是我们想注入的 props
function select(state) {
  console.log(state, 'store-------9999999');
  return {
    loginReducer: state.LoginReducer
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Login);