package com.dockers.docker.utils;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Image;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(JUnit4.class)
class DockerClientUtilTest {
    @Autowired
    private DockerClientUtil dockerClientUtil;
    @Test
    void getImage(){
        DockerClient dockerClient = DockerClientUtil.connectDocker();
        Image image = dockerClientUtil.getImageId(dockerClient,"starsdocker/lab404");
        System.out.println(image.getId().substring(7,19));
    }
}