package com.dockers.docker.service;

import com.dockers.docker.dto.ExpStatusCheckDTO;
import com.dockers.docker.dto.ExperimentAdminDTO;
import com.dockers.docker.entity.Experiment;
import com.dockers.docker.param.ExperimentCloseParam;
import com.dockers.docker.param.ExperimentOpenParam;
import com.dockers.docker.vo.*;
import lombok.NonNull;

import java.io.IOException;
import java.util.List;

/**
 * @author zgx
 */
public interface ExperimentService {
    /**
     * 查询全部实验
     *
     * @param pageNum  页号
     * @param pageSize 页大小
     * @param classId  班级id
     * @return 实验列表
     */
    ExperimentDetailVO queryAllExperiment(int pageNum, int pageSize, Long classId);

    /**
     * 管理端查询所有可用实验资源
     *
     * @param classId 班级id
     * @return 实验列表
     */
    ShowAddExperimentVO queryAll(Long classId);

    /**
     * 更新当前实验的入口状态
     *
     * @param id      实验id
     * @param status  实验状态
     * @param classId 班级id
     * @return 更新结果
     */
    boolean updateStatus(int id, Long classId, int status);

    /**
     * 管理端查询所有实验
     *
     * @param adminId 管理员编号
     * @param classId 班级编号
     * @return 实验列表
     */
    @NonNull
    List<ExperimentAdminDTO> queryAdminExperiment(Integer adminId, Long classId);

    /**
     * 管理端查询开启实验数量
     */
    ConcurDockerNumVO queryExperimentNum();

    /**
     * 删除实验
     *
     * @param classId      班级id
     * @param experimentId 实验id
     * @return 是否成功
     */
    boolean deleteExperiment(@NonNull Long classId, @NonNull int experimentId);

    /**
     * 添加实验
     *
     * @param experiment 实验对象
     * @return 是否成功
     * @throws InterruptedException 中断异常
     * @throws IOException client关闭异常
     */
    void insertExperiment(Experiment experiment) throws InterruptedException, IOException;

    /**
     * 查看所有的实验
     *
     * @return 实验列表
     */
    List<ExperimentForAdminVO> listAll();

    /**
     * 修改实验的字段
     *
     * @param experimentForAdminVO 实验
     * @return 成功与否
     */
    boolean updateExperiment(ExperimentForAdminVO experimentForAdminVO);

    ExperimentEnterVO experimentEnter(int experimentId, int userId);

    Long experimentOpen(ExperimentOpenParam experimentOpenParam, String ip);

    ExperimentStartVO expStart(int experimentId, int userId) throws IOException;

    boolean expClose(ExperimentCloseParam param);

    /**
     * 检查是否已有实验开启
     *
     * @param userId 用户id
     * @return 开启的实验id
     */
    ExpStatusCheckDTO checkExperimentStatus(Integer userId);
}
