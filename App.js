import React, {Component} from 'react';
import {StyleSheet, Text, View, BackHandler, StatusBar, DeviceEventEmitter, ToastAndroid} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

let WeChat = require('react-native-wechat'); // 用inport 导入直接报错

// 引入react-redux
import {Provider} from 'react-redux';
// 引入store文件
import store from './app/redux/store';

import './app/utils/Global'; // 全局变量
import TabIcon from './app/components/TabIcon';
//====启动登录页=====//
import Starting from './app/pages/Login/Starting';
import Guide from './app/pages/Login/Guide';
import Login from './app/pages/Login/Login';
//======首页=======//
import Home from './app/pages/Home';
import Notice from './app/pages/Home/Notice';
//======商品页=======//
import Product from './app/pages/Product';
import Product2 from './app/pages/Product/Product2';
//======我的页=======//
import Mine from './app/pages/Mine';
import UserInfoPage from './app/pages/Mine/UserInfo';
import NickName from './app/pages/Mine/UserInfo/NickName';
import OrderPage from './app/pages/Mine/Order';
import EarningPage from './app/pages/Mine/Earning';
import CollectRecord from './app/pages/Mine/CollectRecord';
import BuyingPatterns from './app/pages/Mine/BuyingPatterns';
import NoticePage from './app/pages/Mine/Notice';
import ExchRate from './app/pages/Mine/ExchRate';
import Setting from './app/pages/Mine/Setting';
import BtcAddress from "./app/pages/Mine/Setting/BtcAddress";
import AboutUs from './app/pages/Mine/AboutUs';
import Clause from './app/pages/Mine/AboutUs/Clause';
//======顶层错误提示页=======//
import ErrorModal from './app/components/ErrorModal';


const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION:', action, Actions.currentScene);
    // console.log('Actions:', Actions);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: '#f5f5f5',
});

const onBackPress = () => {
  const mainRoute = ['guide', 'login', 'starting', 'home', 'product', 'mine'];
  if (mainRoute.indexOf(Actions.currentScene) !== -1) {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 退出APP之前清空顶层modal的sence场景
      Actions.starting({type: 'reset'});
      BackHandler.exitApp();
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再次点击退出程序', 1500);
  } else {
    Actions.pop();
  }
  return true
};

export default class App extends Component {
  componentWillMount() {
  }

  componentDidMount() {
    WeChat.registerApp('wxb04a1095ab63190c');
  }

  render() {
    return (
      <Provider store={store}>
        <Router
          createReducer={reducerCreate}
          getSceneStyle={getSceneStyle}
          backAndroidHandler={onBackPress}
        >
          <Overlay key="overlay">
            <Modal
              key="modal"
              hideNavBar
              transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}
            >
              <Scene
                key="starting"
                component={Starting}
                hideNavBar
                initial={true}
              />
              <Scene
                key="guide"
                component={Guide}
                hideNavBar
              />
              <Scene
                title='登录'
                key="login"
                component={Login}
                hideNavBar
              />
              <Lightbox key="root">
                <Tabs
                  key="tabbar"        // 唯一标识
                  wrap={true}         // 自动使用自己的导航栏包装每个场景
                  showLabel={false}   // 显示文字
                  tabBarStyle={styles.tabBarStyle} // tabBar的样式
                  swipeEnabled={false}// 是否可以滑动
                  headerMode='screen' // 页面切换方式
                  icon={TabIcon}      // 自定义Icon显示方式
                  lazy={true}         // 是否默认渲染tabbar
                  tabBarPosition={'bottom'}       // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部
                  activeBackgroundColor='white'   // 选中tabbar的背景色
                  inactiveBackgroundColor='white' // 未选中tabbar的背景色
                  activeTintColor={ColorStore.themeColor}       // 选中tabbar图标下面文字的颜色
                  inactiveTintColor='#999'        // 未选中tabbar图标下面文字的颜色
                >
                  <Stack
                    key="Test1"
                    title='首页'
                    activeIcon={IconStore.home}
                    inactiveIcon={IconStore.home2}
                    transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}
                  >
                    <Scene
                      component={Home}
                      key="home"
                      title={'首页'}
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle="分享"
                      onLeft={() => alert('Right button')}
                      renderLeftButton={() => <View/>}
                    />
                    <Scene component={Notice} key="notice" title="公告"/>
                  </Stack>

                  <Stack
                    key='Test2'
                    title='商品'
                    activeIcon={IconStore.miners}
                    inactiveIcon={IconStore.miners2}
                    transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}
                  >
                    <Scene component={Product} key="product"/>
                    <Scene component={Product2} key="product2"/>
                  </Stack>

                  <Stack
                    key="Test3"
                    title='我的'
                    activeIcon={IconStore.personal}
                    inactiveIcon={IconStore.personal2}
                    transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}
                  >
                    <Scene
                      hideNavBar
                      component={Mine}
                      key="mine"
                    />
                    <Scene
                      title='个人信息'
                      component={UserInfoPage}
                      key="userInfoPage"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='昵称'
                      component={NickName}
                      key="nickName"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='订单'
                      component={OrderPage}
                      key="orderPage"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='总收益'
                      component={EarningPage}
                      key="earningPage"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='收币记录'
                      component={CollectRecord}
                      key="collectRecord"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='购买方式'
                      component={BuyingPatterns}
                      key="buyingPatterns"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='公告'
                      component={NoticePage}
                      key="noticePage"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='汇率'
                      component={ExchRate}
                      key="exchRate"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='设置'
                      component={Setting}
                      key="setting"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='收币地址'
                      component={BtcAddress}
                      key="btcAddress"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='关于我们'
                      component={AboutUs}
                      key="aboutUs"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                    <Scene
                      title='服务与隐私'
                      component={Clause}
                      key="clause"
                      hideTabBar
                      titleStyle={styles.titleStyles}
                      onRight={() => alert('Right button')}
                      rightTitle=""
                    />
                  </Stack>
                </Tabs>
                <Scene key="errorModal" component={ErrorModal}/>
              </Lightbox>
            </Modal>
          </Overlay>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
    height: 50,
  },
  titleStyles: {
    color: '#333',
    alignSelf: 'center'
  }
});
