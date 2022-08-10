/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-07-25 19:49:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/src/pages/home/home.jsx
 */ 
import React, { Component } from "react";
import { Row, Col } from 'antd';
import  Head  from "../../components/headerfooter/header";
import  Navbar  from "../../components/headerfooter/navbar";
import "./home.css";
import { Layout } from 'antd';
import {Redirect} from 'react-router-dom'
import ConHome from "../../components/contentPart/cHome/cHome";
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
              <Col span={4}> <Navbar current='home' /> </Col>
              <Col span={20}>
                {/*引入右半部分 */}
                  <ConHome />
              </Col>
            </Row>
          </Layout>
          </Layout>
        </div>
      );
  }
}
  