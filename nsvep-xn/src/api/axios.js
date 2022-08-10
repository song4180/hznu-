import axios from "axios";
import { message } from "antd";

import { BASE_URL, TOKEN_KEY } from "../config/config.js";

/**
 * @description: 如果有不同的基础接口 可以通过create创建新的axios对象实例（函数）
 * @param {type}
 * @return:
 */
const axiosIns = axios.create({
  baseURL: BASE_URL, //接口基础地址
  timeout: 20000
});

/**
 * @description: 请求拦截器
 * @param {type}
 * @return:
 */
axiosIns.interceptors.request.use(
);

/**
 * @description: 响应拦截器
 * @param {type}
 * @return:
 */
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

/**
 * @description: axios_get get方法获取
 * @param {type}
 * @return:
 */
export const axios_get = (url, config = {}) => {
  return new (async resolve => {
    axiosIns({
      method: "GET",
      url,
      ...config
    })
      .then(response => {
        if (response.data.isSuccess) {
          resolve(response.data);
        } else if (response.data.httpCode == 401) {
          message.error("身份认证已过期");
          window.location.href = "/#/login";
        } else if (
          response.data.httpCode != 200 &&
          response.data.httpCode != 401
        ) {
          window.location.href = "/#/notFound";
        }
      })
      .catch(error => {
        message.error("请求出错了:" + error.message);
      });
  })();
};

/**
 * @description: axios_post post方法获取
 * @param {type}
 * @return:
 */
export const axios_post = (url, data = {}, config = {}) => {
  return new Promise(resolve => {
    axiosIns({
      method: "post",
      url,
      data,
      ...config
    })
      .then(response => {
        if (response.data.isSuccess) {
          resolve(response.data);
        } else if (response.data.httpCode == 401) {
          message.error("身份认证已过期");
          window.location.href = "/#/login";
        } else if (
          response.data.httpCode != 200 &&
          response.data.httpCode != 401
        ) {
          window.location.href = "/#/notFound";
        }
      })
      .catch(error => {
        message.error("请求出错了:" + error.message);
      });
  });
};
