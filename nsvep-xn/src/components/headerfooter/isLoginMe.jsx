/*
 * @Author: XN
 * @Date: 2020-07-23 20:36:06
 * @LastEditTime: 2020-11-01 19:17:03
 * @LastEditors: XN
 * @Description: 通过memoryUtils用户状态判断是否登录
 * @FilePath: /gitee-nsvep/src/components/headerfooter/isLoginMe.jsx
 */

import React, { Component } from "react";
import { Menu, Dropdown, message, Modal, Icon } from "antd";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import memoryUtils from "../../utils/memoryUtils.js";
import storageUtils from "../../utils/storageUtils.js";
import { reqLogout } from "../../api/index.js";
import './isLoginMe.less'

export default class IsLoginMe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description: 退出时的请求
   * @param {userId 用户Id} 
   * @return {type} 
   */
  funcReqLogout = userId => {
    reqLogout(userId)
      .then(response => {
        if (response.isSuccess) {
          storageUtils.removeUser();
          storageUtils.removeExpId();
          memoryUtils.user = {};
          memoryUtils.expId = "";
          Cookies.remove("token");
          message.success("退出成功！", 1);
          this.props.history.push("/home");
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: 运用 ant-design 的 confirm 组件进行二次确认
   * @param {}
   * @return:
   */
  showPropsConfirm = () => {
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
        //登出，删除保存的user数据，删除Cookie，并跳转回login页面
        let userId = memoryUtils.user.userId;
        this.funcReqLogout(userId);
      }
    });
  };

  render() {
    const user = memoryUtils.user;
    //入口js将本地存储的数据读取到内存中 => 如果内存中没有存储user => 当前没有登录 => 跳转到login界面
    if (!user.userId > 0) {
      return <Redirect to="/home" />;
    }

    const userIcon = <Icon type="user" />;

    /**
     * @description: Dropdown的挂载，用户退出功能的下拉框
     * @param {}
     * @return:
     */
    const menu = (
      <Menu onClick={this.showPropsConfirm}>
        <Menu.Item key="1" icon={userIcon}>
          退出
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        {
          // <Dropdown.Button
          //   overlay={menu}
          //   placement="bottomCenter"
          //   icon={userIcon}
          // >
          //   {user.userName}
          // </Dropdown.Button>

          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} id="dropA">
              {user.userName}
            </a>
          </Dropdown>
        }
      </div>
    );
  }
}
