import DeviceInfo from 'react-native-device-info';
const clientId = DeviceInfo.getUniqueID();
const appName = DeviceInfo.getApplicationName();
const version = DeviceInfo.getVersion();
const systemVersion = DeviceInfo.getSystemVersion();
console.log(clientId, 'clientId--->>>');

const LocalStore = {
  deviceInfo: {
    accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwbGF0Zm9ybV9pZCI6MiwiYWNjb3VudF9pZCI6MSwic2Vzc2lvbl9pZCI6IjZhNTY0NTY4N2E0YzVmNzMzNDQ2MzE3NTY2NDI3Nzc4NGE0MTdhNTg2ZTYzNGI1NzRlNDg3YTQ0Mzc2ODRjNjY3NDM4MzQ2NjM5N2E1MDJkNDEzMDUxM2QiLCJleHAiOjE1MjQ5ODE3NjIsIm1lcmNoYW50X2lkIjoxLCJjdXN0b21lcl9pZCI6MX0.rY17afY6D_hHJKW4sXGTuJA1FdCMFwN9Rc7ZV-1X_zI",
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