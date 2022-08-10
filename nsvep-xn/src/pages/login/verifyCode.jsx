/*
 * @Author: XN
 * @Date: 2020-07-25 10:34:53
 * @LastEditTime: 2020-11-02 18:22:37
 * @LastEditors: XN
 * @Description: 验证码生成与校验（可以直接搬）
 * @FilePath: /gitee-nsvep/src/pages/login/verifyCode.jsx
 */ 

/**
 * @name ImageCode
 * @desc 滑动拼图验证
 * @author darcrand
 * @version 2019-02-26
 *
 * @param {String} imageUrl 图片的路径
 * @param {Number} imageWidth 展示图片的宽带
 * @param {Number} imageHeight 展示图片的高带
 * @param {Number} fragmentSize 滑动图片的尺寸
 * @param {Function} onReload 当点击'重新验证'时执行的函数
 * @param {Function} onMath 匹配成功时执行的函数
 * @param {Function} onError 匹配失败时执行的函数
 */

import React from "react";
import { Input, Form } from "antd";

export class ImageCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      codeLength: 4,
      fontSizeMin: 20,
      fontSizeMax: 22,
      backgroundColorMin: 240,
      backgroundColorMax: 250,
      colorMin: 10,
      colorMax: 20,
      lineColorMin: 40,
      lineColorMax: 180,
      contentWidth: 96,
      contentHeight: 38,
      // 默认不显示验证码的错误信息
      showError: false, 
      // 验证码是否正确
      isRight: false
    };
  }

  componentWillMount() {
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.drawPic();
  }

  /**
   * @description: 生成一个随机数
   * @param {min 最小值, max最大值} 
   * @return: 
   */
  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  drawPic = () => {
    this.randomCode();
  };

  /**
   * @description:  生成一个随机的颜色
   * @param {min 最小值, max最大值} 
   * @return: 
   */
  randomColor(min, max) {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return `rgb(${r}, ${g}, ${b})`;
  }

  drawText(ctx, txt, i) {
    ctx.fillStyle = this.randomColor(this.state.colorMin, this.state.colorMax);
    const fontSize = this.randomNum(
      this.state.fontSizeMin,
      this.state.fontSizeMax
    );
    ctx.font = fontSize + "px SimHei";
    const padding = 10;
    const offset =
      (this.state.contentWidth - 40) / (this.state.code.length - 1);
    let x = padding;
    if (i > 0) {
      x = padding + i * offset;
    }
    let y = this.randomNum(
      this.state.fontSizeMax,
      this.state.contentHeight - 5
    );
    if (fontSize > 40) {
      y = 40;
    }
    const deg = this.randomNum(-10, 10);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  }

  drawLine(ctx) {
    // 绘制干扰线
    for (let i = 0; i < 1; i++) {
      ctx.strokeStyle = this.randomColor(
        this.state.lineColorMin,
        this.state.lineColorMax
      );
      ctx.beginPath();
      ctx.moveTo(
        this.randomNum(0, this.state.contentWidth),
        this.randomNum(0, this.state.contentHeight)
      );
      ctx.lineTo(
        this.randomNum(0, this.state.contentWidth),
        this.randomNum(0, this.state.contentHeight)
      );
      ctx.stroke();
    }
  }

  drawDot(ctx) {
    // 绘制干扰点
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        this.randomNum(0, this.state.contentWidth),
        this.randomNum(0, this.state.contentHeight),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  reloadPic = () => {
    this.drawPic();
  };

  /**
   * @description: 输入验证码
   * @param {e 输入事件} 
   * @return: 
   */
  changeCode = e => {
    if (
      e.target.value.toLowerCase() !== "" &&
      e.target.value.toLowerCase() !== this.state.code.toLowerCase()
    ) {
      this.setState({
        showError: true,
        isRight: false
      });
    } else if (e.target.value.toLowerCase() === "") {
      this.setState({
        showError: false,
        isRight: false
      });
    } else if (e.target.value.toLowerCase() === this.state.code.toLowerCase()) {
      this.setState({
        showError: false,
        isRight: true
      });
    }
  };

  /**
   * @description: 子组件给父组件传值，传递this.state.isRight - 验证码校验结果
   * @param {type} 
   * @return: 
   */
  toParent = () => {
    this.setState(
      () => {
        return {};
      },
      () => {
        this.props.parent.getChildrenMsg(this, this.state.isRight);
      }
    );
  };

  /**
   * @description: 随机生成验证码
   * @param {type} 
   * @return: 
   */
  randomCode() {
    let random = "";
    // 去掉了I l i o O,可自行添加
    const str = "QWERTYUPLKJHGFDSAZXCVBNMqwertyupkjhgfdsazxcvbnm1234567890";
    for (let i = 0; i < this.state.codeLength; i++) {
      const index = Math.floor(Math.random() * 57);
      random += str[index];
    }
    this.setState(
      {
        code: random
      },
      () => {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        ctx.textBaseline = "bottom";
        // 绘制背景
        ctx.fillStyle = this.randomColor(
          this.state.backgroundColorMin,
          this.state.backgroundColorMax
        );
        ctx.fillRect(0, 0, this.state.contentWidth, this.state.contentHeight);
        // 绘制文字
        for (let i = 0; i < this.state.code.length; i++) {
          this.drawText(ctx, this.state.code[i], i);
        }
        this.drawLine(ctx);
        this.drawDot(ctx);
      }
    );
  }

  render() {
    //  在输入框定义一个位置存放图形
    const form = this.props.form;
    const { getFieldDecorator } = form;

    const suffix = (
      <div>
        <canvas
          onClick={this.reloadPic}
          ref={this.canvas}
          width="100"
          height="40"
        ></canvas>
      </div>
    );

    return (
      //  我放在了form表单中并加了一些判断，此处与form有关的代码不完整，可自行添加或删除
      <Form.Item className="for-form" onChange={this.toParent}>
        {getFieldDecorator("sendcode", {
          rules: [
            { required: true, message: "请输入校验码!" },
            {
              validator: (rule, value, callback) => {
                if (value) {
                  if (value.toLowerCase() === this.state.code.toLowerCase()) {
                    callback();
                    this.setState({
                      sendcode: value,
                      showError: false,
                      isRight: true
                    });
                  } else {
                    callback("请输入正确的验证码");
                    this.setState({
                      showError: true
                    });
                  }
                } else {
                  callback();
                }
              }
            }
          ]
        })(
          <Input
            size="large"
            suffix={suffix}
            onChange={this.changeCode}
            placeholder="请输入校验码"
          />
        )}
      </Form.Item>
    );
  }
}
export default Form.create()(ImageCode);
