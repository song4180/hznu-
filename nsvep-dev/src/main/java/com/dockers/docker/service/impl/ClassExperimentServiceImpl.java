package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dockers.docker.dao.ClassExperimentMapper;
import com.dockers.docker.entity.ClassExperiment;
import com.dockers.docker.service.ClassExperimentService;
import org.springframework.stereotype.Service;

/**
 * @author zxy
 */
@Service("classExperimentService")
public class ClassExperimentServiceImpl extends ServiceImpl<ClassExperimentMapper,ClassExperiment> implements ClassExperimentService {
}
