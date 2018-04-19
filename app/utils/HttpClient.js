import {ToastAndroid} from 'react-native';
import Swagger from 'swagger-client';
import LocalStore from './LocalStore';

let httpClient = {
  client: new Swagger({
    url: 'http://10.10.0.234:8080/doc/customer/v1/swagger.json',
    usePromise: true,
    fetchSpecTimeout: 6000
  }),
  resBack(res, callback) {
    callback(res);
  },
  setHeader(event) {
    event.clientAuthorizations.add('AccessToken', new Swagger.ApiKeyAuthorization('X-Wemining-Access-Token', LocalStore.deviceInfo.accessToken, 'header'));
    event.clientAuthorizations.add('AppId', new Swagger.ApiKeyAuthorization('X-Wemining-App-Id', LocalStore.deviceInfo.appId, 'header'));
    event.clientAuthorizations.add('ClientId', new Swagger.ApiKeyAuthorization('X-Wemining-Client-Id', LocalStore.deviceInfo.clientId, 'header'));
  },
  /*errorModal(msg) {
    let timer = setTimeout(() => {
      Actions.refresh({key: Math.random(), ...msg}); // refresh 刷新当前页面，key值不能相同
      timer && clearTimeout(timer); // 只是延时，可以不用
    }, 1000)
  },*/
  catchRequest(err){
    if(err.obj && (err.obj.code === 403 || 401)){
      //退出登录
      LocalStore.signOutApp();
      //提示用户：您的身份信息失效 请重新登录
      ToastAndroid.showWithGravity('您的身份信息失效 请重新登录', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }else{
      Actions.errorModal({icon_type: "fail", content: "网络不好 请重试"});
    }
  }
};

export default httpClient;


