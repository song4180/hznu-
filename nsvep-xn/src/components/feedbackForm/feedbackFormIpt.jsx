/*
 * @Author: XN
 * @Date: 2020-07-03 18:32:05
 * @LastEditTime: 2020-11-02 15:00:37
 * @LastEditors: XN
 * @Description: 反馈 - 反馈表单 （也用于experienceText中的实验的反馈）
 * @FilePath: /gitee-nsvep/src/components/feedbackForm/feedbackFormIpt.jsx
 */

import React from "react";
import { Form, Input, Button, message } from "antd";
import QueueAnim from 'rc-queue-anim';

import "./feedbackForm.less";
import memoryUtils from "../../utils/memoryUtils.js";
import { reqFeedback } from "../../api/index.js";

export class FeedbackFormIpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //提交图片（功能尚未实现）
      reportedImage: ""
    };
  }

  /**
   * @description: 调用reqFeedback进行数据传输
   * @param {feedbackTitle 反馈标题, feedbackContent 反馈内容, {reportedImage 反馈图片, userId 用户ID}}
   * @return: success - 清空表单, message 成功; error - message 失败;
   */
  funcReqFeedback(feedbackTitle, feedbackContent) {
    const user = memoryUtils.user;
    reqFeedback(
      feedbackTitle,
      feedbackContent,
      this.state.reportedImage,
      user.userId
    )
      .then(response => {
        if (response.isSuccess) {
          // 清空表单
          this.props.form.setFieldsValue({
            feedbackTitle: null,
            feedbackContent: null
          });
          message.success("谢谢您的反馈！");
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  /**
   * @description: 表单提交，通过 validateFieldsAndScroll 方法获得表单数据（antd3.x方法，4.x不是这样，可以看网络安全虚拟实验平台管理端的代码）
   * @param {e 提交事件的事件对象}
   * @return:
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.funcReqFeedback(values.feedbackTitle, values.feedbackContent);
      } else {
        message.error("反馈失败！");
      }
    });
  };

  render() {
    // 扩充表格的功能
    const form = this.props.form;
    const { getFieldDecorator } = form;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div>
      <QueueAnim className="queue-simple" duration="1200">
       <div key="a">
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
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} key="c">
            <Button type="primary" htmlType="submit" id="submitFormBtn">
              提交
            </Button>
          </Form.Item>
        </Form>
        </div>
        </QueueAnim>
      </div>
    );
  }
}
//本组件基础于Form组件，是它的子组件
export default Form.create()(FeedbackFormIpt);
