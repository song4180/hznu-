/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-08 14:41:51
 * @LastEditors: XN
 * @Description: 没有要求登录状态的头部（其实应该整合到一起的）
 * @FilePath: /gitee-nsvep/src/components/headerfooter/header.jsx
 */ 
import React  from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import memoryUtils from '../../utils/memoryUtils.js'
import "./style.less";
import logo from "../../pages/login/images/logo.svg";

class Head extends React.Component {
  render() {
	 const user = memoryUtils.user;
    return (

		<Navbar  expand="lg" className=" navbar navbar-expand-lg navbar-light fixed-top"  id="mainNav" style={{height:"8vh"}}> 
		  <Link className="navbar-brand" to="/home">虚拟实验平台</Link>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse" >
          <Nav className="navbar-nav ml-auto mt-2 mt-lg-0" id="navbarResponsive">
            <Nav.Link  href="#"><Link to="/login">{user.userId?"做实验":" 登录"}</Link>	</Nav.Link>
			{user.userId?<span></span>:<Nav.Link  href="#"><Link to="/register">注册</Link></Nav.Link>}
			{user.userId?<span></span>:<Nav.Link  href="#"><Link to="/forgetPwd">忘记密码？</Link></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Head;
