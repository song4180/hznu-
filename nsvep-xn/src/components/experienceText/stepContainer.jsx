/*
 * @Author: XN
 * @Date: 2020-08-03 20:25:20
 * @LastEditTime: 2020-08-03 20:38:34
 * @LastEditors: XN
 * @Description:
 * @FilePath: /gitee-nsvep/src/components/experienceText/stepContainer.jsx
 */
import React, { Component } from "react";
import { Skeleton, BackTop } from 'antd';

import "./stepContainer.less";

export default class StepContainer extends Component {
  render() {
    const style = {
      padding: "24px"
    };
    return (
      <div>
        <div style={style}><Skeleton active="true" />
       </div>
         <BackTop />
      </div>
    );
  }
}
