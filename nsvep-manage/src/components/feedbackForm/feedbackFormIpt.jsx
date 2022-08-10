/*
 * @Author: XN
 * @Date: 2020-07-18 10:08:37
 * @LastEditTime: 2020-10-12 16:59:30
 * @LastEditors: XN
 * @Description: 
 * @FilePath: /te/src/components/feedbackForm/feedbackFormIpt.jsx
 */
import React, { Component } from "react";
import { Form, Input, Button, Menu, message } from "antd";

import "./feedbackForm.less";
import memoryUtils from "../../utils/memoryUtils.js";
import { reqFeedback } from "../../api/index.js";

export class FeedbackFormIpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    const user = memoryUtils.user;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          "Received values of form: ",
          values,
          values.feedbackTitle,
          values.feedbackContent,
          user.userStudentNumber
        );
        reqFeedback(
          values.feedbackTitle,
          values.feedbackContent,
          user.userStudentNumber
        )
          .then(response => {
            if (response.isSuccess === 1) {
              message.success("谢谢您的反馈！");
            }
          })
          .catch(error => {
          });
      } else {
        message.error("反馈失败！");
      }
    });
  };
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form
          {...layout}
          name="feed-messages"
          onSubmit={this.handleSubmit}
          className="feedbackFormAreaIn"
        >
          <Form.Item label="标题" hasFeedback>
            {getFieldDecorator("feedbackTitle", {
              rules: [
                {
                  required: true,
                  message: "请输入标题"
                }
              ]
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>

          <Form.Item label="反馈" hasFeedback>
            {getFieldDecorator("feedbackContent", {
              rules: [
                {
                  required: true,
                  message: "请输入反馈信息"
                }
              ]
            })(<Input.TextArea rows={8} placeholder="请输入反馈内容" />)}
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" id="submitFormBtn">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(FeedbackFormIpt);
