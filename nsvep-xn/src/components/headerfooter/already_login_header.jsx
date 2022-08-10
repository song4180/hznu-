/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-02 17:24:42
 * @LastEditors: XN
 * @Description: 头部导航 通过isLoginMe判断是否存在登录状态
 * @FilePath: /gitee-nsvep/src/components/headerfooter/already_login_header.jsx
 */

/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"

import 'bootstrap/dist/css/bootstrap.min.css';
// import "./style.less";
import "./alreadyLogin.less";
import logo from "../../pages/login/images/logo.svg";
import IsLoginMe from "./isLoginMe.jsx";

export default class AlreadyLoginHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (

    <Navbar bg="light" expand="lg" className=" navbar navbar-expand-lg navbar-light fixed-top"  id="mainNavAlreadyLogin"> 
		  <Link className="navbar-brand" to="/home">虚拟实验平台</Link>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse" >
          <Nav className="navbar-nav ml-auto mt-2 mt-lg-0" id="navbarResponsive">
            <Nav.Link  href="#"><Link to="/user">课程</Link>	</Nav.Link>
            <Nav.Link  href="#"><Link to="/feedback">反馈</Link></Nav.Link>
            <Nav.Link  href="#"><Link to="/personalCenter">个人中心</Link></Nav.Link>
            <Nav.Link  href="#"><IsLoginMe history ={this.props.history}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    
    );
  }
}


{/* <div className="navbar-collapse collapse " id="navbarResponsive">
				<ul {/* <div className="navbar-collapse collapse " id="navbarResponsive">
				<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
					<li className="nav-item active">
            <Link to="/user">课程</Link>				
          </li>
					<li className="nav-item">
              <Link to="/feedback">反馈</Link>

					</li>
					<li className="nav-item">
              <Link to="/personalCenter">个人中心</Link>
					</li>
          	<li className="nav-item">
               <IsLoginMe history ={this.props.history}/>
					</li>
				</ul>
			</div>
      	<button className="navbar-toggler" type="button" navbar-toggler="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
			 aria-expanded="false" aria-label="Toggle navigation">
				Menu
				<span className="navbar-toggler-icon"></span>
			</button>
		</nav> */}