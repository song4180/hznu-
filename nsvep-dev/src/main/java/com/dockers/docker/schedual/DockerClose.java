package com.dockers.docker.schedual;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.dockers.docker.dao.ExperimentRecordMapper;
import com.dockers.docker.entity.ExperimentRecord;
import com.dockers.docker.utils.DockerClientUtil;
import com.github.dockerjava.api.DockerClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 定时关闭未关闭容器
 *
 * @author zxy
 */
@Component
@Slf4j
public class DockerClose {
    @Resource(name = "experimentRecord")
    private ExperimentRecordMapper experimentRecordMapper;
    @Autowired
    private DockerClientUtil dockerClientUtil;

    /**
     * 每天4点检查容器是否关闭
     */
    @Scheduled(cron = "0 00 04 ? * *")
    public void dockerClose() {
        QueryWrapper<ExperimentRecord> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("record_id", "container_id").eq("is_closed", 0).eq("is_removed", 0);
        List<ExperimentRecord> experimentRecords = experimentRecordMapper.selectList(queryWrapper);

        CopyOnWriteArrayList<ExperimentRecord> copyOnWriteArrayList = new CopyOnWriteArrayList<>(experimentRecords);
        //手动创建线程池，最小线程池为4线程，最大为20线程，生存时间为10秒，线程池使用的缓冲队列ArrayBlockingQueue,创建线程使用的工厂{@link MyThread},拒绝策略为默认（拒绝提交事务）
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(4, 20, 10, TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(2), new NameTreadFactory(), (r, executor) -> doLog(r.toString()));
        //预初始化线程
        threadPoolExecutor.prestartCoreThread();
        while (!copyOnWriteArrayList.isEmpty()) {
            DockerTask dockerTask = new DockerTask(copyOnWriteArrayList.remove(0).getContainerId(), dockerClientUtil);
            threadPoolExecutor.execute(dockerTask);
        }
        UpdateWrapper<ExperimentRecord> updateWrapper = new UpdateWrapper<>();
        experimentRecords.forEach(e -> {
            updateWrapper.set("is_closed", 1).set("is_removed", 1).eq("is_closed", 0).eq("is_removed", 0).eq("record_id", e.getRecordId());
            experimentRecordMapper.update(null, updateWrapper);
            updateWrapper.clear();
        });


    }

    static class NameTreadFactory implements ThreadFactory {

        private final AtomicInteger mThreadNum = new AtomicInteger(1);

        @Override
        public Thread newThread(Runnable r) {
            return new Thread(r, "my-thread-" + mThreadNum.getAndIncrement());
        }
    }

    private static void doLog(String s) {
        log.error("{} is rejected", s);
    }

    static class DockerTask implements Runnable {
        private final String container_id;
        private final DockerClientUtil dockerClientUtil;
        private final DockerClient dockerClient = DockerClientUtil.connectDocker();

        public DockerTask(String s, DockerClientUtil dockerClientUtil) {
            this.container_id = s;
            this.dockerClientUtil = dockerClientUtil;
        }

        @Override
        public void run() {
            try{
                dockerClientUtil.stopContainer(dockerClient, container_id);
                dockerClientUtil.removeContainer(dockerClient, container_id);
            }catch (RuntimeException r){
                log.warn(" {}号 容器关闭或删除异常",container_id);
            }
        }
    }
}
