import * as types from '../constant/ActionTypes';

// 获取用户信息
export function getMyInfomation(){
  return {
    type: types.GET_MY_INFOMATION
  }
}
// 触发页面渲染用户信息
export function infoLoaded(data){
  return {
    type: types.INFO_LOADED,
    data
  }
}

// 请求数据出错
export function errRequest(data){
  return {
    type: types.ERR_REQUEST,
    data
  }
}

//上传头像
export function uploadHeadImg(data){
  return {
    type: types.UPLODA_HEAD_IMG,
    data
  }
}

//昵称更改
export function setUserName(data){
  return {
    type: types.SET_USER_NAME,
    data
  }
}