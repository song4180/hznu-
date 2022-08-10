/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Link } from "react-router-dom";
import { Menu, message } from "antd";
// import { createHashHistory } from "history";

import "./style.less";
import logo from "../../pages/login/images/logo.svg";
import IsLoginMe from "./isLoginMe.jsx";

// const { HashRouter as Router, Route, Switch, Link, withRouter } = ReactRouterDOM;
// const {  Breadcrumb, Alert  } = antd;

// const history = createHashHistory();

class AlreadyLoginHead extends React.Component {
  constructor(props) {
    super(props);
  }

  // linkTo(item) {
  //   history.push(item.key);
  // }

  render() {
    return (
      <div>
        <header className="main_header">
          <img src={logo} alt="logo" />
          <Link to="/user" className={"title"}>
            虚拟实验平台
          </Link>

          <Menu mode="horizontal" selectedKeys={[this.props.current]}>
            <Menu.Item key="course">
              <Link to="/user">课程</Link>
            </Menu.Item>
            <Menu.Item key="feedback">
              <Link to="/feedback">反馈</Link>
            </Menu.Item>
            <Menu.Item key="personalCenter">
              <Link to="/personalCenter">个人中心</Link>
            </Menu.Item>
            <Menu.Item key="mymymy">
              <IsLoginMe />
            </Menu.Item>
          </Menu>
        </header>
      </div>
    );
  }
}


export default AlreadyLoginHead;
