package com.dockers.docker.dao;

import com.dockers.docker.entity.ClassExperiment;
import com.dockers.docker.entity.ExperimentClass;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
class ClassMapperTest {
    @Resource(name = "classMapper")
    private ClassMapper classMapper;
    @Test
    void insert(){
        ExperimentClass experimentClass = new ExperimentClass();
        experimentClass.setAdminId(1);
        experimentClass.setClassDetail("hahaha");
        experimentClass.setClassName("呼呼呼");
        int insert = classMapper.insert(experimentClass);
        assertEquals(1,insert);
    }
}