/*
 * @Author: XN
 * @Date: 2020-07-01 18:40:33
 * @LastEditTime: 2020-11-02 15:04:23
 * @LastEditors: XN
 * @Description: 个人信息页面
 * @FilePath: /gitee-nsvep/src/components/personalCenterForm/personalCenterForm.jsx
 */

import React, { Component } from "react";
import { Tabs } from "antd";
import Texty from 'rc-texty';

import "./personalCenterForm.less";
import PersonalCenterMyIfo from "./personalCenterMyIfo.jsx";
import PersonalCenterChangePwd from "./personalCenterChangePwd.jsx";
import Footer from '../../components/footer/footer'

export default class PersonalCenterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { TabPane } = Tabs;
    return (
      <div>
        <div className="personalCenterArea">
          <Tabs defaultActiveKey="personInfo" className="personalTabs">
          {/* <Texty> */}
            <TabPane tab="个人资料" key="personInfo">
            {/* </Texty> */}

              <PersonalCenterMyIfo />
            </TabPane>
            {/* <Texty> */}
            <TabPane tab="修改密码" key="changePwd">
              <PersonalCenterChangePwd />
            </TabPane>
            {/* </Texty> */}
          </Tabs>
        </div>
      </div>
    );
  }
}
