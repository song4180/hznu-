/*
 * @Author: XN
 * @Date: 2020-07-27 10:10:15
 * @LastEditTime: 2020-10-12 17:03:02
 * @LastEditors: XN
 * @Description:
 * @FilePath: /te/src/components/tools/table.jsx
 */

import React, { Component } from "react";
import { Table, Input, message, Popconfirm, Form } from "antd";
import { reqTableData, reqTableChangeData } from "../../api/index.js";

interface Item {
  key: string;
  experimentId: number;
  experimentTitle: string;
  experimentDescribe: string;
  experimentTask: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  //是否编辑
  editing: boolean;
  //字段标志符
  dataIndex: string;
  //字段名称
  title: any;
  //输入的格式
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

//React.FC<>的在typescript使用的一个泛型，在这个泛型里面可以使用useState
const EditableCell: React.FC<EditableCellProps> = ({
  record,
  editing,
  dataIndex,
  title,
  inputType,
  col,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {/* 是否编辑?写一个form表单:展示元素 */}
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `不可为空!`
            }
          ]}
        >
          <Input defaultValue={children[1]} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default class DTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //哪行在修改
      editingKey: "",
      //表格数据
      data: [
        {
          experimentId: 1,
          experimentTitle: "网络端口扫描实验",
          experimentDescribe: "1、 使用Nmap工具进行端口扫描",
          experimentTask: "就这",
          imageId: "就这",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 2,
          experimentTitle: "test",
          experimentDescribe:
            "1、 使用Nmap工具进行端口Nmap工具进行网络服务及其版本探测。",
          experimentTask: "就这",
          imageId: "就这",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 3,
          experimentTitle: "网@端口描实验",
          experimentDescribe: "1、 使用Nmap工具进行端口扫描",
          experimentTask: "就这",
          imageId: "就这",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 4,
          experimentTitle: "网络@端口描实验",
          experimentDescribe: "1、 使用Nmap工具进行端口扫描",
          experimentTask: "就这",
          imageId: "就这",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 5,
          experimentTitle: "网络@端口描实验",
          experimentDescribe: "1、 使用Nmap工具进行端口扫描",
          experimentTask: "就这",
          imageId: "就这",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 6,
          experimentTitle: "web应用攻击",
          experimentDescribe: "web应用攻击",
          experimentTask: "1.sql注入 2.xss攻击 3.crsf跨站攻击",
          imageId: "bf756fb1ae65",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 7,
          experimentTitle: "web应用攻击",
          experimentDescribe: "web应用攻击",
          experimentTask: "1.sql注入 2.xss攻击 3.crsf跨站攻击",
          imageId: "bf756fb1ae65",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 8,
          experimentTitle: "web应用攻击",
          experimentDescribe: "web应用攻击",
          experimentTask: "1.sql注入 2.xss攻击 3.crsf跨站攻击",
          imageId: "bf756fb1ae65",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 9,
          experimentTitle: "web应用攻击",
          experimentDescribe: "web应用攻击",
          experimentTask: "1.sql注入 2.xss攻击 3.crsf跨站攻击",
          imageId: "bf756fb1ae65",
          imageDescribe: "就这",
          imageName: "就这"
        },
        {
          experimentId: 10,
          experimentTitle: "web应用攻击",
          experimentDescribe: "web应用攻击",
          experimentTask: "1.sql注入 2.xss攻击 3.crsf跨站攻击",
          imageId: "bf756fb1ae65",
          imageDescribe: "用来训练哈士奇不要拆家的东西",
          imageName: "DMVY站点"
        }
      ],
      //表格修改的数据
      changeAllValues: {
        experimentTask: "",
        experimentTitle: "",
        experimentDescribe: ""
      }
    };
  }

  /**
   * @description: 预加载，请求表格数据
   * @param {type}
   * @return {type}
   */
  componentWillMount() {
    this.funcReqTableData();
  }

  /**
   * @description: 请求表格数据函数
   * @param {type}
   * @return {type}
   */
  funcReqTableData = () => {
    reqTableData()
      .then(response => {
        if (response.isSuccess) this.setState({ data: response.data });
        else message.error("更新失败");
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: 用于确认是哪行被编辑（通过判断experimentId是否一致）
   * @param {record 该行的数据}
   * @return {type}
   */
  isEditing = (record: Item) => record.experimentId === this.state.editingKey;

  /**
   * @description: 点击取消编辑后将editingKey清空
   * @param {type}
   * @return {type}
   */
  cancel = () => {
    this.setState({ editingKey: "" });
  };

  /**
   * @description: 表格字符修改后的回调
  //
   * @param {changedValues 当前修改的字符串, allValues {experimentTask: "60", experimentTitle: "John Brownsss"}修改的所有字符串} 
   * @return {type} 
   */
  handleValueChange = (changedValues, allValues) => {
    this.setState({ changeAllValues: allValues });
  };

  /**
   * @description: 点击保存后
   * @param {key : {experimentId: "1", experimentTitle: "John Brown", experimentDescribe: 98, experimentTask: 60} 该行数据}
   * @return {type}
   */
  save = (key: React.Key) => {
    //表格改变的数据
    const { changeAllValues } = this.state;
    try {
      //创建newData 为对象数组
      const newData = [...this.state.data];
      //获取 当前行是 index 第几行
      const index = newData.findIndex(
        item => key.experimentId === item.experimentId
      );
      //该行的全部数据
      const item = newData[index];
      //判断是否要替代
      if (changeAllValues.experimentTask)
        item.experimentTask = changeAllValues.experimentTask;
      if (changeAllValues.experimentTitle)
        item.experimentTitle = changeAllValues.experimentTitle;
      if (changeAllValues.experimentDescribe)
        item.experimentDescribe = changeAllValues.experimentDescribe;
      //合并成新的表格数据，形成一整个表格的数据
      newData.splice(index, 1, {
        ...item
      });
      //设置新的表格数据的data和清空修改行的index，并进行请求
      this.setState(
        () => {
          return { data: newData, editingKey: "" };
        },
        () => {
          this.funcReqTableChangeData(item);
        }
      );
    } catch (errInfo) {
    }
  };

  /**
   * @description: 更新表格的请求
   * @param {type}
   * @return {type}
   */
  funcReqTableChangeData = item => {
    const {
      experimentDescribe,
      imageId,
      imageName,
      imageDescribe,
      experimentTitle,
      experimentId,
      experimentTask
    } = item;
    reqTableChangeData(
      experimentDescribe,
      imageId,
      imageName,
      imageDescribe,
      experimentTitle,
      experimentId,
      experimentTask
    )
      .then(response => {
        if (response.isSuccess) {
          message.success("更新成功");
          this.funcReqTableData();
        } else message.error("更新失败");
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  /**
   * @description: 点击编辑后将改行的experimentId存储
   * @param {type}
   * @return {type}
   */
  edit = (record: Item) => {
    this.setState({ editingKey: record.experimentId });
  };

  render() {
    /**
     * @description: 表格字段
     * @param {type}
     * @return {type}
     */
    const columns = [
      {
        title: "实验ID",
        dataIndex: "experimentId",
        width: "6vw"
      },
      {
        title: "实验名称",
        dataIndex: "experimentTitle",
        width: "20vw",
        editable: true
      },
      {
        title: "实验简介",
        dataIndex: "experimentDescribe",
        width: "25vw",
        editable: true
      },
      {
        title: "实验任务",
        dataIndex: "experimentTask",
        width: "25vw",
        editable: true
      },
      {
        title: "镜像ID",
        dataIndex: "imageId",
        width: "6vw"
      },
      {
        title: "镜像名称",
        dataIndex: "imageName",
        width: "10vw"
      },
      {
        title: "镜像描述",
        dataIndex: "imageDescribe",
        width: "20vw"
      },
      {
        title: "operation",
        dataIndex: "operation",
        fixed: "right",
        width: "10vw",
        // render: (_: any, record: Item) => {
        render: (text, record: Item, index) => {
          //是否可以修改（通过判断要修改的experimentId是否相等，渲染不同的行）
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <a
                href
                onClick={() => this.save(record)}
                style={{ marginRight: 8 }}
              >
                保存
              </a>
              <Popconfirm title="确定取消？" onConfirm={this.cancel}>
                <a href>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              href
              disabled={this.state.editingKey !== ""}
              onClick={() => this.edit(record)}
            >
              编辑
            </a>
          );
        }
      }
    ];

    /**
     * @description: 点击修改后的表格一行的样式
     * @param {type}
     * @return {type}
     */
    const mergedColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          col,
          inputType: col.dataIndex === "experimentId" ? "number" : "text",
          dataIndex: col.dataIndex,
          //change
          title: record.key,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <div>
        <Form component={false} onValuesChange={this.handleValueChange}>
          <Table
            //自定义组件
            components={{
              body: {
                cell: EditableCell
              }
            }}
            bordered
            dataSource={this.state.data}
            columns={mergedColumns}
            rowClassName="editable-row"
            scroll={{ x: 1300 }}
            pagination={false}
          />
        </Form>
      </div>
    );
  }
}
