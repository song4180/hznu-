package com.dockers.docker.service.impl;

import com.dockers.docker.service.ClassService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ClassServiceImplTest {
    @Autowired
    private ClassService classService;
//    @Test
//    void insertClass() {
//    }
//
//    @Test
//    void queryAllClass() {
//    }

    @Test
    void queryClasses() {
        classService.selectClass(2).forEach(System.out::println);
    }
}