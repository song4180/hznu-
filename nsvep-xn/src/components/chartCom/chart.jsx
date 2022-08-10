/*
 * @Author: XN
 * @Date: 2020-11-04 18:12:45
 * @LastEditTime: 2020-11-04 18:48:00
 * @LastEditors: XN
 * @Description: 
 * @FilePath: /gitee-nsvep/src/components/chartCom/chart.jsx
 */
import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header="讨论室"
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        评论
      </Button>
    </Form.Item>
  </>
);

export default class Chart extends React.Component {
  state = {
    comments: [
        {
            author: '小莉',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604496231525&di=e55ee64ea8c262966e4a2e01348cded1&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201911%2F03%2F20191103115047_LXnKu.thumb.400_0.jpeg',
            content: <p>有谁知道界面为什么打不开吗？？</p>,
            datetime: Date().split(' ')[4].split(":")[0]+":"+ Date().split(' ')[4].split(":")[1],
        },
        {
            author: '李君',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604496231523&di=1056f42003b079bd782a0f7e45d192be&imgtype=0&src=http%3A%2F%2Fww3.sinaimg.cn%2Fmw690%2F861756fcly1ge2vw0avchj20k00k046p.jpg',
            content: <p>是不是因为你没有启动实验啊？？？</p>,
            datetime: Date().split(' ')[4].split(":")[0]+":"+ Date().split(' ')[4].split(":")[1],
        }
    ],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
        let timeArr = Date().split(' ')[4].split(":");
      this.setState({
        submitting: false,
        value: '',
        comments: [
            ...this.state.comments,
          {
            author: '小天才',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604496231528&di=5881007dc3c5d56e0ae4519a892ab200&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F18%2F20200718121409_liuku.thumb.400_0.jpeg',
            content: <p>{this.state.value}</p>,
            datetime: timeArr[0]+':'+timeArr[1],
          }
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
      <CommentList comments={comments} />
        <Comment
          avatar={
            <Avatar
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604496231528&di=5881007dc3c5d56e0ae4519a892ab200&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F18%2F20200718121409_liuku.thumb.400_0.jpeg"
              alt="小天才"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}
