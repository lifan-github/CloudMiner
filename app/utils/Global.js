import React, { Component } from 'react';
import { Dimensions, PixelRatio, Platform} from 'react-native';


// 统一管理项目中的路由
import { Actions } from "react-native-router-flux";

// 项目中的图片
import ImageStore from '../images';

// 项目中的文字
import TextStore from '../text';

// 项目中的文字图片
import IconStore from '../images/icon';

// 项目中的颜色
import ColorStore from '../color';

// 项目中的公共样式
import commonStyle from '../styles';

// 处理安卓，iOS字体不同的类，使用方法 fontSize:FONT_SIZE(20)
import FontSize from './FontSize';

// 处理安卓，iOS宽高的区别，使用方法 width:px2dp(20)
import { px2dp } from './Tool';

//====== 设备资源管理 ======

// 通过系统API获得屏幕宽高
let { height, width } = Dimensions.get('window');

// 系统是iOS
global.iOS = (Platform.OS === 'ios');

// 系统是安卓
global.Android = (Platform.OS === 'android');

// 获取屏幕宽度
global.SCREEN_WIDTH = width;

// 获取屏幕高度
global.SCREEN_HEIGHT = height;

// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();

// 最小线宽
global.pixel = 1 / PixelRatio;

// 获取屏幕宽度
global.SCREEN_WIDTH = width;

// 获取屏幕高度
global.SCREEN_HEIGHT = height;

// 适配字体
global.FONT_SIZE = FontSize;

// 屏幕适配
global.px2dp = px2dp;

//====== 公共资源管理 ======

// router跳转的方法
global.Actions = Actions;

// 项目中的图片
global.ImageStore = ImageStore;

// 项目中的文字
global.TextStore = TextStore;

// 项目中的文字图片
global.IconStore = IconStore;

// 项目中的颜色
global.ColorStore = ColorStore;

// 项目中的公共样式
global.commonStyle = commonStyle;



