/*
 * @Author: your name
 * @Date: 2020-07-20 16:49:38
 * @LastEditTime: 2020-11-08 13:01:26
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/components/classManageCom/batchUsers.jsx
 */

import React, { Component } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import reqwest from "reqwest";

import { BASE_URL } from "../../config/config.js";
import { reqBatchUsers } from "../../api/index.js";
import axios from "axios";

const URL = BASE_URL + "/admin/batchusers";

export default class BatchUsers extends Component {
  constructor(props) {
    super(props);

    this.state = { fileList: [], uploading: false };
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("file", file);
    });
    formData.append("classId", this.props.classId);

    this.setState({
      uploading: true
    });

    const instance = axios.create({
      withCredentials: true // 如果发送请求的时候需要带上token 验证之类的也可以写在这个对象里
    });

    instance
      .post(URL, formData)
      .then(response => {
        if (response.data.isSuccess) {
          message.success(response.data.message);
          this.setState({
            fileList: [],
            uploading: false
          });
        } else {
          message.error(response.data.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
   
  };

  render() {
    const { uploading, fileList } = this.state;
    const config = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div>
        <Upload {...config}>
          <Button>
            <UploadOutlined /> 批量导入
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: "2vh" }}
        >
          {uploading ? "正在上传" : "确认上传"}
        </Button>
      </div>
    );
  }
}
