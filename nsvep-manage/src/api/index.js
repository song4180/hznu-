/*
 * @Author: XN
 * @Date: 2020-07-16 21:09:02
 * @LastEditTime: 2020-11-06 21:19:20
 * @LastEditors: XN
 * @Description: In User Settings Edit
 * @FilePath: /te/src/api/index.js
 */

/**
能根据接口文档定义接口请求
包含以应用中所有接口请求函数的模块
每个函数的返回值都是promise
 */

import ajax from "./ajax";

import { BASE_URL } from "../config/config.js";

/**
 * @description: 登录 - 登录接口
 * @param {adminAccount 管理员账号 , adminPassword 管理员密码}
 * @return:
 */
export const reqLogin = (adminAccount, adminPassword) =>
  ajax(BASE_URL + "/admin/login", { adminAccount, adminPassword }, "POST");

/**
 * @description: 班级管理 - 预加载 - 信息展示接口 展示班级
 * @param {type}
 * @return:
 */

export const reqClassManage = adminId =>
  ajax(BASE_URL + "/admin/classes", { adminId }, "GET");

/**
 * @description: 班级管理 - 添加 - 添加班级接口
 * @param {className 班级名称, classDetail 班级详情, adminId 用户ID}
 * @return: reqPeopleManage
 */

export const reqAddClass = (className, classDetail, adminId) =>
  ajax(BASE_URL + "/admin/class", { className, classDetail, adminId }, "POST");

/**
 * @description: 班级管理 - 添加 - 添加管理员接口
 * @param {isSuper	是否超管,adminAccount 管理员工号,adminTel 管理员手机号,adminName	管理员姓名,adminPassword 管理员密码}
 * @return: reqAddManager
 */

export const reqAddManager = (
  isSuper,
  adminAccount,
  adminTel,
  adminName,
  adminPassword
) =>
  ajax(
    BASE_URL + "/admin/add",
    { isSuper, adminAccount, adminTel, adminName, adminPassword },
    "POST"
  );

/**
 * @description: 班级管理 - 结课 - 结课接口
 * @param {adminId 管理员Id, classId 课程Id}
 * @return:
 */
export const reqClassDelete = (adminId, classId) =>
  ajax(BASE_URL + "/admin/deleteclass", { adminId, classId }, "POST");

/**
 * @description: 班级管理 - 批量导入 - 批量导入班级学生接口
 * @param {className 班级名称, classDetail 班级详情, adminId 用户ID}
 * @return:
 */

export const reqBatchUsers = (file, classId) =>
  ajax(BASE_URL + "/admin/batchusers", { file, classId }, "POST");

/**
 * @description: 班级管理 - 选择实验 - 预加载 - 请求可提供的实验
 * @param {adminId 管理员Id}
 * @return:
 */
export const reqExpCheckbox = classId =>
  ajax(BASE_URL + "/admin/experiment/allexperiments", { classId }, "GET");

/**
 * @description: 班级管理 - 选择实验 - 选择这个班级可提供的实验
 * @param {type}
 * @return:
 */
export const reqChooseExp = (classId, ids) =>
  ajax(
    BASE_URL + "/admin/experiment/batchexperiment",
    { classId, ids },
    "POST"
  );

/**
 * @description: 班级管理 - 查看人员 - 批量删除 - 批量删除用户接口
 * @param {adminId 管理员Id, classId 课程Id}
 * @return: reqPeopleManage
 */

export const reqPeopleDelete = userIds =>
  ajax(BASE_URL + "/admin/deletes", { userIds }, "POST");

/**
 * @description: 班级管理 - 查看人员 - 预加载 - 学生信息展示接口
 * @param {type}
 * @return: reqPeopleManage
 */

export const reqPeopleManage = (
  pageNum,
  pageSize,
  adminId,
  className,
  userName
) =>
  ajax(
    BASE_URL + "/admin/users",
    { pageNum, pageSize, adminId, className, userName },
    "GET"
  );

/**
 * @description: 权限管理 - 预加载 - 实验权限展示接口
 * @param {adminId 管理员Id}
 * @return:
 */
export const reqExpShow = (adminId, classId) =>
  ajax(BASE_URL + "/admin/experiment/experiments", { adminId, classId }, "GET");

/**
 * @description: 权限管理 - 头部选择 - 请求要看的班级
 * @param {adminId 管理员Id}
 * @return: reqDeleteExp
 */
export const reqClassRadio = adminId =>
  ajax(BASE_URL + "/admin/select", { adminId }, "GET");

/**
 * @description: 权限管理 - Switch开关 - 实验开启关闭接口
 * @param {type}
 * @return:
 */
export const reqExpStatus = (experimentId, classId, status) =>
  ajax(
    BASE_URL + "/admin/experiment/updatestatus",
    { experimentId, classId, status },
    "POST"
  );

/**
 * @description: 权限管理 - 删除 - 请求删除的实验
 * @param {adminId 管理员Id}
 * @return:
 */
export const reqDeleteExp = (classId, experimentId) =>
  ajax(BASE_URL + "/admin/experiment/delete", { classId, experimentId }, "GET");

/**
 * @description: 故障反馈 - 预加载 - 反馈展示接口
 * @param {pageSize 一页有几条数据, pageNum 当前是哪一页}
 * @return:
 */

export const reqFeedbackReports = (pageSize, pageNum) =>
  ajax(BASE_URL + "/admin/report/reports", { pageSize, pageNum }, "GET");

/**
 * @description: 首页 - 图表 - CPU图表 - 数据获取接口
 * @param {type}
 * @return {type}
 */

export const reqCPUCharts = () => ajax( BASE_URL + "/admin/getMemoryInfo", {}, "GET");

/**
 * @description: 首页 - 图表 - 学生图表 - 数据获取接口
 * @param {type}
 * @return {type}
 */

export const reqStuCharts = () => ajax( BASE_URL + "/admin/getDockerNum", {}, "GET");


/**
 * @description: 首页文件资源展示接口
 * @param {type}
 * @return:
 */

export const reqHomeTabShow = () =>
  ajax(BASE_URL + "/admin/file/filelist", {}, "GET");

/**
 * @description: 首页文件资源删除接口
 * @param {fileName 文件名,id 文件序号}
 * @return:
 */

export const reqHomeTabDelete = (fileName, id) =>
  ajax(BASE_URL + "/admin/file/delete", { fileName, id }, "GET");

/**
 * @description: 首页文件资源上传接口
 * @param {uploadFile 文件路径,id 文件序号}
 * @return:
 */

export const reqFileUpload = (uploadFile, id) =>
  ajax(BASE_URL + "/admin/file/uploadFile", { uploadFile, id }, "POST");

/**
 * @description: 资源管理 - 上传实验资源接口
 * @param {experimentTitle 实验标题, experimentDescribe 实验描述, imageId 镜像所在的位置, experimentTask 实验任务, courseDetail 实验步骤, imageName 镜像名称, imageDescribe 镜像描述}
 * @return:
 */

export const reqImage = (
  experimentTitle,
  experimentDescribe,
  imageId,
  experimentTask,
  courseDetail,
  imageName,
  imageDescribe
) =>
  ajax(
    BASE_URL + "/admin/experiment/insertexperiment",
    {
      experimentTitle,
      experimentDescribe,
      imageId,
      experimentTask,
      courseDetail,
      imageName,
      imageDescribe
    },
    "POST"
  );

/**
 * @description: 资源管理 - 表格修改接口
 * @param {experimentDescribe, imageId, imageName, imageDescribe,experimentTitle,experimentId,experimentTask}
 * @return:
 */

export const reqTableChangeData = (
  experimentDescribe,
  imageId,
  imageName,
  imageDescribe,
  experimentTitle,
  experimentId,
  experimentTask
) =>
  ajax(
    BASE_URL + "/admin/experiment/updateexperiment",
    {
      experimentDescribe,
      imageId,
      imageName,
      imageDescribe,
      experimentTitle,
      experimentId,
      experimentTask
    },
    "POST"
  );

/**
 * @description: 资源管理 - 表格数据获取接口
 * @param {}
 * @return:
 */

export const reqTableData = () =>
  ajax(BASE_URL + "/admin/experiment/getAll", {}, "GET");

/**
 * @description: 教师协助 - 查询需要帮助的学生信息
 * @param {}
 * @return:
 */

export const reqHelpTable = (pageSize, pageNum,adminId) =>
  ajax(BASE_URL + "/admin/queryall", {pageSize, pageNum,adminId}, "GET");

/**
 * @description: 教师协助 - 协助 - 获取port
 * @param {}
 * @return:
 */

export const reqHelp = (assistId,userId,experimentId,assistStatus) =>
  ajax(BASE_URL + "/admin/getportwithupdate", {assistId,userId,experimentId,assistStatus}, "POST");

  /**
 * @description: 教师协助 - 拒绝 - 
 * @param {}
 * @return:
 */

export const reqHelpRefused = () =>
  ajax(BASE_URL + "?", {}, "GET");