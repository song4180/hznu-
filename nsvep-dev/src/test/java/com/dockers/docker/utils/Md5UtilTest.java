package com.dockers.docker.utils;

import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
class Md5UtilTest {
    @Autowired
     private Md5Util md5Util;
    @Ignore
    void md5() {
        String str = md5Util.md5("123456");
        System.out.println(str);
    }
}