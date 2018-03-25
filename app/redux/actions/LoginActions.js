import * as types from '../constant/ActionTypes';

// 发送验证码
export function sendVcode(data){
  return {
    type: types.SEND_CODE,
    data
  }
}
// 登录APP
export function loginApp(data){
  return {
    type: types.LOGIN_APP,
    data
  }
}