/*
 * @Author: your name
 * @Date: 2020-07-18 17:48:01
 * @LastEditTime: 2020-11-11 15:05:04
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/headerfooter/header.jsx
 */

import React from "react";
import "antd/dist/antd.min.css"; //显示样式，不加显示不出来
import "./style.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import IsLoginMe from "./isLoginMe.jsx";
const { Header } = Layout; //使用前定义，不加大括号会没有样式

export default class Head extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Header className="header" style={{position:'fixed',zIndex:1,width:'100%',height:'8vh'}}>
          <Menu onClick={this.handleClick} mode="horizontal" theme="dark">
            <Menu.Item>
              <Link to="/home" id="navBarTitle">
                虚拟实验平台管理系统
              </Link>
            </Menu.Item>
            <Menu.Item id="loginMe">
              <IsLoginMe history={this.props.history}/>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
