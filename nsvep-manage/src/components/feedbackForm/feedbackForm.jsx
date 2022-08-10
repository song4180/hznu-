import React, { Component } from "react";
import { Form, Input, Button, Menu, message } from "antd";
// import { FormOutlined } from "@ant-design/icons";

import "./feedbackForm.less";
import FeedbackFormIpt from './feedbackFormIpt.jsx'

export default class FeedbackForm extends Component {
  constructor (props){
    super(props);
    this.state = {}
  }


  render() {

    return (
      <div>
        <div className="feedbackFormArea">
          <Menu mode="horizontal" defaultSelectedKeys={["feedback"]}>
            <Menu.Item key="feedback" id="feedbackFormTitle">
              {/* <FormOutlined /> */}
              您的反馈
            </Menu.Item>
          </Menu>
          <FeedbackFormIpt />
        </div>
      </div>
    );
  }
}


