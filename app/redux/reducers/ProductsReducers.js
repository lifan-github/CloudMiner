import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';
import store from '../store';
import {productLoaded} from '../actions/ProductActions';

let productInit = {
  productDataT: [], //按台
  productDataS: [], //算力
};

export default function ProductReducer(state = productInit, action) {
  switch (action.type) {
    case types.GET_ALL_PRODUCT:
      getAllProduct(action.data);
      return state;
    default:
      return state;
  }
}

// 获取商品列表
function getAllProduct() {
  /*httpClient.client.then(function (event) {
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
      httpClient.errorModal({res_status: "ok", icon_type: "fail", content: "网络不好 稍后重试"});
      store.dispatch(errRequest()); //====>>>> ****下拉请求出错的话，也要复位mineRefreshing的值
    })
  }).catch((err) => {
    console.log(err, '获取用户信息222');
    httpClient.errorModal({res_status: "ok", icon_type: "fail", content: "网络不好 稍后重试"});
    store.dispatch(errRequest())
  })*/
}

