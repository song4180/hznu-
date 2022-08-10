import React, { Component } from "react";
import { Form, Input, Button, Row, message } from "antd";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { UserOutlined, LockOutlined  } from '@ant-design/icons';

import "./login.css";
import logo from "./images/logo.svg";
import bg from "./images/bg.jpg";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import VerifyCode from "./verifyCode.jsx";
//分别暴露需要{}
/**›
登录的路由组件
 */
export default class Login extends Component {
  handleSubmit = values => {
    const { userStudentNumber, userPassword } = values;
    //校验成功 values是获得的对象user_account和user_password
    reqLogin(userStudentNumber, userPassword)
      .then(response => {
        if (response.isSuccess) {
          //保存user
          const user = response.data;
          //保存到内存
          memoryUtils.user = user;
          //保存到local本地
          storageUtils.saveUser(user);
          //保存token到cookie
          Cookies.set("token", response.data.token);

          message.success("登录成功");
          this.props.history.push("/home");
        } else {
          message.error("登录失败");
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  // componentWillMount() {
  //   document.body.addEventListener("keyup",(e)=>{
  //     if(window.event){
  //       e=window.event;
  //     }
  //     let code = e.charCord || e.keyCode
  //     if(code === 13){
  //       this.handleSubmit(values);
  //     }
  //   })
  // }

  render() {
    const user = memoryUtils.user;
    if (user.adminId > 0) {
      return <Redirect to="/home" />;
    }

    return (
      <div class="container" onclick="onclick">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="center">
          <div className="row">
            {/* {document.addEventListener("mousemove", function(e) {
          document.documentElement.style.setProperty("--mouseX", e.clientX);
          document.documentElement.style.setProperty("--mouseY", e.clientY);
        })} */}
            <Row>
              <div className="col-sm-3"></div>

              <div className="col-sm-6">
                <section className="login-content">
                  <h2>欢迎登录</h2>
                  <div>
                    <Form onFinish={this.handleSubmit} className="login-form">
                      <Form.Item
                        name="userStudentNumber"
                        rules={[
                          {
                            required: true,
                            message: "请输入你的账号"
                          }
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="账号" prefix={<UserOutlined />} />
                      </Form.Item>
                      <Form.Item
                        name="userPassword"
                        rules={[
                          {
                            required: true,
                            message: "请输入你的密码"
                          }
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          // prefix={
                          //   <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                          // }
                          type="userPassword"
                          placeholder="密码"
                          prefix={<LockOutlined />}
                        />
                      </Form.Item>
                      <Form.Item id="verifyCode">
                        <VerifyCode/>
                      </Form.Item>
                      <Form.Item>
                        <br />
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          id=
                          "loginButton"
                          shape="round"
                        >
                          登录
                        </Button>
                        <br />
                      </Form.Item>
                    </Form>
                  </div>
                </section>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
