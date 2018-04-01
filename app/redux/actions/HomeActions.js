import * as types from '../constant/ActionTypes';

// 获取汇率
export function getExchangeRate(data){
  return {
    type: types.GET_EXCHNAGE_RATE,
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

// 获取用户收益
export function getMiningSpeed(data){
  return {
    type: types.GET_MINING_SPEED,
    data
  }
}

// 获取全网难度
export function getNetWorker(){
  return {
    type: types.GET_NET_WORDER
  }
}