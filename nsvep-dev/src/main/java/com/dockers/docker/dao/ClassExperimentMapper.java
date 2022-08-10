package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dockers.docker.entity.ClassExperiment;
import org.springframework.stereotype.Repository;

/**
 * @author zxy
 */
@Repository("classExperimentMapper")
public interface ClassExperimentMapper extends BaseMapper<ClassExperiment> {
}
