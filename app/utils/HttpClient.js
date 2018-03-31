import Swagger from 'swagger-client';
import LocalStore from './LocalStore';

let httpClient = {
  client: new Swagger({
    url: 'https://api.wemining.org:14680/doc/customer/v1/swagger.json',
    usePromise: true,
    fetchSpecTimeout: 60000
  }),
  resBack(res, callback) {
    callback(res);
  },
  setHeader(event) {
    event.clientAuthorizations.add('AccessToken', new Swagger.ApiKeyAuthorization('X-Wemining-Access-Token', LocalStore.deviceInfo.accessToken, 'header'));
    event.clientAuthorizations.add('AppId', new Swagger.ApiKeyAuthorization('X-Wemining-App-Id', LocalStore.deviceInfo.appId, 'header'));
    event.clientAuthorizations.add('ClientId', new Swagger.ApiKeyAuthorization('X-Wemining-Client-Id', LocalStore.deviceInfo.clientId, 'header'));
  }
};

export default httpClient;


