import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';
import store from '../store';
import {productTLoaded, productSLoaded} from '../actions/ProductActions';
import {pointsToYuan, formatDateDay, powerKWh} from '../../utils/Config';

let productInit = {
  productDataT: [], //按台
  productDataS: [], //算力
};

export default function ProductReducer(state = productInit, action) {
  switch (action.type) {
    case types.GET_PRODUCT:
      getProduct(action.data);
      return state;
    case types.PRODUCT_T_LOADED:
      console.log("ttttt----ttttt");
      return Object.assign({}, state, {productDataT: action.data});
    case types.PRODUCT_S_LOADED:
      console.log("sssss----sssss");
      return Object.assign({}, state, {productDataS: action.data});
    default:
      return state;
  }
}

// 获取商品列表
function getProduct(data) {
  console.log(data, 'pro------');
  httpClient.client.then(function (event) {
    event.sales.getProducts({salesMethod: data})
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200 && data === "byEquipment") {
            console.log(res, "获取商品列表!");
            let resData = res.obj;
            for (let i = 0; i < resData.length; i++) {
              resData[i].price = pointsToYuan(resData[i].price);
              resData[i].marketPrice = pointsToYuan(resData[i].marketPrice);
              resData[i].electricityPrice = pointsToYuan(resData[i].electricityPrice);
              resData[i].openedAt = formatDateDay(resData[i].openedAt);
              resData[i].minQtyOfSale = resData[i].minQtyOfSale + "台";
              resData[i].productStatus = resData[i].status === "outOfStock" ? "已售罄" : "";
              resData[i].statusColor = resData[i].status === "outOfStock" ? "#EAA794" : "transparent";
              resData[i].statusBgColor = resData[i].status === "outOfStock" ? "#FFF0E9" : "transparent";
              resData[i].equipment.powerWatts = powerKWh(resData[i].equipment.powerWatts);
              resData[i].salesMethodText = "每台单价";
            }
            store.dispatch(productTLoaded(resData));
          } else {
            let resData = res.obj;
            for (let i = 0; i < resData.length; i++) {
              resData[i].marketPrice = pointsToYuan(resData[i].marketPrice);
              resData[i].price = pointsToYuan(resData[i].price);
              resData[i].electricityPrice = pointsToYuan(resData[i].electricityPrice);
              resData[i].openedAt = formatDateDay(resData[i].openedAt);
              resData[i].minQtyOfSale = resData[i].minQtyOfSale + "份";
              resData[i].productStatus = resData[i].status === "outOfStock" ? "已售罄" : "";
              resData[i].statusColor = resData[i].status === "outOfStock" ? "#EAA794" : "transparent";
              resData[i].statusBgColor = resData[i].status === "outOfStock" ? "#FFF0E9" : "transparent";
              resData[i].salesMethodText = "每份单价";
            }
            store.dispatch(productSLoaded(resData));
          }
        })
      }).catch((err) => {
      console.log(err, '获取用户信息111');
      httpClient.errorModal({res_status: "ok", icon_type: "fail", content: "网络不好 稍后重试"});
      // store.dispatch(errRequest()); //====>>>> ****下拉请求出错的话，也要复位mineRefreshing的值
    })
  }).catch((err) => {
    console.log(err, '获取用户信息222');
    httpClient.errorModal({res_status: "ok", icon_type: "fail", content: "网络不好 稍后重试"});
    // store.dispatch(errRequest())
  })
}

