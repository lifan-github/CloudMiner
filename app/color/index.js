const sceneStart = 'red';
const sceneEnd = 'blue';
const colorfulText = '#F5A623'; //彩黄色字
const succeedColor = '#7ED321'; //完成状态
const doubtfulColor = '#FF8E5F'; //等待状态
const warnColor = '#fe2222'; //警告

let ColorStore = {
  /**
   * 通用字体颜色
   */
  cardTitle: colorfulText,
  gradient: [sceneStart, sceneEnd],
  logoBgStart: sceneStart, // 渐变色起始
  logoBgStop: sceneEnd, // 渐变色终点
  navLeftBack: "#333", // 导航
  /**
   * 登录页
   */
  sliderLine: sceneStart,
  placeholder: 'rgba(0,0,0,0.38)',
  /**
   * 首页
   */
  noticeDot: warnColor,
  /**
   * 商品页
   */
  TabViewUnderLine: sceneStart,
  cardRMB: colorfulText,
};

export default ColorStore