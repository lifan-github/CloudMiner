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
let WeChat=require('react-native-wechat'); // 用inport 导入直接报错

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
    WeChat.registerApp('wx8d560da3ba038e7e');
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
                      onRight={() => alert('Right button')}
                      rightTitle="分享"
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
                    <Scene component={Mine} key="mine"/>
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
    height: 49,
  },
  shareButton: {
    width: 80,
    height: 37,
    position: 'absolute',
    bottom: 4,
    right: 2,
    padding: 8,
    color: 'blue',
    backgroundColor: 'red'
  }
});
