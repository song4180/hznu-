/*
 * @Author: your name
 * @Date: 2020-07-17 19:02:07
 * @LastEditTime: 2020-11-11 13:59:46
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/classManageCom/classManageCom.jsx
 */

import React, { Component } from "react";
import { Table, message, Button, Modal, Checkbox, Pagination } from "antd";
import AddManager from "../tools/addManager.jsx"
import memoryUtils from "../../utils/memoryUtils.js";
import {
  reqClassManage,
  reqClassDelete,
  reqChooseExp,
  reqExpCheckbox
} from "../../api/index.js";
import store from "../../store";
import AddClassBtn from "./addClassBtn.jsx";
import BatchUsers from "./batchUsers.jsx";

const options = [
  { label: "AppleL", value: 1, disabled: false },
  { label: "PearL", value: 2, disabled: true },
  { label: "OrangeL", value: 3, disabled: true }
];

export default class ClassManageCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //传给人员管理：一页的大小
      pageSize: 10,
      //传给人员管理：请求的是哪一页
      pageNum: 1,
      //是否加载完成
      //分页栏位置
      position: ["bottomCenter"],
      adminId: "1",
      records: "",
      classId: "",
      //是否加载显示加载
      isLoading: true,
      //批量导入modal
      visible: false,
      //结课modal
      deleteVisible: false,
      chooseVisible: false,
      className: "",
      // 是否删除成功
      isDelete: false,
      //用户选择的结果
      checkedValues: [],
      //请求到的可选择的实验
      options: []
    };
  }

  /**
   * @description:获取该老师任教班级的数据
   * @param {adminId 老师ID}
   * @return:老师的任教班级
   */
  funcReqClassManage = adminId => {
    reqClassManage(adminId)
      .then(response => {
        if (response.isSuccess) {
          this.setState({
            records: response.data,
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
   * @description:获取第一次渲染的数据，从内存中获取管理员Id，并发送请求
   * @param {type}
   * @return:
   */
  componentWillMount() {
    this.setState(
      () => {
        return { adminId: memoryUtils.user.adminId };
      },
      () => {
        const { adminId } = this.state;
        this.funcReqClassManage(adminId);
      }
    );
  }

  /**
   * @description: 给store传送数据
   * @param {className 班级名称, pageNum 当前是哪一页, pageSize 一页的大小, adminId 用户的ID, type 进行操作的名称}
   * @return:
   */
  dispatchFunc = (className, pageNum, pageSize, adminId, type) => {
    store.dispatch({
      type: type,
      payload: {
        className: className,
        pageNum: pageNum,
        pageSize: pageSize,
        adminId: adminId
      }
    });
  };

  /**
   * @description:将点击获得的该行数据,并将className、pageNum、pageSize、adminID 存入store
   * @param {text 该行数据, record 数据, index 序列号}
   * @return:
   */
  handleSeePeople = (text, record, index) => {
    const { pageNum, pageSize, adminId } = this.state;
    this.dispatchFunc(
      text.className,
      pageNum,
      pageSize,
      adminId,
      "classNameChange"
    );
    this.props.history.push("/people");
  };

  /**
   * @description: 删除班级
   * @param {classId 班级ID}
   * @return:
   */
  handleDeleteClass = classId => {
    reqClassDelete(this.state.adminId, classId)
      .then(response => {
        if (response.isSuccess) {
          this.setState(
            () => {
              return { isDelete: true };
            },
            () => {
              this.funcReqClassManage(this.state.adminId);
              this.setState({ isDelete: false });
            }
          );
          message.success("删除成功！");
        } else {
          message.error("删除失败！");
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: 批量导入展示模态框
   * @param {type}
   * @return:
   */
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  showDeleteModal = text => {
    this.setState({
      deleteVisible: true,
      classId: text.classId,
      className: text.className
    });
  };

  /**
   * @description: 选择实验 - 预加载
   * @param {text 该行数据}
   * @return: 将获取到的data封装成[{label:'',value: }]的格式并存入options状态
   */
  showChooseExpModal = record => {
    reqExpCheckbox(record.classId)
      .then(response => {
        if (response.isSuccess) {
          var array = new Array();
          for (var i = 0; i < response.data.experimentDTOS.length; i++) {
            var obj = new Object();
            obj.label = response.data.experimentDTOS[i].experimentTitle;
            obj.value = response.data.experimentDTOS[i].experimentId;
            obj.disabled = false;
            for (var j = 0; j < response.data.isSelected.length; j++) {
              if (obj.value === response.data.isSelected[j]) {
                obj.disabled = true;
                break;
              } else continue;
            }
            array[i] = obj;
          }
          this.setState(
            () => {
              return { options: array };
            },
            () => {
              this.setState({
                chooseVisible: true,
                classId: record.classId,
                className: record.className
              });
            }
          );
        } else {
          message.error("加载失败");
        }
      })
      .catch(error => {});
  };
  /**
   * @description: 批量导入模态框确认选项
   * @param {type}
   * @return:
   */
  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  /**
   * @description: 批量导入模态框取消选项
   * @param {type}
   * @return:
   */
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  /**
   * @description: 删除模态框确认选项
   * @param {type}
   * @return:
   */
  deleteHandleOk = e => {
    this.setState({
      deleteVisible: false
    });
    this.handleDeleteClass(this.state.classId);
  };

  /**
   * @description: 删除模态框取消选项
   * @param {type}
   * @return:
   */
  deleteHandleCancel = e => {
    this.setState({
      deleteVisible: false
    });
  };

  /**
   * @description: 选择实验模态框确认选项，附发送请求函数，
   * @param {e 点击事件}
   * @return:
   */
  chooseExpHandleOk = e => {
    this.setState({
      chooseVisible: false
    });
    this.funcReqChooseExp(this.state.classId, this.state.checkedValues);
  };

  /**
   * @description: 选择实验模态框取消选项
   * @param {e 点击事件}
   * @return:
   */
  chooseExpHandleCancel = e => {
    this.setState({
      chooseVisible: false
    });
  };

  /**
   * @description: 批量导入时接收到子组件的状态后重新请求表格，实现动态添加
   * @param {type}
   * @return:
   */
  rerender = ok => {
    this.funcReqClassManage(this.state.adminId);
  };

  /**
   * @description: 发送选中的课程的请求
   * @param {classId 课程ID,checkedValues 选中的课程序号（数组形式）}
   * @return:
   */
  funcReqChooseExp = (classId, checkedValues) => {
    reqChooseExp(classId, checkedValues)
      .then(response => {
        if (response.isSuccess) {
          message.success("设置成功");
        } else {
          message.error("设置失败");
          this.setState({ checkedValues: [] });
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  onChange = checkedValues => {
    this.setState({ checkedValues });
  };

  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "key",
        key: "key",
        //排序
        sorter: (a, b) => a.key - b.key,
        //渲染序号
        render: (text, record, index) => `${index + 1}`,
        //当前列宽度
        width: "5vw",
        fixed: "left"
      },
      {
        title: "班级名称",
        dataIndex: "className",
        key: "className",
        sorter: (a, b) => a.key - b.key,
        width: "7vw"
      },
      {
        title: "班级详情",
        dataIndex: "classDetail",
        key: "classDetail",
        width: "10vw"
      },
      {
        title: "班级序列号",
        dataIndex: "classId",
        key: "classId",
        width: "5vw"
      },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: "15vw",
        render: (text, record, index) => {
          return (
            <div className="site-button-ghost-wrapper">
              <Button
                type="primary"
                onClick={() => {
                  this.setState(
                    () => {
                      return { classId: text.classId };
                    },
                    () => {
                      this.showModal();
                    }
                  );
                }}
              >
                批量导入
              </Button>
              <Modal
                title="批量导入"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
              >
                <BatchUsers classId={this.state.classId} />
              </Modal>{" "}
              <Button type="danger" onClick={() => this.showDeleteModal(text)}>
                结课
              </Button>
              <Modal
                title="确认删除"
                visible={this.state.deleteVisible}
                onOk={this.deleteHandleOk}
                onCancel={this.deleteHandleCancel}
                okText="确认"
                cancelText="取消"
              >
                <p>确认为“{this.state.className}”结课吗</p>
              </Modal>{" "}
              <Button
                type="primary"
                onClick={() => this.handleSeePeople(text, record, index)}
              >
                查看人员
              </Button>{" "}
              <Button
                type="primary"
                onClick={() => this.showChooseExpModal(record)}
              >
                选择实验
              </Button>
              <Modal
                title="选择课程实验"
                visible={this.state.chooseVisible}
                onOk={this.chooseExpHandleOk}
                onCancel={this.chooseExpHandleCancel}
                okText="确认"
                cancelText="取消"
              >
                <Checkbox.Group
                  options={this.state.options}
                  defaultValue={this.state.checkedValues}
                  onChange={this.onChange}
                />
                {/* {this.state.options.map((items, index) => {
                  return (
                    <Checkbox key={items.experimentId} onChange={this.singleCheckedOnChange}>Checkbox</Checkbox>
                    
                  );
                })} */}
              </Modal>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <div style={{display:"inline"}}>
            <AddClassBtn rerender={this.rerender} />
            {/* <AddManager /> */}
        </div>
        <div>
          <Table
            rowKey={record => record.classId}
            loading={this.state.isLoading}
            columns={columns}
            bordered={true}
            dataSource={this.state.records}
            scroll={{ x: 1000 }}
            pagination={<Pagination showSizeChanger={false} />}
          />
        </div>
      </div>
    );
  }
}
