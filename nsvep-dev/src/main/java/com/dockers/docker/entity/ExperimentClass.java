package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.dockers.docker.annotation.ParamValidate;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author zxy
 */
@TableName(value = "class")
@Getter
@Setter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExperimentClass {
    /**
     * 班级id
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long classId;
    /**
     * 班级名称
     */
    private String className;
    /**
     * 班级描述
     */
    private String classDetail;
    /**
     * 所属教师
     */
    private Integer adminId;
    /**
     * 是否结课
     */
    @TableLogic
    @TableField(fill = FieldFill.INSERT)
    private Integer isEnd;
}
