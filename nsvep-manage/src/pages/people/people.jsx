/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-07-20 20:36:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/src/pages/class/class.jsx
 */

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Head from "../../components/headerfooter/header";
import Navbar from "../../components/headerfooter/navbar";
import { Row, Col, Layout } from "antd";
import { Redirect } from "react-router-dom";
import ConPeople from "../../components/contentPart/cPeople/cPeople";
import memoryUtils from "../../utils/memoryUtils.js";

export default class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      current: "class"
    };
  }

  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleClick = e => {
   
    this.setState({
      current: e.key
    });
  };

  render() {
    const user = memoryUtils.user;
    
    if (!user.adminId > 0) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Layout>
          <Head history={this.props.history} />
          <Layout>
            <Row>
              <Col span={4}>
                {" "}
                <Navbar current="class" />{" "}
              </Col>
              <Col span={20}>
                <Layout style={{ padding: "0 24px 24px", margin: "23px 0" }}>
                  <ConPeople />
                </Layout>
              </Col>
            </Row>
          </Layout>
        </Layout>
      </div>
    );
  }
}
