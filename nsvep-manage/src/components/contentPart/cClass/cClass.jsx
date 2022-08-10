/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-10-31 16:27:32
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/contentPart/cClass/cClass.jsx
 */ 
import React  from "react";
// import "cHomestyle.css";
import { Layout } from 'antd';
import ClassManageCom from  '../../classManageCom/classManageCom.jsx' 

const { Content,Footer } = Layout;      //使用前定义，不加大括号会没有样式

export default class ConClass extends React.Component {
    render() {
        return(
            <Layout style={{ padding: '0 24px 24px', margin: '23px 0' }}>
                <Content className="site-layout-background BaseContent" >
                    <ClassManageCom history={this.props.history}/>
                </Content>
                {/* <Footer style={{ textAlign: 'center',height:"5px" }}>©2020 网络与信息安全实验室</Footer> */}
            </Layout>
        )
    }
}