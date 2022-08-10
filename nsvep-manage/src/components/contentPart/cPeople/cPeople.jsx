/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-07-20 21:37:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/src/components/contentPart/cClass/cClass.jsx
 */

import React from "react";
import { Layout, PageHeader } from "antd";
import { Redirect } from "react-router-dom";

import PeopleManageCom from "../../peopleManageCom/peopleManageCom.jsx";
import "./cPeople.css"

const { Content } = Layout; //使用前定义，不加大括号会没有样式

export default class ConPeople extends React.Component {
  render() {
    const routes = [
      {
        path: "/class",
        breadcrumbName: "班级管理"
      },
      {
        path: "/people",
        breadcrumbName: "人员管理"
      }
    ];
    return (
      <Content className="site-layout-background BaseContent">
        <PageHeader
          className="site-page-header"
          breadcrumb={{ routes }}
        />
        <PeopleManageCom />
      </Content>
    );
  }
}
