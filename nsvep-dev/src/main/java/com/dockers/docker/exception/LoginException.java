package com.dockers.docker.exception;

import org.springframework.http.HttpStatus;

/**
 * 登录异常
 * @author zgx
 */
public class LoginException extends BadRequestException{

    public LoginException(String message) {
        super(message);
    }

    public LoginException(String message, Throwable cause) {
        super(message, cause);
    }
}
