import * as types from '../constant/ActionTypes';


let initApp = {
  userInfo: {}, // 用户信息
};

export default function LoginReducer(state = initApp, action) {
  switch (action.type) {
    case types.SEND_CODE:
      return state;
    default:
      return state;
  }
}