/*
 * @Author: XN
 * @Date: 2020-07-27 10:10:15
 * @LastEditTime: 2020-11-06 21:11:19
 * @LastEditors: XN
 * @Description:
 * @FilePath: /te/src/components/contentPart/cHelp/cHelp.jsx
 */
import React from "react";
import "./cHelp.css";
import { Row, Col, message ,Table, Button } from "antd";
import { Layout } from "antd";
import ConTable from "../../tools/homeTable";
import ConUpload from "../../tools/upload";

import memoryUtils from '../../../utils/memoryUtils.js';
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line"; //折线图是line,饼图改为pie,柱形图改为bar
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";
import { reqCPUCharts, reqStuCharts, reqHelp,reqHelpTable } from "../../../api/index.js";

const { Content, Footer } = Layout; //使用前定义，不加大括号会没有样式

export default class ConHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //一页的大小
      pageSize: 10,
      //当前是哪一页
      pageNum: 1,
      //当前页面内容
      records: [
           {
        "assistId": 1,
        "userId": 1,
        "userStudentNumber": "2018212212142",
        "userName": "小国",
        "experimentId": 11,
        "experimentTitle": "AK47",
        "isAssisted": 1,
        "createTime": "2020-11-05 18:12:36"
      },
      {
        "assistId": 2,
        "userId": 3,
        "userStudentNumber": "2018212212344",
        "userName": "小鸟",
        "experimentId": 11,
        "experimentTitle": "AK47",
        "isAssisted": 2,
        "createTime": "2020-11-05 19:09:09"
      },
      {
        "assistId": 3,
        "userId": 4,
        "userStudentNumber": "2017212212144",
        "userName": "小吉",
        "experimentId": 11,
        "experimentTitle": "AK47",
        "isAssisted": 0,
        "createTime": "2020-11-05 20:00:34"
      }
      ],
      //总共有几条数据
      total: 1,
      //总共有几页
      pages: 1,
      //是否正在加载(进来是true)
      isLoading: true,
      //分页栏位置
      position: ["bottomCenter"],
      //管理员Id
      adminId: "1",
    };
  }

  componentWillMount() {
    let { pageSize, pageNum } = this.state;
    //测试用
    var adminId = memoryUtils.user.adminId;
    this.setState({adminId:adminId})    
    this.setState({isLoading: false})
    this.funReqPageCon(pageSize, pageNum,adminId);
  }

  /**
   * @description: 请求页面数据接口的函数
   * @param {pageSize 一页的大小, pageNum 当前是哪一页}
   * @return:将接收到的数据存储到当前组件的状态中（state）
   */
  funReqPageCon = (pageSize, pageNum,adminId) => {
    reqHelpTable(pageSize, pageNum,adminId)
      .then(response => {
        if (response.isSuccess) {
          this.setState({
            records: response.data.records,
            total: response.data.total,
            pages: response.data.pages,
            pageNum: response.data.current,
            pageSize: response.data.size,
            isLoading: false
          });
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

   /**
   * @description: 页码点击时，修改当前页状态
   * @param {pageNum 当前页}
   * @return: 设置当前页是第几页，并之后请求当前页的数据
   */
  handleTableChange = pageNum => {
    let { pageSize } = this.state;
    this.setState(
      () => {
        return { pageNum: pageNum };
      },
      () => {
        this.funReqPageCon(pageSize, pageNum);
      }
    );
  };

  refuseHelp = (text,record,index) => {
    let {pageSize, pageNum,adminId} = this.state;
    let {assistId,userId,experimentId} = record ;
      reqHelp(assistId,userId,experimentId,2)
      .then(response=>{
          if(response.isSuccess){
            this.funReqPageCon(pageSize, pageNum,adminId)
            window.location.reload();
          }
          else{ message.error(response.message) }
      })
      .catch(error=>{
          message.error(error.message);
      })
  }

  goHelp = (text,record,index) =>{
     let {pageSize, pageNum,adminId} = this.state;
      let {assistId,userId,experimentId} = record ;
      reqHelp(assistId,userId,experimentId,1)
      .then(response=>{
          if(response.isSuccess){
            window.open("http://"+response.data.port) 
            this.funReqPageCon(pageSize, pageNum,adminId)
          }
          else{ message.error(response.message) }
      })
      .catch(error=>{
          message.error(error.message);
      })
  }

  render() {

    const {
      records,
      pageNum,
      total,
      pageSize,
      position,
      className
    } = this.state;
    
    const columns = [
      {
        title: "序号",
        dataIndex: "Id",
        key: "Id",
        //排序
        sorter: (a, b) => a.key - b.key,
        //渲染序号
        render: (text, record, index) =>
          `${pageSize * (pageNum - 1) + index + 1}`,
        //当前列宽度
        width: "5vw",
        fixed: "left"
      },
     
      {
        title: "学号",
        dataIndex: "userStudentNumber",
        key: "userStudentNumber",
        sorter: (a, b) => a.key - b.key,
        width: "10vw"
      },
      {
        title: "姓名",
        dataIndex: "userName",
        key: "userName",
        width: "7vw"
      },
       
       {
        title: "实验名称",
        dataIndex: "experimentTitle",
        key: "experimentTitle",
        width: "7vw"
      },
      {
        title: "发送请求时间",
        dataIndex: "createTime",
        key: "createTime",
        sorter: (a, b) => { 
          let aTime = new Date(a.createTime).getTime();
          let bTime = new Date(b.createTime).getTime();
          return aTime - bTime;
        },
        width: "10vw"
      },
      {
        title: "用户Id",
        dataIndex: "userId",
        key: "userId",
        //渲染序号
        //当前列宽度
        width: "5vw",
      },
      {
        title: "实验ID",
        dataIndex: "experimentId",
        key: "experimentId",
        width: "5vw"
      },
      {
        title: "协助Id",
        dataIndex: "assistId",
        key: "experimentId",
        width: "5vw"
      },
       {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: "15vw",
        render: (text, record, index) => {
            if(record.isAssisted == 0){
                return (   
                <div className="site-button-ghost-wrapper">
                <Button type="primary" onClick={()=>this.goHelp(text,record,index)}>
                    协助
                </Button>{" "}
                <Button
                    type="danger"
                    onClick={()=>this.refuseHelp(text,record,index)}
                >
                    拒绝
                </Button>{" "}
                </div>
                );    
            }
            else if(record.isAssisted == 1){
                return(<div style={{color:"green"}}>已协助</div>)
            }
            else if(record.isAssisted == 2){
                return(<div style={{color:"red"}}>已拒绝</div>)                
            }
        }
      }
    ];

     const paginationProps = {
      //当前是哪一页
      page: pageNum,
      //默认一页有几条数据
      defaultPageSize: pageSize,
      //点击事件
      onChange: page => this.handleTableChange(page),
      //一共有多少条数据
      total: total,
      //分页栏的位置
      position: position
    };

    return (
      <div className="cHomeCon">
        <Layout style={{ padding: "0 24px 24px", margin: "23px 0" }}>
          <Content className="site-layout-background BaseContent">
          <Table
            columns={columns}
            bordered={true}
            dataSource={records}
            pagination={paginationProps}
            loading={this.state.isLoading}
            scroll={{ x: 1000 }}
            rowKey={record => record.key}
            id="helpTable"
          />
          </Content>
          {/* <Footer style={{ textAlign: "center", height: "5px" }}>
            ©2020 网络与信息安全实验室
          </Footer> */}
        </Layout>
      </div>
    );
  }
}
