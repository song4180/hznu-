/*
 * @Author: XN
 * @Date: 2020-07-14 19:20:54
 * @LastEditTime: 2020-07-28 19:16:07
 * @LastEditors: XN
 * @Description: 设置跨域 好像翻车了 让后端开CORS吧🙏
 * @FilePath: /gitee-nsvep/src/setupProxy.js
 */ 

const { createProxyMiddleware } = require("http-proxy-middleware");
/**配置代理服务器 */
module.exports = function(app) {
  app.use(
    createProxyMiddleware("/api", {//匹配所有以/api开头的请求路径
      target: "http://172.22.236.55:8080/docker",//代理目标的基础路径
      changeOrigin: true,//支持跨域
      pathRewrite: {//重写路径，去掉路径开头的/api
        "^/api": "/"
      }
    })
  );
};
