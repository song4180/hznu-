package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dto.AssistAdminDTO;
import com.dockers.docker.entity.AssistRecord;
import org.springframework.stereotype.Repository;

/**
 * @author zxy
 */
@Repository("assistRecordMapper")
public interface AssistRecordMapper extends BaseMapper<AssistRecord> {

    /**
     * 通过学号查询对应的管理员
     * @param userId 用户编号
     * @return 管理员编号
     */
    Integer queryAdminId(Integer userId);

    /**
     * 分页查询协助记录
     * @param page 分页信息
     * @param adminId 管理员Id
     * @return 分页的协助信息
     */
    Page<AssistAdminDTO> pageQueryAssist(Page<AssistAdminDTO> page,int adminId);

    /**
     * 获取协助目标的IP:端口号
     * @param userId 用户编号
     * @param experimentId 实验编号
     * @return 占用的端口号
     */
    String queryExperimentPort(Integer userId,Integer experimentId);

}