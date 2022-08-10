package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dockers.docker.dto.ReportDTO;
import com.dockers.docker.dao.ReportMapper;
import com.dockers.docker.entity.Reported;
import com.dockers.docker.service.ReportedService;
import com.dockers.docker.vo.StateCode;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;

/**
 * @author zxy
 */
@Service("reportedService")
public class ReportedServiceImpl extends ServiceImpl<ReportMapper,Reported> implements ReportedService {

    @Resource(name = "reportMapper")
    private ReportMapper reportMapper;

    @Override
    public StateCode insertReport(Reported reported) {
        //标题，内容，用户编号不能为空
        if(StringUtils.isEmpty(reported.getReportedTitle())||
                StringUtils.isEmpty(reported.getReportedDetail())|| ObjectUtils.isEmpty(reported.getUserId())){
            return StateCode.ERROR;
        }else{
            int effectNum = reportMapper.insert(reported);
            if(effectNum>0){
                return StateCode.SUCCESS;
            }else{
                return  StateCode.OTHER;
            }
        }
    }

    @Override
    public Page<ReportDTO> queryAllReported(int pageNum, int pageSize) {
        Page<ReportDTO> page = new Page<>(pageNum,pageSize);
        return page.setRecords(reportMapper.listReported(page));
    }
}
