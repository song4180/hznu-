/*
 * @Author: your name
 * @Date: 2020-07-18 10:08:37
 * @LastEditTime: 2020-07-18 15:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /te/src/index.js
 */ 
/**入口js*/

import React from 'react'
import ReactDOM from 'react-dom'
 
import App from './app'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

//用storageUtils封装的方法读取local中保存到user，保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

/**
 * @description: user保存到store中方便调用
 * @param {type} 
 * @return: 
 */

//将App组件标签渲染到index到div上
ReactDOM.render(<App />,document.getElementById('root'))

