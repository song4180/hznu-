/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-02 19:47:19
 * @LastEditors: XN
 * @Description: 页面：详情页 主要功能：下载文件获取
 * @FilePath: /gitee-nsvep/src/pages/mainCoursePage/detail.jsx
 */

import React, { Component } from "react";
import { message } from "antd";
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

import "./detail.less";
import { BASE_URL } from "../../config/config.js";
import { reqFileList } from "../../api/index.js";
import logo1 from "./img/target1.svg";
import logo2 from "./img/target2.svg";
import logo3 from "./img/target3.svg";
import pdf from "./img/pdf.svg";
import zip from "./img/zip.svg";
import doc from "./img/doc.svg";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileArray: [],
      suffix: [],
      isLoaded: false,
      isDo: false
    };
  }

  /**
   * @description: 预加载，申请可下载文件的详情
   * @param {type} 
   * @return: 
   */
  componentWillMount() {
    reqFileList()
      .then(response => {
        if (response.isSuccess) {
          this.setState({ fileArray: response.data });
          this.setState(
            () => {
              return { fileArray: response.data };
            },
            () => {
              this.setState({ isLoaded: true });
            }
          );
        } else {
          message.error(response.message);
        }
      })
      .catch(error => {
        message.error(error.message);
      });
    this.setState({ isDo: false });
  }

  render() {
    const { fileArray } = this.state;

    if (this.state.isLoaded) {
      return (
        <div id="detailWholeSpace">
        <OverPack style={{ overflow: 'hidden' }} id="overPackList">
        <QueueAnim key="queue"
          leaveReverse
          style={{ float: 'left', position: 'relative' }}
        >
          <div className="code-box-shape queue-anim-demo detailSpace" key="a"  >
            <div className="detailTitleSpace texty-demo">
              <img src={logo1} alt="failed" />
              <p className="detailTitle"> <Texty>授课目标</Texty></p>
            </div>
            <div className="detailWord">
              课程的定位是入门级课程，本课程的目标是为学生搭建起通向“大数据知识空间”的桥梁和纽带。
              本课程将系统梳理总结大数据相关技术，介绍大数据技术的基本原理和大数据主要应用，
              帮助学生形成对大数据知识体系及其应用领域的轮廓性认识，
              为学生在大数据领域“深耕细作”奠定基础、指明方向
            </div>
          </div>
            <div className="code-box-shape queue-anim-demo detailSpace" key="b" >
              <div className="detailTitleSpace texty-demo">
                <img src={logo2} alt="failed" />
                <p className="detailTitle"><Texty>必备知识</Texty></p>
              </div>
              <div className="detailWord">
                前置课程：面向对象编程（比如Java）、数据库、操作系统
              </div>
            </div>
            <div className="code-box-shape queue-anim-demo detailSpace" key="c" >
              <div className="detailTitleSpace texty-demo">
                <img src={logo3} alt="failed" />
                <p className="detailTitle"><Texty>参考资料</Texty></p>
              </div>
              <div className="detailWord">
                {fileArray.map((items, index) => (
                  <div className="documentSpace">
                    {items.sufName == "doc" ? (
                      <img className="documentImg" src={doc} alt="failed" />
                    ) : items.sufName == "docx" ? (
                      <img className="documentImg" src={doc} alt="failed" />
                    ) : items.sufName == "zip" ? (
                      <img className="documentImg" src={zip} alt="failed" />
                    ) : items.sufName == "pdf" ? (
                      <img className="documentImg" src={pdf} alt="failed" />
                    ) : (
                      ""
                    )}
                    <a
                      className="detailBookName"
                      href={encodeURI(
                        BASE_URL +
                          "/stu/file/download?id=" +
                          items.materialId +
                          "&fileName=" +
                          items.materialName
                      )}
                    >
                      {items.materialName}
                    </a>
                  </div>
                ))}
              </div>
          </div>
          </QueueAnim>
          </OverPack>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
