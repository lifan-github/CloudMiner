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
import {sendVcode} from '../../redux/actions/LoginActions';
import {CheckedPhone, CheckedEmail} from '../../utils/Config';
import commonStyle from "../../styles";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: "",
      emailNum: "",
      codeNum: "",
      vcodeText: "获取验证码",
      userInputBorder: "#ddd",
      codeInputBorder: "#ddd",
      vcode_disabled: false,
      phoneNumSigin: true,
      clearIcon: false,
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onPhoneNumChange(value) {
    console.log(value, 'phone--->>>');
    this.setState({
      phoneNum: value,
      clearIcon: true
    });
  }

  _userOnFocus() {
    this.setState({
      userInputBorder: ColorStore.themeColor
    })
  }

  _userOnBlur() {
    this.setState({
      userInputBorder: "#ddd"
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

  onVcodeNumChange(value) {
    this.setState({
      codeNum: value
    })
  }

  _codeOnFocus() {
    this.setState({
      codeInputBorder: ColorStore.themeColor
    })
  }

  _codeOnBlur() {
    this.setState({
      codeInputBorder: "#ddd"
    })
  }

  // 切换注册方式
  changeSiginType() {
    const {phoneNumSigin} = this.state;
    this.setState({
      phoneNumSigin: !phoneNumSigin
    })
  }

  bindSendCodeNum() {

  }

  bindSignInBtn(){

  }



  render() {
    const {
      phoneNumSigin,
      clearIcon,
      vcodeText,
      vcode_disabled,
      userInputBorder,
      codeInputBorder
    } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.topLogoContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImg} source={ImageStore.commonPic.logo}/>
          </View>
          <Text style={styles.welcome}>{TextStore.welcome}</Text>
        </View>
        <View style={[styles.inputContainer, {borderColor: userInputBorder}]}>
          {
            phoneNumSigin &&
            <View style={styles.inputContent}>
              <Text>+86</Text>
              <TextInput
                placeholder={TextStore.phonePlaceholder}
                placeholderTextColor={"#999"}
                underlineColorAndroid="transparent"
                maxLength={11}
                keyboardType={'numeric'}
                style={[styles.inputStyle, {paddingLeft: 10}]}
                onChangeText={(text) => this.onPhoneNumChange(text)}
                value={this.state.phoneNum}
                onFocus={() => this._userOnFocus()}
                onBlur={() => this._userOnBlur()}
              />
            </View>
          }
          {
            !phoneNumSigin &&
            <TextInput
              placeholder={TextStore.emailPlaceholder}
              placeholderTextColor={"#999"}
              underlineColorAndroid="transparent"
              maxLength={40}
              keyboardType={'email-address'}
              style={styles.inputStyle}
              onChangeText={(text) => this.onEmailTextInput(text)}
              value={this.state.emailNum}
              onFocus={() => this._userOnFocus()}
              onBlur={() => this._userOnBlur()}
            />
          }
          {
            clearIcon ?
              <TouchableOpacity
                style={styles.wrongIconContent}
                activeOpacity={0.5}
                onPress={() => this.clearPhoneNum()}
              >
                <Text style={styles.wrongIcon}>{IconStore.clear}</Text>
              </TouchableOpacity>
              :
              null
          }
        </View>
        <View style={[styles.inputContainer, {borderColor: codeInputBorder}]}>
          <TextInput
            ref="vcode"
            placeholder={TextStore.vCodePlaceholder}
            placeholderTextColor={"#999"}
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
            maxLength={6}
            style={styles.inputStyle}
            onChangeText={(text) => this.onVcodeNumChange(text)}
            value={this.state.codeNum}
            onFocus={() => this._codeOnFocus()}
            onBlur={() => this._codeOnBlur()}
          />
          <TouchableOpacity
            style={[styles.sendCodeBtn, commonStyle.center]}
            disabled={vcode_disabled}
            onPress={() => this.bindSendCodeNum()}
          >
            <Text style={styles.vcodeText}>{vcodeText}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.signInbtn}
          onPress={() => this.bindSignInBtn()}
        >
          <Text style={styles.loginText}>{TextStore.login}</Text>
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
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: "#fff"
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
  welcome: {
    fontSize: 28,
    color: "#333",
    fontWeight: "500"
  },
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1.5,
    alignItems: 'center',
    marginBottom: 30
  },
  inputContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    padding: 0,
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
  sendCodeBtn: {
    height: 40,
    width: 100,
  },
  vcodeText: {
    fontSize: 16,
    color: ColorStore.themeColor
  },
  signInbtn: {
    height: 45,
    marginTop: 30,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorStore.themeColor
  },
  loginText: {
    fontSize: 16,
    color: "#fff"
  },
  tipsText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 12,
    color: "#999"
  },
  selectBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH-40,
    position: 'absolute',
    bottom: 30,
    marginLeft: 20
  },
  selectIcon: {
    fontSize: 40,
    color: '#d8d8d8'
  },
  selectIconColor: {
    color: ColorStore.themeColor
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