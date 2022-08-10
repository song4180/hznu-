package com.dockers.docker.service;

import java.io.IOException;

/**
 * @author zxy
 */
public interface DockerService {
    /**
     * 拉取镜像
     * @return 是否成功
     * @throws InterruptedException 中断异常
     */
    boolean pullImages() throws InterruptedException, IOException;

    /**
     * 罗列镜像
     */
    void listImages() throws IOException;

}
