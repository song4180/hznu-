/*
 * @Author: your name
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-07-28 13:59:35
 * @LastEditors: Please set LastEditors
 * @Description: 找回密码 - 倒计时
 * @FilePath: /gitee-nsvep/src/components/countDown/countdown.jsx
 */ 
import React, { Component } from "react";
import { Statistic, Row, Col } from "antd";

import './countdown.less';

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
    const { Countdown } = Statistic; 
    return (
      <div>
        <Row gutter={16}>
          <Col span={12} >
            <Countdown id="clock"
             value={this.props.deadline} format=" s 秒后可以重发"
             onFinish={this.props.countDown}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
