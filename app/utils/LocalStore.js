import DeviceInfo from 'react-native-device-info';
const clientId = DeviceInfo.getUniqueID();
const appName = DeviceInfo.getApplicationName();
const version = DeviceInfo.getVersion();
const systemVersion = DeviceInfo.getSystemVersion();
console.log(clientId, 'clientId--->>>');

const LocalStore = {
  deviceInfo: {
    accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwbGF0Zm9ybV9pZCI6MiwiYWNjb3VudF9pZCI6Miwic2Vzc2lvbl9pZCI6IjcxNGQ2MTQ5MzMzOTU3NzU3MzcxNDY3ODYxNjg3MDM1NzA1Nzc5MzI3MDZhNTAzMzQxNDI2NjMzNmY1NjUzNjc2YTdhNDQ3MTRhMzU1MTVhNWE3OTZmM2QiLCJleHAiOjE1MjQ2MzM1NDQsIm1lcmNoYW50X2lkIjoxLCJjdXN0b21lcl9pZCI6MX0.rlaLsBxctwAfvtZP8I3UOG8OZsOXMSNSRVEohDTz9g4",
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