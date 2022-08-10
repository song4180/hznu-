import axios from "axios";
import { message } from "antd";

import { BASE_URL, TOKEN_KEY } from "../config/config.js";

//如果有不同的基础接口 可以通过create创建新的axios对象实例（函数）
//axiosIns匹配的是8080:/abc/query
const axiosIns = axios.create({
  baseURL: BASE_URL, //接口基础地址
  timeout: 20000
});

// 请求拦截器
axiosIns.interceptors.request.use(
  function(config) {
    const t = localStorage.getItem(TOKEN_KEY);
    t && (config.headers.common["Authorization"] = t);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosIns.interceptors.response.use(
  function(response) {
    if (response.data.code === 1) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  function(error) {
    // 这里的错误均为网络错误，非具体业务错误
    if (error.response) {
      return Promise.reject(error.response);
    } else {
      // TODO 请求超时会崩溃，而不是通知错误
      return Promise.reject("请求超时, 请刷新重试");
    }
  }
);

//get
export const axios_get = (url, config = {}) => {
  return new (async resolve => {
    axiosIns({
      method: "get",
      url,
      ...config
    })
      .then(res_data => {
        res_data.msg && message.success(res_data.msg, 1);
        resolve(res_data);
      })
      .catch(response => {
        if (response && response.status === 401) {
          message.error(response.data.msg, 1);
          let { hash } = window.location;
          hash === "#/login" ||
            hash === "#/" ||
            hash === "#/register" ||
            (window.location.href = "/#/login");
        } else {
          message.error(response, 1);
        }
      });
  })();
};

//post
export const axios_post = (url, data = {}, config = {}) => {
  return new Promise(resolve => {
    axiosIns({
      method: "post",
      url,
      data,
      ...config
    })
      .then(res_data => {
        res_data.msg && message.success(res_data.msg, 1);
        resolve(res_data);
      })
      .catch(reason => {
        if (reason && reason.status === 401) {
          message.error(reason.data.msg, 1);
          //前进后退
          let { hash } = window.location;
          hash === "#/login" ||
            hash === "#/" ||
            hash === "#/register" ||
            (window.location.href = "/login");
        } else {
          message.error(reason.data, 1);
        }
      });
  });
};
