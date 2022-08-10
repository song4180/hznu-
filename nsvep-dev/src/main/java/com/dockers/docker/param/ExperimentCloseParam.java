package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Data;

/**
 * 实验关闭接口入参
 *
 * @author zgx
 */
@Data
public class ExperimentCloseParam {
    @ParamValidate(name = "实验编号", required = true)
    private Integer experimentId;
    @ParamValidate(name = "用户编号", required = true)
    private Integer userId;
    @ParamValidate(name = "实验容器编号", required = true)
    private String containerId;
}
