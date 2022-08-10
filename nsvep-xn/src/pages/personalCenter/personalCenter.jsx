/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-08-12 21:37:11
 * @LastEditors: XN
 * @Description: 个人中心布局页
 * @FilePath: /gitee-nsvep/src/pages/personalCenter/personalCenter.jsx
 */ 

import React, { Component } from 'react'
import AlreadyLoginHead from '../../components/headerfooter/already_login_header.jsx'
import PersonalCenterForm from '../../components/personalCenterForm/personalCenterForm.jsx'

import './personalCenter.less'
import bg from '../login/images/bg.jpg'

export class PersonalCenter extends Component {
    constructor(props) {
    super(props);
    this.state={}
  }
    render() {
        return (
            <div id="personal-bg">
                    <img src={bg} className="bgClass"  alt="failed"/>
                <AlreadyLoginHead history ={this.props.history} current="personalCenter"/>
                <PersonalCenterForm />
            </div>
        )
    }
}

export default PersonalCenter
