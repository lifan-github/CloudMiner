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

// 获取单个商品
export function getProductById(data) {
  return {
    type: types.GET_PRODUCT_BY_ID,
    data
  }
}

// 渲染单个商品
export function productByIdData(data) {
  return {
    type: types.PRODUCT_BY_ID_DATA,
    data
  }
}

// 顶部导航栏切换
export function slectedNavBar(data) {
  return {
    type: types.SLECTED_NAVBAR,
    data
  }
}

//单个商品下单详情
export function singleProduct(data) {
  return {
    type: types.SINGLE_PRODUCT,
    data
  }
}