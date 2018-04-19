import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';
import store from '../store';
import {exchangeRateLoaded, noticeLoaded, miningSpeedLoaded, netWorkerLoaded} from '../actions/HomeActions';
import {resetRefreshing} from '../actions/CommomActions';

let homeInit = {
  rateCny: {}, // 汇率
  notices: [], // 公告
  miningSpeed: {}, // 收益
  netWorker: {}, // 全网难度
  isRefreshing: true, // 首页下拉刷新状态
};

export default function HomeReducer(state = homeInit, action) {
  switch (action.type) {
    case types.GET_EXCHNAGE_RATE:
      getExchangeRate(action.data);
      return state;
    case types.EXCHNAGE_RATE_LOADED:
      return Object.assign({}, state, {rateCny: action.data, isRefreshing: false});
    case types.GET_NOTICE:
      getNotice(action.data);
      return state;
    case types.NOTICE_LOADED:
      return Object.assign({}, state, {notices: action.data});
    case types.GET_MINING_SPEED:
      getMiningSpeed(action.data);
      return state;
    case types.MINING_SPEED_LOADED:
      return Object.assign({}, state, {miningSpeed: action.data});
    case types.GET_NET_WORDER:
      getNetWorker();
      return state;
    case types.NET_WORDER_LOADED:
      return Object.assign({}, state, {netWorker: action.data});
    case types.RESET_REFRESHING:
      return Object.assign({}, state, {isRefreshing: action.status});
    default:
      return state;
  }
}

// 获取汇率
function getExchangeRate(para) {
  httpClient.client.then(function (event) {
    httpClient.setHeader(event);
    event.exchange.getBtcRate(para)
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "汇率!");
            store.dispatch(exchangeRateLoaded(res.obj));
          }
        })
      }).catch((err) => {
       //accessToken 不存在或者过期会进入 如果报401或403直接跳出APP至登录页
      httpClient.catchRequest(err);
      //请求失败的话，isRefreshing值改为false
      store.dispatch(resetRefreshing(false));
      console.log(err, '汇率111');
    })
  }).catch((err) => {
    //接口不存在会进入
    httpClient.catchRequest(err);
    //请求失败的话，isRefreshing值改为false
    store.dispatch(resetRefreshing(false));
    console.log(err, '汇率222');
  })
}

//获取公告
function getNotice(para) {
  httpClient.client.then(function (event) {
    event.platform.getNotices(para)
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "公告!");
            store.dispatch(noticeLoaded(res.obj));
          }
        })
      }).catch((err) => {
      console.log(err, '公告111');
    })
  }).catch((err) => {
    console.log(err, '公告222');
  })
}

//获取收益
function getMiningSpeed(para) {
  httpClient.client.then(function (event) {
    event.statitics.getMining(para)
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "获取收益!");
            store.dispatch(miningSpeedLoaded(res.obj));
          }
        })
      }).catch((err) => {
      console.log(err, '获取收益111');
    })
  }).catch((err) => {
    console.log(err, '获取收益222');
  })
}

//获取全网难度
function getNetWorker() {
  httpClient.client.then(function (event) {
    event.statitics.getMiningNetwork()
      .then(function (res) {
        httpClient.resBack(res, function () {
          if (res.status === 200) {
            console.log(res, "获取全网难度!");
            store.dispatch(netWorkerLoaded(res.obj));
          }
        })
      }).catch((err) => {
      console.log(err, '获取全网难度111');
    })
  }).catch((err) => {
    console.log(err, '获取全网难度222');
  })
}