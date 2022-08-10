package com.dockers.docker.controller.admin;

import com.dockers.docker.annotation.Verifys;
import com.dockers.docker.entity.ExperimentClass;
import com.dockers.docker.param.DeleteClassParam;
import com.dockers.docker.service.ClassService;
import com.dockers.docker.vo.AdminClassVO;
import com.dockers.docker.vo.Result;
import com.dockers.docker.vo.StateCode;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 班级管理
 * @author zxy
 */
@RestController
@RequestMapping("/admin")
public class ClassController {
    @Resource(name = "classService")
    private ClassService classService;

    /**
     * 管理端新建班级
     *
     * @param experimentClass 课程班级（className，classDetail，adminId）
     * @return result
     */
    @PostMapping("/class")
    public Result<Object> insertClass(@RequestBody ExperimentClass experimentClass) {
        StateCode stateCode = classService.insertClass(experimentClass);
        if (stateCode.equals(StateCode.NOT_EXIST)) {
            return Result.fail("请先登录！");
        } else if (stateCode.equals(StateCode.SUCCESS)) {
            return Result.success();
        } else if (stateCode.equals(StateCode.IS_EXIST)) {
            return Result.fail("班级已经存在");
        } else {
            return Result.fail("插入失败");
        }
    }

    /**
     * 管理端查询班级
     *
     * @param adminId 管理员编号
     * @return result
     */
    @GetMapping("/classes")
    public Result<Object> queryClasses(Integer adminId) {
        List<ExperimentClass> experimentClasses = classService.queryAllClass(adminId);
        return Result.success(experimentClasses);
    }

    /**
     * 删除班级
     *
     * @param deleteClassParam 删除班级入参
     * @return result
     */
    @Verifys
    @PostMapping("/deleteclass")
    public Result<Object> deleteClass(@RequestBody DeleteClassParam deleteClassParam) {
        StateCode stateCode = classService.deleteClass(deleteClassParam.getAdminId(), deleteClassParam.getClassId());
        if (stateCode.equals(StateCode.SUCCESS)) {
            return Result.success();
        } else if (stateCode.equals(StateCode.NOT_EXIST)) {
            return Result.fail("请先登录！");
        } else {
            return Result.fail("服务器异常！");
        }
    }


    /**
     * 管理端在管理实验前选择要管理的班级
     *
     * @param adminId 管理员id
     * @return 每个班级对应的实验列表
     */
    @GetMapping("/select")
    public Result<Object> selectClass(Integer adminId) {
        List<AdminClassVO> adminClassVOList = classService.selectClass(adminId);
        return Result.success(adminClassVOList);
    }
}
