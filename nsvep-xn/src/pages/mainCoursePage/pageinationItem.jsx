/*
 * @Author: XN
 * @Date: 2020-07-08 08:47:41
 * @LastEditTime: 2020-07-16 14:52:34
 * @LastEditors: Please set LastEditors
 * @Description: 放置分页组件，并传点击事件的值（key）给父组件
 * @FilePath: /gitee-nsvep/src/pages/mainCoursePage/pageinationItem.jsx
 */ 
import React from "react";
import { Pagination } from "antd";
import './pageination.less'

export default class PageinationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0, //当前页码,
      total: 1, //总共多少数据
      size: 2, //一页多少调数据
      pageItem: []//后端返回的数据
    };
  }

  render() {
    const { defaultCurrent, current, total, defaultPageSize } = this.props;
    return (
      <div>
        <Pagination className="pagePos"
          defaultCurrent={defaultCurrent}
          current={current}
          total={total}
          pageSize={defaultPageSize}
          onChange={key => this.props.getPageResultArray({ key })}
        />
      </div>
    );
  }
}
