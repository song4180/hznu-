/*
 * @Author: XN
 * @Date: 2020-08-03 17:11:54
 * @LastEditTime: 2020-08-06 09:50:53
 * @LastEditors: XN
 * @Description:
 * @FilePath: /gitee-nsvep/src/components/experienceText/iframe.jsx
 */
import React, { Component } from "react";
import { Spin } from "antd";
import memoryUtils from "../../utils/memoryUtils.js";
import { reqOpenExp } from "../../api/index.js";


export default class Iframe extends Component {
  constructor() {
    super();
    this.state = {
      iFrameHeight: "0px",
      iFrameWidth: "0px"
    };
  }

  componentWillMount() {}

  render() {

    return (
            <div>
              {/* <iframe
                style={{
                  width: this.state.iFrameWidth,
                  height: this.state.iFrameHeight,
                  overflow: "visible"
                }}
                allowFullScreen
                onLoad={() => {
                  this.setState({
                    iFrameWidth: document.body.clientWidth * 0.75 + "px",
                    iFrameHeight: document.body.clientHeight + "px"
                    // isload:false
                  });
                }}
                ref="iframe"
                src={port}
                // width={this.state.iFrameWidth - 200}
                // height={this.state.iFrameHeight}
                frameBorder="0"
              /> */}
            </div>
       
    );
  }
}
