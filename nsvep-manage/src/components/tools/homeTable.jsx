import React from "react";
import { Table, Tooltip, message, Col, Modal, Row, Upload, Button} from 'antd';
import "./table.css"
import { DeleteOutlined,UploadOutlined } from '@ant-design/icons';
import { reqHomeTabShow, reqHomeTabDelete } from "../../api/index.js";
import ConUpload from "./upload";

export default class ConTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //当前页面内容
      records: [],
      //总共有几条数据
      total: 1,
      //管理员Id
      adminId: "1",
      //是否加载完成
      isLoading: false,
      records: "",
      materialId: "",
      materialName:"",
      //批量导入modal
      visible: false,
      //删除modal
      deleteVisible: false,
      // 是否删除成功
      isDelete: false
    };
  }

  /**
     * @description:获取展示的文件数据
     * @param {materialId 文件ID}
     * @return:文件信息
     */
  funcReqMaterial = materialId => {
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

  /**
     * @description:获取第一次渲染的数据，从内存中获取文件Id，并发送请求
     * @param {type}
     * @return:
     */
  componentWillMount() {
    this.setState(
      //no sure
      () => {
        return {
          adminId: this.state.adminId,
          materialId: this.state.materialId
        };
      },
      () => {
        const { materialId } = this.state;
        this.funcReqMaterial(this.state.materialId);
      }
    );
  }

/**
 * @description: 删除文件资源
 * @param {id 文件ID}
 * @return:
 */
  handleDeleteMaterial = (fileName,id) => {
    reqHomeTabDelete(fileName, id)
      .then(response => {
        if (response.isSuccess) {
          this.setState(
            () => {
              return { isDelete: true };
            },
            () => {
              this.funcReqMaterial(this.state.id);
              this.setState({ isDelete: false });
            }
          );
          message.success("删除成功！");
        } else {
          message.error("删除失败！");
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

/**
 * @description: 删除展示模态框
 * @param {type}
 * @return:
 */
  showDeleteModal = text => {
    this.setState({
      deleteVisible: true,
      materialId: text.materialId,
      materialName: text.materialName
    });
  };

  /**
   * @description: 模态框确认选项
   * @param {type}
   * @return:
   */
  handleOk = e => {
    
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    
    this.setState({
      visible: false
    });
  };

  deleteHandleOk = e => {
    
    this.setState({
      deleteVisible: false
    });
    this.handleDeleteMaterial(this.state.materialName,this.state.materialId);
  };

  deleteHandleCancel = e => {
    
    this.setState({
      deleteVisible: false
    });
  };

  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "key",
        key: "key",
        fixed: 'left',
        //排序
        sorter: (a, b) => a.key - b.key,
        //渲染序号
        render: (text, record, index) => `${index + 1}`,
        //当前列宽度
        width: "8%"
      },
      {
        title: '资源名',
        dataIndex: 'materialName',
        key: 'materialName',
        width: "32%",
        ellipsis: {
          showTitle: false
        },
        render: materialName => (
          <Tooltip placement="topLeft" title={materialName}>
            {materialName}
          </Tooltip>
        )
      },
      {
        title: '资源位置',
        dataIndex: 'materialUrl',
        key: 'materialUrl',
        width: "34%",
        ellipsis: {
          showTitle: false
        },
        render: materialUrl => (
          <Tooltip placement="topLeft" title={materialUrl}>
            {materialUrl}
          </Tooltip>
        )
      },
      {
        title: '上传人',
        dataIndex: 'adminName',
        key: 'adminName',
        width: "10%",
      },
      {
        title: '文件序号',
        dataIndex: 'materialId',
        key: 'materialId',
        width: "9%",
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: "5%",
        render: (text, record, index) => {
          return (
            <div>
              <Button onClick={() => this.showDeleteModal(record)} shape="circle">
                <DeleteOutlined />
              </Button>
              <Modal
                title="确认删除"
                visible={this.state.deleteVisible}
                onOk={this.deleteHandleOk}
                onCancel={this.deleteHandleCancel}
                okText="确认"
                cancelText="取消"
              >
                <p>确认删除此文件吗?</p>
              </Modal>
            </div>
          );
        }
      }
    ];
    return (
        <Table
          columns={columns}
          dataSource={this.state.records}
          scroll={{ x: 1200,y:250 }}
          //删去右下角分页样式
          pagination={false}
          className="table"
        />
    );
  }
}