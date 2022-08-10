package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dockers.docker.entity.ExperimentClass;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * @author zxy
 */
@Repository("classMapper")
public interface ClassMapper extends BaseMapper<ExperimentClass> {
}
