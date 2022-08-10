package com.dockers.docker.vo;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;


/**
 * 返回参数标准
 * 返回参数有3个参数
 * isSuccess message data
 *
 * @author 朱高翔
 * @date 2020.7.1
 */
@Data
@Component
public class Result<T> {

    private static final String SUCCESS_MESSAGE = "success";
    private static final int SUCCESS_CODE = 1;
    private static final String FAIL_MESSAGE = "fail";
    private static final int FAIL_CODE = 0;

    /**
     * 成功标志
     */
    private int isSuccess;

    /**
     * Response status.
     */
    private Integer status;

    /**
     * 返回处理信息
     */
    private String message;

    /**
     * 返回数据 data
     */
    private T data;

    public Result() {
    }

    public Result(int isSuccess, Integer status, String message, T data) {
        this.isSuccess = isSuccess;
        this.status = status;
        this.message = message;
        this.data = data;
    }


    /**
     * 操作成功，传SUCCESS_MESSAGE，data为null
     *
     * @return result
     */
    public static Result<Object> success() {
        Result<Object> result = new Result<>();
        result.setIsSuccess(SUCCESS_CODE);
        result.setMessage(SUCCESS_MESSAGE);
        return result;
    }

    /**
     * 操作成功，传message，data为null
     *
     * @param message 具体操作成功信息，例如登录成功
     * @return result
     */
    public static Result<Object> success(String message) {
        Result<Object> result = new Result<>();
        result.setIsSuccess(SUCCESS_CODE);
        result.setStatus(HttpStatus.OK.value());
        result.setMessage(message);
        return result;
    }

    /**
     * 操作成功，传SUCCESS_MESSAGE和数据data
     *
     * @param data 返回数据
     * @return 返回数据
     */
    public static <T> Result<T> success(T data) {
        return new Result<>(SUCCESS_CODE, HttpStatus.OK.value(), SUCCESS_MESSAGE, data);
    }

    /**
     * 操作成功，传message和数据data
     *
     * @param message 具体操作成功信息，例如登录成功
     * @param data    返回数据
     * @return 返回数据
     */
    public static <T> Result<T> success(String message, T data) {
        return new Result<>(SUCCESS_CODE, HttpStatus.OK.value(), message, data);
    }

    /**
     * 操作失败，传FAIL_MESSAGE，data为null
     *
     * @return result
     */
    public static Result<Object> fail() {
        Result<Object> result = new Result<>();
        result.setIsSuccess(FAIL_CODE);
        result.setMessage(FAIL_MESSAGE);
        return result;
    }

    /**
     * 操作失败，传message，data为null
     *
     * @param message 传递错误信息
     * @return result
     */
    public static Result<Object> fail(String message) {
        Result<Object> result = new Result<>();
        result.setIsSuccess(FAIL_CODE);
        result.setStatus(HttpStatus.OK.value());
        result.setMessage(message);
        return result;
    }

    /**
     * 异常处理
     *
     * @param message    失败信息
     * @param httpStatus 状态码
     * @return result
     */
    public static Result<Object> fail(String message, HttpStatus httpStatus) {
        Result<Object> result = new Result<>();
        result.setIsSuccess(FAIL_CODE);
        result.setMessage(message);
        result.setStatus(httpStatus.value());
        return result;
    }
}
