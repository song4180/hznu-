package com.dockers.docker.handler.aspect;

import com.dockers.docker.exception.BadRequestException;
import com.dockers.docker.exception.FileOperationException;
import com.dockers.docker.exception.LoginException;
import com.dockers.docker.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * aop切面
 * @author zxy,zgx
 */
@Aspect
@Component
@Slf4j
public class AspectService {

    @Pointcut(value = "execution(* com.dockers.docker.service.*.*(..))")
    public void pointCutService(){
    }


    @Pointcut(value = "execution(* com.dockers.docker.controller.*.*(..))")
    public void pointCutController(){
    }



    @AfterThrowing(value = "pointCutService()",throwing = "throwable")
    public void adviceService(JoinPoint joinPoint,Throwable throwable){

        String method = joinPoint.getSignature().getName();
        String targetClass = joinPoint.getSignature().getDeclaringTypeName();
        Object[] args = joinPoint.getArgs();


        if(throwable instanceof LoginException){
            log.error("LoginException {}",throwable.getMessage());
            logControl(method,targetClass,args);
        } else if(throwable instanceof BadRequestException){
            log.error("BadRequestException {}", throwable.getMessage());
            logControl(method,targetClass,args);
        }else if(throwable instanceof ServiceException){
            log.error("ServiceException: {}", throwable.getMessage());
            logControl(method,targetClass,args);
        }else{
            log.error("暂未解决的异常：{}",throwable.getMessage());
            logControl(method,targetClass,args);
        }
    }

    public void logControl(String method,String targetClass ,Object[] args){
        StringBuffer stringBuffer = new StringBuffer();
        for(Object argv:args){
            stringBuffer.append(argv).append(" ");
        }
        log.error("捕获的异常发生在 {}，方法名为{}，参数有{}",targetClass,method,stringBuffer);
    }
}
