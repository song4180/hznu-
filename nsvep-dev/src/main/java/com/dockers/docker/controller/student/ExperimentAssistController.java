package com.dockers.docker.controller.student;

import com.dockers.docker.param.AddAssistRecordParam;
import com.dockers.docker.service.AssistRecordService;
import com.dockers.docker.vo.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 师生协助学生端
 *
 * @author zxy
 */
@RestController
@RequestMapping("/stu")
public class ExperimentAssistController {
    @Resource(name = "assistRecordService")
    private AssistRecordService assistRecordService;

    @PostMapping(value = "/addAssist")
    public Result<?> addAssistRecord(@RequestBody AddAssistRecordParam addAssistRecordParam) {
        boolean b = assistRecordService.insertAssistRecord(addAssistRecordParam.getUserId(), addAssistRecordParam.getExperimentId());
        return b ? Result.success("添加成功") : Result.fail("添加失败");
    }

}
