package com.dockers.docker.controller.student;

import com.dockers.docker.annotation.Verifys;
import com.dockers.docker.entity.Reported;
import com.dockers.docker.service.ReportedService;
import com.dockers.docker.vo.Result;
import com.dockers.docker.vo.StateCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author zxy
 */
@RestController
@RequestMapping("/stu/report")
public class ReportedController {
    @Resource(name = "reportedService")
    private ReportedService reportedService;

    /**
     * 添加反馈
     * @param reported（反馈标题，反馈内容，反馈图片，用户编号）
     * @return 是否成功
     */
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @Verifys
    public Result<?> addReport(@RequestBody Reported reported){
        StateCode stateCode = reportedService.insertReport(reported);
        if(stateCode.equals(StateCode.SUCCESS)){
            return Result.success("谢谢您的反馈");
        }else{
            return Result.fail();
        }
    }
}
