/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-02 20:39:47
 * @LastEditors: XN
 * @Description: 课程的课程介绍
 * @FilePath: /gitee-nsvep/src/pages/mainCoursePage/mainCoursePage.jsx
 */

import React from "react";

import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import BannerAnim from 'rc-banner-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';

import "./mainCoursePage.less";
import title from "./img/title.jpg";
import ContentMenu from "./contentMenu.jsx";
import Footer from '../../components/footer/footer'

const { Element, Arrow, Thumb } = BannerAnim;
const BgElement = Element.BgElement;
export default class MainCoursePage extends React.Component {
  constructor() {
    super(...arguments);
    this.imgArray = [
      'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
      'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
    ];
    this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false,
      thumbEnter: false,
    };
    [
      'onChange',
      'prevEnter',
      'prevLeave',
      'nextEnter',
      'nextLeave',
      'onMouseEnter',
      'onMouseLeave',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onChange(type, int) {
    if (type === 'before') {
      this.setState({
        intShow: int,
      });
    }
  }

  getNextPrevNumber() {
    let nextInt = this.state.intShow + 1;
    let prevInt = this.state.intShow - 1;
    if (nextInt >= this.imgArray.length) {
      nextInt = 0;
    }
    if (prevInt < 0) {
      prevInt = this.imgArray.length - 1;
    }

    return [prevInt, nextInt];
  }

  prevEnter() {
    this.setState({
      prevEnter: true,
    });
  }

  prevLeave() {
    this.setState({
      prevEnter: false,
    });
  }

  nextEnter() {
    this.setState({
      nextEnter: true,
    });
  }

  nextLeave() {
    this.setState({
      nextEnter: false,
    });
  }
  
  onMouseEnter() {
    this.setState({
      thumbEnter: true,
    });
  }

  onMouseLeave() {
    this.setState({
      thumbEnter: false,
    });
  }

  render() {
    const intArray = this.getNextPrevNumber();
    const thumbChildren = this.imgArray.map((img, i) =>
          <span key={i}><i style={{ backgroundImage: `url(${img})` }} /></span>
        );
    return (
      <div>
        <div id="banner">
          <BannerAnim 
            onChange={this.onChange} 
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave} 
            prefixCls="custom-arrow-thumb"
          >
            <Element key="aaa"
              prefixCls="banner-user-elem"
            >
              <BgElement
                key="bg"
                className="bg"
                style={{
                  backgroundImage: `url(${this.imgArray[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                信息安全课程
              </TweenOne>
              <TweenOne 
                className="banner-user-text" 
                animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              >
                面向用户：本课程为 Linux 高级课程，面向有一定 Linux 、Vim 与 C 语言基础、想要进一步学习 Linux 与安全的同学。
                <br/>
                授课难度：中等
                <br/>
                授课内容：缓冲区溢出漏洞实验、SQL 注入基础原理介绍、ShellShock 攻击实验、竞态条件漏洞实验等
                </TweenOne>
            </Element>
            <Element key="bbb"
              prefixCls="banner-user-elem"
            >
              <BgElement
                key="bg"
                className="bg"
                style={{
                  backgroundImage: `url(${this.imgArray[1]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
               授课教师
              </TweenOne>
              <TweenOne 
                className="banner-user-text" 
                animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              >
                XXX老师，计算机科学专业博士。从事教育行业数年，有丰富的教学经验。性格开朗活泼，语感和表达能力较强。
                <br/>
                富有亲和力、耐心及责任感，课堂气氛活跃，讲课思路清晰，是一位极富表现力的好老师。
              </TweenOne>
            </Element>
            <Arrow arrowType="prev" key="prev" prefixCls="user-arrow" component={TweenOne}
              onMouseEnter={this.prevEnter}
              onMouseLeave={this.prevLeave}
              animation={{ left: this.state.prevEnter ? 0 : -120 }}
            >
              <div className="arrow"></div>
              <TweenOneGroup 
                enter={{ opacity: 0, type: 'from' }} 
                leave={{ opacity: 0 }} 
                appear={false} 
                className="img-wrapper" component="ul"
              >
                <li style={{ backgroundImage: `url(${this.imgArray[intArray[0]]})`}} key={intArray[0]} />
              </TweenOneGroup>
            </Arrow>
            <Arrow arrowType="next" key="next" prefixCls="user-arrow" component={TweenOne}
              onMouseEnter={this.nextEnter}
              onMouseLeave={this.nextLeave}
              animation={{ right: this.state.nextEnter ? 0 : -120 }}
            >
              <div className="arrow"></div>
              <TweenOneGroup 
                enter={{ opacity: 0, type: 'from' }} 
                leave={{ opacity: 0 }} 
                appear={false} 
                className="img-wrapper" 
                component="ul"
              >
                <li style={{ backgroundImage: `url(${this.imgArray[intArray[1]]})`}} key={intArray[1]} />
              </TweenOneGroup>
            </Arrow>
            <Thumb prefixCls="user-thumb" key="thumb" component={TweenOne}
              animation={{ bottom: this.state.thumbEnter ? 0 : -70 }}
            >
              {thumbChildren}
            </Thumb>
          </BannerAnim>
        </div>
          <div className="mainCoursePage_contain">
            <ContentMenu history={this.props.history} />
            </div>
      </div>
    );
  }
}