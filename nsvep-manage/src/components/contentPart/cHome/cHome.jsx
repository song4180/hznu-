/*
 * @Author: XN
 * @Date: 2020-07-27 10:10:15
 * @LastEditTime: 2020-10-31 20:20:28
 * @LastEditors: XN
 * @Description:
 * @FilePath: /te/src/components/contentPart/cHome/cHome.jsx
 */
import React from "react";
import "./cHome.css";
import { Row, Col, message } from "antd";
import { Layout } from "antd";
import ConTable from "../../tools/homeTable";
import ConUpload from "../../tools/upload";

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line"; //折线图是line,饼图改为pie,柱形图改为bar
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";
import { reqCPUCharts, reqStuCharts } from "../../../api/index.js";

const { Content, Footer } = Layout; //使用前定义，不加大括号会没有样式

export default class ConHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //管理员Id
      adminId: "1",
      timer: "",
      onlineStu: 0,
      expStudent: 0,
      cpuOccupied:0,
      totalCPU:0
    };
  }

  componentWillMount() {
    //主题的设置要在willmounted中设置
    echarts.registerTheme("Imooc");
    reqCPUCharts()
    .then(response => {
          if (response.isSuccess) {
            this.setState({
              //修改参数
              cpuOccupied:response.data.totalRAM - response.data.availableRAM,
              totalCPU:response.data.totalRAM
            });
          } else {
            message.error(response.message);
          }
        })
    .catch(error => {
          message.error(error.message);
        });

      //获取在线人数
      reqStuCharts()
        .then(response => {
          if (response.isSuccess) {
            this.setState({
              //修改参数
              onlineStu: response.data.usersNumVO.usersNum,
              expStudent: response.data.dockerNumVO.dockerNum
            });
          } else {
            message.error(response.message);
          }
        })
        .catch(error => {
          message.error(error.message);
        });
    // this.reqSetIntvalFunc();
  }

  /**
   * @description:  render() 不返回子组件了，执行 React unmount 。
   * @param {type}
   * @return {type}
   */
  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  /**
   * @description: CPU占用率图表
   * @param {type}
   * @return {type}
   */
  CPUOccupy = () => {
    let {cpuOccupied,totalCPU} = this.state;
    let CPUOccupyCharts = {
      title: {
        text: "内存占用率",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: ["已占用", "剩余"]
      },
      series: [
        {
          name: "内存占用率",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: cpuOccupied, name: "已占用" },
            { value: totalCPU-cpuOccupied, name: "剩余" }
          ]
        }
      ]
    };
    return CPUOccupyCharts;
  };

  /**
   * @description: 在线人数图表
   * @param {type}
   * @return {type}
   */
  studentCharts = () => {
    let { onlineStu, expStudent } = this.state;
    var studentCharts = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ["实验人数", "其他在线人数"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value"
      },
      yAxis: {
        type: "category",
        data: ["当前"]
      },
      series: [
        {
          name: "实验人数",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight"
          },
          data: [expStudent]
        },
        {
          name: "其他在线人数",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight"
          },
          data: [onlineStu]
        }
      ]
    };
    return studentCharts;
  };

  /**
   * @description: 数据每隔10s请求一次
   * @param {type}
   * @return {type}
   */

  reqSetIntvalFunc = () => {
    this.timer = setInterval(() => {
      //要执行的操作
      //获取CPU
      reqCPUCharts()
        .then(response => {
          if (response.isSuccess) {
            this.setState({
              //修改参数
              cpuOccupied:response.data.totalRAM - response.data.availableRAM,
              totalCPU:response.data.totalRAM
            });
          } else {
            message.error(response.message);
          }
        })
        .catch(error => {
          message.error(error.message);
        });

      //获取在线人数
      reqStuCharts()
        .then(response => {
          if (response.isSuccess) {
            this.setState({
              //修改参数
              onlineStu: response.data.usersNumVO.usersNum,
              expStudent: response.data.dockerNumVO.dockerNum
            });
          } else {
            message.error(response.message);
          }
        })
        .catch(error => {
          message.error(error.message);
        });
    }, 10000);
  };

  render() {
    return (
      <div className="cHomeCon">
        <Layout style={{ padding: "0 24px 24px", margin: "23px 0" }}>
          <Content className="site-layout-background BaseContent">
            {/* <div className="intro"> */}
            <Row className="firstPageRow">
              {/*引入导航栏 */}
              <Col span={12}>
                <ReactEcharts option={this.CPUOccupy()} /> {/* </div> */}
              </Col>
              <Col span={12}>
                <ReactEcharts option={this.studentCharts()} />{" "}
              </Col>
            </Row>
            <Row className="firstPageRow">
              <Col span={4} className="firstPageCol">
                <h2>参考资料</h2>
              </Col>
              <Col span={4} id="firstPageUpload">
                <ConUpload adminId={this.state.adminId} />
              </Col>
              <ConTable />
            </Row>
          </Content>
          {/* <Footer style={{ textAlign: "center", height: "5px" }}>
            ©2020 网络与信息安全实验室
          </Footer> */}
        </Layout>
      </div>
    );
  }
}
