/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-01 14:31:51
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /gitee-nsvep/src/app.js
 */ 
/**
应用的根组件 
*/

import React, { Component } from 'react'
import { HashRouter,Route,Switch } from 'react-router-dom'

import Login from './pages/login/login'
import Home from './pages/home/index.jsx'
// import Home from '../src/pages/Home/index.jsx'
import User from './pages/user/user'
import Register from './pages/register/register'
import Feedback from './pages/feedback/feedback.jsx'
import PersonalCenter from './pages/personalCenter/personalCenter.jsx'
import ForgetPwd from './pages/forgetPwd/forgetPwd.jsx'
import Experience from './pages/experience/experience.jsx'
import NotFound from './pages/notFound/notFound.jsx'
import Loading from './pages/loading/loading.jsx'
// import UserHandbook from './pages/userHandbook/userHandbook.jsx'

export default class App extends Component {

    render() {
        return (
            /**路由跳转 */
            <HashRouter>
                <Switch>
                {/* 登录界面 */}
                    <Route path="/" component={Home} exact />
                    <Route path='/login' component={Login} />
                    <Route path='/home' component={Home} />
                    <Route path='/register' component={Register}/>             
                    <Route path='/user' component={User}/>
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/personalCenter" component={PersonalCenter} />
                    <Route path="/forgetPwd" component={ForgetPwd} />
                    <Route path="/experience" component={Experience} />
                    <Route path="/notFound" component={NotFound} />
                    <Route path="/loading" component={Loading}/>
                    {/* <Route path="/userHandbook" component={UserHandbook}/> */}
                </Switch>
            </HashRouter>
        )
    } 
}

