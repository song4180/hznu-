package com.dockers.docker.service;

import com.dockers.docker.vo.AdminClassVO;
import com.dockers.docker.entity.ExperimentClass;
import com.dockers.docker.vo.StateCode;

import java.util.List;

/**
 * @author zxy
 */
public interface ClassService {
    /**
     * 添加班级
     * @param experimentClass 班级对象
     * @return 插入状态
     */
    StateCode insertClass(ExperimentClass experimentClass);

    /**
     * 展示班级列表
     * @param adminId 管理员编号
     * @return 班级信息列表
     */
    List<ExperimentClass> queryAllClass(Integer adminId);

    /**
     * 查询班级
     * @param adminId 管理员编号
     */
    List<AdminClassVO> selectClass(Integer adminId);

    /**
     * 删除班级（结课）
     * @param classId 班级id
     * @param adminId 管理员编号
     * @return 状态码
     */
    StateCode deleteClass(Integer adminId,Long classId);
}
