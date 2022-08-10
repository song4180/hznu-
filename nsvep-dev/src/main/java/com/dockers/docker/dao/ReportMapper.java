package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dto.ReportDTO;
import com.dockers.docker.entity.Reported;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author zxy
 */
@Repository("reportMapper")
public interface ReportMapper extends BaseMapper<Reported> {
    /**
     * 分页展示用户反馈问题
     * @param page page 翻页对象，可以作为 xml 参数直接使用，传递参数 Page 即自动分页
     * @return 反馈传输层
     */
    List<ReportDTO> listReported(Page<ReportDTO> page);
}
