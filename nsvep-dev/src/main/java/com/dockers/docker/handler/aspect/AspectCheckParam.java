package com.dockers.docker.handler.aspect;

import com.dockers.docker.annotation.ParamValidate;
import com.dockers.docker.exception.ParamIllegalException;
import com.google.common.base.Verify;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * 使用@ParamValidate注解检验参数是否正确的aop切面
 * @author zxy,zgx
 */
@Aspect
@Component
@Slf4j
public class AspectCheckParam {
    @Pointcut("@annotation(com.dockers.docker.annotation.Verifys)")
    public void paramValidate(){}

    @Before("paramValidate()")
    public void checkValidate(JoinPoint joinPoint) throws IllegalAccessException {
        //切点对象
        Object obj = joinPoint.getArgs()[0];
        Class<?> clazz = obj.getClass();
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            //需要做校验的参数
            if (field.isAnnotationPresent(ParamValidate.class)) {
                ParamValidate verify = field.getAnnotation(ParamValidate.class);
                String name = verify.name();
                int maxLength = verify.maxLength();
                int minLength = verify.minLength();
                boolean required = verify.required();
                String regular = verify.regular();
                int equalsLength = verify.equalsLength();
                //属性值
                Object fieldObj = field.get(obj);
                List<String> list = new ArrayList<>();
                if (required) {
                    if (ObjectUtils.isEmpty(fieldObj)) {
                        list.add(String.format("{%s}为必填参数", name));
                    }
                    if (Integer.MAX_VALUE != maxLength) {
                        if (maxLength < String.valueOf(fieldObj).length()) {
                            list.add(String.format("{%s}长度不合理，最大长度为{%d}", name, maxLength));
                        }
                    }
                    if (Integer.MIN_VALUE != minLength) {
                        if (minLength > String.valueOf(fieldObj).length()) {
                            list.add(String.format("{%s}长度不合理，最小长度为{%d}", name, minLength));
                        }
                    }
                    if(equalsLength!=0){
                        if(equalsLength != String.valueOf(fieldObj).length()){
                            list.add(String.format("{%s}长度不合法，需要填写{%d}位的数据",name,equalsLength));
                        }
                    }
                    if (!"".equals(regular)) {
                        Pattern pattern = Pattern.compile(regular);
                        if (!pattern.matcher(String.valueOf(fieldObj)).matches()) {
                            list.add(String.format("{%s}数据不合法，请按照规则填写", name));
                        }
                    }
                    if(!ObjectUtils.isEmpty(list)){
                        StringBuilder stringBuilder = new StringBuilder();
                        list.forEach(error->stringBuilder.append(error).append(";"));
                        throw new ParamIllegalException(stringBuilder.toString());
                    }
                }
            }
        }
    }
}
