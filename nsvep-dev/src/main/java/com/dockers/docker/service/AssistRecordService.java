package com.dockers.docker.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.dockers.docker.dto.AssistAdminDTO;
import com.dockers.docker.entity.AssistRecord;

/**
 * 协助记录
 * @author zxy
 */
public interface AssistRecordService extends IService<AssistRecord> {
    /**
     * 添加协助记录
     * @param userId  用户Id
     * @param experimentId 实验编号
     * @return 添加是否成功
     */
    boolean insertAssistRecord(Integer userId,Integer experimentId);

    /**
     * 分页查询协助记录
     * @param pageNum 页号
     * @param pageSize 页面大小
     * @param adminId 管理员编号
     * @return 分页的数据
     */
    Page<AssistAdminDTO> pageQueryAssist(int pageNum,int pageSize,int adminId);

    /**
     * 更新协助状态
     * @param assistId 协助记录Id
     * @param userId 用户Id
     * @param experimentId 实验Id
     * @param assistStatus 协助状态
     * @return 协助端口号
     */
    String updateAssistStatus(Integer assistId,Integer userId,Integer experimentId,Integer assistStatus);
}
