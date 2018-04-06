import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';
import store from '../store';
import {exchangeRateLoaded, noticeLoaded, miningSpeedLoaded, netWorkerLoaded} from '../actions/HomeActions';

let homeInit = {
  rateCny: {}, // 汇率
  notices: {}, // 公告
  miningSpeed: {}, // 收益
  netWorker: {}, // 全网难度
  rateRefreshing: false, // 汇率页面刷新状态
};

export default function HomeReducer(state = homeInit, action) {
  switch (action.type) {
    case types.GET_EXCHNAGE_RATE:
      getExchangeRate(action.data);
      return state;
    case types.EXCHNAGE_RATE_LOADED:
      return Object.assign({}, state, {rateCny: action.data});
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
      console.log(err, '汇率111');
    })
  }).catch((err) => {
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
      Actions.errorModal();
    })
  }).catch((err) => {
    console.log(err, '公告222');
    Actions.errorModal();
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
      Actions.errorModal();
    })
  }).catch((err) => {
    console.log(err, '获取收益222');
    Actions.errorModal();
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
      Actions.errorModal();
    })
  }).catch((err) => {
    console.log(err, '获取全网难度222');
    Actions.errorModal();
  })
}