package com.dockers.docker.exception;

import org.springframework.http.HttpStatus;

/**
 * 身份信息失效异常
 * @author zxy
 */
public class AuthenticException extends AbstractException{
    public AuthenticException(String message) {
        super(message);
    }

    public AuthenticException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}
