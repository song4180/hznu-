package com.dockers.docker.utils;

import org.springframework.context.annotation.Configuration;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * md5加密工具类
 * @author zxy
 */
@Configuration
public class Md5Util {
    public String md5(String buffer)//调用的工具类不能是静态资源
    {
        String string = null;
        char[] hexDigits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");
            md.update(buffer.getBytes());
            //16个字节的长整数
            byte[] datas = md.digest();

            char[] str = new char[2 * 16];
            int k = 0;

            for (int i = 0; i < 16; i++) {
                byte b = datas[i];
                //高4位
                str[k++] = hexDigits[b >>> 4 & 0xf];
                //低4位
                str[k++] = hexDigits[b & 0xf];
            }
            string = new String(str);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return string;
    }
}
