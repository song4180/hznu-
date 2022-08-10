package com.dockers.docker.handler;

import com.dockers.docker.exception.*;
import com.dockers.docker.vo.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/**
 * 全局异常处理机制
 *
 * @author zxy
 * @date 2020-7-7
 * @email 1225067236@qq.com
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    private final static Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    /**
     * 角色不存在异常处理机制
     * 前端返回提示信息
     * @param exception 错误信息
     * @return 返回错误信息
     */
    @ExceptionHandler(value = RoleNullException.class)
    public Result<? super AbstractException> oleNullExceptionHandler(RoleNullException exception){
        return Result.fail(exception.getMessage(), exception.getStatus());
    }
    /**
     * 服务器异常处理机制
     * 前端返回提示信息
     * @param exception 错误信息
     * @return 服务器自身异常
     */
    @ExceptionHandler(value = Exception.class)
    public Result<Object> exceptionHandler(Exception exception){
        log.warn("handler"+exception.getMessage());
        return Result.fail(exception.getMessage(),HttpStatus.NOT_FOUND);
    }

    /**
     * Get方法检验参数的异常
     * @param e 参数不合法
     * @return 参数不合法或者为空的异常
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public Result<? super AbstractException> argsExceptionHandler(MethodArgumentNotValidException e){
        return Result.fail(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
    /**
     * json对象参数检验异常
     * @param exception 参数不合法
     * @return  参数不合法的异常
     */
    @ExceptionHandler(value = ParamIllegalException.class)
    public Result<? super AbstractException> jsonExceptionHandler(ParamIllegalException exception){
        return Result.fail(exception.getMessage(), HttpStatus.OK);
    }

    /**
     * 登录异常
     * @param e
     * @return 返回错误信息
     */
    @ExceptionHandler(value = LoginException.class)
    public Result<? super AbstractException> handleLoginException(LoginException e) {
        return Result.fail(e.getMessage(), HttpStatus.OK);
    }

    @ExceptionHandler(value = AuthenticException.class)
    public Result<? super AbstractException> authenticExceptionHandler(AuthenticException e){
        return Result.fail(e.getMessage(),e.getStatus());
    }

    private <T> Result<T> handleBaseException(Throwable t) {
        Assert.notNull(t, "Throwable must not be null");

        log.error("Captured an exception", t);

        Result<T> result = new Result<>();
        result.setMessage(t.getMessage());
        return result;
    }
}
