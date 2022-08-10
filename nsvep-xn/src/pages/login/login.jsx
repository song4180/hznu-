import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "react-simple-verify/dist/react-simple-verify.css";
import QueueAnim from 'rc-queue-anim';

import "./login.less";
import bg from "./images/bg.jpg";
import { reqLogin } from "../../api";
import Head from "../../components/headerfooter/header.jsx";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import Identify from "./verifyCode";
import Footer from '../../components/footer/footer'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //验证码校验成功标志
      checked: false
    };
  }
  /**
   * @description: 子组件验证码校验成功，返回msg:true状态给父组件，通过这个函数设置到checked状态中
   * @param {type}
   * @return:
   */
  getChildrenMsg = (result, msg) => {
    this.setState({ checked: msg });
  };

  /**
   * @description: 提交登录表单
   * @param {values的对象是user_account和user_password}
   * @return:
   */
  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      const { userStudentNumber, userPassword } = values;
      if (!err && this.state.checked) {
        reqLogin(userStudentNumber, userPassword)
          .then(response => {
            if (response.isSuccess) {
              //保存user
              const user = response.data.loginData;
              //保存到内存
              memoryUtils.user = user;
              //保存到local本地
              storageUtils.saveUser(user);
              //保存token到cookie
              Cookies.set("token", response.data.loginData.token);
              message.success("登录成功");
              this.props.history.push("/user");
            } else {
              message.error(response.message);
            }
          })
          .catch(error => {
            message.error(error.message);
          });
      } else {
        message.error("信息填写不正确");
      }
    });
  };

  /**
   * @description: 跳转到注册界面
   * @param {type}
   * @return:
   */
  handleGoRegister = () => {
    this.props.history.push("/register");
  };

  /**
   * @description: 跳转到忘记密码界面
   * @param {type}
   * @return:
   */
  handleGoForget = () => {
    this.props.history.push("/forgetPwd");
  };

  componentWillMount() {
    document.body.addEventListener("keypress",(e)=>{
      if(window.event){
        e=window.event;
      }
      let code = e.charCord || e.keyCode
      if(code === 13){
        this.handleSubmit();
      }
    })
  }

  render() {
    //读取用户是否登录(通过userStudentNumber判空，不可用user判空) => 是：跳转到user界面
    const userStudentNumber = memoryUtils.user.userStudentNumber;
    if (userStudentNumber) {
      return <Redirect to="/user" />;
    }

    //得到具有强大功能的form对象
    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className="login">
        <img src={bg} className="bgClass" alt="failed" />
        <div>
        <Head />
        </div>
        <section className="login-content element">
          {/* <h2>欢迎登录</h2> */}
          <br/>
          <div id="loginForm">
            <QueueAnim className="queue-simple" duration="1200">
              <div key="a">

            <Form.Item className="login-form">
              <Form.Item>
                {getFieldDecorator("userStudentNumber", {
                  //配置对象：属性名是特定的一些名称
                  //声明式验证：直接使用别人定义好的验证规则进行验证
                  rules: [
                    { required: true, message: "学号必须输入" },
                    { min: 4, message: "学号至少四位" },
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
                    placeholder="学号
                    "
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("userPassword", {
                  rules: [{ required: true, message: "密码必须输入" }]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="userPassword"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Identify parent={this} />
              </Form.Item>
              <Form.Item>
                <Checkbox>记住密码</Checkbox>
                <br />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.handleSubmit}
                >
                  登录
                </Button>
                <br />
                {/* <a href onClick={this.handleGoRegister} type="primary">
                  去注册
                </a>
                <a
                  href
                  className="login-form-forgot"
                  onClick={this.handleGoForget}
                >
                  忘记密码？
                </a> */}
              </Form.Item>
            </Form.Item>
            </div>
        </QueueAnim>
          </div>
        </section>
        <Footer/>
        
      </div>


      
    );
  }
}
const wrapLogin = Form.create()(Login);
export default wrapLogin;

