/*
 * @Author: XN
 * @Date: 2020-07-23 20:36:06
 * @LastEditTime: 2020-11-02 15:01:36
 * @LastEditors: XN
 * @Description: 反馈页 - 基础框架
 * @FilePath: /gitee-nsvep/src/components/feedbackForm/feedbackForm.jsx
 */

import React, { Component } from "react";
import { Menu } from "antd";
import Texty from 'rc-texty';

import Footer from '../../components/footer/footer'
import "./feedbackForm.less";
import FeedbackFormIpt from "./feedbackFormIpt.jsx";

export default class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="feedbackFormArea">
          <Menu mode="horizontal" defaultSelectedKeys={["feedback"]}>
            <Menu.Item key="feedback" id="feedbackFormTitle">
              <Texty>
               您的反馈
              </Texty>
            </Menu.Item>
          </Menu>
          <FeedbackFormIpt />
        </div>
      </div>
    );
  }
}
