/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-07-25 20:02:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/src/pages/experiment/aExperiment.jsx
 */

import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import Head from "../../components/headerfooter/header";
import Navbar from "../../components/headerfooter/navbar";
import { Layout } from "antd";
import { Redirect } from "react-router-dom";

import ConAExperiment from "../../components/contentPart/cAExperiment/cAExperiment";
import memoryUtils from "../../utils/memoryUtils.js";

export default class AExperiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      current: "experiment"
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
          <Layout >
            <Row>
              <Col span={4}>
                {" "}
                <Navbar current="aExperiment" isOpen="true" />{" "}
              </Col>
              <Col span={20}>
                <ConAExperiment />
              </Col>
            </Row>
          </Layout>
        </Layout>
      </div>
    );
  }
}
