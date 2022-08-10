/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-11-04 19:25:52
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/pages/help/help.jsx
 */ 
import React, { Component } from "react";
import { Row, Col } from 'antd';
import  Head  from "../../components/headerfooter/header";
import  Navbar  from "../../components/headerfooter/navbar";
import "./help.css";
import { Layout } from 'antd';
import {Redirect} from 'react-router-dom'
import ConHelp from "../../components/contentPart/cHelp/cHelp";
import memoryUtils from '../../utils/memoryUtils.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      current: "home"
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

  render() {
      const user = memoryUtils.user;
    
    if (!user.adminId > 0) {
      return <Redirect to="/login" />;
    }
      return(
        <div>
          <Layout>
            {/*引入头部 */}
            <Head history={this.props.history} />  
            <Layout> 
            {/*引入下半部分，通过Col控制左右部分的占比 */}
            <Row>
              {/*引入导航栏 */}
              <Col span={4}> <Navbar current='help' /> </Col>
              <Col span={20}>
                {/*引入右半部分 */}
                  <ConHelp />
              </Col>
            </Row>
          </Layout>
          </Layout>
        </div>
      );
  }
}
  