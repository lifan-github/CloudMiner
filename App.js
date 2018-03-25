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
// 引入react-redux
import {Provider} from 'react-redux';
// 引入store文件
import store from './app/redux/store';
console.log(store,'store123')

import ImageStore from './app/images';
import TabIcon from './app/components/TabIcon';

import Starting from './app/pages/Login/Starting';
import Guide from './app/pages/Login/Guide';
import Login from './app/pages/Login/Login';

import Home from './app/pages/Home';
import Notice from './app/pages/Home/Notice';

import Product from './app/pages/Product';
import Product2 from './app/pages/Product/Product2';
import Mine from './app/pages/Mine';

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
  const mainRoute = ['login', 'starting', 'home', 'product', 'mine'];
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
    console.log("componentWillMount----root");
  }

  componentDidMount() {
    console.log("componentDidMount----root");
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
                  activeTintColor='#4ECBFC'       // 选中tabbar图标的颜色
                  inactiveTintColor='#aaa'        // 未选中tabbar图标的颜色
                >
                  <Stack
                    key="Test1"
                    image={ImageStore.commonPic.logo}
                    selectedImage={ImageStore.commonPic.userPhoto}
                    transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}
                  >
                    <Scene component={Home} key="home" title={'首页'}/>
                    <Scene component={Notice} key="notice" title="公告"/>
                  </Stack>

                  <Stack
                    key='Test2'
                    title='商品'
                    image={ImageStore.commonPic.logo}
                    selectedImage={ImageStore.commonPic.userPhoto}
                    transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}
                  >
                    <Scene component={Product} key="product"/>
                    <Scene component={Product2} key="product2"/>
                  </Stack>

                  <Stack
                    key="Test3"
                    title='我的'
                    image={ImageStore.commonPic.logo}
                    selectedImage={ImageStore.commonPic.userPhoto}
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
});
