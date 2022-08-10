/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-07-28 18:52:09
 * @LastEditors: XN
 * @Description: 反馈界面
 * @FilePath: /gitee-nsvep/src/pages/feedback/feedback.jsx
 */ 
import React, { Component } from "react";
import AlreadyLoginHead from "../../components/headerfooter/already_login_header.jsx";

import "./feedback.less";
import FeedbackForm from "../../components/feedbackForm/feedbackForm";
import bg from '../login/images/bg.jpg'

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark"
    };
  }

  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };

  render() {
    return (
      <div className="feedback-bg">
        <img src={bg} className="bgClass" alt="failed"/>
        <AlreadyLoginHead history ={this.props.history} current="feedback"/>
        <FeedbackForm />
      </div>
    );
  }
}
