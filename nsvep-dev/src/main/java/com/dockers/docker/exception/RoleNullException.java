package com.dockers.docker.exception;


/**
 * 用户不存在异常
 * @author zxy
 */
public class RoleNullException extends BadRequestException {
    public RoleNullException(String message) {
        super(message);
    }

    public RoleNullException(String message, Throwable cause) {
        super(message, cause);
    }
}
