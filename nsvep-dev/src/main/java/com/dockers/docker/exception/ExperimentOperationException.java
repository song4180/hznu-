package com.dockers.docker.exception;

public class ExperimentOperationException extends ServiceException {
    public ExperimentOperationException(String message) {
        super(message);
    }

    public ExperimentOperationException(String message, Throwable cause) {
        super(message, cause);
    }
}
