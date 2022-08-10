import React, { Component } from "react";
import { Form, Col, Row, Input, Button, message } from "antd";

import HeadUpload from "./headUpload.jsx";
import "./personalCenterForm.less";
import { reqChangeMyIfo } from "../../api/index.js";
import memoryUtils from "../../utils/memoryUtils.js";
import { reqPersonalFormItems } from "../../api/index.js";

export class PersonalCenterMyIfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHeadURL: "",
      /**内存中的user信息 */
      user: "",
      /**willMount获取到的用户信息 */
      userIfo: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        reqChangeMyIfo(values.user_tel, values.user_email)
          .then(response => {
            if (response.isSuccess === 1) {
              message.success("修改成功");
            }
          })
          .catch(error => {
            message.error(error.message);
          });
      } else {
        message.error("修改失败！");
      }
    });
  };

  /**请求用户个人信息 */
  getPersonalFormItems() {
    const user = memoryUtils.user;
    reqPersonalFormItems(user.userId)
      .then(response => {
        /**存储用户信息于state */
        this.setState({ userIfo: response.data });
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  componentWillMount() {
    const user = memoryUtils.user;
    this.setState({ user: user });
    //获取当前请求的域名地址
    this.getPersonalFormItems();
  }

  render() {
    //得到具有强大功能的form对象
    const form = this.props.form;
    const { getFieldDecorator } = form;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <Form
        {...layout}
        name="user-messages"
        className="personalCenterAreaIn"
        layout="horizontal"
        onSubmit={this.handleSubmit}
      >
        <Row gutter={18}>
          <Col xl={8} md={8} sm={24}>
            <Form.Item
              className="userIfoHead"
              name={["user", "name"]}
              label="头像"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <HeadUpload />
            </Form.Item>
          </Col>
          <Col xl={8} md={8} sm={24}>
            <Form.Item label="性别">
              <span className="ant-form-text">{this.state.userIfo.gender}</span>
            </Form.Item>
          </Col>
          <Col xl={8} md={8} sm={24}>
            <Form.Item label="姓名">
              {/* userNickname需要修改参数 */}
              <span className="ant-form-text">
                {this.state.userIfo.userName}
              </span>
            </Form.Item>
          </Col>
          <Col xl={8} md={8} sm={24}>
            <Form.Item label="学院">
              <span className="ant-form-text">
                {this.state.userIfo.userAcademy}
              </span>
            </Form.Item>
          </Col>
          <Col xl={8} md={8} sm={24}>
            <Form.Item label="班级">
              <span className="ant-form-text">
                {this.state.userIfo.userClass}
              </span>
            </Form.Item>
          </Col>
          <Col xl={8} md={8} sm={24}>
            <Form.Item label="学号">
              {/* userStudentNumber可能需要修改参数，或许是userAccount */}
              <span className="ant-form-text">
                {this.state.userIfo.userStudentNumber}
              </span>
            </Form.Item>
          </Col>

          <Col xl={12} md={12} sm={24}>
            {/* 手机号码  user_tel */}
            <Form.Item label="手机号" hasFeedback>
              {getFieldDecorator("user_tel", {
                initialValue: this.state.userIfo.userTel,
                rules: [
                  {
                    pattern: new RegExp("^1[3456789]\\d{9}$", "g"),
                    message: "请输入正确的手机号"
                  }
                ]
              })(<Input placeholder={"请输入您的手机号"} />)}
            </Form.Item>
          </Col>
          <Col xl={12} md={12} sm={24}>
            {/* 邮箱  user_email */}
            <Form.Item label="邮箱" hasFeedback>
              {getFieldDecorator("user_email", {
                initialValue: this.state.userIfo.userEmail,
                rules: [
                  {
                    type: "email",
                    message: "邮箱格式不正确"
                  }
                ]
              })(<Input placeholder={"请输入您的邮箱"} />)}
            </Form.Item>
          </Col>
          <Col span={24} offset={11}>
            {/* 修改 */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(PersonalCenterMyIfo);
