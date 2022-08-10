
import React, { Component } from "react";
import {  Form, Input, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default class AddManager extends Component {
  
  state = {
    ModalText: '请填入新管理员信息',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal} >
          <PlusOutlined />
          添加管理员
        </Button>
        <Modal
          title="添加管理员"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
                <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="姓名" rules={[{ required: true,message:"姓名不能为空" }]}hasFeedback>
                  <Input placeholder='请输入姓名'/>
                </Form.Item>
                <Form.Item name={['user', 'tel']} label="联系方式" rules={[{min:11,max:11,required: true,message:"联系方式格式有误"}]} hasFeedback>
                  <Input placeholder='请输入11位电话号码' />
                </Form.Item>
                <Form.Item name={['user', 'password']} label="密码" rules={[{ type: 'password', min: 6, max: 30,required: true,message:"密码不能为空" }]}>
                  <Input.Password placeholder= '请输入6位以上密码'/>
                </Form.Item>                
              </Form>
        </Modal>
      </>
    );
  }
}

