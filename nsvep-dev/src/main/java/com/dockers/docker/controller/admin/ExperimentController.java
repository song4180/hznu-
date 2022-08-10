package com.dockers.docker.controller.admin;

import com.dockers.docker.annotation.Verifys;
import com.dockers.docker.dto.ExperimentAdminDTO;
import com.dockers.docker.entity.ClassExperiment;
import com.dockers.docker.entity.Experiment;
import com.dockers.docker.param.AddExperimentParam;
import com.dockers.docker.param.UpdateExperimentStatusParam;
import com.dockers.docker.service.ClassExperimentService;
import com.dockers.docker.service.ExperimentService;
import com.dockers.docker.vo.ExperimentForAdminVO;
import com.dockers.docker.vo.Result;
import com.dockers.docker.vo.ShowAddExperimentVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 管理端实验管理模块
 *
 * @author zgx
 */
@RestController("AdminExperimentController")
@RequestMapping("/admin/experiment")
@Slf4j
public class ExperimentController {
    @Resource(name = "experimentService")
    private ExperimentService experimentService;
    @Resource(name = "classExperimentService")
    private ClassExperimentService classExperimentService;

    /**
     * 开启或关闭实验
     *
     * @param status 当前实验状态
     * @return 实验状态是否改变
     */
    @Verifys
    @RequestMapping(value = "/updatestatus", method = RequestMethod.POST)
    public Result<Object> updateExperiment(@RequestBody UpdateExperimentStatusParam status) {
        boolean b = experimentService.updateStatus(status.getExperimentId(), status.getClassId(), status.getStatus());
        return b ? Result.success() : Result.fail();
    }

    /**
     * 管理端查询所有实验
     *
     * @param adminId 管理员编号
     * @return 实验列表
     */
    @GetMapping(value = "/experiments")
    public Result<Object> adminQueryAll(Integer adminId, Long classId) {
        List<ExperimentAdminDTO> list = experimentService.queryAdminExperiment(adminId, classId);
        return list == null ? Result.fail("暂无数据") : Result.success(list);
    }

    /**
     * 管理端添加时查看所有实验
     *
     * @return list
     */
    @GetMapping(value = "/allexperiments")
    public Result<Object> selectAll(Long classId) {
        ShowAddExperimentVO list = experimentService.queryAll(classId);
        return list == null ? Result.fail("服务器异常") : Result.success(list);
    }

    /**
     * 批量增加实验课程
     *
     * @param addExperimentParam 传参对象，id列表，classId
     * @return result
     */
    @Verifys
    @PostMapping(value = "/batchexperiment")
    public Result<Object> batchInsert(@RequestBody AddExperimentParam addExperimentParam) {
        List<Integer> list = addExperimentParam.getIds();
        List<ClassExperiment> classExperiments;
        //将list中与classExperiment对象中相同的属性抽取出来
        classExperiments = list.stream()
                .map(integer -> new ClassExperiment(addExperimentParam.getClassId(), integer, 1))
                .collect(Collectors.toList());
        boolean b = classExperimentService.saveBatch(classExperiments);
        return b ? Result.success() : Result.fail();
    }

    /**
     * 删除实验课程
     *
     * @param classId      班级id
     * @param experimentId 实验id
     */
    @GetMapping(value = "/delete")
    public Result<Object> deleteExperiment(Long classId,Integer experimentId){
        if(experimentService.deleteExperiment(classId,experimentId)) {
            return Result.success("删除成功");
        }
        return Result.fail();
    }

    /**
     * 制作实验
     *
     * @param experiment 实验资源
     * @return 成功与否
     */
    @PostMapping(value = "/insertexperiment")
    @Verifys
    public Result<Object> insertExperiment(@RequestBody Experiment experiment) {
        try {
            experimentService.insertExperiment(experiment);
            return Result.success("添加实验成功,请等待约两分钟查看生成情况");
        } catch (InterruptedException | IOException e) {
            return Result.fail("镜像添加失败，请联系镜像提供人员!");
        }
    }
    /**
     * 查看所有实验
     * @return 所有实验
     */
    @GetMapping(value = "/getAll")
    public Result<Object> getAll(){
        return Result.success(experimentService.listAll());
    }

    /**
     * 更新实验字段
     * @param experiment 更新的实验
     * @return 成功与否
     */
    @PostMapping(value = "/updateexperiment")
    @Verifys
    public Result<Object> updateExperiment(@RequestBody ExperimentForAdminVO experiment){
        return experimentService.updateExperiment(experiment) ? Result.success("修改成功！") : Result.fail("修改失败！");
    }
}
