package com.dockers.docker.exception;

import org.springframework.http.HttpStatus;

/**
 * 传参非法
 * @author zxy
 */
public class ParamIllegalException extends AbstractException{
    public ParamIllegalException(String message) {
        super(message);
    }

    public ParamIllegalException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public HttpStatus getStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}
