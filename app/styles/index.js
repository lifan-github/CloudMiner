const commonStyle = {
  //======>APP中布局出现的常见样式,
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  around: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageColor: { // 背景色
    backgroundColor: "#f5f5f5"
  },
  bgColor: {
    backgroundColor: "#fff"
  },
  intervalView: { // 下滑线
    height: 10
  },
  paddingTb10: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default commonStyle


/**
 * 此文件主要对整个APP的共同样式进行整合
 */