/*
 * @Author: XN
 * @Date: 2020-07-17 12:21:02
 * @LastEditTime: 2020-10-12 16:59:22
 * @LastEditors: XN
 * @Description: 故障反馈，分页
 * @FilePath: /te/src/components/feedbackCom/feedbackCom.jsx
 */

import React, { Component } from "react";
import { Table, Tooltip, message } from "antd";

import "./feedbackCom.css";
import { reqFeedbackReports } from "../../api/index.js";

export default class FeedbackCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //一页的大小
      pageSize: 8,
      //当前是哪一页
      pageNum: 1,
      //当前页面内容
      records: [],
      //总共有几条数据
      total: 1,
      //总共有几页
      pages: 1,
      //页面是否加载中
      isLoading: true,
      //分页栏位置
      position: ["bottomCenter"]
    };
  }

  /**
   * @description: 请求页面数据接口的函数
   * @param {pageSize 一页的大小, pageNum 当前是哪一页}
   * @return:将接收到的数据存储到当前组件的状态中（state）
   */
  funReqPageCon = (pageSize, pageNum) => {
    reqFeedbackReports(pageSize, pageNum)
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
   * @description: 预先请求第一页的数据
   * @param {}
   * @return:
   */
  componentWillMount() {
    let { pageSize, pageNum } = this.state;
    this.funReqPageCon(pageSize, pageNum);
  }

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

  render() {
    const { records, pageNum, total, pageSize, position } = this.state;
    const columns = [
      {
        title: "序号",
        dataIndex: "key",
        key: "key",
        //排序
        sorter: (a, b) => a.key - b.key,
        //渲染序号
        render: (text, record, index) =>
          `${pageSize * (pageNum - 1) + index + 1}`,
        //当前列宽度
        width: "5vw"
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
        title: "标题",
        dataIndex: "reportedTitle",
        key: "reportedTitle",
        ellipsis: true,
        width: "10vw",
        //省略超出范围的内容
        ellipsis: {
          showTitle: false
        },
        //将超出范围的内容显示到tooltip中
        render: reportedTitle => (
          <Tooltip placement="topLeft" title={reportedTitle}>
            {reportedTitle}
          </Tooltip>
        )
      },
      {
        title: "内容",
        dataIndex: "reportedDetail",
        key: "reportedDetail",
        ellipsis: true,
        width: "15vw",
        ellipsis: {
          showTitle: false
        },
        render: reportedDetail => (
          <Tooltip placement="topLeft" title={reportedDetail}>
            {reportedDetail}
          </Tooltip>
        )
      },
      {
        title: "提交时间",
        dataIndex: "createTime",
        key: "createTime",
        width: "10vw",
        //按时间进行排序
        sorter: (a, b) => Date.parse(a.createTime) - Date.parse(b.createTime)
      }
    ];

    //分页的参数设置
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
      <div>
        <Table
          columns={columns}
          bordered={true}
          dataSource={records}
          pagination={paginationProps}
          loading={this.state.isLoading}
        />
      </div>
    );
  }
}
