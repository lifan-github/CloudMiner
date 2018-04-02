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


