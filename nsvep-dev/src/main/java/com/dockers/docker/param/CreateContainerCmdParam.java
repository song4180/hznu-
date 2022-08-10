package com.dockers.docker.param;

import lombok.Getter;
import lombok.Setter;

/**
 * 创建容器指令集
 *
 * @author zxy
 */
@Getter
@Setter
public class CreateContainerCmdParam {
    /**
     * 镜像名称
     */
    String imageId;
    /**
     * docker容器暴露的端口
     */
    Integer dockerPort;
    /**
     * 端口的偏移量
     */
    Integer hostPortOffset;
    /**
     * 学生信息，记录容器名称
     */
    String studentInfo;
    /**
     * 内存大小限制
     */
    Long memLimited;

    /**
     * 像素
     */
    String pixel;

    public CreateContainerCmdParam(String imageId, Integer dockerPort, Integer hostPortOffset, String studentInfo, Long memLimited, String pixel) {
        this.imageId = imageId;
        this.dockerPort = dockerPort;
        this.hostPortOffset = hostPortOffset;
        this.studentInfo = studentInfo;
        this.memLimited = memLimited;
        this.pixel = pixel;
    }
}
