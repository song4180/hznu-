/*
 * @Author: your name
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-10-12 17:00:04
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/headerfooter/isLoginMe.jsx
 */

import React, { Component } from "react";
import { Menu, Dropdown, message, Modal, Button } from "antd";
import { UserOutlined,PlusCircleOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import memoryUtils from "../../utils/memoryUtils.js";
import storageUtils from "../../utils/storageUtils.js";
// import addManager from "../tools/addManager.jsx"
export default class IsLoginMe extends Component {
  constructor(props) {
    super(props);
  }

/**
   * @description: 批量导入模态框确认选项
   * @param {type}
   * @return:
   */
  handleOk = e => {
    this.setState({
      visible: false
    });
  };

 
  showPropsConfirmExit = () => {
    const { confirm } = Modal;
    confirm({
      title: "你确定要退出吗？",
      okText: "确认",
      okType: "primary",
      okButtonProps: {
        disabled: false
      },
      cancelText: "取消",
      onOk: () => {
        //登出，删除保存的user数据，并跳转回login页面
        storageUtils.removeUser();
        memoryUtils.user = {};
        Cookies.remove("token");
        this.props.history.push("/login");
        message.success("退出成功！", 1);
      }
    });
  };


  render() {
    const user = memoryUtils.user;

    if (!user.adminId > 0) {
      return <Redirect to="/login" />;
    }

    const menu = (
      <Menu>
        <Menu onClick={this.showPropsConfirmExit}>
          <Menu.Item key="exit">
            <UserOutlined />
            退出
          </Menu.Item> 
        </Menu>
        {/* <Menu onClick={this.showPropsConfirmAdd}>
          <Menu.Item key="add">
            <PlusCircleOutlined />
            添加管理员
          </Menu.Item>
      </Menu> */}
     </Menu>
    );

    return (
      <div>
        {
          <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined id="headSvg"/>}>
            {user.adminName}
          </Dropdown.Button>
        }
      </div>
    );
  }
}
