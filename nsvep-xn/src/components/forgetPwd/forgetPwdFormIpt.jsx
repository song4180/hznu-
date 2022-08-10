/*
 * @Author: your name
 * @Date: 2020-07-23 20:36:06
 * @LastEditTime: 2020-11-02 22:12:05
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /gitee-nsvep/src/components/forgetPwd/forgetPwdFormIpt.jsx
 */

import React from "react";
import { Form, Input, Button, Icon, message, Col, Row, Steps } from "antd";

import "./forgetPwdForm.less";
import { reqSendMail } from "../../api/index.js";
import { reqChangePwd } from "../../api/index.js";
import Countdown from "../countDown/countdown.jsx";

export class ForgetPwdFormIpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdAddArr: [],
      nextAppear: 0,
      yard: "",
      userId: "",
      isDisabled: false,
      current: 0
    };
  }

  /**
   * @description: 第一页的下一步 满足验证码符合&&用户名和邮箱都填写了
   * @param {type}
   * @return:
   */
  firstNext = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (
        this.state.yard == values.id_code &&
        values.id_code &&
        !err.userStudentNumber &&
        !err.user_email &&
        !err.id_code
      ) {
        let current = this.state.current + 1;
        this.setState({ current });
      } else {
        message.error("不可有空项");
      }
    });
  };

  /**
   * @description: 第二页的下一步 满足新密码并且重复密码都填写了
   * @param {type}
   * @return:
   */
  secondNext = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err.userPassword && !err.user_password_repeat) {
        reqChangePwd(this.state.userId, values.user_password_repeat)
          .then(response => {
            if (response.isSuccess) {
              message.success(response.message);
              window.location.href = window.location.href.split('#')[0]+'#/login';
            } else {
              message.error(response.message);
            }
          })
          .catch(error => {
            message.error(error.message);
          });
      } else {
        message.error("不可有空项");
      }
    });
  };

  /**
   * @description: 第二页的上一步 通过current回退
   * @param {type}
   * @return:
   */

  secondPrev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  /**
   * @description: 比较密码（第二次与第一次比较）
   * @param {rule , value 当前的值, callback 回调函数}
   * @return:
   */
 
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("userPassword")) {
      callback("两次密码不一致");
    } else {
      callback();
    }
  };

  /**
   * @description: 比较密码（第一次给第二次准备）
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
   * @description: 发送验证码请求 满足学号和邮箱都填写
   * @param {type}
   * @return:
   */
  handleYard = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err.userStudentNumber && !err.user_email) {
        reqSendMail(values.userStudentNumber, values.user_email)
          .then(response => {
            if (response.isSuccess) {
              this.setState({ nextAppear: 1 });
              this.setState({ isDisabled: true });
              message.success(response.message);
              this.setState({ yard: response.data.yard });
              this.setState({ userId: response.data.userId });
            } else {
              message.error(response.message);
            }
          })
          .catch(error => {
            message.error(error.message)
          });
      } else {
        message.error("发送失败！");
      }
    });
  };

  /**
   * @description: 倒计时结束刷新当前页面
   * @param {type}
   * @return:
   */
  countDown = () => {
    this.setState({ isDisabled: false });
    // this.props.history.go(0)
  };

  render() {
    const { current } = this.state;
    const { Step } = Steps;

    const form = this.props.form;
    const { getFieldDecorator } = form;
    const steps = [
      {
        key: 1,
        title: "",
        content: (
          <Form className="login-form">
            <Form.Item>
              {getFieldDecorator("userStudentNumber", {
                //配置对象：属性名是特定的一些名称
                //声明式验证：直接使用别人定义好的验证规则进行验证
                rules: [
                  { required: true, message: "学号必须输入" },
                  { min: 4, message: "学号至少4位" },
                  { max: 14, message: "学号至多14位" },
                  {
                    pattern: /^[Z0-9_]+$/,
                    message: "学号必须是数字组成"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="学号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("user_email", {
                rules: [
                  { required: true, message: "邮箱必须输入" },
                  {
                    type: "email",
                    message: "邮箱格式不正确"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱"
                />
              )}
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item>
                  {form.getFieldDecorator("id_code", {
                    rules: [{ required: false }]
                  })(
                    <Input
                      name="id_code"
                      prefix={
                        <Icon
                          type="edit"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="验证码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8} offset={4}>
                <Form.Item>
                  <Button
                    onClick={e => this.handleYard(e)}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button "
                    id="CheckBtn"
                    disabled={this.state.isDisabled}
                  >
                    {this.state.isDisabled ? (
                      <Col span={16} className="countdown">
                        <Countdown
                          className="CountdownTime"
                          deadline={Date.now() + 1000 * 60}
                          countDown={this.countDown}
                        />
                      </Col>
                    ) : (
                      "获取验证码"
                    )}
                  </Button>
                  <br />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" onClick={() => this.firstNext()}>
                下一步
              </Button>
            </Form.Item>
          </Form>
        )
      },
      {
        key: 2,
        title: "",
        content: (
          <Form>
            <Form.Item label="用户密码" hasFeedback>
              {getFieldDecorator("userPassword", {
                rules: [
                  {
                    required: true,
                    message: "请输入您的密码"
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
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password placeholder={"请输入您的密码"} />)}
            </Form.Item>

            {/* 确认密码  user_password_repeat */}
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator("user_password_repeat", {
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
            <Form.Item>
              <Button onClick={() => this.secondPrev()}>上一步</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => this.secondNext()}>
                完成
              </Button>
            </Form.Item>
          </Form>
        )
      }
    ];

    return (
      <>
        <Steps current={current}>
          {steps.map((item, index) => (
            <Step key={index} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content stepContent">
          {steps[current].content}
        </div>
      </>
    );
  }
}
export default Form.create()(ForgetPwdFormIpt);
