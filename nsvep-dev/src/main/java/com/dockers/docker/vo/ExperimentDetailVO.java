package com.dockers.docker.vo;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dto.ExperimentStuDTO;
import com.dockers.docker.entity.Experiment;
import lombok.Data;

/**
 * 实验详细
 * @author zgx
 */
@Data
public class ExperimentDetailVO {
    Page<ExperimentStuDTO> experimentsData;
}
