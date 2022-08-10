package com.dockers.docker.exception;

import org.springframework.http.HttpStatus;

/**
 * 错误数据格式
 * @author zgx
 */
public class BadRequestException extends AbstractException{

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}
