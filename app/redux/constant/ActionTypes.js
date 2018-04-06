/**
 * 全局APP
 * @type {string}
 */
export const REQUEST_ERR = 'REQUEST_ERR'; //错误反馈
/**
 * 登录页
 * @type {string}
 */
export const SEND_CODE = 'SEND_CODE'; // 发送验证码
export const LOGIN_APP = 'LOGIN_APP'; // 登录APP
export const EXIT_LOGIN = 'EXIT_LOGIN'; // 退出登录

/**
 * 首页
 * @type {string}
 */
export const GET_EXCHNAGE_RATE = 'GET_EXCHNAGE_RATE'; // 汇率
export const EXCHNAGE_RATE_LOADED = 'EXCHNAGE_RATE_LOADED';
export const GET_NOTICE = 'GET_NOTICE'; // 公告
export const NOTICE_LOADED = 'NOTICE_LOADED';
export const GET_MINING_SPEED = 'GET_MINING_SPEED'; // 用户收益
export const MINING_SPEED_LOADED = 'MINING_SPEED_LOADED';
export const GET_NET_WORDER = 'GET_NET_WORDER'; // 全网难度
export const NET_WORDER_LOADED = 'NET_WORDER_LOADED';

/**
 * 我的页面
 * @type {string}
 */
export const GET_MY_INFOMATION = 'GET_MY_INFOMATION'; //获取用户信息
export const INFO_LOADED = 'INFO_LOADED'; //渲染用户信息
export const UPLODA_HEAD_IMG = 'UPLODA_HEAD_IMG'; //上传用户头像
export const SET_USER_NAME = 'SET_USER_NAME'; //更改用户昵称

/**
 * 商品页面
 * @type {string}
 */
export const GET_PRODUCT = 'GET_PRODUCT'; //获取商品列表
export const PRODUCT_T_LOADED = 'PRODUCT_T_LOADED'; //渲染商品列表（按台）
export const PRODUCT_S_LOADED = 'PRODUCT_S_LOADED'; //渲染商品列表（按算力）
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'; //获取单个商品
export const PRODUCT_BY_ID_DATA = 'PRODUCT_BY_ID_DATA'; //渲染单个商品
export const SLECTED_NAVBAR = 'SLECTED_NAVBAR'; //导航栏切换
