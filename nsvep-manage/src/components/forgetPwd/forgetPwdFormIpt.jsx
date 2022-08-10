import React from "react";
import { Form, Input, Button, Icon, message, Col } from "antd";

import "./forgetPwdForm.less";
import { reqSendMail } from "../../api/index.js";

export class ForgetPwdFormIpt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          "Received values of form: ",
          values,
          values.userStudentNumber,
          values.user_email
        );
        reqSendMail(values.userStudentNumber, values.user_email)
          .then(response => {
            if (response.isSuccess === 1) {
              message.success("发送成功！");
            }
          })
          .catch(error => {
          });
      } else {
        message.error("发送失败！");
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
        <div>
          <Form onSubmit={this.handleSubmit} className="login-form">
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
                  type="userStudentNumber"
                  placeholder="邮箱"
                />
              )}
            </Form.Item>

            <Col span={8} offset={10}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  发送
                </Button>
                <br />
              </Form.Item>
            </Col>
            
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create()(ForgetPwdFormIpt);
