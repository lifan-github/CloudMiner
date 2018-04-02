import {combineReducers , createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

/**
 * 所有的reducers
 */
import LoginRuducers from './reducers/LoginReducers';
import HomeReducer from './reducers/HomeReducers';
import MineReducer from './reducers/MineReducers';

/**
 * 中间件
 * @type {*[]}
 */
// redux-logger打印logger的中间件
// redux-thunk是用来发送异步请求的中间件，用了thunk之后,一般的操作是将网络请求的方法放在action中
let middlewares = [
  thunk,
  logger,
];

const allReducers = combineReducers({
  LoginRuducers,
  HomeReducer,
  MineReducer
});

/**
 * 绑定
 * @type {StoreEnhancerStoreCreator<StoreEnhancer<S>>}
 */
//通过applyMiddleware将中间件添加
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);


const store = createStoreWithMiddleware(allReducers);

export default store