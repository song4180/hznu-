/*
 * @Author: XN
 * @Date: 2020-07-23 20:36:06
 * @LastEditTime: 2020-07-28 18:14:24
 * @LastEditors: XN
 * @Description: 个人中心 - 修改密码
 * @FilePath: /gitee-nsvep/src/components/personalCenterForm/personalCenterChangePwd.jsx
 */ 

import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";

import memoryUtils from "../../utils/memoryUtils.js";
import "./personalCenterForm.less";
import { reqUserChangePwd } from "../../api/index.js";

export class PersonalCenterChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description: 比较下一次输入密码
   * @param {type} 
   * @return: 
   */
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["user_password_repeat"], { force: true });
    }
    callback();
  };

  /**
   * @description: 设置confirmDirty
   * @param {type} 
   * @return: 
   */
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  /**
   * @description: 和第一次密码比较
   * @param {type} 
   * @return: 
   */
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("userNewPwd")) {
      callback("两次密码不一致");
    } else {
      callback();
    }
  };

  /**
   * @description: 和原先密码比较
   * @param {type} 
   * @return: 
   */
  compareToOldPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value === form.getFieldValue("userPassword")) {
      callback("新旧密码不能一样");
    } else {
      callback();
    }
  };

  /**
   * @description: 提交表单数据
   * @param {type} 
   * @return: 
   */
  handleSubmit = e => {
    const user = memoryUtils.user;
    e.preventDefault();
    // 获取表单数据
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        reqUserChangePwd(user.userId, values.userPassword, values.userNewPwd)
          .then(response => {
            if (response.isSuccess) {
              message.success("修改成功"); //response.message
              this.props.form.setFieldsValue({
                userPassword: null,
                userNewPwd: null,
                userRepeatPwd: null
              });
            } else {
              message.error(response.message);
            }
          })
          .catch(error => {
            message.error(error.message);
          });
      }
      //如果没有错误，则发送用户信息 给后端
      else {
        message.error("注册信息有误！");
      }
    });
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
        className="personalCenterAreaIn"
        onSubmit={this.handleSubmit}
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(PersonalCenterChangePwd);
