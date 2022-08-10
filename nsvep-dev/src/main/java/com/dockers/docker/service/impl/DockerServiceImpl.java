package com.dockers.docker.service.impl;

import com.dockers.docker.service.DockerService;
import com.dockers.docker.utils.DockerClientUtil;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.PullImageResultCallback;
import com.github.dockerjava.api.model.Image;
import com.github.dockerjava.api.model.PullResponseItem;
import org.springframework.stereotype.Service;

import java.io.Closeable;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author zxy
 */
@Service("dockerService")
public class DockerServiceImpl implements DockerService {
    @Override
    public boolean pullImages() throws InterruptedException, IOException {
        DockerClient dockerClient = DockerClientUtil.connectDocker();
        dockerClient.pullImageCmd("tomcat")
                .withTag("latest")
                .exec(new PullImageResultCallback() {
                    @Override
                    public void onStart(Closeable closeable) {
                        System.out.println("开始下载!");
                    }
                    @Override
                    public void onNext(PullResponseItem object) {
                        // 实时显示出下载信息
                    }
                    @Override
                    public void onError(Throwable throwable) {
                        throwable.printStackTrace();
                    }
                    @Override
                    public void onComplete() {
                        System.out.println("下载完毕!");
                    }
                    @Override
                    public void close() {

                    }
                })
                .awaitCompletion(180, TimeUnit.SECONDS);
        dockerClient.close();
        return false;
    }

    @Override
    public void listImages() throws IOException {
        DockerClient dockerClient = DockerClientUtil.connectDocker();
        // 获取服务器上的镜像
        List<Image> images = dockerClient.listImagesCmd().exec();
        for (Image image : images) {
            System.out.println(image.getRepoTags()[0]);
        }
        dockerClient.close();
    }
}
