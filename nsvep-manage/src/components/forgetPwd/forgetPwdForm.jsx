import React, { Component } from "react";
import { Form, Input, Button, Menu, message, Icon } from "antd";
// import { FormOutlined } from "@ant-design/icons";

import "./forgetPwdForm.less";
import ForgetPwdFormIpt from "./forgetPwdFormIpt.jsx";

export default class ForgetPwdForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleGoLogin = event => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <div className="forgetPwdFormArea">
          <a onClick={this.handleGoLogin} type="primary">
            <Icon type="left" />
            返回登录
          </a>
          <h2>找回密码</h2>
          <ForgetPwdFormIpt />
        </div>
      </div>
    );
  }
}
