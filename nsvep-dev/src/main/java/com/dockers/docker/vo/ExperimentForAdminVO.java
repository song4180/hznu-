package com.dockers.docker.vo;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * @author zxy
 */
@Setter
@Getter
@ToString
public class ExperimentForAdminVO {
    @ParamValidate(name = "实验Id",required = true)
    private Integer experimentId;
    @ParamValidate(name = "实验标题",required = true)
    private String experimentTitle;
    @ParamValidate(name = "实验描述",required = true)
    private String experimentDescribe;
    @ParamValidate(name = "实验任务",required = true)
    private String experimentTask;
    @ParamValidate(name = "镜像Id",required = true)
    private String imageId;
    @ParamValidate(name = "镜像描述",required = true)
    private String imageDescribe;
    @ParamValidate(name = "镜像名称",required =true)
    private String imageName;

    public ExperimentForAdminVO() {
    }

    public ExperimentForAdminVO(Integer experimentId, String experimentTitle, String experimentDescribe, String experimentTask, String imageId, String imageDescribe, String imageName) {
        this.experimentId = experimentId;
        this.experimentTitle = experimentTitle;
        this.experimentDescribe = experimentDescribe;
        this.experimentTask = experimentTask;
        this.imageId = imageId;
        this.imageDescribe = imageDescribe;
        this.imageName = imageName;
    }
}
