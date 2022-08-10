/*
 * @Author: XN
 * @Date: 2020-07-18 10:08:37
 * @LastEditTime: 2020-10-12 17:00:38
 * @LastEditors: XN
 * @Description: 
 * @FilePath: /te/src/components/personalCenterForm/personalCenterForm.jsx
 */
import React, { Component } from "react";
import {  Tabs } from "antd";
// import { FormOutlined } from "@ant-design/icons";

import "./personalCenterForm.less";
import PersonalCenterMyIfo from './personalCenterMyIfo.jsx'
import PersonalCenterChangePwd from './personalCenterChangePwd.jsx'

export default class PersonalCenterForm extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const { TabPane } = Tabs;
    function callback(key) {
    }

    return (
      <div>
        <div className="personalCenterArea">
          
          <Tabs defaultActiveKey="personInfo" onChange={callback} className="personalTabs">
            <TabPane tab="个人资料" key="personInfo">
              <PersonalCenterMyIfo />
            </TabPane>
            <TabPane tab="修改密码" key="changePwd">
              <PersonalCenterChangePwd />
            </TabPane>
            
          </Tabs>
          
        </div>
      </div>
    );
  }
}
