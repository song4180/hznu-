package com.dockers.docker.dto;

import com.dockers.docker.entity.Experiment;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 管理员管理实验传输实体
 * @author zxy
 */
@Getter
@Setter
@ToString
public class ExperimentAdminDTO extends Experiment {
    /**
     * 班级名称
     */
    private String className;
    /**
     * 班级id
     */
    private Long classId;
    /**
     * 是否开启
     */
    private Integer isClosed;
}
