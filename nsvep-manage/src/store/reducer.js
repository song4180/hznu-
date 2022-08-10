/*
 * @Author: XN
 * @Date: 2020-07-15 10:42:08
 * @LastEditTime: 2020-10-12 17:03:17
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/store/reducer.js
 */

import * as constants from "./actionTypes";

/**
 * @description: 默认数据
 * @param {type}
 * @return:
 */
const defaultState = {
  className: "",
  adminId: "1",
  pageNum: 0,
  pageSize: 0
};

/**
 * @description: 处理函数
 * @param {type}
 * @return:
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case "classNameChange":
      return {
        ...state,
        className: action.payload.className,
        pageNum: action.payload.pageNum,
        adminId: action.payload.adminId,
        pageSize: action.payload.pageSize
      };
    case "count":
      return;
    default:
      return state;
  }
};
