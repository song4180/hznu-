package com.dockers.docker.dao;

import com.dockers.docker.dto.ExperimentAdminDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;


@SpringBootTest
class ExperimentMapperTest {
    @Autowired
    private ExperimentMapper experimentMapper;
    @Test
    void queryAll() {
        List<ExperimentAdminDTO> list = experimentMapper.queryAll(1,0L);
        list.forEach(System.out::println);
    }
}