/*
 * @Author: your name
 * @Date: 2020-07-17 09:50:28
 * @LastEditTime: 2020-11-04 19:13:21
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/app.js
 */ 
/**
应用的根组件 
*/
import React, { Component } from 'react'
import { HashRouter,Route,Switch} from 'react-router-dom' 

import Home from './pages/home/home'
import Login from './pages/login/login'
import Class from './pages/class/class'
import People from './pages/people/people'
import Docker from './pages/docker/docker'
import Feedback from './pages/feedback/feedback'
import AExperiment from './pages/experiment/aExperiment'
import SExperiment from './pages/experiment/sExperiment'
import NotFound from './pages/notFound/notFound.jsx'
import Help from './pages/help/help.jsx'

export default class App extends Component {
    render() {
        return (
            /**路由跳转 */
            <HashRouter>
                <Switch>
                    {/* 加exact使得一进'/'地址就加载home界面 */}
                    <Route path="/" component={Login} exact />
                    <Route path='/login' component={Login} />
                    <Route path='/home' component={Home}/>
                    {/* path:网页路由  component:jsx文件中class名（首字母大写） */}
                    <Route path="/class" component={Class} />
                    <Route path="/people" component={People} />
                    <Route path="/docker" component={Docker} />
                    <Route path="/sExperiment" component={SExperiment} />
                    <Route path="/aExperiment" component={AExperiment} />
                    <Route path="/feedback" component={Feedback} /> 
                    <Route path="/notFound" component={NotFound} />
                    <Route path="/help" component={Help} />
                </Switch>
            </HashRouter>
        )
    } 
}

