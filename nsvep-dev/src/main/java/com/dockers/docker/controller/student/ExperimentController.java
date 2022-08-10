package com.dockers.docker.controller.student;

import com.alibaba.fastjson.JSONObject;
import com.dockers.docker.dto.ExpStatusCheckDTO;
import com.dockers.docker.param.ExperimentCloseParam;
import com.dockers.docker.param.ExperimentOpenParam;
import com.dockers.docker.service.ExperimentService;
import com.dockers.docker.utils.IpUtil;
import com.dockers.docker.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 学生端实验查询模块
 *
 * @author zgx
 */
@RestController
@Slf4j
@RequestMapping("/stu/experiment")
public class ExperimentController {

    @Resource(name = "experimentService")
    private ExperimentService experimentService;
    @Autowired
    private HttpServletRequest request;


    /**
     * 学生端查询所有的实验
     *
     * @param pageNum  当前页数
     * @param pageSize 每页几条数据
     * @return 将数据封装在Result类中返回
     */
    @GetMapping(value = "/queryall")
    public Result<ExperimentDetailVO> experiments(@NotNull(message = "当前页数不能为空") @Param("pageNum") int pageNum,
                                                  @NotNull(message = "每页大小不能为空") @Param("pageSize") int pageSize,
                                                  @NotNull(message = "班级id不能为空") @Param("classId") Long classId) {
        return Result.success(experimentService.queryAllExperiment(pageNum, pageSize, classId));
    }

    /**
     * 进入实验接口
     *
     * @param experimentId 实验id
     * @param userId       用户id
     * @return experimentEnterVO 实验相关数据
     */
    @GetMapping("/enter")
    public Result<ExperimentEnterVO> experimentEnter(@Param("experimentId") Integer experimentId, @Param("userId") Integer userId) {
        ExperimentEnterVO experimentEnterVO = experimentService.experimentEnter(experimentId, userId);
        return Result.success(experimentEnterVO);
    }

    /**
     * 实验开启接口
     *
     * @param experimentOpenParam 开启实验相关参数
     * @return ExperimentOpenVO 返回实验结束时间
     */
    @PostMapping(value = "/open")
    public Result<ExperimentOpenVO> experimentOpen(@RequestBody ExperimentOpenParam experimentOpenParam) {
        Long endTime = experimentService.experimentOpen(experimentOpenParam, IpUtil.getIpAddr(request));
        return Result.success(new ExperimentOpenVO(endTime));
    }

    /**
     * 开启实验容器接口
     *
     * @param experimentId 实验id
     * @param userId       用户id
     * @return ExperimentStartVO
     */
    @GetMapping(value = "/start")
    public Result<Object> expStart(@Param("experimentId") Integer experimentId, @Param("userId") Integer userId) {
        try{
            ExperimentStartVO startVO = experimentService.expStart(experimentId, userId);
            return Result.success(startVO);
        }catch (IOException ioException){
            log.error("dockerClient关闭异常: {}",ioException.getMessage());
        }
        return Result.fail("服务器异常");
    }

    /**
     * 实验关闭接口
     *
     * @param param 实验关闭参数
     * @return 是否关闭成功
     */
    @PostMapping(value = "/close")
    public Result<Object> expClose(@RequestBody ExperimentCloseParam param) {
        return experimentService.expClose(param) ? Result.success() : Result.fail();
    }

    /**
     * 进入实验前检查用户是否已有实验开启接口
     *
     * @param jsonObject 带有userId的Json
     * @return ExperimentIdVO
     */
    @PostMapping("/opencheck")
    public Result<ExperimentIdVO> checkExperimentExisted(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInteger("userId");
        ExpStatusCheckDTO experimentInfo = experimentService.checkExperimentStatus(userId);
        return experimentInfo == null?Result.success(new ExperimentIdVO()):Result.success(new ExperimentIdVO(experimentInfo.getExperimentId(), experimentInfo.getContainerId()));
    }
}
