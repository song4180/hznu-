package com.dockers.docker.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.dockers.docker.dto.ReportDTO;
import com.dockers.docker.entity.Reported;
import com.dockers.docker.vo.StateCode;

/**
 * 反馈问题Service
 *
 * @author zxy
 * @date 2020-7-13
 */
public interface ReportedService extends IService<Reported> {
    /**
     * 上传反馈意见
     *
     * @param reported 反馈意见实体
     * @return 是否成功
     */
    StateCode insertReport(Reported reported);

    /**
     * 查看全部反馈意见
     *
     * @param pageNum  当前页
     * @param pageSize 页大小
     * @return 反馈意见列表
     */
    Page<ReportDTO> queryAllReported(int pageNum, int pageSize);
}
