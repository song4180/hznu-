/*
 * @Author: XN
 * @Date: 2020-07-23 20:36:06
 * @LastEditTime: 2020-11-02 18:15:27
 * @LastEditors: XN
 * @Description: 个人中心 - 个人信息修改
 * @FilePath: /gitee-nsvep/src/components/personalCenterForm/personalCenterMyIfo.jsx
 */

import React, { Component } from "react";
import { Form, Col, Row, Input, Button, message, Select } from "antd";
import QueueAnim from 'rc-queue-anim';

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
      //内存中的user信息
      user: "",
      //预加载获取到的用户信息
      userIfo: "",
      childrenFile: "",
      isLoading: false
    };
  }

  /**
   * @description: 表单提交，修改个人信息的接口
   * @param {reqChangeMyIfo接口的参数:userId 用户Id, user_tel 用户电话, user_email 用户邮箱, user_academy 学院, childrenFile 头像文件}
   * @return:
   */
  handleSubmit = e => {
    e.preventDefault();
    const { childrenFile } = this.state;
    const { user } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        reqChangeMyIfo(
          user.userId,
          values.user_tel,
          values.user_email,
          values.user_academy,
          childrenFile
        )
          .then(response => {
            if (response.isSuccess) {
              message.success("修改成功！");
            } else {
              message.error(response.message);
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

  /**
   * @description: 父组件和子组件传递参数
   * @param {msg 从子组件获取的用户头像文件}
   * @return:
   */
  getChildrenMsg = msg => {
    this.setState({
      childrenFile: msg
    });
  };

  /**
   * @description: 请求用户个人信息
   * @param {type}
   * @return:
   */ getPersonalFormItems() {
    const user = memoryUtils.user;
    this.setState({ isLoading: false });
    reqPersonalFormItems(user.userId)
      .then(response => {
        if (response.isSuccess) {
          this.setState({ userIfo: response.data, isLoading: true });
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  /**
   * @description: 预加载，请求个人信息
   * @param {type} 
   * @return: 
   */
  componentWillMount() {
    const user = memoryUtils.user;
    this.setState({ user: user, isLoading: false });
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
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <QueueAnim className="queue-simple" duration="1200">
          <div key="a">
            <Form
              {...layout}
              name="user-messages"
              className="personalCenterAreaIn"
              layout="horizontal"
              onSubmit={this.handleSubmit}
            >
              <Row gutter={18}>
               

                <Col xl={12} md={12} sm={24}>
                  <Form.Item label="姓名">
                    {/* userNickname需要修改参数 */}
                    <span className="ant-form-text">
                      {this.state.userIfo.userName}
                    </span>
                  </Form.Item>
                </Col>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item label="学院" className="academySelect">
                    {getFieldDecorator(
                      "user_academy",
                      { initialValue: this.state.userIfo.userAcademy },
                      {
                        rules: [
                          {
                            required: true,
                            message: "请输入您的学院"
                          }
                        ]
                      }
                    )(
                      <Select
                        placeholder="请选择学院"
                        onChange={this.changeAcademy}
                      >
                        <Select.Option value="杭州国际服务工程学院">
                          {" "}
                          杭州国际服务工程学院{" "}
                        </Select.Option>
                        <Select.Option value="沈钧儒法学院">
                          沈钧儒法学院
                        </Select.Option>
                        <Select.Option value="医学院">医学院</Select.Option>
                        <Select.Option value="外国语学院">外国语学院</Select.Option>
                        <Select.Option value="体育与健康学院">
                          {" "}
                          体育与健康学院{" "}
                        </Select.Option>
                        <Select.Option value="经济与管理学院">
                          {" "}
                          经济与管理学院{" "}
                        </Select.Option>
                        <Select.Option value="理学院">理学院</Select.Option>
                        <Select.Option value="阿里巴巴商学院">
                          {" "}
                          阿里巴巴商学院{" "}
                        </Select.Option>
                        <Select.Option value="其他">其他</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item label="班级">
                    <span className="ant-form-text">
                      {this.state.userIfo.userClass}
                    </span>
                  </Form.Item>
                </Col>
                <Col xl={12} md={12} sm={24}>
                  <Form.Item label="学号">
                    {/* userStudentNumber可能需要修改参数，或许是userAccount */}
                    <span className="ant-form-text">
                      {this.state.userIfo.userStudentNumber.substring(0, 9) +
                        "****"}
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
          </div>
        </QueueAnim>

      );
    } else {
      return <div></div>;
    }
  }
}
export default Form.create()(PersonalCenterMyIfo);
