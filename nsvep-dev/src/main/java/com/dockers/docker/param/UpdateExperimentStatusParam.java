package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 更新实验时入参
 *
 * @author zxy
 */
@Setter
@Getter
@ToString
public class UpdateExperimentStatusParam {
    @ParamValidate(name = "实验编号", required = true)
    private Integer experimentId;
    @ParamValidate(name = "班级编号", required = true)
    private Long classId;
    @ParamValidate(name = "入口状态", required = true)
    private Integer status;
}
