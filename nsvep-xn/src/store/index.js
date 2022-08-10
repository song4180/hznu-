/*
 * @Author: XN
 * @Date: 2020-07-15 10:39:42
 * @LastEditTime: 2020-07-28 19:08:34
 * @LastEditors: XN
 * @Description: redux的store
 * @FilePath: /gitee-nsvep/src/store/index.js
 */

import { createStore } from "redux";
import reducer from "./reducer";
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
