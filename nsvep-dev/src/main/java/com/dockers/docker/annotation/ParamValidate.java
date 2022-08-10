package com.dockers.docker.annotation;

import java.lang.annotation.*;

/**
 * @author zxy
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface ParamValidate {
    /** 参数名称 */
    String name();

    /** 参数最大长度 */
    int maxLength() default Integer.MAX_VALUE;

    /** 最小长度 */
    int minLength() default Integer.MIN_VALUE;

    /**全匹配长度*/
    int equalsLength() default 0;

    /** 是否必填 */
    boolean required() default false;

    /** 正则匹配 */
    String regular() default "";
}
