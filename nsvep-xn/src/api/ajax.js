/*
 * @Author:XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-11-08 14:57:59
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /gitee-nsvep/src/api/ajax.js
 */

/**
能发送异步ajax请求的模块
封装axios库
函数返回值是promise对象
 */
/**
 优化：统一处理请求异常
 在外层包一个自己创建的promise对象
 在请求出错时，不reject(error),而是显示错误提示（antd的message）
 优化：异步得到的是response.data
 在请求成功resolve时：resolve(response.data)
  */
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { message } from "antd";
import Cookies from "js-cookie";
import { routerRedux } from 'dva/router'
import { push } from 'react-router-redux';
// import {myRouter} from './router.jsx'
import memoryUtils from "../utils/memoryUtils.js";
import storageUtils from "../utils/storageUtils.js";
import { BASE_URL } from "../config/config";
  axios.defaults.withCredentials = true;

export default function Ajax(url, data = {}, method = "GET", props) {
  // $.cors(url, data, method, function (json) {
  //   if (json.code == 0) {}
  // });

  const service = axios.create({
      baseURL:BASE_URL , // url = base url + request url  process.env.VUE_APP_BASE_API:这是vue脚手架里面的变量 
      withCredentials: true, // send cookies when cross-domain requests 这里设置为true 就会自动携带cookie  他不是 打开就能跨域 是打开的情况下跨域也能携带cookie
      timeout: 10000, // request timeout
    })

  let promise;
  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios.defaults.crossDomain = true;
   
    //请求拦截带token

    axios.interceptors.request.use(
      config => {
        const token = Cookies.get("token");
        if (token) {
          // 判断是否存在token，如果存在的话，则每个http header都加上token header携带token 部署到服务器可以 跨域前后不可以
          config.headers["token"] = token;
          // config.headers['Access-Control-Allow-Origin'] = true;
          // config.headers["Authorization"] = "token="+token;
          // config.headers.common.cookie = token;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    
    //1.执行异步ajax请求
    if (method === "GET") {
      //发送get请求
      promise = axios.get(
        url,
        {
          params: data //指定请求参数，
        },
        {withCredentials : true}
      );
    } else {
      promise = axios.post(url, data, {withCredentials : true});
    }

    promise
      .then(response => {
        if (response.data.isSuccess) {
          resolve(response.data);
        } else if (response.data.status === 401) {
          message.error("身份认证已过期");
          // 清除缓存 memoryUtils必清 
          memoryUtils.user = {};
          storageUtils.removeUser();
          window.location.href = window.location.href.split('#')[0]+'#/login';
        } else if (
          response.data.status !== 200 &&
          response.data.status !== 401
        ) {
           // 清除缓存 memoryUtils必清 
          memoryUtils.user = {};
          storageUtils.removeUser();
          window.location.href = window.location.href.split('#')[0]+'#/notFound';
        } else {
          message.error(response.data.message);
        }
      })
      .catch(error => {
        message.error("请求出错了");
      });
    //2.如果成功，调用resolve（value）;
    //3.如果失败，不调用reject(reason)，而是提示异常信息
  });
  // 执行异步ajax 请求
}
