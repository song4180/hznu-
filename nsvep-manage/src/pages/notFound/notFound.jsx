/*
 * @Author: your name
 * @Date: 2020-07-25 15:54:23
 * @LastEditTime: 2020-11-06 20:45:42
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/pages/notFound/notFound.jsx
 */

import React, { Component } from "react";
import {Link} from 'react-router-dom'

import "./notFound.css";

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

          <g class="g-ants">
            <use xlinkHref="#s-text" class="text"></use>
            <use xlinkHref="#s-text" class="text"></use>
            <use xlinkHref="#s-text" class="text"></use>
            <use xlinkHref="#s-text" class="text"></use>
            <use xlinkHref="#s-text" class="text"></use>
          </g>
        </svg>
        <div class="content">
          <h1>Page Not Found</h1>
              <Link to="/home">返回首页</Link> 
        </div>
      </div>
    );
  }
}
