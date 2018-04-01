import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';
import store from '../store';
import {requestErr} from '../actions/LoginActions';
import LocalStore from '../../utils/LocalStore';

let initApp = {
  userInfo: {}, // 用户信息
  modalVisible: false, //登录反馈modal状态
  loginStatusText: "正在登录中",
  modalIcon: "loading",
  loginSuccess: false
};

export default function LoginReducer(state = initApp, action) {
  switch (action.type) {
    case types.SEND_CODE:
      sendVcode(action.data);
      return state;
    case types.LOGIN_APP:
      loginApp(action.data);
      console.log(action.data, 'user---');
      return state;
    case types.REQUEST_ERR:
      return Object.assign({}, state, {
        modalVisible: action.msg.isModal,
        loginStatusText: action.msg.content,
        modalIcon: action.msg.iconStatus
      });
    case types.EXIT_LOGIN:
      signOutApp();
      return state;
    default:
      return state;
  }
}

// 发送验证码
function sendVcode(para) {
  httpClient.client.then(function (event) {
    httpClient.setHeader(event);
    event.auth.sendCode(para)
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "发送验证码成功!");
          }
        })
      }).catch((err) => {
      console.log(err, 'sendVerifyCode11');
    })
  }).catch((err) => {
    console.log(err, 'sendVerifyCode22');
  })
}

// 用户登录APP
function loginApp(data) {
  httpClient.client.then(function (event) {
    httpClient.setHeader(event);
    event.auth.signin(data)
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "登录成功!");
            initApp.userInfo = Object.assign(initApp.userInfo, res.obj);// 数据拷贝
            LocalStore.deviceInfo.accessToken = res.headers["x-wemining-access-token"];
            storage.save({
              key: 'accessToken',
              data: {
                accessToken: res.headers["x-wemining-access-token"]
              },
              expires: null
            });
            store.dispatch(requestErr({isModal: false, content: "登录成功", iconStatus: "loading"}));
            Actions.tabbar();
          }
        })
      }).catch((err) => {
      console.log(err, '登录失败111');
      store.dispatch(requestErr({isModal: true, content: "网络不好 稍后重试", iconStatus: "fail"}));
      setTimeout(() => {
        store.dispatch(requestErr({isModal: false, content: "网络不好 稍后重试", iconStatus: "fail"}));
      }, 2000);
    })
  }).catch((err) => {
    console.log(err, '登录失败222');
    store.dispatch(requestErr({isModal: true, content: "哎呀，服务器开小差啦", iconStatus: "fail"}));
    setTimeout(() => {
      store.dispatch(requestErr({isModal: false, content: "哎呀，服务器开小差啦", iconStatus: "fail"}));
    }, 2000);
  })
}

//退出登录app
function signOutApp() {
  console.log("tui-app");
  httpClient.client.then(function (event) {
    httpClient.setHeader(event);
    event.auth.signout()
      .then(function (res) {
        httpClient.resBack(res, function () {
          LocalStore.signOutApp();
        });
      }).catch((err) => {
      LocalStore.signOutApp();
    });
  }).catch((err) => {
    LocalStore.signOutApp();
  });
}