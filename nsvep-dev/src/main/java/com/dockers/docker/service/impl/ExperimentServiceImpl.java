package com.dockers.docker.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dao.ClassExperimentMapper;
import com.dockers.docker.dao.ExperimentMapper;
import com.dockers.docker.dao.ExperimentRecordMapper;
import com.dockers.docker.dao.UserMapper;
import com.dockers.docker.dto.ExpStatusCheckDTO;
import com.dockers.docker.dto.ExperimentAdminDTO;
import com.dockers.docker.dto.ExperimentStuDTO;
import com.dockers.docker.dto.ShowExperimentDTO;
import com.dockers.docker.entity.ClassExperiment;
import com.dockers.docker.entity.Experiment;
import com.dockers.docker.entity.ExperimentRecord;
import com.dockers.docker.entity.User;
import com.dockers.docker.exception.BadRequestException;
import com.dockers.docker.exception.ServiceException;
import com.dockers.docker.param.CreateContainerCmdParam;
import com.dockers.docker.param.ExperimentCloseParam;
import com.dockers.docker.param.ExperimentOpenParam;
import com.dockers.docker.service.ExperimentService;
import com.dockers.docker.utils.DockerClientUtil;
import com.dockers.docker.vo.*;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.Image;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.io.IOException;
import java.net.ServerSocket;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;


/**
 * 实验管理
 *
 * @author zgx
 */
@Slf4j
@Service("experimentService")
public class ExperimentServiceImpl implements ExperimentService {
    @Resource(name = "experimentMapper")
    private ExperimentMapper experimentMapper;
    @Resource(name = "classExperimentMapper")
    private ClassExperimentMapper classExperimentMapper;
    @Resource(name = "experimentRecord")
    private ExperimentRecordMapper recordMapper;
    @Resource(name = "userMapper")
    private UserMapper userMapper;

    @Autowired
    private DockerClientUtil dockerClientUtil;

    /**
     * 查询所有的实验展示需要的数据
     *
     * @param pageNum  当前是第几页
     * @param pageSize 每页放几条数据
     * @return 将查询的数据和分页相关的数据封装在experimentDetailVO中，返回experimentDetailVO
     */
    @Override
    public ExperimentDetailVO queryAllExperiment(int pageNum, int pageSize, Long classId) {
        Page<ExperimentStuDTO> page = new Page<>(pageNum, pageSize);
        Page<ExperimentStuDTO> experiments = experimentMapper.queryPageVO(page, classId);
        ExperimentDetailVO experimentDetailVO = new ExperimentDetailVO();
        experimentDetailVO.setExperimentsData(experiments);
        return experimentDetailVO;
    }

    /**
     * 学生端查询所有实验
     *
     * @return 返回实验列表
     */
    @Override
    public ShowAddExperimentVO queryAll(Long classId) {
        Assert.notNull(classId, "空数据！");

        QueryWrapper<Experiment> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("experiment_title", "experiment_id");
        List<Experiment> list = experimentMapper.selectList(queryWrapper);

        Map<String, Object> map = new HashMap<>(2);
        map.put("class_id", classId);
        List<ClassExperiment> list1 = classExperimentMapper.selectByMap(map);

        List<ShowExperimentDTO> showExperiments = list.stream()
                .map(item -> new ShowExperimentDTO(item.getExperimentId(), item.getExperimentTitle()))
                .collect(Collectors.toList());
        List<Integer> integers = list1.stream().distinct().map(ClassExperiment::getExperimentId).collect(Collectors.toList());
        ShowAddExperimentVO showAddExperimentVO = new ShowAddExperimentVO();
        showAddExperimentVO.setExperimentDTOS(showExperiments);
        showAddExperimentVO.setIsSelected(integers);
        return showAddExperimentVO;
    }


    /**
     * 更新实验的状态，将开启的实验关闭，将关闭的实验开启
     *
     * @param id     实验id
     * @param status 当前实验状态
     * @return 是否更新成功
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateStatus(int id, Long classId, int status) {
        ClassExperiment experiment = experimentMapper.queryById(id, classId);
        if (status != experiment.getIsClosed()) {
            experiment.setIsClosed(status > 0 ? 1 : 0);
        } else {
            throw new ServiceException("服务器数据不同步");
        }
        return experimentMapper.updateStateById(experiment.getExperimentId(),
                experiment.getIsClosed(), experiment.getClassId()) > 0;
    }


    /**
     * 分权限的查询所有实验
     *
     * @param adminId 管理员编号
     * @param classId 班级编号
     * @return 管理端实验权限列表
     */
    @Override
    public List<ExperimentAdminDTO> queryAdminExperiment(Integer adminId, Long classId) {
        return experimentMapper.queryAll(adminId, classId);
    }

    /**
     * 查询当前docker开启数量
     * @return ConcurDockerNumVO
     */
    @Override
    public ConcurDockerNumVO queryExperimentNum() {
        QueryWrapper<ExperimentRecord> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("record_id");
        queryWrapper.eq("is_closed",0);
        return new ConcurDockerNumVO(recordMapper.selectCount(queryWrapper));
    }

    @Override
    public boolean deleteExperiment(Long classId, int experimentId) {
        Map<String, Object> map = new HashMap<>(2);
        map.put("class_Id", classId);
        map.put("experiment_id", experimentId);
        if (queryClassExperiment(map)) {
            throw new BadRequestException("当前实验不存在");
        }
        return classExperimentMapper.deleteByMap(map) > 0;
    }

    @Transactional(
            rollbackFor = Exception.class
    )
    @Async
    @Override
    public void insertExperiment(Experiment experiment) throws InterruptedException, IOException {
        DockerClient dockerClient = DockerClientUtil.connectDocker();

        Image image = dockerClientUtil.createImage(dockerClient, experiment.getImageId(), experiment.getImageName());

        if (!ObjectUtils.isEmpty(image)) {
            experiment.setImageId(image.getId().substring(7, 19));
            experimentMapper.insert(experiment);
        }
        dockerClient.close();
    }

    @Override
    public List<ExperimentForAdminVO> listAll() {
        LambdaQueryWrapper<Experiment> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.select(Experiment::getExperimentId, Experiment::getExperimentTitle, Experiment::getExperimentDescribe, Experiment::getExperimentTask
                , Experiment::getImageDescribe, Experiment::getImageId, Experiment::getImageName);
        List<Experiment> experimentList = experimentMapper.selectList(queryWrapper);
        return experimentList.stream()
                .map(experiment -> new ExperimentForAdminVO(experiment.getExperimentId(), experiment.getExperimentTitle(),
                        experiment.getExperimentDescribe(), experiment.getExperimentTask(), experiment.getImageId(),
                        experiment.getImageDescribe(), experiment.getImageName())).collect(Collectors.toList());
    }

    @Override
    public boolean updateExperiment(ExperimentForAdminVO experimentForAdminVO) {
        UpdateWrapper<Experiment> updateWrapper = new UpdateWrapper<>();
        updateWrapper.set("experiment_title", experimentForAdminVO.getExperimentTitle())
                .set("experiment_describe", experimentForAdminVO.getExperimentDescribe())
                .set("experiment_task", experimentForAdminVO.getExperimentTask())
                .set("image_name", experimentForAdminVO.getImageName())
                .set("image_describe", experimentForAdminVO.getExperimentDescribe())
                .eq("experiment_id", experimentForAdminVO.getExperimentId());
        return experimentMapper.update(null, updateWrapper) == 1;
    }

    /**
     * 进入实验方法
     * 根据实验id查询实验
     * 将实验标题 实验描述 实验任务 填入ExperimentEnterVO中
     * 根据实验id和用户id查询ExperimentRecord,将实验容器是否关闭信息填入ExperimentEnterVO中
     * @param userId 用户id
     * @return 返回ExperimentEnterVO
     */
    @Override
    public ExpStatusCheckDTO checkExperimentStatus(Integer userId) {
        QueryWrapper<ExperimentRecord> recordQueryWrapper = new QueryWrapper<>();
        recordQueryWrapper.select("experiment_id","container_id").eq("is_closed",0).eq("user_id",userId);
        ExperimentRecord record = recordMapper.selectOne(recordQueryWrapper);
        return  record == null ? null : new ExpStatusCheckDTO(record.getExperimentId(),record.getContainerId());
    }

    @Override
    public ExperimentEnterVO experimentEnter(int experimentId, int userId) {
        ExperimentEnterVO experimentEnterVO = queryExperiment(experimentId);
        ExperimentRecord expRecord = selectExpRecord(experimentId, userId);
        if (expRecord == null) {
            expRecord = new ExperimentRecord();
            expRecord.setIsClosed(1);
        }
        experimentEnterVO.setIsClosed(expRecord.getIsClosed());
        return experimentEnterVO;
    }

    /**
     * 开始实验方法
     * 根据实验id和用户id查询ExperimentRecord,如果record为空,则创建新的实验记录,
     * 实验结束时间为当前时间之后2小时
     * 若用户已经存在实验记录,则返回实验结束时间
     * @param expOpenParam 实验开始参数
     * @param ip 用户ip地址
     * @return 实验结束时间
     */
    @Override
    public Long experimentOpen(ExperimentOpenParam expOpenParam, String ip) {
        Assert.notNull(expOpenParam, "实验开启参数不能为空");

        int expId = expOpenParam.getExperimentId();
        int userId = expOpenParam.getUserId();
        Date startTime;
        long endTime;
        ExperimentRecord expRecord = selectExpRecord(expId, userId);
        if (expRecord == null) {
            ExperimentRecord record = new ExperimentRecord();
            record.setUserId(userId);
            record.setExperimentId(expId);
            Experiment exp = experimentMapper.selectById(expId);
            String imageName = exp.getImageName();
            String imageId = exp.getImageId();
            String stuNum = userMapper.selectOne(new QueryWrapper<User>().select("user_student_number").eq("user_id", userId)).getUserStudentNumber();
            String containerName = stuNum + "_" + imageName;
            try{
                ServerSocket socket = new ServerSocket(0);
                int port = socket.getLocalPort();
                socket.close();
                DockerClient dockerClient = DockerClientUtil.connectDocker();
                CreateContainerResponse containers = dockerClientUtil.createContainers(dockerClient, new CreateContainerCmdParam(imageId,
                        80, port, containerName, 1073741824L, expOpenParam.getPixel()));
                record.setContainerId(containers.getId().substring(0, 12));
                record.setContainerName(containerName);
                record.setOccupyPort(dockerClientUtil.getDockerHost() + ":" + port);
                record.setRecordIp(ip);
                startTime = new Date();
                endTime = startTime.getTime() + 3600 * 2 * 1000;
                record.setCreateTime(startTime);
                record.setEndTime(new Date(endTime));
                record.setIsClosed(1);
                recordMapper.insert(record);
                dockerClient.close();
                return endTime;
            }catch (IOException e){
                throw new ServiceException("开启容器异常！操作ip为"+ip+"异常为"+e.getMessage());
            }
        }else{
            int status = expRecord.getIsClosed();
            if (status == 0) {
                //继续实验
                endTime = expRecord.getEndTime().getTime();
            } else {
                endTime = expRecord.getEndTime().getTime();
            }
            return endTime;
        }

    }

    /**
     * 启动实验方法
     * 若实验容器已开启,则返回容器id和容器开放端口
     * 否则开启实验容器,返回容器id和容器开放端口
     * @param expId 实验id
     * @param userId 用户id
     * @return ExperimentStartVO
     */
    @Override
    public ExperimentStartVO expStart(int expId, int userId) throws IOException {
        ExperimentRecord expRecord = selectExpRecord(expId, userId);
        if (expRecord == null) {
            throw new BadRequestException("实验容器不存在");
        }
        if(expRecord.getIsClosed()!=0){
            DockerClient dockerClient = DockerClientUtil.connectDocker();
            dockerClientUtil.startContainer(dockerClient, expRecord.getContainerId());
            expRecord.setIsClosed(0);
            recordMapper.updateById(expRecord);
            dockerClient.close();
        }
        ExperimentStartVO expStartVO = new ExperimentStartVO();
        expStartVO.setContainerId(expRecord.getContainerId());
        expStartVO.setOccupyPort(expRecord.getOccupyPort());
        return expStartVO;
    }

    /**
     * 实验关闭方法
     * 关闭实验容器,将数据存入数据库
     * 删除实验容器,将数据存入数据库
     * @param param 实验关闭参数
     * @return 实验是否关闭
     */
    @Override
    public boolean expClose(ExperimentCloseParam param) {
        Assert.notNull(param, "实验关闭参数不能为空");

        int expId = param.getExperimentId();
        int userId = param.getUserId();
        int status;
        String containerId = param.getContainerId();
        ExperimentRecord expRecord = selectExpRecord(expId, userId);
        if (expRecord == null) {
            throw new BadRequestException("实验不存在,删除失败!");
        }
        if(expRecord.getIsClosed()==1){
            throw new BadRequestException("实验尚未开启");
        }
        if (containerId.equals(expRecord.getContainerId())) {
            dockerClientUtil.stopContainer(DockerClientUtil.connectDocker(), containerId);
            expRecord.setIsClosed(1);
            dockerClientUtil.removeContainer(DockerClientUtil.connectDocker(), containerId);
            expRecord.setIsRemoved(1);
            status = recordMapper.updateById(expRecord);
        } else {
            throw new BadRequestException("实验容器id错误");
        }

        return status > 0;
    }


    /**
     * 根据实验id和用户id查询实验记录
     * @param experimentId 实验id
     * @param userId 用户id
     * @return ExperimentRecord
     */
    private ExperimentRecord selectExpRecord(int experimentId, int userId) {
        QueryWrapper<ExperimentRecord> queryWrapper = new QueryWrapper<ExperimentRecord>()
                .eq("experiment_id", experimentId)
                .eq("user_id", userId)
                .eq("is_removed", 0);
        return recordMapper.selectOne(queryWrapper);
    }

    /**
     * 根据实验id,查询实验,将进入实验方法需要返回的参数查询出来
     * @param experimentId 实验id
     * @return ExperimentEnterVO
     */
    private ExperimentEnterVO queryExperiment(int experimentId) {
        QueryWrapper<Experiment> queryWrapper = new QueryWrapper<Experiment>()
                .select("experiment_title", "course_detail", "experiment_task")
                .eq("experiment_id", experimentId);
        Experiment experiment = experimentMapper.selectOne(queryWrapper);
        ExperimentEnterVO experimentEnterVO = new ExperimentEnterVO();
        BeanUtils.copyProperties(experiment, experimentEnterVO);
        return experimentEnterVO;
    }

    private boolean queryClassExperiment(Map<String, Object> map) {
        return CollectionUtils.isEmpty(classExperimentMapper.selectByMap(map));
    }

}
