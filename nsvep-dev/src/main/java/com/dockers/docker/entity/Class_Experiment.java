package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author zxy
 */
@Data
@TableName(value = "class_experiment")
public class Class_Experiment {
    /**
     * 班级id
     */
    private Long classId;

    /**
     * 实验id
     */
    private Integer experimentId;

    /**
     * 实验关闭标志
     */
    private Integer isClosed;
}
