/*
 * @Author: XN
 * @Date: 2020-07-23 20:36:06
 * @LastEditTime: 2020-11-02 19:09:44
 * @LastEditors: XN
 * @Description: 忘记密码
 * @FilePath: /gitee-nsvep/src/components/forgetPwd/forgetPwdForm.jsx
 */ 
import React, { Component } from "react";
import { Icon } from "antd";

import "./forgetPwdForm.less";
import ForgetPwdFormIpt from "./forgetPwdFormIpt.jsx";

export default class ForgetPwdForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div >
        <div className="forgetPwdFormArea element ">
          {/* <a onClick={this.handleGoLogin} type="primary">
            <Icon type="left" />
            返回登录
          </a> */}
          <br/>
          <h2>找回密码</h2>
          <div className="">
          <ForgetPwdFormIpt />

          </div>
        </div>
      </div>
    );
  }
}
