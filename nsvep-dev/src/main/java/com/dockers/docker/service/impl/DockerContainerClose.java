package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.dockers.docker.dao.ExperimentRecordMapper;
import com.dockers.docker.entity.ExperimentRecord;
import com.dockers.docker.utils.DockerClientUtil;
import com.github.dockerjava.api.DockerClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

/**
 * @author zxy
 */
@Component
public class DockerContainerClose {
    @Resource(name = "experimentRecord")
    private ExperimentRecordMapper recordMapper;
    @Autowired
    private DockerClientUtil dockerClientUtil;

    /**
     * 每天12点检查容器状态
     */
    @Scheduled(cron = "0 00 14 ? * *")
    public void scheduledClose() throws IOException {
        LambdaQueryWrapper<ExperimentRecord> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.select(ExperimentRecord::getContainerId).eq(ExperimentRecord::getIsClosed,0).eq(ExperimentRecord::getIsRemoved,0);

        List<ExperimentRecord> experimentRecords = recordMapper.selectList(queryWrapper);
        DockerClient dockerClient = DockerClientUtil.connectDocker();
        experimentRecords.forEach(experimentRecord -> {
            dockerClientUtil.stopContainer(dockerClient,experimentRecord.getContainerId());
        });
        dockerClient.close();
    }
}
