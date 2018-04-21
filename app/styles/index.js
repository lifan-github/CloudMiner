import {
  StyleSheet,
} from 'react-native';

const commonStyle = {
  //======>APP中布局出现的常见样式,
  flex1: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
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
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  bgColor: {
    backgroundColor: "#fff"
  },
  yellowColor: {
    color: "#F5A623"
  },
  greenColor: {
    color: "#7ED321"
  },
  waitingColor: {
    color: "#FF8E5F"
  },
  intervalView: { // 间隔
    height: 10
  },
  intervalView20: {
    height: 20
  },
  listHeight55: {
    height: 55
  },
  paddingLR20: {
    paddingHorizontal: 20
  },
  paddingTb5: {
    paddingTop: 5,
    paddingBottom: 5
  },
  paddingTb10: {
    paddingTop: 10,
    paddingBottom: 10
  },
  viewBorderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd"
  },
  viewBorderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd"
  },
};

export default commonStyle


/**
 * 此文件主要对整个APP的共同样式进行整合
 */