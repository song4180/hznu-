package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dockers.docker.entity.ExperimentRecord;
import org.springframework.stereotype.Repository;

/**
 * @author zxy
 */
@Repository("experimentRecord")
public interface ExperimentRecordMapper extends BaseMapper<ExperimentRecord> {
}
