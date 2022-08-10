/*
 * @Author: XN
 * @Date: 2020-08-06 16:00:30
 * @LastEditTime: 2020-11-10 21:22:09
 * @LastEditors: XN
 * @Description:
 * @FilePath: /te/src/components/SExpForm/SExpForm.jsx
 */
import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, Input, message, Button, Row, Col, Tooltip } from "antd";

import {
  QuestionCircleOutlined,
} from '@ant-design/icons';
import "./SExpForm.less";
import { reqImage } from "../../api/index.js";

const { TextArea } = Input;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export default class SExpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      setValue: ""
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  handleSubmit = values => {
    const {
      expTitle,
      imageName,
      imagePos,
      imageDes,
      expSynopsis,
      expTask
    } = values;
    const { value } = this.state;
    reqImage(
      expTitle,
      expSynopsis,
      imagePos,
      expTask,
      value,
      imageName,
      imageDes
    )
      .then(response => {
        if (response.isSuccess === 1) {
          message.success("提交成功！");
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  render() {
    const style = { margin: "0 5vw" };
    var showHtmlStyle = {
      background: "#f0f0f0",
      padding: "2px",
      height: "auto",
      minHeight: "20vh",
      overflow: "hidden"
    };
    return (
      <div style={style}>
        <Form onFinish={this.handleSubmit} name="register" scrollToFirstError>
          <Row>
            <Col span={11}>
              <Form.Item
                name="expTitle"
                label="实验名称"
                rules={[
                  {
                    required: true,
                    message: "请输入实验名称"
                  }
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
            
               <Form.Item
                name="imageName"
                label="镜像名称"
                rules={[
                  {
                    required: true,
                    message: "请输入镜像名称"
                  }
                ]}
                hasFeedback
              >
                <Input addonAfter={<Tooltip title="镜像名称必须是英文字符，即TAG"> <QuestionCircleOutlined /> </Tooltip>}
             />
              
                 
              </Form.Item>
             
             
            </Col>

            <Col span={11}>
              <Form.Item
                name="imagePos"
                label="镜像位置"
                rules={[
                  {
                    required: true,
                    message: "请输入镜像位置"
                  }
                ]}
                hasFeedback
              >
                <Input addonAfter={<Tooltip title="镜像位置为 用户名/仓库名"> <QuestionCircleOutlined /> </Tooltip>}/>
              </Form.Item>
            </Col>
            <Col span={11} offset={2}>
              {/* <span>?</span> */}
              <Form.Item
                name="imageDes"
                label="镜像描述"
                rules={[
                  {
                    required: true,
                    message: "请输入镜像描述"
                  }
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="expSynopsis"
                label="实验简介"
                rules={[
                  {
                    required: true,
                    message: "请输入实验简介"
                  }
                ]}
                hasFeedback
              >
                <TextArea autoSize />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="expTask"
                label="实验任务"
                rules={[
                  {
                    required: true,
                    message: "请输入实验简介"
                  }
                ]}
                hasFeedback
              >
                <TextArea autoSize />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <ReactQuill
                  theme="snow"
                  value={this.state.value}
                  onChange={this.handleChange}
                  className=" ql-editor"
                />
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              <div style={showHtmlStyle}>
                <div dangerouslySetInnerHTML={{ __html: this.state.value }} />
              </div>
            </Col>
          </Row>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
        {/* {el.html(this.state.value)} */}
      </div>
    );
  }
}
