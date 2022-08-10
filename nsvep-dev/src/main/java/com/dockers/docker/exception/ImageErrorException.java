package com.dockers.docker.exception;

/**
 * 镜像异常
 * @author zxy
 */
public class ImageErrorException extends ServiceException {
    public ImageErrorException(String message) {
        super(message);
    }

    public ImageErrorException(String message, Throwable cause) {
        super(message, cause);
    }
}
