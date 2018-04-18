import Swagger from 'swagger-client';
import LocalStore from './LocalStore';
import {storage} from './StorageStore';

let accessToken;
storage.load({
  key: "accessToken"
}).then(ret => {
  accessToken = ret.accessToken;
  console.log(ret,'1111111111111_______')
}).catch(err => {
  accessToken = null;
  console.log(err,'1111111111111_______22222222222')
});

let httpClient = {
  client: new Swagger({
    url: 'http://10.10.0.234:8080/doc/customer/v1/swagger.json',
    usePromise: true,
    fetchSpecTimeout: 60000
  }),
  resBack(res, callback) {
    callback(res);
  },
  setHeader(event) {
    event.clientAuthorizations.add('AccessToken', new Swagger.ApiKeyAuthorization('X-Wemining-Access-Token', accessToken, 'header'));
    event.clientAuthorizations.add('AppId', new Swagger.ApiKeyAuthorization('X-Wemining-App-Id', LocalStore.deviceInfo.appId, 'header'));
    event.clientAuthorizations.add('ClientId', new Swagger.ApiKeyAuthorization('X-Wemining-Client-Id', LocalStore.deviceInfo.clientId, 'header'));
  },
  errorModal(msg) {
    let timer = setTimeout(() => {
      Actions.refresh({key: Math.random(), ...msg}); // refresh 刷新当前页面，key值不能相同
      timer && clearTimeout(timer); // 只是延时，可以不用
    }, 1000)
  }
};

export default httpClient;


