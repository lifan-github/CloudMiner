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

// 错误反馈全局的
export function requestErr(msg){
  return {
    type: types.REQUEST_ERR,
    msg
  }
}

// 退出登录
export function exitLogin(){
  return {
    type: types.EXIT_LOGIN,
  }
}
