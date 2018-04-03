import * as types from '../constant/ActionTypes';

// 获取商品列表
export function getAllProduct(){
  return {
    type: types.GET_ALL_PRODUCT
  }
}
// 触发页面渲染用户信息
export function productLoaded(data){
  return {
    type: types.PRODUCT_LOADED,
    data
  }
}
