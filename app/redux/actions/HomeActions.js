import * as types from '../constant/ActionTypes';

// 获取汇率
export function getExchangeRate(data){
  return {
    type: types.GET_EXCHNAGE_RATE,
    data
  }
}

export function exchangeRateLoaded(data){
  return {
    type: types.EXCHNAGE_RATE_LOADED,
    data
  }
}

// 获取公告
export function getNotice(data){
  return {
    type: types.GET_NOTICE,
    data
  }
}

export function noticeLoaded(data){
  return {
    type: types.NOTICE_LOADED,
    data
  }
}

// 获取用户收益
export function getMiningSpeed(data){
  return {
    type: types.GET_MINING_SPEED,
    data
  }
}

export function miningSpeedLoaded(data){
  return {
    type: types.MINING_SPEED_LOADED,
    data
  }
}

// 获取全网难度
export function getNetWorker(){
  return {
    type: types.GET_NET_WORDER
  }
}

export function netWorkerLoaded(data){
  return {
    type: types.NET_WORDER_LOADED,
    data
  }
}

