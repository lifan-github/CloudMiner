import {
  StyleSheet
} from 'react-native';

const commonStyle = StyleSheet.create({
  //======> APP中出现的字体颜色，一下只是案例
  color255: {
    color: "#fff"
  },
  color000: {
    color: "#000"
  },
  color333: {
    color: "#333"
  },
  color4d: {
    color: "#4d4d4d"
  },
  color666: {
    color: "#666"
  },
  color74: {
    color: "#747474"
  },
  color999: {
    color: "#999"
  },
  viewBg255: {
    backgroundColor: "#fff"
  },
  //======> APP中出现的字体大小
  fontSize14: {
    fontSize: 14
  },
  fontSize16: {
    fontSize: 16
  },
  fontSize18: {
    fontSize: 18
  },
  fontSize20: {
    fontSize: 20
  },
  fontSize22: {
    fontSize: 22
  },
  fontSize24: {
    fontSize: 24
  },
  fontSize26: {
    fontSize: 26
  },
  fontSize28: {
    fontSize: 28
  },
  fontSize30: {
    fontSize: 30
  },
  fontWeight: {
    fontWeight: "500"
  },
  //======> APP中布局出现的常见样式
  flex1: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
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
  paddingLR20: {
    paddingHorizontal: 20
  },
  alignItem: {
    alignItems: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default commonStyle


/**
 * 此文件主要对整个APP的共同样式进行整合
 */