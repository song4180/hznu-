/* eslint-disable no-new-object */
/*
 * @Author: XN
 * @Date: 2020-07-17 19:02:07
 * @LastEditTime: 2020-11-06 22:31:31
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/peopleManageCom/peopleManageCom.jsx
 */

import React, { Component } from "react";
import { Table, Input, message, Button, Row, Col, Modal } from "antd";

import { reqPeopleManage, reqPeopleDelete } from "../../api/index.js";
import store from "../../store/index.js";
import "./peopleManageCom.css";

let initState = {
  pageNum: "",
  pageSize: "",
  className: ""
};

//删除的userId集合，以数组形式返回
let deleteUserId = [];
let myArr = [];

export default class PeopleManageCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //一页的大小
      pageSize: 10,
      //当前是哪一页
      pageNum: 1,
      //当前页面内容
      records: [],
      //总共有几条数据
      total: 1,
      //总共有几页
      pages: 1,
      //是否加载完成
      isLoading: true,
      //分页栏位置
      position: ["bottomCenter"],
      //管理员Id
      adminId: "1",
      //任教的课程名
      className: "周一4，5",
      //搜索的用户名
      userName: "",
      //选中的一行的key（这里我给key赋userID）
      selectedRowKeys: [],
      //是否正在加载
      loading: false,
      //待删除的用户Id数组长度
      selectLength: 0,
      //模态框是否可见
      visible: false,
      isSelected: false,
      myArr: []
    };
  }

  /**
   * @description: 页码点击时，修改当前页状态
   * @param {pageNum 当前页}
   * @return: 设置当前页是第几页，并之后请求当前页的数据
   */
  handleTableChange = pageNum => {
    this.setState(
      () => {
        return { pageNum: pageNum };
      },
      () => {
        const { pageSize, adminId, className } = initState;
        const { pageNum } = this.state;
        this.funcReqPeopleManage(pageNum, pageSize, adminId, className);
      }
    );
  };

  /**
   * @description: 请求表格数据
   * @param {pageNum 当前页码, pageSize 一页有几条数据, adminId 用户ID, className 班级名模糊查询（周一1，2）, userName 用户名模糊查询}
   * @return:
   */
  funcReqPeopleManage = (pageNum, pageSize, adminId, className, userName) => {
    reqPeopleManage(pageNum, pageSize, adminId, className, userName)
      .then(response => {
        var array = new Array();
        if (response.isSuccess) {
          /**
           * @description: 处理record数据，带有key字段（否则无法实现checkbox）
           * @param {type}
           * @return:
           */
          for (var i = 0; i < response.data.records.length; i++) {
            var obj = new Object();
            obj.key = response.data.records[i].userId;
            obj.userStudentNumber = response.data.records[i].userStudentNumber;
            obj.userId = response.data.records[i].userId;
            obj.userName = response.data.records[i].userName;
            obj.userClass = response.data.records[i].userClass;
            obj.className = response.data.records[i].className;
            array[i] = obj;
          }

          for (var i = 0; i < this.state.selectedRowKeys.length; i++) {
            deleteUserId.push(this.state.selectedRowKeys[i]);
          }
          this.setState({
            records: array,
            //一共几条数据
            total: response.data.total,
            //总共有几页
            pages: response.data.pages,
            //当前页码
            pageNum: response.data.current,
            //一页的大小
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
   * @description: 从store中获取数据存储到state中并渲染表格
   * @param {type}
   * @return:
   */
  componentWillMount() {
    this.setState(
      () => {
        return {
          pageNum: store.getState().pageNum,
          pageSize: store.getState().pageSize,
          adminId: store.getState().adminId,
          className: store.getState().className,
          count: true
        };
      },
      () => {
        const { pageNum, pageSize, adminId, className } = this.state;
        initState.pageNum = pageNum;
        initState.pageSize = pageSize;
        initState.adminId = adminId;
        initState.className = className;
        this.funcReqPeopleManage(
          initState.pageNum,
          initState.pageSize,
          initState.adminId,
          initState.className
        );
      }
    );
    deleteUserId = [];
    myArr = [];
  }

  /**
   * @description: 查找用户函数
   * @param {value 输入框查找的值}
   * @return:
   */
  searchFunc = value => {
    const { pageNum, pageSize, className, adminId } = this.state;
    reqPeopleManage(pageNum, pageSize, adminId, className, value)
      .then(response => {
        if (response.isSuccess) {
          for (var i = 0; i < this.state.selectedRowKeys.length; i++) {
            let a = this.state.selectedRowKeys[i];
            deleteUserId.push(a);
          }
          var array = new Array();
          for (var i = 0; i < response.data.records.length; i++) {
            var obj = new Object();
            obj.key = response.data.records[i].userId;
            obj.userStudentNumber = response.data.records[i].userStudentNumber;
            obj.userId = response.data.records[i].userId;
            obj.userName = response.data.records[i].userName;
            obj.userClass = response.data.records[i].userClass;
            obj.className = response.data.records[i].className;
            array[i] = obj;
          }
          this.setState({
            records: array,
            //一共几条数据
            total: response.data.total,
            //总共有几页
            pages: response.data.pages,
            //当前页码
            pageNum: response.data.current,
            //一页的大小
            pageSize: response.data.size,
            isLoading: false,
            isSelected: true
          });
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
      });
  };

  /**
   * @description: 去重函数
   * @param {arr 数组}
   * @return: 去重后的数组
   */
  unique = arr => {
    var res = [];
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = 1;
        res.push(arr[i]);
      }
    }
    return res;
  };

  /**
   * @description: 批量删除按钮的回调函数。处理selectedRowKeys选中项，放到deleteUserId数组中，并去重得到myArr数组
   * @param {type}
   * @return:
   */
  start = () => {
    for (var i = 0; i < this.state.selectedRowKeys.length; i++) {
      deleteUserId.push(this.state.selectedRowKeys[i]);
    }
    var myArr = this.unique(deleteUserId);
    this.setState(
      () => {
        return { myArr: myArr };
      },
      () => {
        this.setState({
          visible: true
        });
      }
    );
  };

  /**
   * @description: 模态框确认的回调函数，发送删除请求
   * @param {e 点击事件}
   * @return:
   */
  handleOk = e => {
    this.setState({
      visible: false,
      isSelected: false
    });
    reqPeopleDelete(this.state.myArr)
      .then(response => {
        if (response.isSuccess) {
          message.success(response.message);
          this.funcReqPeopleManage(
            initState.pageNum,
            initState.pageSize,
            initState.adminId,
            initState.className
          );
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

 /**
   * @description: 模态框取消的回调函数，清空选中
   * @param {e 点击事件}
   * @return:
   */
  handleCancel = e => {
    this.setState({
      visible: false,
      selectedRowKeys: [],
      isSelected: false
    });
    //将内存中选中的数组置为空
    deleteUserId = [];
    myArr = [];
  };

  /**
   * @description: 选中项发生变化时的回调
   * @param {selectedRowKeys}
   * @return:
   */
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
  };
  
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
        dataIndex: "userId",
        key: "userId",
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
        title: "班级",
        dataIndex: "userClass",
        key: "userClass",
        width: "10vw"
      },
      {
        title: "班级详情",
        dataIndex: "className",
        key: "className",
        width: "10vw"
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

    const { Search } = Input;
    const { loading, selectedRowKeys } = this.state;

    //表格行是否可选择
    const rowSelection = {
      //selectedRowKeys返回选中项的 key 数组，需要和 onChange 进行配合
      selectedRowKeys,
      //选中项发生变化时的回调
      onChange: this.onSelectChange
      // }
    };

    //判断是否可以批量删除
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <Row id="peopleBtn">
          <Col span={8}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
              id="deleteBtnMy"
            >
              批量删除
            </Button>
            <Modal
              title="批量删除"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
               okText="确认"
              cancelText="取消"
            >
              <p>确定删除{this.state.myArr.length}项数据吗</p>
            </Modal>
          </Col>
          <Col span={12}>
            <Search
              placeholder="输入搜索的姓名"
              enterButton="搜索"
              size="large"
              onSearch={this.searchFunc}
            />
          </Col>{" "}
        </Row>

        <div>
          <Table
            columns={columns}
            bordered={true}
            dataSource={records}
            pagination={paginationProps}
            loading={this.state.isLoading}
            scroll={{ x: 1000 }}
            rowKey={record => record.key}
            rowSelection={rowSelection}
            id="peopleTable"
          />
        </div>
      </div>
    );
  }
}
