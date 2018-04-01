import * as types from '../constant/ActionTypes';
import httpClient from '../../utils/HttpClient';

let homeInit = {
  rateCny: {}, // 汇率
  notices: {}, // 公告
  miningSpeed: {}, // 收益
  netWorker: {}, // 全网难度
};

export default function HomeReducer(state = homeInit, action) {
  switch (action.type) {
    case types.GET_EXCHNAGE_RATE:
      getExchangeRate(action.data);
      return state;
    case types.GET_NOTICE:
      getNotice(action.data);
      return state;
    case types.GET_MINING_SPEED:
      getMiningSpeed(action.data);
      return state;
    case types.GET_NET_WORDER:
      getNetWorker();
      return state;
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
            homeInit.rateCny = Object.assign(homeInit.rateCny, res.obj);
          }
        })
      }).catch((err) => {
      console.log(err, '汇率111');
      Actions.errorModal();
    })
  }).catch((err) => {
    console.log(err, '汇率222');
    Actions.errorModal();
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
            homeInit.notices = Object.assign(homeInit.notices, res.obj);
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
            homeInit.miningSpeed = Object.assign(homeInit.miningSpeed, res.obj);
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
            homeInit.netWorker = Object.assign(homeInit.netWorker, res.obj);
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