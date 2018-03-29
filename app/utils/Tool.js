import {
  Platform
} from 'react-native';

// 设计图上的比例，宽度, 工具实际情况进行更改
let basePx = Platform.OS === 'ios' ? 750 : 720;

exports.px2dp = function px2dp(px: number): number {
  return px / basePx * SCREEN_WIDTH;
};

/**
 * 比如要设置View的宽度为屏幕的一半。就可以这样：
 * <View style={{width: px2dp(375)}} />
 */
