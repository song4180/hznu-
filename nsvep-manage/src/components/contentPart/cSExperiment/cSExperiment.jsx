/*
 * @Author: XN
 * @Date: 2020-07-27 10:10:15
 * @LastEditTime: 2020-08-06 20:44:13
 * @LastEditors: XN
 * @Description:
 * @FilePath: /te/src/components/contentPart/cSExperiment/cSExperiment.jsx
 */
import React from "react";
// import "cHomestyle.css";
import { Tabs, Layout } from "antd";

import SExpForm from "../../SExpForm/SExpForm";
import ConSTable from "../../tools/contable";

const { Content, Footer } = Layout; //使用前定义，不加大括号会没有样式
const { TabPane } = Tabs;

function callback(key) {
}
export default class ConSExperiment extends React.Component {
  render() {
    return (
      <Layout style={{ padding: "0 24px 24px", margin: "23px 0" }}>
        <Content
          className="site-layout-background BaseContent"
          style={{ padding: 24, marginLeft: 15, minHeight: 650 }}
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane
              tab={
                <span style={{ fontSize: 18 }}>&nbsp;现有实验资源&nbsp;</span>
              }
              key="1"
            >
              <ConSTable />
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: 18 }}>&nbsp;上传实验资源&nbsp;</span>
              }
              key="2"
            >
              <SExpForm />
            </TabPane>
          </Tabs>
        </Content>
        {/* <Footer style={{ textAlign: "center", height: "5px" }}>
          ©2020 网络与信息安全实验室
        </Footer> */}
      </Layout>
    );
  }
}
