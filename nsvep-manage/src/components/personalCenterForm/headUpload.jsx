/*
 * @Author: XN
 * @Date: 2020-07-18 10:08:37
 * @LastEditTime: 2020-10-12 17:00:22
 * @LastEditors: XN
 * @Description: 
 * @FilePath: /te/src/components/personalCenterForm/headUpload.jsx
 */
import React, { Component } from "react";
import { Upload, message, Avatar, Spin } from "antd";

import "./personalCenterForm.less";
import head from "../../images/head.svg";
import { BASE_URL } from "../../config/config.js";

function getBase64(img, callback) {
  //FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));//只读
  //readAsDataURL 方法会读取指定的 Blob 或 File 对象 @prame img-图片名。
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class HeadUpload extends React.Component {
  state = {
    loading: false,
    imageUrl: ""
  };

  /*
    文件状态改变的回调
    info{
      file: { 
        uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: 'xx.png'   // 文件名
        status: 'done', // 状态有：uploading done error removed
        response: '{"status": "success"}', // 服务端响应内容
        linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性 
      },
      fileList: [ ... ],
      event: { ... },
    }
  */
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false
        });
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
    const { imageUrl } = this.state;
    return (
      <Upload
        name="imageUrl"
        accept=".jpg, .png"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        //后端提供的upload接口，返回url
        action={BASE_URL + "?"}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
        <span id="headWord">{"支持JPG/PNG格式"}</span>
      </Upload>
    );
  }
}
