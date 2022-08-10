/*
 * @Author: XN
 * @Date: 2020-07-27 10:10:15
 * @LastEditTime: 2020-10-31 20:19:26
 * @LastEditors: XN
 * @Description:
 * @FilePath: /te/src/components/contentPart/cDocker/cDocker.jsx
 */

import React from "react";
import "./cDocker.css";
import { Layout } from "antd";

import Iframe from "../../iframe/iframe";
const { Content, Footer } = Layout; //使用前定义，不加大括号会没有样式

export default class ConDocker extends React.Component {
  render() {
    return (
      <Layout style={{ padding: "0 24px 24px", margin: "12vh 0px 0px 0px" }}>
        <div class="wrap">
          <div class="iframe-container">
            <Iframe />
          </div>
        </div>

        <div class="dockerContainer">
          <div class="pwdWrap">
              <span class="first">账号:admin</span>
              <span class="second">密码:portainer</span>
          </div>
        </div>
        {/* <Footer style={{ textAlign: "center", height: "5px" }}>
          ©2020 网络与信息安全实验室
        </Footer> */}
      </Layout>
    );
  }
}
