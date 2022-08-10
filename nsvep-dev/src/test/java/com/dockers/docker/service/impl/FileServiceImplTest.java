package com.dockers.docker.service.impl;

import com.dockers.docker.param.FileRequestParam;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FileServiceImplTest {
    @Autowired
    FileServiceImpl fileService;

    @Test
    void queryAllFiles() {
//        fileService.PathInsert("123","dfj",1);
        FileRequestParam fileRequestParam = new FileRequestParam();
        fileRequestParam.setId(18);
        fileRequestParam.setFileName("123");
        System.out.println(fileService.deleteFile(fileRequestParam));
    }
    @Test
    void adminQuery(){
        System.out.println(fileService.adminQueryAll());
    }

}