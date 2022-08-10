package com.dockers.docker.vo;

/**
 * service层 返回码
 * 插入，更新，删除时使用
 * @author zxy
 */
public enum StateCode {
    //默认返回值
    DEFAULT,
    //成功返回值
    SUCCESS,
    //传参异常返回值
    ERROR,
    //代码或其他异常返回值
    OTHER,
    //存在返回值
    IS_EXIST,
    //不存在返回值
    NOT_EXIST
}
