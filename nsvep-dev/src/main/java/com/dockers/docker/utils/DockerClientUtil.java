
package com.dockers.docker.utils;


import com.dockers.docker.param.CreateContainerCmdParam;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.*;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.core.command.PullImageResultCallback;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.io.Closeable;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static com.github.dockerjava.api.model.HostConfig.newHostConfig;


/**
 * docker工具类
 *
 * @author zxy
 */
@Slf4j
@Component
public class DockerClientUtil {
    private static String dockerHost;
    private static String port;
    private static String dockerCertPath;
    private static String apiVersion;
    private static String registryUrl;
    private static String registryUserName;
    private static String registryPassword;
    private static String registryEmail;

    @Value("${docker-hostIP}")
    public void setDockerHostIP(String dockerHost) {
        DockerClientUtil.dockerHost = dockerHost;
    }

    @Value("${docker-port}")
    public void setPort(String port) {
        DockerClientUtil.port = port;
    }

    @Value("${docker-cert-path}")
    public void setDockerCertPath(String dockerCertPath) {
        DockerClientUtil.dockerCertPath = dockerCertPath;
    }

    @Value("${api-version}")
    public void setApiVersion(String apiVersion) {
        DockerClientUtil.apiVersion = apiVersion;
    }

    @Value("${registry-url}")
    public void setRegistryUrl(String registryUrl) {
        DockerClientUtil.registryUrl = registryUrl;
    }

    @Value("${registry-username}")
    public void setRegistryUserName(String registryUserName) {
        DockerClientUtil.registryUserName = registryUserName;
    }

    @Value("${registry-password}")
    public void setRegistryPassword(String registryPassword) {
        DockerClientUtil.registryPassword = registryPassword;
    }

    @Value("${registry-email}")
    public void setRegistryEmail(String registryEmail) {
        DockerClientUtil.registryEmail = registryEmail;
    }

    public String getDockerHost(){
        return dockerHost;
    }

    /**
     * 连接docker服务器(安全认证方式)
     * dockerHost：docker服务器ip地址和端口号
     * dockerCertPath：windows的密钥文件存放地址
     * dockerConfig：同Path，配置地址
     * apiVersion：dockerAPI的版本，通过docker version命令在docker服务器上获取版本号
     *
     * @return DockerClient
     */
    @Autowired
    public static DockerClient connectDocker() {
        DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost("tcp://"+dockerHost+":"+port).withDockerTlsVerify(true)
                .withDockerCertPath(dockerCertPath)
                .withApiVersion(apiVersion)
                .withRegistryUrl(registryUrl)
                .withRegistryUsername(registryUserName)
                .withRegistryPassword(registryPassword)
                .withRegistryEmail(registryEmail)
                .build();
        // 连接
        DockerHttpClient httpClient = new ApacheDockerHttpClient.Builder()
                .dockerHost(config.getDockerHost())
                .sslConfig(config.getSSLConfig())
                .build();
        return DockerClientImpl.getInstance(config, httpClient);
    }

    /**
     * 创建一个容器
     * 使用dorowu必须绑定80端口
     *
     * @param client   docker通信
     * @param cmdParam 创建的约束条件与参数
     * @return 返回的响应
     */
    public CreateContainerResponse createContainers(DockerClient client, CreateContainerCmdParam cmdParam) {
        // 暴露的端口
        ExposedPort tcp50 = ExposedPort.tcp(cmdParam.getDockerPort());
        Ports portBindings = new Ports();
        // 绑定主机指定端口 -> docker服务器5000端口
        portBindings.bind(tcp50, Ports.Binding.bindPort(cmdParam.getHostPortOffset()));
        return client.createContainerCmd(cmdParam.getImageId()).withName(cmdParam.getStudentInfo()).withEnv(cmdParam.getPixel())
                .withExposedPorts(tcp50).withHostConfig(newHostConfig().withPortBindings(portBindings).withMemory(cmdParam.getMemLimited())
                ).exec();
    }

    /**
     * 启动容器
     *
     * @param client      docker连接
     * @param containerId 容器ID
     */
    public void startContainer(DockerClient client, String containerId) {
        client.startContainerCmd(containerId).exec();
//        client.execCreateCmd(containerId).withCmd()
    }

    /**
     * 关闭容器
     *
     * @param client      docker连接
     * @param containerId 容器ID
     */
    public void stopContainer(DockerClient client, String containerId) {
        client.stopContainerCmd(containerId).exec();
    }

    /**
     * 删除容器
     *
     * @param client      docker连接
     * @param containerId 容器Id
     */
    public void removeContainer(DockerClient client, String containerId) {
        client.removeContainerCmd(containerId).exec();
    }

    /**
     * 删除镜像
     *
     * @param client  docker连接
     * @param imageId 容器Id
     */
    public void removeImage(DockerClient client, String imageId) {
        client.removeImageCmd(imageId).exec();
    }

    /**
     * 制作镜像
     *
     * @param client    docker连接
     * @param imageName 镜像名称
     */
    public Image createImage(DockerClient client, String imageName, String tag) throws InterruptedException {
        client.pullImageCmd(imageName).withTag(tag)
                .exec(new PullImageResultCallback()).awaitSuccess();
        return this.getImageId(client,imageName);
    }

    /**
     * 查找镜像id
     * @param dockerClient docker连接
     * @return 镜像
     */
    public Image getImageId(DockerClient dockerClient,String imageName){
        List<Image> exec = dockerClient.listImagesCmd().withImageNameFilter(imageName).exec();
        return ObjectUtils.isEmpty(exec)? null : exec.get(0);
    }

    /**
     * 列举所有容器
     *
     * @param dockerClient docker连接
     * @return 容器列表
     */
    public List<Container> containersInfo(DockerClient dockerClient) {
        return dockerClient.listContainersCmd().withShowAll(true).exec();
    }
}
