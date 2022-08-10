/*
 * @Author: XN
 * @Date: 2020-07-15 10:42:08
 * @LastEditTime: 2020-07-28 19:08:57
 * @LastEditors: XN
 * @Description: redux的reducers
 * @FilePath: /gitee-nsvep/src/store/reducer.js
 */

const defaultState = {
};

export default (state = defaultState, action) => {
  if (action.type === "changeInput") {
    // reducers处理业务逻辑返回给store
    let newState = JSON.parse(JSON.stringigy(state));
    newState.inputValue = action.value;
    return newState;
  }
  return state;
};
