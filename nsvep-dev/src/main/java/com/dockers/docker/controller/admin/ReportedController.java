package com.dockers.docker.controller.admin;

import com.dockers.docker.service.ReportedService;
import com.dockers.docker.vo.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author zxy
 */
@RestController("AdminReportedController")
@RequestMapping("/admin/report")
public class ReportedController {
    @Resource(name = "reportedService")
    private ReportedService reportedService;

    /**
     * 分页查询反馈意见
     * @param pageNum 当前页
     * @param pageSize 页大小
     * @return 分页展示的数据
     */
    @GetMapping(value = "/reports")
    public Result<Object> queryReports(int pageNum, int pageSize){
        return Result.success(reportedService.queryAllReported(pageNum,pageSize));
    }
}
