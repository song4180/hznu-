/*
 * @Author: XN
 * @Date: 2020-07-23 20:36:06
 * @LastEditTime: 2020-11-02 15:50:13
 * @LastEditors: XN
 * @Description: 注册基础页面布局
 * @FilePath: /gitee-nsvep/src/pages/register/register.jsx
 */

import React, { Component } from "react";
import { Form, Icon } from "antd";
import QueueAnim from 'rc-queue-anim';

import Head from "../../components/headerfooter/header.jsx";
import "./register.less";
import RegisterForm from "./registerForm.jsx";
import ListDemo from "./list.jsx";
import bg from "../login/images/bg.jpg";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description: 前往登录
   * @param {}
   * @return:
   */
  handleGoLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="register">
        <img src={bg} className="bgClass" alt="failed" />
        <Head />
        <div className="register-form-bg element">
          <br/>
            <QueueAnim className="queue-simple" duration="1200">
              <div key="a">
                <RegisterForm history={this.props.history} />
               </div>
            </QueueAnim>
        </div>
      </div>
    );
  }
}

const wrapRegister = Form.create()(Register);
export default wrapRegister;
