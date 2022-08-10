package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dto.ReportDTO;
import com.dockers.docker.entity.Reported;
import com.dockers.docker.service.ReportedService;
import com.dockers.docker.vo.StateCode;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
class ReportedServiceImplTest {
    @Resource(name = "reportedService")
    private ReportedService reportedService;
    @Test
    void insertReport() {
        Reported reported = new Reported();
        reported.setReportedTitle("bug!");
        reported.setReportedDetail("容器打不开");
        reported.setUserId(11);
        StateCode stateCode = reportedService.insertReport(reported);
        assertEquals(StateCode.SUCCESS,stateCode);
    }
    @Test
    void queryAll(){
        Page<ReportDTO> page = reportedService.queryAllReported(1,2);
        List<ReportDTO> reportDTOS = page.getRecords();
        System.out.println(page);
        reportDTOS.forEach(System.out::println);
    }
}