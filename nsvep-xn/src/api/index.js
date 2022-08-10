/*
 * @Author: XN
 * @Date: 2020-07-11 15:12:42
 * @LastEditTime: 2020-11-06 20:39:51
 * @LastEditors: XN
 * @Description: 接口请求，能根据接口文档定义接口请求，包含以应用中所有接口请求函数的模块，每个函数的返回值都是promise
 * @FilePath: /gitee-nsvep/src/api/index.js
 */

import Ajax from "./ajax";

import { BASE_URL } from "../config/config.js";

/**
 * @description: 登录页面 - 登录请求
 * @param {userStudentNumber: 用户学号, userPassword: 用户密码}
 * @return:
 */
export const reqLogin = (userStudentNumber, userPassword) =>
  Ajax(BASE_URL + "/stu/login", { userStudentNumber, userPassword }, "POST");

 /**
 * @description: 登出 
 * @param {userId 用户ID}
 * @return:
 */
export const  reqLogout = (userId) =>
  Ajax(BASE_URL + "/stu/logout", { userId }, "POST");

/**
 * @description: 注册页面 - 注册接口
 * @param {userPassword 密码, userTel 电话, userName 姓名, userAcademy 专业, userClass 班级, userStudentNumber 学号, userEmail 邮箱, userGender 性别, classId 加入的班级id}
 * @return:
 */
export const reqRegister = (
  userPassword,
  userTel,
  userName,
  userAcademy,
  userClass,
  userStudentNumber,
  userEmail,
  userGender,
  classId
) =>
  Ajax(
    BASE_URL + "/stu/adduser",
    {
      userPassword,
      userTel,
      userName,
      userAcademy,
      userClass,
      userStudentNumber,
      userEmail,
      userGender,
      classId
    },
    "POST"
  );

/**
 * @description: 个人信息 - 修改信息
 * @param {userId 用户ID, userTel 电话, userEmail 邮箱, userImage 图片}
 * @return:
 */
export const reqChangeMyIfo = (userId, userTel, userEmail,userAcademy, userImage) =>
  Ajax(
    BASE_URL + "/stu/update/user",
    { userId, userTel, userEmail,userAcademy, userImage },
    "POST"
  );

/**
 * @description: 反馈 - 用户反馈接口
 * @param {reportedTitle 反馈标题, reportedDetail 反馈内容, reportedImage 反馈图片, userId 反馈用户Id}
 * @return: 接口文档
 */
export const reqFeedback = (
  reportedTitle,
  reportedDetail,
  reportedImage,
  userId
) =>
  Ajax(
    BASE_URL + "/stu/report/add",
    { reportedTitle, reportedDetail, reportedImage, userId },
    "POST",
  );

/**
 * @description: 登录 - 忘记密码 - 发送邮件接口
 * @param {userStudentNumber 学号, userEmail 邮箱}
 * @return: 接口文档
 */
export const reqSendMail = (userStudentNumber, userEmail) =>
  Ajax(BASE_URL + "/stu/forget", { userStudentNumber, userEmail }, "POST");

/**
 * @description: 登录 - 忘记密码 - 修改密码接口
 * @param {userId 用户ID, userPassword 新的密码}
 * @return: 接口文档
 */
export const reqChangePwd = (userId, userPassword) =>
  Ajax(BASE_URL + "/stu/update/forget", { userId, userPassword }, "POST");

/**
 * @description: 个人中心 - 修改密码 - 用户密码修改
 * @param {userId 用户ID, oldPassword 旧密码, newPassword 新密码}
 * @return: 接口文档
 */
export const reqUserChangePwd = (userId, oldPassword, newPassword) =>
  Ajax(
    BASE_URL + "/stu/update/pass",
    { userId, oldPassword, newPassword },
    "POST"
  );

/**
 * @description: 个人中心 - 预加载 - 个人信息展示接口
 * @param {userId 用户ID}
 * @return:
 */
export const reqPersonalFormItems = userId =>
  Ajax(BASE_URL + "/stu/query", { userId }, "GET");

/**
 * @description: 课程 - 预加载 - 实验展示接口
 * @param {pageNum 要跳转的页码, pageSize 一页有多少条数据}
 * @return:
 */
export const reqPageItems = (pageNum, pageSize, classId) =>
  Ajax(BASE_URL + "/stu/experiment/queryall", { pageNum, pageSize, classId }, "GET");

/**
 * @description: 课程 - 详情 - 文件资料列表接口
 * @param {}
 * @return:看接口文档
 */
export const reqFileList = () =>
  Ajax(BASE_URL + "/stu/file/filelist", {}, "GET");

/**
 * @description: 课程 - 详情 - 文件资料下载接口
 * @param {fileName 文件名, id 文件ID}
 * @return:
 */
export const reqFileDown = (id, fileName) =>
  Ajax(BASE_URL + "/stu/file/download", { id, fileName }, "GET");

 /**
 * @description: 课程 - 是否已开启容器
 * @param {userId 用户ID}
 * @return: experimentId 实验ID
 */
export const  reqIsOpenDocker = (userId) =>
  Ajax(BASE_URL + "/stu/experiment/opencheck", { userId }, "POST");

 /**
 * @description: 课程 - 有已开启容器 - 继续实验
 * @param {userId 用户ID}
 * @return:expId 实验ID，containerId 容器ID
 */
export const  reqContinueExperiment = (userId) =>
  Ajax(BASE_URL + "?", { userId }, "POST");


/**
 * @description: 实验 - 实验开始前请求数据
 * @param {}
 * @return:文本数据，isClosed
 */
export const reqExpBeforeLoad = (experimentId,userId) =>
  Ajax(BASE_URL + "/stu/experiment/enter", { experimentId,userId }, "GET");

/**
 * @description: 实验 - 开始实验按钮
 * @param {experimentId 实验ID, userId 用户ID, pixel =  width 窗口宽度 x height窗口高度 }
 * @return: 结束时间
 */
export const reqStartExp = (experimentId,userId,pixel) =>
  Ajax(BASE_URL + "/stu/experiment/open", { experimentId,userId,pixel }, "POST");

 /**
 * @description: 实验 - 启动实验按钮
 * @param {}
 * @return:端口, 容器ID
 */
export const  reqOpenExp = (experimentId,userId) =>
  Ajax(BASE_URL + "/stu/experiment/start", { experimentId,userId }, "GET");

 /**
 * @description: 实验 - 关闭实验按钮
 * @param {}
 * @return:端口, 容器ID
 */
export const  reqCloseExp = (experimentId,userId,containerId) =>
  Ajax(BASE_URL + "/stu/experiment/close", { experimentId,userId,containerId }, "POST");

 /**
 * @description: 实验 - 学生提交协助申请
 * @param {}
 * @return:端口, 容器ID
 */
export const  reqHelp = (experimentId,userId) =>
  Ajax(BASE_URL + "/stu/addAssist", { experimentId,userId }, "POST");


