/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-11-04 19:22:49
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/headerfooter/navbar.jsx
 */ 
import React  from "react";
import "./style.css";
import 'antd/dist/antd.min.css';
import { Layout, Menu} from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined,TeamOutlined, LaptopOutlined, AppstoreOutlined, ToolOutlined,UserSwitchOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const Sider = Layout;//使用定义

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            isOpen:false
        };
    }
    render() {
        const isOpen = this.props.isOpen
        let defaultOpenArray = []
        isOpen? defaultOpenArray = ['sub1']:defaultOpenArray = [];
        return(
                <Sider  className="site-layout-background" id="siderNav">
                    <Menu
                        mode="inline" //导航栏列出来显示
                        // mode="horizontal"  //导航栏隐藏起来显示
                        defaultSelectedKeys={['home']}
                        defaultOpenKeys={defaultOpenArray}
                        selectedKeys={[this.props.current]}
                        theme="dark"    
                        id="navBarMenu"                   
                    >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/home">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="class" icon={<TeamOutlined />}>
                        <Link to="/class">班级管理</Link>
                    </Menu.Item>    
                    <Menu.Item key="docker" icon={<AppstoreOutlined />}>
                        <Link to="/docker">Docker管理</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<LaptopOutlined />} title="实验管理">
                        <Menu.Item key="sExperiment">
                            <Link to="/sExperiment">资源管理</Link>
                        </Menu.Item>
                        <Menu.Item key="aExperiment">
                            <Link to="/aExperiment">权限管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="feedback" icon={<ToolOutlined />}>
                        <Link to="/feedback">故障反馈</Link>
                    </Menu.Item>
                    <Menu.Item key="help" icon={<UserSwitchOutlined />}>
                        <Link to="/help">教师协助</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

