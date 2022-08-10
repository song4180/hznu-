/*
 * @Author: your name
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-11 13:47:36
 * @LastEditors: XN
 * @Description: 实验界面
 * @FilePath: /gitee-nsvep/src/pages/experience/experience.jsx
 */

import React, { Component } from "react";
import { Tabs, PageHeader, Button, Statistic, Row, Col, message,Modal,Spin,Input } from "antd";
import { Progress } from 'antd';

import "../../components/experienceText/topMenu.less";
import FeedbackFormIpt from "../../components/feedbackForm/feedbackFormIpt";
import {
  reqStartExp,
  reqExpBeforeLoad,
  reqOpenExp,
  reqCloseExp,
  reqHelp
} from "../../api/index.js";
import Chart from '../../components/chartCom/chart.jsx'
import memoryUtils from "../../utils/memoryUtils.js";
import storageUtils from "../../utils/storageUtils.js";
import { BASE_URL } from "../../config/config.js";
import "./experience.less";

export default class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isload: true,
      //端口号
      port: "",
      // port: "/loading",
      //实验步骤
      expText: "<p> 暂无步骤 </p>",
      //是否第一次点击开始实验，按钮是否可点击
      isClosed: 1,
      //关闭按钮是否关闭
      isClose: true,
      //提交实验结果
      subExpBtn:true,
      //第一次加载
      isFirstLoad:true,
      //结束时间
      deadTime: "",
      //启动&关闭实验的按钮是否可点
      isOpen: false,
      //当前Tab
      current: "0",
      //容器ID
      portainer: "",
      //实验标题
      headTitle: "实验4",
      //实验任务
      expTask: "暂无任务",
      //是否进入等待状态
      spinShow:false,
      //等待转圈圈上面的字
      spinTips:"",
      //是否被帮助过
      helped:true,
      iFrameWidth: "800px",
      iFrameHeight: "600px",
    };
  }

  /**
   * @description: 进入实验后的加载 - 请求文本和是否第一次开始实验
   * @param {type}
   * @return {type}
   */
  componentWillMount() {
    const user = memoryUtils.user;
    const expId = memoryUtils.expId;
    document.querySelector('body').setAttribute('style','overflow-y:hidden;overflow-x:hidden')
    this.setState({ user: user });
    reqExpBeforeLoad(expId, user.userId)
      .then(response => {
        if (response.isSuccess) {
          this.setState(
            () => {
              return {
                //实验步骤文本
                expText: response.data.courseDetail,
                //是否第一次开启
                isClosed: response.data.isClosed,
                //实验标题
                headTitle: response.data.experimentTitle,
                //实验任务
                expTask: response.data.experimentTask,
                //第一次load
                isFirstLoad : response.data.isClosed
              };
            },
            () => {
              if (this.state.isClosed) {
                this.setState({ isOpen: true,subExpBtn:true });
              } else this.setState({ isOpen: false,subExpBtn:false });
            }
          );
        } else message.error(response.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  }

  /**
   * @description: 修改样式 当前页面不滚动，其他页面可以滚动=>退出页面时把body的样式取消
   * @param {*}
   * @return {*}
   */
  componentWillUnmount(){
    document.querySelector('body').removeAttribute('style')
  }

  /**
   * @description: 通过设置Tabs的defaultActiveKey实现页面切换
   * @param {key 当前Tab的key}
   * @return:
   */
  callback = key => {
    this.setState({ current: key });
  };

  /**
   * @description: 加载中状态修改
   * @param {*}
   * @return {*}
   */
  spinStart = () =>{
    this.setState({spinShow:true})
  }
  spinDestroy = () =>{
    this.setState({spinShow:false})
  }

  /**
   * @description: 倒计时结束，发送关闭容器请求
   * @param {type}
   * @return {type}
   */
  onFinish = () => {
    //req关闭实验容器请求
    this.closeExp();
  };

  /**
   * @description: 开始实验
   * @param {type}
   * @return {type}
   */
  startExp = () => {
    //iframe的大小判断
    let height = document.body.clientHeight;
    let width = document.body.clientWidth * 0.75;
    let strWidHei = width + "x" + height;
    let userId = memoryUtils.user.userId;
    let experimentId = memoryUtils.expId;
    //请求结束时间
    reqStartExp(experimentId, userId, strWidHei)
      .then(response => {
        if (response.isSuccess) {
          this.setState(
            () => {
              return {
                deadTime: parseInt(response.data.endTime),
                //开始实验按钮 禁用
                isClosed: 0,
                //启动实验按钮 启用
                isOpen: false,
              };
            },
            () => {
            }
          );
        } else message.error(response.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: 启动实验的请求函数
   * @param {type}
   * @return {type}
   */
  funcReqOpenExp = (experimentId, userId) => {
    reqOpenExp(experimentId, userId)
      .then(response => {
        if (response.isSuccess) {
          this.setState(
            () => {
              return {
                //端口号
                port: "http://" + response.data.occupyPort,
                //容器ID
                portainer: response.data.containerId,
                isOpen: true,
                isClose: false,
                subExpBtn:false
              };
            },
            () => {
              let { portainer } = this.state;
              //保存到内存
              memoryUtils.portainer = portainer;
              //保存到local本地
              storageUtils.savePortainer(portainer);
            }
          );
        } else message.error(response.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: 启动实验 请求端口+容器id
   * @param {type}
   * @return {type}
   */
  openExp = () => {
    let userId = memoryUtils.user.userId;
    let experimentId = memoryUtils.expId;
    let height = document.body.clientHeight;
    let width = document.body.clientWidth * 0.75;
    let strWidHei = width + "x" + height;
    //请求结束时间
    reqStartExp(experimentId, userId, strWidHei)
      .then(response => {
        if (response.isSuccess) {
          let oDay = new Date();
          let endT =  parseInt(response.data.endTime);
          if( endT < oDay.getTime()){
            message.info("实验已结束！");
            this.props.history.push("/user");
          }
          this.setState(
            () => {
              return { deadTime: parseInt(response.data.endTime),
              helped:false };
            },
            () => {
            }
          );
        } else message.error(response.message);
      })
      .catch(error => {
        message.error(error.message);
      });
    //请求端口和容器ID
    this.funcReqOpenExp(experimentId, userId);
  };

  /**
   * @description: 关闭容器的请求 POST 容器ID
   * @param {portainer}
   * @return {type}
   */
  closeExp = () => {
    // const { portainer } = this.state;
    this.setState({spinTips:"正在关闭容器"})
    this.spinStart();
    let userId = memoryUtils.user.userId;
    let experimentId = memoryUtils.expId;
    let portainer = memoryUtils.portainer;
    //发送容器ID
    reqCloseExp(experimentId, userId, portainer)
      .then(response => {
        if (response.isSuccess) {
          this.setState({ isOpen: false, isClose: true });
          this.spinDestroy();
          message.success("已关闭容器");
          storageUtils.removePortainer();
          this.props.history.push("/user");
        } else message.error(response.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: iframe onload挂载 两个功能：1.判断视口大小即设定iframe大小  2.判断是否第一次启动=>发送两次请求
   * @param {*}
   * @return {*}
   */
  iframeOnLoad = () =>{
    this.setState({
      iFrameWidth: document.body.clientWidth * 0.75 + "px",
      iFrameHeight: document.body.clientHeight + "px",
      isFirstLoad : 0
    });
    if(this.state.isFirstLoad){
      this.setState({spinTips:"第一次启动～请耐心等待一会～"})
      this.spinStart()
      setTimeout(() => {
      document.getElementById("dockerIframe").setAttribute('src',this.state.port);                    
      }, 4000);
      setTimeout(() => {
        this.spinDestroy();
      }, 8000);
    }
  }

  helpFunc = () =>{
     this.setState({helped:true})
     let { port } = this.state;
     let user = memoryUtils.user;
     let experimentId = memoryUtils.expId;
     reqHelp(experimentId,user.userId)
      .then(response=>{
        message.info("请注意屏幕，老师可能正在帮助你！");        
      })
      .catch(error => {
        message.error(error.message);
      });

  }
  render() {
    const {
      current,
      isOpen,
      expText,
      isClosed,
      headTitle,
      expTask,
      deadTime,
      spinTips,
      spinShow
    } = this.state;
    const { TabPane } = Tabs;

    const title = ["任务", "步骤", "反馈"];

    //文本的样式
    const style = { padding: "10px 24px" };
    const htmlStyle = { padding: "10px 24px" };
    //倒计时组件
    const { Countdown } = Statistic;
    return (
      <Spin spinning={spinShow} tip={spinTips}>
      <div className="experience-bg">
        <Row>
          <Col span={6}>
            <div>
              {" "}
              <div className="Exptext">
             
                <Tabs defaultActiveKey={current} onChange={this.callback}>
                  {/* 步骤 - 任务 */}
                  <TabPane tab={title[0]} key="0">
                    <PageHeader
                      className="site-page-header pageHeader"
                      onBack={() => {
                        storageUtils.removeExpId();
                        memoryUtils.expId = "";
                        this.props.history.push("/user");
                      }}
                      title={headTitle}
                    />
                   <div className="countdownDiv">
                          <span>容器关闭倒计时:</span>{" "}
                          <Countdown
                            id="countDown"
                            value={deadTime}
                            onFinish={this.onFinish}
                          />
                        </div>
                    <div className="expButton">
                    <Row>
                     <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                      {isClosed ? (
                        <Button type="primary" onClick={this.startExp}>
                          开始实验
                        </Button>
                      ) : (
                        <Button type="primary" disabled={true}>
                          开始实验
                        </Button>
                      )}
                      </Col>
                       <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                      <Button
                        type="primary"
                        disabled={this.state.isOpen}
                        onClick={this.openExp}
                      >
                        启动实验
                      </Button>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={10} xl={8}>
                      <Button
                        type="primary"
                        disabled={this.state.isClose}
                        onClick={this.closeExp}
                      >
                        关闭实验
                      </Button>
                      </Col>
                      <Col xs={24} sm={12} md={8} lg={10} xl={8}>
                      {/* <Button disabled={this.state.subExpBtn} type="primary" 
                      onClick={()=>{
                        message.info("请注意屏幕，老师可能正在帮助你！");
                        }
                        }>请求老师帮助</Button> */}
                      <Button disabled={this.state.helped} type="primary" 
                          onClick={this.helpFunc}>请求老师帮助</Button>
                      </Col>
                      </Row>
                    </div>
                    <div style={style}>{expTask}</div>
                  
                  </TabPane>
                  {/* 步骤 - 内容 */}
                  <TabPane tab={title[1]} key="1">
                    <PageHeader
                      className="site-page-header pageHeader"
                      onBack={() => this.props.history.push("/user")}
                      title={headTitle}
                    />
                    <div style={htmlStyle}>
                      <div dangerouslySetInnerHTML={{ __html: expText }} />
                    </div>
                  </TabPane>
                  {/* 反馈 - 内容 */}
                  <TabPane tab={title[2]} key="2" className="topMenuPerWidth">
                    <Row>
                      <Col span={20} offset={0}>
                        <FeedbackFormIpt className="feedbackForm" />
                      </Col>
                    </Row>
                    <div id="expChart">
                      <Chart/>
                    </div>
                  </TabPane>
                </Tabs>
              </div>{" "}
            </div>
          </Col>
          <Col span={18}>
            <iframe
              id="dockerIframe"
              style={{
                width: this.state.iFrameWidth,
                height: this.state.iFrameHeight,
                overflow: "visible"
              }}
              allowFullScreen
              onLoad={this.iframeOnLoad}
              ref="iframe"
              src={this.state.port}
              frameBorder="0"
            />
          </Col>
        </Row>
      </div>
      </Spin>
    );
  }
}
