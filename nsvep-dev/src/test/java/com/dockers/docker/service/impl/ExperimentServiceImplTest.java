package com.dockers.docker.service.impl;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ExperimentServiceImplTest {
    @Autowired
    ExperimentServiceImpl experimentService;

//    @Test
//    void updateStatus() {
//        experimentService.updateStatus(2,0);
//    }
//
    @Test
    void queryStatus(){
//        System.out.println(experimentService.queryAdminExperiment(1));
    }
}