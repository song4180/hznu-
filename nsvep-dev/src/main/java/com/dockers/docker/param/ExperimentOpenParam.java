package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Data;

/**
 * 开启实验接口入参
 *
 * @author zgx
 */
@Data
public class ExperimentOpenParam {
    @ParamValidate(name = "实验编号", required = true)
    private Integer experimentId;
    @ParamValidate(name = "用户编号", required = true)
    private Integer userId;
    @ParamValidate(name = "屏幕分辨率", required = true)
    private String pixel;
}
