import DeviceInfo from 'react-native-device-info';
import store from '../redux/store';

const clientId = DeviceInfo.getUniqueID();
const appName = DeviceInfo.getApplicationName();
const version = DeviceInfo.getVersion();
const systemVersion = DeviceInfo.getSystemVersion();
console.log(clientId, 'clientId--->>>');

const LocalStore = {
  deviceInfo: {
    accessToken: "",
    appId: "63bd4ec5bb4fcc85038cce200e6027a9dd5a9d7c304eecbff37549069ea94331",
    clientId: clientId,
    appName,
    version,
    systemVersion
  },
  signOutApp() {
    const StoreInit = JSON.stringify(store.getState());  // 初始值为空字符串
    console.log(StoreInit,'StoreInit');
    // store = JSON.parse(StoreInit);
    // console.log(store,'store123333');
    Actions.login({type: 'reset'});
    storage.remove({key: 'accessToken'});
    LocalStore.deviceInfo.accessToken = "";
  }
};

export default LocalStore