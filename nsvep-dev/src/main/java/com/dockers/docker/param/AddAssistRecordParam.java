package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Getter;
import lombok.Setter;

/**
 * @author zxy
 */
@Getter
@Setter
public class AddAssistRecordParam {
    @ParamValidate(name = "用户编号")
    private Integer userId;
    @ParamValidate(name = "实验编号")
    private Integer experimentId;
}
