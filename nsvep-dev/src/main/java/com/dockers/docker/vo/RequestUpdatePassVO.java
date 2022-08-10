package com.dockers.docker.vo;

import lombok.Data;

/**
 * @author zxy
 */
@Data
public class RequestUpdatePassVO {
    private Integer userId;
    private String oldPassword;
    private String newPassword;
}
