package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 用户拥有实验表
 * @author zxy
 */
@Setter
@Getter
@TableName(value = "class_experiment")
@ToString
public class ClassExperiment {
    private Long classId;
    private Integer experimentId;
    private Integer isClosed;

    public ClassExperiment(Long classId, Integer experimentId, Integer isClosed) {
        this.classId = classId;
        this.experimentId = experimentId;
        this.isClosed = isClosed;
    }
}
