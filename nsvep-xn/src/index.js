/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-01 21:39:28
 * @LastEditors: XN
 * @Description: 
 * @FilePath: /gitee-nsvep/src/index.js
 */ 

/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 *
 */

/*
 * @Author: XN
 * @Date: 2020-02-19 13:00:29
 * @LastEditTime: 2020-07-14 10:35:01
 * @LastEditors: XN
 * @Description: 入口js
 * @FilePath: /gitee-nsvep/src/index.js
 */ 
/**入口js*/


import React from 'react'
import ReactDOM from 'react-dom'
 
import App from './app'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import axios from 'axios'

//用storageUtils封装的方法读取local中保存到user，保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

const expId = storageUtils.getExpId()
memoryUtils.expId = expId

const port = storageUtils.getPort()
memoryUtils.port = port

const portainer = storageUtils.getPortainer()
memoryUtils.portainer = portainer

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

//将App组件标签渲染到index到div上
ReactDOM.render(<App />,document.getElementById('root'))

