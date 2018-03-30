import LocalStore from '../../utils/LocalStore';
import {slogan} from '../../res/text.json';
export default {
  /**
   * 启动引导登录页
   */
  login: "登录",
  appName: LocalStore.deviceInfo.appName,
  slogan: slogan,
  initApp: '立即体验',
  welcome: '欢迎来到' + LocalStore.deviceInfo.appName,
  emailPlaceholder: '请输入邮箱',
  phonePlaceholder: '请输入手机号',
  vCodePlaceholder: '请输入验证码',
  loginDynamically: '验证码登陆  无需注册',
  /**
   * 首页
   */
  difficultyOfWholeNet: '全网难度',
  difficultyOfNow: '当前难度',
  nextAdjustTime: '距离调整时间约',
  nextDifficulty: '下一难度',
  estimatedEarnings: '预计每日收益',
  nextEstimatedEarnings: '下一难度预计每日收益',
  /**
   * 商品页
   */
  soldByPiece: '按台购买',
  soldBySpeed: '按算力购买',
  buyMethod: '购买方式',
  goodsSpeed: '每台算力',
  speedInUnit: '每份算力',
  EachEarningsDaily: '每份预期每日收益',
  estimatedEarningsPreP: '预计每日收益(1T)',
  power: '功耗',
  manageFee: '管理费',
  /**
   * 订单页
   */
  buyOrders: '订单',
  orderDetail: '订单详情',
  allOrder: "全部",
  toBePaidOrder: "待支付",
  confirmedOrder: "已确认",
  completedOrder: "已完成",
  cancelledOrder: "已取消",
  /**
   * 设置页面
   */
  setting: '设置',
  myBtcAddr: '收币地址',
  walletDownload: '钱包下载',
  notifications: '消息提醒',
  currentVersion: '当前版本',
  aboutUs: '关于我们',
  logout: '退出登录',
  changeAddr: '修改地址',
  clauseTitle: '服务条款及隐私政策',
  /**
   * 收币记录
   */
  earningList: '收币记录',
  earningListDetails: '收币详情',
  /**
   * 购买方式
   */
  howToPay: '购买方式',
  /**
   * 公告
   */
  noticeDetail: '公告详情',
  /**
   * 用户设置
   */
  personalInfo: '个人信息',
  faceImg: '头像',
  nickName: '昵称',
  phoneNumbers: '手机',
  emailNumbers: "邮箱",
  changePhone: '修改手机',
  /**
   * 总收益
   */
  digStatistics: '总收益',
  monthlyIncome: '月收益',
  incomeDetail: '收益详情',
}