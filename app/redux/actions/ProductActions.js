import * as types from '../constant/ActionTypes';

// 获取商品列表
export function getProduct(data){
  return {
    type: types.GET_PRODUCT,
    data
  }
}
// 触发页面渲染用户信息(按台)
export function productTLoaded(data){
  return {
    type: types.PRODUCT_T_LOADED,
    data
  }
}

// 触发页面渲染用户信息(按算力)
export function productSLoaded(data){
  return {
    type: types.PRODUCT_S_LOADED,
    data
  }
}