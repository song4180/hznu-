package com.dockers.docker.vo;

import lombok.Data;

/**
 * 用户登录返回信息
 * @author zgx
 */
@Data
public class UserLoginVO {
    private Integer userId;
    private String userStudentNumber;
    private String userImage;
    private String userName;
    private Long classId;
    private String token;
}
