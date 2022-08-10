package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dockers.docker.dao.AssistRecordMapper;
import com.dockers.docker.dto.AssistAdminDTO;
import com.dockers.docker.entity.AssistRecord;
import com.dockers.docker.exception.ServiceException;
import com.dockers.docker.service.AssistRecordService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @author zxy
 */
@Service("assistRecordService")
public class AssistRecordServiceImpl extends ServiceImpl<AssistRecordMapper, AssistRecord> implements AssistRecordService {

    @Resource(name = "assistRecordMapper")
    private AssistRecordMapper assistRecordMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean insertAssistRecord(Integer userId,Integer experimentId) {
        Integer adminId = assistRecordMapper.queryAdminId(userId);
        AssistRecord assistRecord = new AssistRecord();
        assistRecord.setAdminId(adminId);
        assistRecord.setIsAssisted(0);
        assistRecord.setExperimentId(experimentId);
        assistRecord.setUserId(userId);
        int effectNum = assistRecordMapper.insert(assistRecord);
        return effectNum == 1;
    }

    @Override
    public Page<AssistAdminDTO> pageQueryAssist(int pageNum, int pageSize, int adminId) {
        return assistRecordMapper.pageQueryAssist(new Page<>(pageNum,pageSize),adminId);
    }

    @Override
    public String updateAssistStatus(Integer assistId,Integer userId, Integer experimentId,Integer assistStatus) {
        LambdaUpdateWrapper<AssistRecord> lambdaUpdate = Wrappers.lambdaUpdate();
        lambdaUpdate.set(AssistRecord::getIsAssisted,assistStatus)
                .eq(AssistRecord::getAssistId,assistId);
        //更新数据库中协助状态 0未协助 1已协助 2拒绝协助
        int effectNum = assistRecordMapper.update(null,lambdaUpdate);
        if(effectNum != 1) {
            throw new ServiceException("数据库异常");
        }else{
            return assistRecordMapper.queryExperimentPort(userId,experimentId);
        }
    }

}
