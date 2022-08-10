package com.dockers.docker.exception;

import org.springframework.http.HttpStatus;

/**
 * 容器未找到异常
 * @author zxy
 */
public class ContainerNotFoundException extends ServiceException{
    public ContainerNotFoundException(String message) {
        super(message);
    }

    public ContainerNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public HttpStatus getStatus() {
        return super.getStatus();
    }
}
