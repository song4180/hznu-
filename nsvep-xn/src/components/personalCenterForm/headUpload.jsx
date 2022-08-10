/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-07-28 19:17:54
 * @LastEditors: XN
 * @Description: 个人中心 - 头像上传
 * @FilePath: /gitee-nsvep/src/components/personalCenterForm/headUpload.jsx
 */ 

import React, { Component } from "react";
import { Upload, message, Avatar, Spin } from "antd";

import "./personalCenterForm.less";
import head from "../../images/head.svg";
import { BASE_URL } from "../../config/config.js";

/**
 * @description: FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
                 readAsDataURL 方法会读取指定的 Blob 或 File 对象 img-图片名。
 * @param {type} 
 * @return: 
 */
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result)); //只读
  reader.readAsDataURL(img);
}

/**
 * @description:  文件类型/大小判断，上传文件之前的钩子，若返回 false 则停止上传。支持返回promise格式。
 * @param {file 上传的文件}
 * @return:
 */
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 类型的图片!");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("图片大小必须小于10M");
  }
  return isJpgOrPng && isLt2M;
}

export default class HeadUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      toParentFile: ""
    };
  }

  /**
   * @description: 文件状态改变的回调
   * @param {info {file,fileList: [ ... ],event: { ... }}
      info{ 
        uid: 'uid',   文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: 'xx.png' , 文件名
        status: 'done',  状态有：uploading done error removed
        response: '{"status": "success"}',  服务端响应内容
        linkProps: '{"download": "image"}', 下载链接额外的 HTML 属性 
      },
   * @return: 
   */
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, file => {
        this.setState({
          toParentFile: info.file.response.data,
          loading: false
        });
        const { toParentFile } = this.state;
        this.props.getChildrenMsg(toParentFile);
      });
    }
  };

  render() {
    const uploadButton = (
      <div>
        <div>
          {this.state.loading ? <Spin /> : <Avatar id="myHead" src={head} />}
        </div>
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const { file } = this.state;
    return (
      <Upload
        name="file"
        accept=".jpg, .png"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        //后端提供的upload接口，返回url
        action={BASE_URL + "/file/upload"}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {file ? (
          <img src={file} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
        <span id="headWord">{"支持JPG/PNG格式"}</span>
      </Upload>
    );
  }
}
