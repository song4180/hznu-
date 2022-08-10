/*
 * @Author: XN
 * @Date: 2020-08-05 20:54:14
 * @LastEditTime: 2020-08-06 10:52:59
 * @LastEditors: XN
 * @Description:
 * @FilePath: /gitee-nsvep/src/pages/loading/loading.jsx
 */
import React, { Component } from "react";
import "./loading.less";

export default class Loading extends Component {
  render() {
    return (
      <div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }
}
