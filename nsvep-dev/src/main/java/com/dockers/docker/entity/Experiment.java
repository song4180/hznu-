package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.dockers.docker.annotation.ParamValidate;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

/**
 * @author zgx
 */
@Data
@TableName(value = "experiment")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Experiment {
    @TableId
    private Integer experimentId;
    @ParamValidate(name = "实验标题",required = true)
    private String experimentTitle;
    @ParamValidate(name = "实验描述",required = true)
    private String experimentDescribe;
    @ParamValidate(name = "实验任务",required = true)
    private String experimentTask;
    @ParamValidate(name = "实验步骤",required = true)
    private String courseDetail;
    @ParamValidate(name = "镜像资源位置",required = true)
    private String imageId;
    @ParamValidate(name = "镜像描述", required = true)
    private String imageDescribe;
    @ParamValidate(name="镜像名称",required = true)
    private String imageName;
}
