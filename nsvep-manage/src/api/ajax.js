/*
 * @Author: your name
 * @Date: 2020-07-16 21:09:02
 * @LastEditTime: 2020-11-06 15:07:35
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/api/ajax.js
 */
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
import memoryUtils from "../utils/memoryUtils.js";
import storageUtils from "../utils/storageUtils.js";
import { RouterURL } from "../config/config";

export default function ajax(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    // let history = useHistory();

    axios.default.withCredentials = true;
    axios.defaults.crossDomain = true;
    //请求拦截带token
    axios.interceptors.request.use(
      config => {
        const token = Cookies.get("token");
        if (token) {
          // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers["token"] = token;
          // config.headers["Cookie"] = cookies;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    let promise;
    //1.执行异步ajax请求
    if (method === "GET") {
      //发送get请求
      promise = axios.get(
        url,
        {
          params: data //指定请求参数，
        },
        { withCredentials: true }
      );
    } else {
      promise = axios.post(url, data, { withCredentials: true });
    }

    promise
      .then(response => {
        if (response.data.isSuccess) {
          resolve(response.data);
        } else if (response.data.status === 401) {
          message.error("身份认证已过期");
          storageUtils.removeUser();
          memoryUtils.user = {};
          // history.push("/login");
          window.location.href = window.location.href.split('#')[0]+'#/login';
          // alert("401");

        } else if (
          response.data.status !== 200 &&
          response.data.status !== 401
        ) {
          // history.push("/notFound");
          window.location.href = window.location.href.split('#')[0]+'#/notFound';
          // alert("!200 !401");
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
