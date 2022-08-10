package com.dockers.docker.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.dockers.docker.dto.UserBatchDTO;

import java.util.List;

/**
 * 批量插入用户
 *
 * @author zxy
 */
public interface UserBatchService extends IService<UserBatchDTO> {
    /**
     * 有过滤性的批量插入
     * @param entityList 实体列表
     * @return 插入是否成功
     */
    boolean saveBatchWithOutRepeat(List<UserBatchDTO> entityList);
}
