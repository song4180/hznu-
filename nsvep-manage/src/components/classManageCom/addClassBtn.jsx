/*
 * @Author: your name
 * @Date: 2020-07-20 12:04:42
 * @LastEditTime: 2020-10-12 17:25:23
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/classManageCom/addClassBtn.jsx
 */

import React, { Component } from "react";
import { Drawer, Form, Button, Input, Col, message, Modal,Radio } from "antd";

import { reqAddClass, reqAddManager } from "../../api/index.js";
import "./classManageCom.css";
import memoryUtils from "../../utils/memoryUtils.js";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default class AddClassBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //抽屉状态（开关）
      visible: false,
      //模态框确认状态（开关）
      checkVisible: false,
      //数据是否确认提交
      isAdd: false,
/////////////////////////////////
      //模态框状态（开关）
      isOpen:false,
      //模态框中提交的模态框状态（开关）
      isSubOpen:false,
      //模态框确认状态（开关）
      isCheck: false,
      //是否确认添加
      isAddManager: false,
/////////////////////////////////
      adminId: 0,
      className: "",
      classDetail: "",
      isSuper:"",
      adminAccount:"",
      adminTel:"",
      adminName:"",
      adminPassword:"",
      isOk: false,
      ModalText: '请填入新管理员信息',
      confirmLoading: false,
      value:0
    };
  }

  componentWillMount() {
    this.setState({ 
      adminId: memoryUtils.user.adminId
    });
  }

  /**
   * @description: 打开抽屉函数,设置抽屉打开visible状态
   * @param {type}
   * @return:
   */
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  /**
   * @description: 关闭抽屉函数
   * @param {type}
   * @return:
   */
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  /**
   * @description: 抽屉中获取添加的数据并存储到state中
   * @param {type}
   * @return:
   */
  onFinish = values => {
    const { className, classDetail } = values;
    this.setState({
      checkVisible: true,
      className: className,
      classDetail: classDetail
    });
  };

  /**
   * @description: 模态框确认后，发起请求
   * @param {type}
   * @return:
   */
  handleOk = e => {
    const { adminId, className, classDetail } = this.state;
    this.setState(
      () => {
        return { checkVisible: false, isAdd: true };
      },
      () => {
        if (this.state.isAdd) {
          reqAddClass(className, classDetail, adminId)
            .then(response => {
              if (response.isSuccess === 1) {
                message.success("添加成功！");
                this.setState({ isOk: true });
              } else {
                message.error("添加失败！");
              }
            })
            .catch(error => {
            });
        }
      }
    );
  };

  /**
   * @description: 模态框取消按钮绑定函数
   * @param {type}
   * @return:
   */
  handleCancel = e => {
    this.setState({
      checkVisible: false,
      isAdd: false
    });
  };
  funcRender = (isOk) =>{
    this.props.rerender(isOk)
    this.setState({isOk:false})
  }

  
  /**
   * @description: 第二个模态框按钮绑定函数
   * @param {type}
   * @return:
   */
  showModal = () => {
    this.setState({
      isOpen: true,
    });
  };

 /**
   * @description: 第二个模态框嵌套的模态框按钮绑定函数
   * @param {type}
   * @return:
   */
  showSubModal = () => {
    this.setState({
      isSubOpen: true,
    });
  };

 /**
   * @description: 表单中获取添加的数据并存储到state中
   * @param {type}
   * @return:
   */
  onAddFinish = values => {
    const { isSuper,adminAccount,adminTel,adminName,adminPassword } = values;
    this.setState({
      isSubOpen:true,
      isCheck: true,
      isSuper:this.state.value,
      adminAccount:adminAccount,
      adminTel:adminTel,
      adminName:adminName,
      adminPassword:adminPassword
    });
  };
  

  /**
   * @description: 模态框确认后，发起请求
   * @param {type}
   * @return:
   */
  handleAddOk = e => {
    const {isSuper,adminAccount,adminTel,adminName,adminPassword } = this.state;
    this.setState(
      () => {
        return { isCheck: false, isAddManager: true };
      },
      () => {
        if (this.state.isAddManager) {
          reqAddManager(isSuper,adminAccount,adminTel,adminName,adminPassword)
            .then(response => {
              if (response.isSuccess === 1) {
                message.success("添加成功！");
                this.setState({
                      confirmLoading: true,
                    });
                    setTimeout(() => {
                      this.setState({
                        isOpen: false,
                        isSubOpen:false,
                        confirmLoading: false,
                      });
                    }, 2000);
              } else {
                message.error("添加失败！");
              }
            })
            .catch(error => {
            });
        }
      }
    );
  };

  /**
   * @description: 模态框取消
   * @param {type}
   * @return:
   */
  handleAddCancel = () => {
    this.setState({
      isCheck: false,
      isOpen: false
    });
  };

  /**
   * @description: Sub模态框取消按钮绑定函数
   * @param {type}
   * @return:
   */
  handleSubCancel = e => {
    this.setState({
      isSubOpen: false
    });
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  
  render() {
    const { isOpen, confirmLoading, ModalText } = this.state;
    return (
      <div
        rerender={this.state.isOk ? 
        this.funcRender(this.state.isOk)
        : 
        ""
        }
      >
        <Button
          type="primary"
          onClick={this.showDrawer}
          className="addClassBtn"
        >
          {" "}
          <PlusOutlined />
          添加班级
        </Button>
        <Drawer
          title="添加班级"
          width={700}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right"
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark onFinish={this.onFinish}>
            <Form.Item
              name="className"
              label="班级名称"
              rules={[{ required: true, message: "班级名称不为空" }]}
              hasFeedback
            >
              <Input placeholder="请输入班级名称" />
            </Form.Item>

            <Form.Item
              name="classDetail"
              label="班级详情"
              rules={[
                {
                  required: true,
                  message: "班级详情不为空"
                }
              ]}
              hasFeedback
            >
              <Input.TextArea rows={4} placeholder="请输入班级详情" />
            </Form.Item>
            <Form.Item>
              <Col span={8} offset={11}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Col>
            </Form.Item>
            <Modal
              title="确认添加"
              visible={this.state.checkVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <p>是否要添加该班级？</p>
            </Modal>
          </Form>
        </Drawer>

      <Button 
        type="primary" 
        onClick={this.showModal}
        className="addManager" 
      >{" "}
      
        <PlusOutlined />
        添加管理员
      </Button>
      <Modal
        title="添加管理员"
        onCancel={this.handleAddCancel}
        visible={this.state.isOpen}
        confirmLoading={confirmLoading}
        footer={[
          <Button key="cancle" onClick={this.handleAddCancel}>
            取消
          </Button>
        ]}
      >
      <Form {...layout} name="nest-messages" onFinish={this.onAddFinish} >
      <Form.Item
        label="超管" 
        // rules={[{ required: true }]}
        name="isSuper"
      >
        <Radio.Group 
          defaultValue={0} 
          onChange={this.onChange} 
          value={this.state.value}
        >
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item 
        name="adminName" 
        label="姓名" 
        rules={[{ required: true,message:'姓名不能为空!'}]}
        hasFeedback
      >
        <Input placeholder='请输入姓名'/>
      </Form.Item>
      <Form.Item 
        name="adminAccount" 
        label="工号" 
        rules={[{required: true,message:'工号不能为空!'}]} 
      >
        <Input placeholder='请输入管理员工号' />
      </Form.Item>
      <Form.Item 
        name="adminTel" 
        label="联系方式" 
        rules={[{min:11,max:11,required: true,message:"联系方式格式有误"}]} 
        hasFeedback
      >
        <Input placeholder='请输入11位电话号码' />
      </Form.Item>
      <Form.Item 
        name="adminPassword" 
        label="密码" 
        rules={[{required: true, message: '密码不能为空!', min: 6, max: 30}]}
        hasFeedback
      >
        <Input.Password placeholder= '请输入6位以上的密码'/>
      </Form.Item>
      <Form.Item 
        name="confirm" 
        label="验证密码" 
        dependencies={['password']} 
        rules={[{ required: true, message: '请验证你的密码!'},
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('adminPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次输入的密码不一致!');
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Col span={10} offset={12}>
          <Button type="primary" htmlType="submit" >
            提交
          </Button>
        </Col>
      </Form.Item>
      <Modal
        title="确认添加"
        visible={this.state.isSubOpen}
        onOk={this.handleAddOk}
        onCancel={this.handleSubCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>是否要添加该管理员？</p>
      </Modal>
      </Form>
      </Modal>
    </div>
    );
  }
}
