import DeviceInfo from 'react-native-device-info';
const clientId = DeviceInfo.getUniqueID();
console.log(clientId,'clientId--->>>');

const LocalStore = {
  deviceInfo: {
    accessToken: "",
    appId: "63bd4ec5bb4fcc85038cce200e6027a9dd5a9d7c304eecbff37549069ea94331",
    clientId: clientId
  },
};


export default LocalStore