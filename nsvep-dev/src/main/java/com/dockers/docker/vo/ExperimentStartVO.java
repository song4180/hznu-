package com.dockers.docker.vo;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Data;

@Data
public class ExperimentStartVO {
    @ParamValidate(name = "容器Id",required = true)
    private String containerId;
    @ParamValidate(name = "开放端口",required = true)
    private String occupyPort;
}
