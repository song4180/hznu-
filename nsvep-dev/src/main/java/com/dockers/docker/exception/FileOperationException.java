package com.dockers.docker.exception;

/**
 * 文件操作异常
 * @author zxy
 */
public class FileOperationException extends ServiceException {
    public FileOperationException(String message) {
        super(message);
    }

    public FileOperationException(String message, Throwable cause) {
        super(message, cause);
    }
}
