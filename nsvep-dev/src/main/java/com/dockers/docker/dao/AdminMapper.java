package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dockers.docker.entity.Administer;
import org.springframework.stereotype.Repository;

/**
 * 管理员
 *
 * @author zxy
 */
@Repository("adminMapper")
public interface AdminMapper extends BaseMapper<Administer> {
}
