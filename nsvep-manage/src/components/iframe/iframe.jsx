/*
 * @Author: XN
 * @Date: 2020-08-03 15:33:11
 * @LastEditTime: 2020-10-31 20:01:18
 * @LastEditors: XN
 * @Description:
 * @FilePath: /te/src/components/iframe/iframe.jsx
 */
import React, { Component } from "react";
import {portURL} from '../../config/config.js'

export default class Iframe extends Component {
  constructor() {
    super();
    this.state = {
      iFrameHeight: "0px",
      iFrameWidth:"0px"
    };
    this.saveRef = ref => {
      this.refDom = ref;
    };
  }
  render() {
    return (
      <div ref={this.saveRef}>
        <iframe
          style={{
            width: this.state.iFrameWidth,
            height: this.state.iFrameHeight,
            overflow: "visible"
          }}
          allowfullscreen
          onLoad={() => {
            this.setState({
              iFrameWidth: document.body.clientWidth * 0.8 + "px",
              iFrameHeight: document.body.clientHeight * 0.9 + "px"
            });
          }}
          ref="iframe"
          src={portURL}
          width={this.state.iFrameWidth-200}
          height={this.state.iFrameHeight}
          frameBorder="0"
        />
      </div>
    );
  }
}
