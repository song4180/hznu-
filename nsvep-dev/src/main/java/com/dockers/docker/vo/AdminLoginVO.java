package com.dockers.docker.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 管理端登录返回的信息
 * @author zgx
 */
@Getter
@Setter
@ToString
public class AdminLoginVO {
    /**
     * 管理员编号
     */
    private Integer adminId;
    /**
     * 管理员账号
     */
    private String adminAccount;
    /**
     * 管理员电话
     */
    private String adminTel;
    /**
     * 管理员姓名
     */
    private String adminName;
    /**
     * 是否超管
     */
    private Integer isSuper;
    /**
     * 是否在职
     */
    private Integer isDeleted;
}
