package com.dockers.docker.dto;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * 批量插入用户
 * @author zxy
 */
@Getter
@Setter
@ToString
@TableName(value = "user")
public class UserBatchDTO {
    @TableId(type = IdType.AUTO)
    @ExcelIgnore
    private Integer userId;
    /**
     * 学号
     */
    @ExcelProperty("学号")
    @TableField(value = "user_student_number")
    private String userStudentNumber;
    /**
     * 密码
     */
    @ExcelIgnore
    private String userPassword;
    /**
     * 电话
     */
    @ExcelProperty("手机号码")
    private String userTel;
    /**
     * 头像
     */
    @ExcelIgnore
    private String userImage;
    /**
     * 名字
     */
    @ExcelProperty("姓名")
    private String userName;
    /**
     * 学院
     */
    @ExcelProperty("学院")
    private String userAcademy;
    /**
     * 班级
     */
    @ExcelProperty("班级")
    private String userClass;
    /**
     * 邮件
     */
    @ExcelProperty("电子邮箱")
    private String userEmail;
    /**
     * 性别
     */
    @ExcelIgnore
    private Integer userGender;
    /**
     * 课程班级编号
     */
    @TableField(insertStrategy = FieldStrategy.NOT_EMPTY)
    @ExcelIgnore
    private Long classId;
    /**
     * 是否使用
     */
    @TableLogic
    @TableField(fill = FieldFill.INSERT)
    @ExcelIgnore
    private Integer isDeleted;
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    @ExcelIgnore
    private Date createTime;
}
