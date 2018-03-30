import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';

let initApp = {
  userInfo: {}, // 用户信息
};

export default function LoginReducer(state = initApp, action) {
  switch (action.type) {
    case types.SEND_CODE:
      sendVcode(action.data);
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