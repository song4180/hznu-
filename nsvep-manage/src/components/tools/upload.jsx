/*
 * @Author: wolo
 * @Date: 2020-07-17 16:23:52
 * @LastEditTime: 2020-10-12 17:03:10
 * @LastEditors: XN
 * @Description: 上传文件
 * @FilePath: /te/src/components/tools/upload.jsx
 */

import React from "react";
import { Upload, message, Button } from "antd";
import { BASE_URL } from "../../config/config.js";
import axios from "axios";

import "./upload.css";
import { reqHomeTabShow } from "../../api/index.js";

const URL = BASE_URL + "/admin/file/uploadFile";

export default class ConUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
      uploading: false
    };
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("uploadFile", file);
    });
    formData.append("id", this.props.adminId);

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
          this.setState(
            {
              fileList: [],
              uploading: false
            },
            () => {
              this.funcReqHomeTabShow()
            }
          );
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  funcReqHomeTabShow = () => {
    reqHomeTabShow()
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

  render() {
    const { uploading, fileList } = this.state;
    const config = {
      onRemove: uploadFile => {
        this.setState(state => {
          const index = state.fileList.indexOf(uploadFile);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },

      /**
       * @description: 文件上传限制
       * @param {type}
       * @return:
       */
      beforeUpload: uploadFile => {
        this.setState(state => ({
          fileList: [...state.fileList, uploadFile]
        }));
        if (!uploadFile) {
          this.setState({ uploadFile: "" });
          return;
        }
        // 文件大小约束
        const isLt10M = uploadFile.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          message.error("请重新选择文件，文件不得大于10M");
        }
        return false;
      },
      fileList
    };

    return (
      <div >
      <div style={{ height: "60px" }} className="uploadCon">
        <Upload {...config}>
          <Button className="uploadOutlined">上传文件</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          //隐藏上传后的文件列表
          //   showUploadList={false}
          className="uploadButton"
        >
          {uploading ? "正在上传" : "确认上传"}
        </Button>
      </div>
      </div>
    );
  }
}
