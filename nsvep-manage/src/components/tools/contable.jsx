import React from "react";
import DTable from './table.jsx'
import "./table.css";

export default class ConSTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //一页的大小
      pageSize: 4,
      //当前是哪一页
      pageNum: 1,
      //当前页面内容
      records: [],
      //总共有几条数据
      total: 1,
      //总共有几页
      pages: 1,
      //是否加载完成
      isLoading: false,
      //分页栏位置
      position: ["bottomCenter"]
    };
  }

  
  render() {

    
  
    return (
      <div className="table">
        <DTable />
      </div>
    );
  }
}