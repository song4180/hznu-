package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.dockers.docker.annotation.ParamValidate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

/**
 * User实体,
 * @author zxy
 */
@Data
@TableName(value = "user")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    /**
     * 指定数据库主键，id主键，自动递增
     */
    @TableId(type = IdType.AUTO)
    private Integer userId;
    /**
     * 学号
     */
    @ParamValidate(name = "学号",required = true,equalsLength = 13)
    private String userStudentNumber;
    /**
     * 密码
     */
    @ParamValidate(name = "密码",required = true,maxLength = 30)
    private String userPassword;
    /**
     * 电话
     */
    @ParamValidate(name = "电话",equalsLength = 11)
    private String userTel;
    /**
     * 头像
     */
    private String userImage;
    /**
     * 名字
     */
    @ParamValidate(name = "姓名")
    private String userName;
    /**
     * 学院
     */
    private String userAcademy;
    /**
     * 班级
     */
    private String userClass;
    /**
     * 邮件
     */
    @ParamValidate(name = "邮箱",regular = "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$")
    private String userEmail;
    /**
     * 性别
     */
    @TableField(fill = FieldFill.INSERT)
    private Integer userGender;
    /**
     * 课程班级编号
     */
    @ParamValidate(name = "班级序号")
    private Long classId;
    /**
     * 是否使用
     */
    @TableField(fill = FieldFill.INSERT)
    @TableLogic
    private Integer isDeleted;
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;

    /**
     * transient不设置参与序列化过程,不想插入库表中但是需要序列化可用static,或者注解@TableField
     */
    @TableField(exist = false)
    private String token;
}




