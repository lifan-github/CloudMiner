import DeviceInfo from 'react-native-device-info';
const clientId = DeviceInfo.getUniqueID();
const appName = DeviceInfo.getApplicationName();
const version = DeviceInfo.getVersion();
const systemVersion = DeviceInfo.getSystemVersion();
console.log(clientId, 'clientId--->>>');

const LocalStore = {
  deviceInfo: {
    appId: "35738f84e629ef5c3ecd02732c7a9a729cab3fb4fc6a1d05dbbd662b085f243d",
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