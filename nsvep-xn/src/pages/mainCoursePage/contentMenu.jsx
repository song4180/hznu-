/*
 * @Author: XN
 * @Date: 2020-03-15 14:53:15
 * @LastEditTime: 2020-11-02 21:09:55
 * @LastEditors: XN
 * @Description: 课程的实验显示
 * @FilePath: /gitee-nsvep/src/pages/mainCoursePage/contentMenu.jsx
 */

import React, { Component } from "react";
import { Tabs, message } from "antd";

import memoryUtils from "../../utils/memoryUtils.js";
import { reqPageItems } from "../../api/index.js";
import "./contentMenu.less";
import ContentWord from "./contentWord.jsx";
import Detail from "./detail.jsx";
import PageinationItem from "./pageinationItem.jsx";

const { TabPane } = Tabs;

export default class contentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //当前是那一页
      current: 1,
      key: 1,
      //请求到的data数据
      pageItem: [],
      //一页有几条数据
      defaultPageSize: 2,
      //一共有多少条数据
      total: 0,
      //一共有几页
      pages: 0,
      //是否加载完成
      isItemLoaded: false,
      classId: ""
    };
  }

  /**
   * @description: 处理子组件传递的值
   * @param {result = key:2 想要跳转到哪一页}
   * @return:
   */
  getPageResultArray = result => {
    result = result.key;
    this.setState(
      () => {
        return { current: result };
      },
      () => {
        const { current, defaultPageSize,classId } = this.state;
        reqPageItems(current, defaultPageSize, classId)
          .then(response => {
            if (response.isSuccess) {
              //存储该页文本
              this.setState({
                pageItem: response.data.experimentsData.records
              });
              //存储一共有多少数据
              this.setState({ total: response.data.experimentsData.total });
              //存储一共有多少页
              this.setState({ pages: response.data.experimentsData.pages });
            } else {
              message.error(response.message);
            }
          })
          .catch(error => {
            message.error(error.message);
          });
      }
    );
  };

  /**
   * @description: 预先请求第一页的数据的函数
   * @param {}
   * @return:
   */

  getPersonalFormPages = () => {
    this.setState(
      () => {
        return {
          //默认当前页为1 一页只有两条数据
          current: 1,
          defaultPageSize: 3
        };
      },
      () => {
        const { current, defaultPageSize,classId } = this.state;
        reqPageItems(current, defaultPageSize,classId)
          .then(response => {
            if (response.isSuccess) {
              // 存储该页文本
              this.setState({
                pageItem: response.data.experimentsData.records
              });
              // 存储总共有多少页
              this.setState({ pages: response.data.experimentsData.pages });
              // 存储总共有多少数据
              this.setState({ total: response.data.experimentsData.total });
              // 设置加载完成为true
              this.setState({ isItemLoaded: true });
            } else {
              message.error(response.message);
            }
          })
          .catch(error => {
            message.error(error.message);
          });
      }
    );
  };

  /**
   * @description: 渲染前的准备，预先请求第一页的数据
   * @param {}
   * @return: 调用 getPersonalFormPages 函数
   */
  componentWillMount() {
    this.setState(
      () => {
        return {
          classId: memoryUtils.user.classId
        };
      },
      () => {
        this.getPersonalFormPages();
      }
    );
  }

  render() {
    if (this.state.isItemLoaded) {
      const { defaultPageSize, total, pages } = this.state;
      return (
        <div>
          <Tabs defaultActiveKey="1" id="contentMainMenu">
            <TabPane tab="实验" key="1" id="firstMenuItem">
              <ContentWord history ={this.props.history} pageItem={this.state.pageItem} />
              {this.state.key === 1 ? (
                <PageinationItem
                  defaultCurrent={1}
                  defaultPageSize={defaultPageSize}
                  current={this.state.current}
                  total={total}
                  pages={pages}
                  getPageResultArray={this.getPageResultArray}
                />
              ) : (
                ""
              )}
            </TabPane>
            <TabPane tab="详情" key="2" id="secondMenuItem">
              <Detail />
            </TabPane>
          </Tabs>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
