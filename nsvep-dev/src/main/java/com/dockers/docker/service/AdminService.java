package com.dockers.docker.service;

import com.dockers.docker.entity.Administer;
import com.dockers.docker.param.AdminLoginParam;
import com.dockers.docker.vo.AdminLoginVO;
import com.dockers.docker.vo.AdminManageMemoryVO;
import com.dockers.docker.vo.ConcurDockerNumVO;
import com.dockers.docker.vo.ConcurrentUsersNumVO;

/**
 * @author zgx
 */
public interface AdminService {
    /**
     * 登录检查
     *
     * @param admin
     * @return AdminLoginVO 登录信息
     * @throws Exception
     */
    AdminLoginVO checkLogin(AdminLoginParam admin) throws Exception;

    /**
     * 添加管理员
     */
    int addAdmin(Administer administer);

    /**
     * 内存管理
     *
     * @return AdminManageMemoryVO 内存信息
     */
    AdminManageMemoryVO getMemoryInfo();

    /**
     * 获取docker容器开启数量
     *
     * @return ConcurDockerNumVO
     */
    ConcurDockerNumVO getDockerNumInfo();

    /**
     * 在线人数统计
     *
     * @return ConcurrentUsersNumVO
     */
    ConcurrentUsersNumVO onlineCount();
}
