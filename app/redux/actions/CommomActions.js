import * as types from '../constant/ActionTypes';

//页面初始化的isRefreshing状态
export function resetRefreshing(status){
  return {
    type: types.RESET_REFRESHING,
    status
  }
}

