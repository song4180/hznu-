package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.dockers.docker.annotation.ParamValidate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * 管理员
 * @author zxy
 */
@Setter
@Getter
@TableName(value = "admin")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Administer {
    /**
     * 管理员编号
     */
    @TableId(type = IdType.AUTO)
    @NotBlank
    private Integer adminId;
    /**
     * 管理员账号
     */
    @ParamValidate(name = "管理员账号",required = true)
    private String adminAccount;
    /**
     * 管理员密码
     */
    @ParamValidate(name = "管理员密码",required = true, minLength = 6)
    private String adminPassword;
    /**
     * 管理员电话
     */
    private String adminTel;
    /**
     * 管理员姓名
     */
    @ParamValidate(name = "管理员姓名",required = true)
    private String adminName;
    /**
     * 是否超管
     */
    @ParamValidate(name = "是否是超级管理员",required = true)
    private Integer isSuper;
    /**
     * 是否在职
     */
    @TableLogic
    @TableField(fill = FieldFill.INSERT)
    private Integer isDeleted;
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
}
