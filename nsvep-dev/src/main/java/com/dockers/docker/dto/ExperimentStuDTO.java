package com.dockers.docker.dto;

import com.dockers.docker.entity.Experiment;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 传输实验列表
 * @author zxy
 */
@Getter
@Setter
@ToString
public class ExperimentStuDTO extends Experiment {
    private Integer isClosed;
}
