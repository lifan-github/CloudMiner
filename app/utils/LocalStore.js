import DeviceInfo from 'react-native-device-info';
const clientId = DeviceInfo.getUniqueID();
const appName = DeviceInfo.getApplicationName();
const version = DeviceInfo.getVersion();
const systemVersion = DeviceInfo.getSystemVersion();
console.log(clientId, 'clientId--->>>');

const LocalStore = {
  deviceInfo: {
    accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwbGF0Zm9ybV9pZCI6MiwiYWNjb3VudF9pZCI6Miwic2Vzc2lvbl9pZCI6IjRhNmU2NTdhNGMzMjczMzY2ZDY2NWE3NDY0MzQ2MTc1NzU3MDc0MzQ2ZjUwNzY2ZjYyNGYzNTRjNzc1Zjc0NzM3ODM0MzQ3NTQxNWE0YzQ0NTA3NzM0M2QiLCJleHAiOjE1MjQ4MDc4MzMsIm1lcmNoYW50X2lkIjoxLCJjdXN0b21lcl9pZCI6MX0.eZ5MXNHNBpChTqc1WJmvE8J7H3VV2sEZu-qzx2NVtOQ",
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