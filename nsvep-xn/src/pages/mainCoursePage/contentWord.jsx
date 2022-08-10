/*
 * @Author: XN
 * @Date: 2020-03-15 15:36:41
 * @LastEditTime: 2020-11-04 13:35:15
 * @LastEditors: XN
 * @Description: 用map函数将分页内容填充在Panel上
 * @FilePath: /gitee-nsvep/src/pages/mainCoursePage/contentWord.jsx
 */

import React, { Component } from "react";
import { Collapse, Button ,message, Modal, Row, Col, Spin } from "antd";
import {Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import QueueAnim from 'rc-queue-anim';
import "./contentWord.less";
import startLogo from "./img/start.svg";
import memoryUtils from "../../utils/memoryUtils.js";
import storageUtils from "../../utils/storageUtils.js";
import {
  reqIsOpenDocker,
  reqCloseExp
} from "../../api/index.js";
import ExpCom from '../../components/experienceCom/index.jsx'

const { Panel } = Collapse;

export default class ContentWord extends Component {
  constructor(props) {
    //props中放置了当前分页中的内容pageItems
    super(props);
    this.state = {
      //当前登录用户的信息
      user: "",
      //实验ID
      expId: "",
      oldExpId: "",
      isOpenDocVisible: false,
      oldContainerId:"",
      progressShow:false,
      spinShow:false
    };
  }

  /**
   * @description: 预加载，从内存中读取user并存储在状态中
   * @param {}
   * @return:
   */
  componentWillMount() {
    const user = memoryUtils.user;
    this.setState({ user: user });
  }

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
   * @description: 开启着docker容器-继续
   * @param {e}
   * @return {type}
   */
  handleOk = e => {
    this.setState({
      isOpenDocVisible: false
    });
    //获取旧的expID和portainer并记录memory
    let expId = this.state.oldExpId;
    let portainer = this.state.oldContainerId;
    memoryUtils.expId = expId;
    memoryUtils.portainer = portainer;
    //保存实验ID和容器ID到local本地
    storageUtils.saveExpId(expId);
    storageUtils.savePortainer(portainer);
    this.props.history.push("/experience");
   
  };

  /**
   * @description: 开启着docker容器-结束
   * @param {e}
   * @return {type}
   */
  handleCancel = e => {
    this.setState({
      isOpenDocVisible: false,
      progressShow:true
    });

    this.spinStart();
    //获取userId和旧容器的expId和oldContainerId
    let userId = memoryUtils.user.userId;
    let oldExpId = this.state.oldExpId;
    let oldContainerId = this.state.oldContainerId;
    //记录新的expID到local本地
    let expId = this.state.expId;
    memoryUtils.expId = expId;
    storageUtils.saveExpId(expId);

    //旧的expId和userId，oldContainerId给后端 关闭容器
    reqCloseExp(oldExpId,userId,oldContainerId)
      .then(response => {
        if (response.isSuccess) {
          this.spinDestroy();
          message.success("已成功关闭容器");
          //push
          // this.props.history.push("/experience");
        } else message.error(response.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: 是否已经开启了容器
   * @param {type}
   * @return {type}
   */

  isOpenDocker = (e, item, index) => {
    this.setState({ expId: item.experimentId });
    let userId = memoryUtils.user.userId;
    reqIsOpenDocker(userId)
      .then(response => {
        if (response.isSuccess) {
          //判断是否开启了容器
          if (response.data.experimentId) {
            // 弹窗
            // ->继续/结束
            // ->请求接口获取原来的expID和containerId并记录memory/post一个新的expId和userId给后端关闭容器，再记录新的expID到memory
            // ->跳转
            this.setState({
              isOpenDocVisible: true,
              oldExpId: response.data.experimentId,
              oldContainerId: response.data.containerId
            });
          } else {
            //返回为null则直接go
            this.goExperience(e, item, index);
            message.info("欢迎进入实验");
          }
        } else message.error(response.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description:进入实验函数
   * @param {e:点击事件event,index:顺序标}
   * @return:
   */
  goExperience = (e, item, index) => {
    this.setState(
      () => {
        return { expId: item.experimentId };
      },
      () => {
        const { expId } = this.state;
        //保存到内存
        memoryUtils.expId = expId;
        //保存到local本地
        storageUtils.saveExpId(expId);
        this.props.history.push("/experience");
      }
    );
  };

  /**
   * @description: 调用map函数将分页内容填充在Panel上并返回
   * @param {type}
   * @return:
   */
  render() {
    const list = this.props.pageItem;
    const queueArr = ["a","b","c","d","e","f","g","h","i","j"];
    return (
      <Spin spinning={this.state.spinShow} tip="正在关闭容器">
      <div id="contentWordSpace">
      <Row className="justify-content-space-around" >
       {list.map((item, index) => (
        <Col span={6}>
         <QueueAnim delay={300} className="queue-simple">
          <Card id="expCard" key={queueArr[index]}>
           <Card.Body>
              <h4>{item.experimentTitle}</h4>
            <Card.Text>
               {item.experimentDescribe}
             </Card.Text>
             <Button
                  type="primary"
                  shape="round"
                  onClick={event => {
                    this.isOpenDocker(event, item, index);
                  }}
                  disabled={item.isClosed ? true : false}
                >
                  进入实验
                </Button>
           </Card.Body>
         </Card>
         </QueueAnim>
        </Col>
      
       ))}
        </Row>
        
        <Modal
          title="提示"
          visible={this.state.isOpenDocVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="结束实验"
          okText="继续实验"
        >
          <p>系统检测到之前已开启实验，请问是继续实验还是结束该实验？</p>
        </Modal>
      </div>
      </Spin>
    );
  }
}


 // <Collapse accordion defaultActiveKey={["0"]}>
        //   {list.map((item, index) => (
        //     <Panel header={item.experimentTitle} key={item.experimentId}>
        //       <p>{item.experimentDescribe}</p>
        //       <div className="contentWordStart">
        //         {item.isClosed ? "" : <img src={startLogo} alt="failed" />}
        //         <Button
        //           type="primary"
        //           shape="round"
        //           onClick={event => {
        //             this.isOpenDocker(event, item, index);
        //           }}
        //           disabled={item.isClosed ? true : false}
        //         >
        //           进入实验
        //         </Button>
        //       </div>
        //     </Panel>
        //   ))}
        // </Collapse>
