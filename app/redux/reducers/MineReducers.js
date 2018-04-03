import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';
import store from '../store';
import {infoLoaded, errRequest} from '../actions/MineActions';

let mineInit = {
  userInfo: {},
  mineRefreshing: false
};

export default function MineReducer(state = mineInit, action) {
  switch (action.type) {
    case types.GET_MY_INFOMATION:
      getMyInfomation();
      return Object.assign({},state,{mineRefreshing: true});
    case types.INFO_LOADED:
      return Object.assign({},state,{userInfo: action.data, mineRefreshing: false});
    case types.ERR_REQUEST:
      return Object.assign({},state,{mineRefreshing: false});
    case types.UPLODA_HEAD_IMG:
      uploadHeadImg(action.data);
      return state;
    default:
      return state;
  }
}

// 获取用户信息
function getMyInfomation() {
  httpClient.client.then(function (event) {
    event.me.getProfile()
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "获取用户信息!");
            store.dispatch(infoLoaded(res.obj));
          }
        })
      }).catch((err) => {
      console.log(err, '获取用户信息111');
      //====>>>> ****下拉请求出错的话，也要复位mineRefreshing的值
      Actions.errorModal();
      store.dispatch(errRequest())
    })
  }).catch((err) => {
    console.log(err, '获取用户信息222');
    Actions.errorModal();
    store.dispatch(errRequest())
  })
}


// 上传用户头像
function uploadHeadImg(data) {
  httpClient.client.then(function (event) {
    event.upload.uploadAvatar({avatar_data: data})
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "上传用户头像!");
            getMyInfomation();
            httpClient.errorModal({res_status: "ok", icon_type: "success", content: "上传成功"});
          }
        })
      }).catch((err) => {
      console.log(err, '上传用户头像111');
      httpClient.errorModal({res_status: "ok", icon_type: "fail", content: "网络不好 稍后重试"});
    })
  }).catch((err) => {
    console.log(err, '上传用户头像222');
    httpClient.errorModal({res_status: "ok", icon_type: "fail", content: "网络不好 稍后重试"});
  })
}

