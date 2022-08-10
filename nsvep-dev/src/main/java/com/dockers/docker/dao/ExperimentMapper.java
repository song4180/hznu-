package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dto.ExperimentAdminDTO;
import com.dockers.docker.dto.ExperimentStuDTO;
import com.dockers.docker.entity.ClassExperiment;
import com.dockers.docker.entity.Experiment;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author zgx
 */
@Repository(value = "experimentMapper")
public interface ExperimentMapper extends BaseMapper<Experiment> {


    /**
     * 分权限的查询所有实验
     * @param adminId 管理员编号
     * @param classId 班级id
     * @return 管理端实验权限列表
     */
    @NotNull
    List<ExperimentAdminDTO> queryAll(Integer adminId,Long classId);

    /**
     * 根据实验id和班级id查询实验
     * @param id 实验id
     * @param classId 班级id
     * @return 单个实验状态对象
     */
    ClassExperiment queryById(int id,Long classId);

    /**
     * 更新实验入口
     * @param experimentId 实验id
     * @param isClose 实验状态
     * @param classId 课程班级
     * @return 是否成功
     */
    int updateStateById(Integer experimentId,Integer isClose,Long classId);

    /**
     * 分页的跨表查询各个班级所开的课程
     * @param page 分页对象
     * @param classId 班级id
     * @return 分页的实验对象
     */
    Page<ExperimentStuDTO> queryPageVO(Page<ExperimentStuDTO> page,Long classId);
}