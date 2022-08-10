package com.dockers.docker.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 管理端分页展示用户数据传输
 * @author zxy
 */
@Setter
@Getter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    
    /**
     * 用户id
     */
    private Integer userId;
    /**
     * 用户学号
     */
    private String userStudentNumber;
    /**
     * 用户真实姓名
     */
    private String userName;
    /**
     * 用户班级
     */
    private String userClass;
    /**
     * 账户是否使用（0使用1停用）
     * 本字段用于查询和构造mp条件
     */

    private Integer isDeleted;
    /**
     * 所属班级(周一3，4）（周二7，8）
     */
    private String className;
}
