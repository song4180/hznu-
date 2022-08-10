import React from "react";
import "./cAExperiment.css";
import { Table, Button, Switch, message, Radio, Popconfirm,Layout } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import memoryUtils from "../../../utils/memoryUtils.js";
import {
  reqExpShow,
  reqClassRadio,
  reqDeleteExp,
  reqExpStatus
} from "../../../api/index.js";
const { Content,Footer } = Layout;      //使用前定义，不加大括号会没有样式
export default class ConAExperiment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: "",
      //是否正在加载中
      isLoading: true,
      records: [],
      classId: "",
      isChecked: [],
      experimentId: "",
      radioData: []
    };
  }

  /**
   * @description: 请求实验展示
   * @param {classId 课程Id}
   * @return:
   */
  funcReqExp = classId => {
    const { adminId } = this.state;

    reqExpShow(adminId, classId)
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
   * @description: 请求可选的班级
   * @param {adminId 管理员ID}
   * @return:
   */
  funcReqClassRadio = adminId => {
    this.setState({ isLoading: true });
    reqClassRadio(adminId)
      .then(response => {
        if (response.isSuccess) {
          this.setState({
            radioData: response.data,
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
   * @description: 删除实验资源
   * @param {classId 课程编号,expId 实验编号}
   * @return:
   */
  funcReqDeleteExp = (classId, expId) => {
    reqDeleteExp(classId, expId)
      .then(response => {
        if (response.isSuccess) {
          this.setState(
            () => {
              return { isLoading: false };
            },
            () => {
              this.funcReqExp(this.state.classId);
            }
          );
          message.success("删除成功");
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description:修改开关状态函数
   * @param {expId 实验ID, classId 课程ID, status 开关状态（0开 1关）}
   * @return:
   */
  funcExpStatus = (expId, classId, status) => {
    reqExpStatus(expId, classId, status)
      .then(response => {
        if (response.isSuccess) {
          this.setState(
            () => {
              return { isLoading: false };
            },
            () => {
              this.funcReqExp(this.state.classId);
            }
          );
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  componentWillMount() {
    this.setState({ adminId: memoryUtils.user.adminId });
    this.setState(
      () => {
        return { adminId: memoryUtils.user.adminId };
      },
      () => {
        //请求实验
        this.funcReqExp();
        //请求上方班级筛选
        this.funcReqClassRadio(this.state.adminId);
      }
    );
  }

  /**
   * @description: 头部快速选择 选择要看的班级
   * @param {e 点击事件}
   * @return:  e.target.value 班级Id
   */
  handleRadio = e => {
    let classId = e.target.value;
    this.setState({ classId });
    if (classId === "") this.funcReqExp();
    else this.funcReqExp(classId);
  };

  /**
   * @description: 开关选择事件
   * @param {checked 开关状态(true开false关), expId 选中的实验ID, classId 课程ID}
   * @return:
   */
  openSwitch = (checked, expId, classId) => {
    let status = checked ? 0 : 1;
    this.funcExpStatus(expId, classId, status);
  };

  /**
   * @description: 气泡 确认事件
   * @param {record 表格的该行数据}
   * @return:
   */
  deleteConfirm = record => {
    this.handleDeleteExp(record);
  };

  deleteCancel = e => {};
  /**
   * @description: 删除实验函数
   * @param {record 表格的该行数据}
   * @return:
   */
  handleDeleteExp = record => {
    let expId = record.experimentId;
    let classId = record.classId;
    this.funcReqDeleteExp(classId, expId);
  };

  render() {
    const columns = [
      // {
      //   title: "序号",
      //   dataIndex: "key",
      //   key: "key",
      //   //排序
      //   sorter: (a, b) => a.key - b.key,
      //   //渲染序号
      //   render: (text, record, index) => `${index + 1}`,
      //   //当前列宽度
      //   width: "5vw"
      // },
      {
        title: "班级序列号",
        dataIndex: "classId",
        key: "classId",
        width: "5vw"
      },
      {
        title: "班级名称",
        dataIndex: "className",
        key: "className",
        width: "7vw"
      },
      {
        title: "实验名称",
        dataIndex: "experimentTitle",
        key: "experimentTitle",
        width: "7vw"
      },
      {
        title: "实验简介",
        dataIndex: "experimentDescribe",
        key: "experimentDescribe",
        width: "14vw"
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        fixed: "right",
        width: "10vw",
        render: (text, record, index) => {
          return (
            <div>
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                checked={record.isClosed ? false : true}
                onClick={checked =>
                  this.openSwitch(checked, record.experimentId, record.classId)
                }
                key={record.experimentId}
              />{" "}
              <Popconfirm
                title="确定要删除实验吗"
                onConfirm={() => this.deleteConfirm(record)}
                onCancel={() => this.deleteCancel(record)}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  shape="round"
                  icon={<DeleteTwoTone />}
                  // onClick={() => this.handleDeleteExp(record)}
                />
              </Popconfirm>
            </div>
          );
        }
      }
    ];

    return (
      <Layout style={{ padding: '0 24px 24px', margin: '23px 0' }}>
        <Content className="site-layout-background BaseContent" >
          <div>
            <Radio.Group
              className="radioGroup"
              buttonStyle="solid"
              onChange={this.handleRadio}
              defaultValue=""
            >
              {this.state.radioData.map((items, index) => {
                return (
                  <Radio.Button value={items.classId} key={index}>
                    {items.className}
                  </Radio.Button>
                );
              })}
              <Radio.Button value={""} key={99}>
                展示全部
              </Radio.Button>
            </Radio.Group>

            <Table
              style={{ padding: "24px 24px" }}
              loading={this.state.isLoading}
              columns={columns}
              bordered={true}
              rowKey={record =>
                new Date().getTime().toString(36) +
                record.experimentId.toString() +
                record.classId.toString()
              }
              dataSource={this.state.records}
              scroll={{ y: "70vh" }}
              pagination={false}
            />
          </div>
      </Content>
      {/* <Footer style={{ textAlign: 'center',height:"5px" }}>©2020 网络与信息安全实验室</Footer> */}
      </Layout>
    );
  }
}
