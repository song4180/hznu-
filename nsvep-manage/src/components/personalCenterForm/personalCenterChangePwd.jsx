import React, { Component } from "react";
import { Form, Input, Button } from "antd";

import "./personalCenterForm.less";

export  class PersonalCenterChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["user_password_repeat"], { force: true });
    }
    callback();
  };

    handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("userNewPwd")) {
      callback("两次密码不一致");
    } else {
      callback();
    }
  };

  compareToOldPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value === form.getFieldValue("userPassword")) {
      callback("新旧密码不能一样");
    } else {
      callback();
    }
  };
 

  render() {
    //得到具有强大功能的form对象
    const form = this.props.form;
    const { getFieldDecorator } = form;
    
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 }
    };

    return (
      <Form
        {...layout}
        name="basic"
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        className="personalCenterAreaIn"
        // onFinishFailed={onFinishFailed}
      >
      {/* 旧密码  userPassword */}
          <Form.Item label="旧密码" hasFeedback>
            {getFieldDecorator("userPassword", {
              rules: [
                {
                  required: true,
                  message: "请输入您的旧密码"
                }
              ]
            })(<Input.Password placeholder={"请输入您的密码"} />)}
          </Form.Item>

             {/* 新密码  userPassword */}
           <Form.Item label="新密码" hasFeedback>
            {getFieldDecorator("userNewPwd", {
              rules: [
                {
                  required: true,
                  message: "请输入您的新密码"
                },
               {
                  min: 6,
                  max: 15,
                  message: "密码为6-15位字符"
                },
                {
                  pattern: new RegExp("^\\w{6,15}$", "g"),
                  message: "密码必须为字母或者数字"
                },
                {
                  validator: this.compareToOldPassword,
                  message: "新旧密码不能一样"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password placeholder={"请输入您的密码"} />)}
          </Form.Item>

          {/* 确认密码  user_password_repeat */}
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator("userRepeatPwd", {
              rules: [
                {
                  required: true,
                  message: "请再次输入您的密码"
                },
                {
                  validator: this.compareToFirstPassword,
                  message: "两次密码不一致"
                }
              ]
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                placeholder={"请再次输入您的密码"}
              />
            )}
          </Form.Item>
       
       
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(PersonalCenterChangePwd);

