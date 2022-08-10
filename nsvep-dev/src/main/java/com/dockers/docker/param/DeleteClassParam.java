package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 删除班级入参（结课）
 *
 * @author zxy
 */
@Getter
@Setter
@ToString
public class DeleteClassParam {
    /**
     * 管理员编号
     */
    @ParamValidate(name = "管理员编号", required = true)
    private Integer adminId;
    /**
     * 课程编号
     */
    @ParamValidate(name = "班级编号", required = true)
    private Long classId;
}
