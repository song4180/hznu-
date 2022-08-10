/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-02 15:51:29
 * @LastEditors: XN
 * @Description: 登录 - 忘记密码
 * @FilePath: /gitee-nsvep/src/pages/forgetPwd/forgetPwd.jsx
 */

import React, { Component } from "react";
import Head from "../../components/headerfooter/header.jsx";
import QueueAnim from 'rc-queue-anim';

import "./forgetPwd.less";
import ForgetPwdForm from "../../components/forgetPwd/forgetPwdForm.jsx";
import bg from "../login/images/bg.jpg";

export default class ForgetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="forget-bg">
        <img src={bg} className="bgClass" alt="failed" />
        <Head />
        <div className="forgetContent" >
          <QueueAnim className="queue-simple" duration="1200">
            <div key="a">
              <ForgetPwdForm history={this.props.history} />
            </div>
          </QueueAnim>
        </div>
      </div>
    );
  }
}
