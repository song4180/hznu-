package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * @author zxy
 */
@Getter
@Setter
@ToString
public class AddExperimentParam {
    @ParamValidate(name = "实验编号列表", required = true)
    private List<Integer> ids;
    @ParamValidate(name = "班级编号", required = true)
    private Long classId;
}
