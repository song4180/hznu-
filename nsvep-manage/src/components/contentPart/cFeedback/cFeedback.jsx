/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-07-25 19:58:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /test/src/components/contentPart/cFeedback/cFeedback.jsx
 */ 
import React  from "react";
// import "cHomestyle.css";
import { Layout } from 'antd';
import FeedbackCom from '../../feedbackCom/feedbackCom'
import './cFeedback.css'

const { Content,Footer } = Layout;      //使用前定义，不加大括号会没有样式

export default class ConFeedback extends React.Component {
    render() {
        return(
            <Layout style={{ padding: '0 24px 24px', margin: '23px 0' }}>
                <Content className="site-layout-background BaseContent" >
                    <FeedbackCom />
                </Content>
                {/* <Footer style={{ textAlign: 'center',height:"5px" }}>©2020 网络与信息安全实验室</Footer> */}
            </Layout>
        )
    }
}