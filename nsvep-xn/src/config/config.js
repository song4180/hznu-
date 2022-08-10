/*
 * @Author: XN
 * @Date: 2020-07-14 19:53:44
 * @LastEditTime: 2020-11-11 14:08:54
 * @LastEditors: XN
 * @Description: 配置
 * @FilePath: /gitee-nsvep/src/config/config.js
 */ 
import axios from 'axios'

//接口基础URL
// export const BASE_URL = 'http://localhost:8080/docker' 
// export const BASE_URL = 'http://114.215.196.138:8080/docker' 
export const BASE_URL = 'http://172.22.236.111/docker' 
export const RouterURL = '' 
axios.defaults.baseURL = BASE_URL;