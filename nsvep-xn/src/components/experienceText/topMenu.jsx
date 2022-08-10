// /*
//  * @Author: XN
//  * @Date: 2020-07-14 19:20:54
//  * @LastEditTime: 2020-08-07 19:18:56
//  * @LastEditors: XN
//  * @Description: 课程 - 实验 - 左侧实验内容框
//  * @FilePath: /gitee-nsvep/src/components/experienceText/topMenu.jsx
//  */

// import React, { Component } from "react";
// import { Tabs, Col, PageHeader, Button, Statistic, message } from "antd";

// import "./topMenu.less";
// import FeedbackFormIpt from "../feedbackForm/feedbackFormIpt.jsx";
// import { reqStartExp, reqOpenExp, reqCloseExp } from "../../api/index.js";
// import memoryUtils from "../../utils/memoryUtils.js";
// import storageUtils from "../../utils/storageUtils.js";
// var port='bbb'
// export default class TopMenu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       current: "0",
//       //倒计时长度
//       deadTime: Date.now() + 1000 * 60 * 60 * 2,
//       isOpen: false,
//       // port: "/#/loading",
//       portainer: ""
//       // port: "/#/notFound"
//     };
//   }

//   /**
//    * @description: req请求倒计时长度deadTime
//    * @param {type}
//    * @return {type}
//    */
//   componentWillMount() {}

//   /**
//    * @description: 通过设置Tabs的defaultActiveKey实现页面切换
//    * @param {key 当前Tab的key}
//    * @return:
//    */
//   callback = key => {
//     this.setState({ current: key });
//   };

//   /**
//    * @description: 倒计时结束，发送关闭容器请求
//    * @param {type}
//    * @return {type}
//    */
//   onFinish = () => {
//     //req关闭实验容器请求
//     console.log("finished!");
//   };

//   /**
//    * @description: 开始实验
//    * @param {type}
//    * @return {type}
//    */
//   startExp = () => {
//     //iframe的大小判断
//     let height = document.body.clientHeight;
//     let width = document.body.clientWidth * 0.75;
//     let strWidHei = width + "x" + height;
//     //请求分配到的的端口
//     reqStartExp(strWidHei)
//       .then(response => {
//         if (response.isSuccess) {
//           this.setState({ deadTime: this.response.deadTime });
//         } else message.error(response.message);
//       })
//       .catch(error => {
//         message.error(error.message);
//       });
//   };

//   /**
//    * @description: 启动实验 请求端口+容器id
//    * @param {type}
//    * @return {type}
//    */
//   openExp = () => {
//     // memoryUtils.port = this.state.port;
//     // storageUtils.savePort(this.state.port);
//     port = "http://172.22.236.56:6080"
//     reqOpenExp()
//       .then(response => {
//         if (response.isSuccess) {
//           this.setState(
//             () => {
//               return {
//                 port: this.response.data.port,
//                 portainer: this.response.data.portainer,
//                 isOPen: true
//               };
//             },
//             () => {
//               memoryUtils.portainer = this.state.portainer;
//               storageUtils.savePortainer(this.state.portainer);
//             }
//           );
//         } else message.error(response.message);
//       })
//       .catch(error => {
//         message.error(error.message);
//       });
//   };

//   closeExp = () => {
//     const portainer = memoryUtils.portainer;
//     reqCloseExp(portainer)
//       .then(response => {
//         if (response.isSuccess) {
//           this.setState({ isOPen: false });
//           message.success("已关闭容器");
//         } else message.error(response.message);
//       })
//       .catch(error => {
//         message.error(error.message);
//       });
//   };

//   render() {
//     const { current, isOpen } = this.state;
//     const { TabPane } = Tabs;

//     const title = ["步骤", "反馈"];

//     //文本的样式
//     const style = { padding: "24px" };

//     //倒计时组件
//     const { Countdown } = Statistic;
//     const deadline = this.state.deadTime;

//     //父组件 - 文本和是否第一次开启
//     const { expText, isClosed } = this.props;

//     return (
//       <div >
//         {" "}
//         <div className="Exptext">
//           <Tabs defaultActiveKey={[current]} onChange={this.callback}>
//             {/* 步骤 - 内容 */}
//             <TabPane tab={title[0]} key="0">
//               <PageHeader
//                 className="site-page-header pageHeader"
//                 onBack={() => window.history.back()}
//                 title="实验一Linux基础操作"
//               />
//               <div style={style}>
//                 {isClosed ? (
//                   <Button type="primary" onClick={this.startExp}>
//                     开始实验
//                   </Button>
//                 ) : (
//                   <Button type="primary" disabled={true}>
//                     开始实验
//                   </Button>
//                 )}{" "}
//                 <Button type="primary" disabled={isOpen} onClick={this.openExp}>
//                   启动实验
//                 </Button>{" "}
//                 <Button
//                   type="primary"
//                   disabled={!isOpen}
//                   onClick={this.closeExp}
//                 >
//                   关闭实验
//                 </Button>
//               </div>
//               <div className="countdownDiv">
//                 <span>容器关闭倒计时:</span>{" "}
//                 <Countdown
//                   id="countDown"
//                   value={deadline}
//                   onFinish={this.onFinish}
//                 />
//               </div>
//               <div style={style}>{expText}</div>
//             </TabPane>
//             {/* 反馈 - 内容 */}
//             <TabPane tab={title[1]} key="1" className="topMenuPerWidth">
//               <Col span={20} offset={0}>
//                 <FeedbackFormIpt className="feedbackForm" />
//               </Col>
//             </TabPane>
//           </Tabs>
//         </div>{" "}
//       </div>
//     );
//   }
// }
