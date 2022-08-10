package com.dockers.docker.service;


/**
 * @author zxy
 */
public interface EmailService {
    /**
     * 密码找回
     *
     * @param num       验证码
     * @param userEmail 用户邮箱
     * @return 是否发送成功
     */
     void passFound(int num, String userEmail);
}
