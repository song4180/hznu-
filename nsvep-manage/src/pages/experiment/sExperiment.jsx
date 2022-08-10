/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-07-25 20:02:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/src/pages/experiment/sExperiment.jsx
 */ 
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import  Head  from "../../components/headerfooter/header";
import  Navbar  from "../../components/headerfooter/navbar";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import {Redirect} from 'react-router-dom'

import ConSExperiment from "../../components/contentPart/cSExperiment/cSExperiment";
import memoryUtils from '../../utils/memoryUtils.js';

const { Header, Content } = Layout; 

export default class SExperiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      current: "experiment"
    };
  }

  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
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
      return(
        <div>
        <Layout>
          <Head history={this.props.history} />
          <Layout> 
          <Row>
            <Col span={4}> <Navbar current="sExperiment" isOpen="true"/> </Col>
            <Col span={20}>
                <ConSExperiment />
            </Col>
          </Row>
        </Layout>
        </Layout>
      </div>
      );
  }
}
  