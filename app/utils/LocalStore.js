import DeviceInfo from 'react-native-device-info';
const clientId = DeviceInfo.getUniqueID();
const appName = DeviceInfo.getApplicationName();
const version = DeviceInfo.getVersion();
const systemVersion = DeviceInfo.getSystemVersion();
console.log(clientId, 'clientId--->>>');

const LocalStore = {
  deviceInfo: {
    appId: "63bd4ec5bb4fcc85038cce200e6027a9dd5a9d7c304eecbff37549069ea94331",
    clientId: clientId,
    appName,
    version,
    systemVersion
  },
  signOutApp() {
    Actions.login({type: 'reset'});
    storage.remove({key: 'accessToken'});
  }
};

export default LocalStore