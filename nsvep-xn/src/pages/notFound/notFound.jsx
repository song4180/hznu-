/*
 * @Author: your name
 * @Date: 2020-07-25 15:54:23
 * @LastEditTime: 2020-11-02 18:45:07
 * @LastEditors: XN
 * @Description: 404界面
 * @FilePath: /gitee-nsvep/src/pages/notFound/notFound.jsx
 */

import React, { Component } from "react";
import {Link} from 'react-router-dom'
import "./notFound.less";

export default class notFound extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="NotFound">
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text text-anchor="middle" x="50%" y="80%">
              404
            </text>
          </symbol>

          <g className="g-ants">
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
            <use xlinkHref="#s-text" className="text"></use>
          </g>
        </svg>
        <div className="content">
          <h1>Page Not Found</h1>
          <Link to="/home">返回首页</Link> 
        </div>
      </div>
    );
  }
}
