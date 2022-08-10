/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-01 20:24:04
 * @LastEditors: XN
 * @Description: 登录的路由组件
 * @FilePath: /gitee-nsvep/src/pages/user/user.jsx
 */ 
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import memoryUtils from "../../utils/memoryUtils";
import AlreadyLoginHead from "../../components/headerfooter/already_login_header.jsx";
import MainCoursePage from "../mainCoursePage/mainCoursePage.jsx";
import "./user.less";
import bg from "../login/images/bg.jpg";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  
  render() {
    const user = memoryUtils.user;
    //如果内存中没有存储user ==> 当前没有登录
    if (!user.userId>0) {
      //自动跳转到登录（在render中）
      return <Redirect to="/home" />;
    }

    return (
      <div className="user-bg">
        {/* <img src={bg} className="bgClass" alt="failed" /> */}
        <AlreadyLoginHead history ={this.props.history} current="course" />
        <MainCoursePage history ={this.props.history}/>
      </div>
    );
  }
}
