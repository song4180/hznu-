package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.dockers.docker.dao.AdminMapper;
import com.dockers.docker.entity.Administer;
import com.dockers.docker.exception.LoginException;
import com.dockers.docker.exception.ServiceException;
import com.dockers.docker.param.AdminLoginParam;
import com.dockers.docker.service.AdminService;
import com.dockers.docker.service.ExperimentService;
import com.dockers.docker.utils.RSA;
import com.dockers.docker.utils.RedisUtil;
import com.dockers.docker.vo.*;
import com.sun.management.OperatingSystemMXBean;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.lang.management.ManagementFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 有管理员登录校验功能
 */
@Service("adminService")
@Slf4j
public class AdminServiceImpl implements AdminService {
    @Resource(name = "adminMapper")
    private AdminMapper adminMapper;
    @Resource(name = "experimentService")
    private ExperimentService experimentService;
    @Autowired
    private RedisUtil redisUtil;

    /**
     * 管理员登录校验
     *
     * @param administer 登录信息
     * @return 返回登录结果
     * @throws Exception 管理员登录异常
     */
    @Override
    public AdminLoginVO checkLogin(AdminLoginParam administer) throws Exception {
        Assert.notNull(administer, "账号或密码不能为空");
        String password = administer.getAdminPassword();
        QueryWrapper<Administer> wrapper = new QueryWrapper<>();
        wrapper.eq("admin_account", administer.getAdminAccount());
        Administer admin = adminMapper.selectOne(wrapper);
        if (admin != null) {
            String pass = admin.getAdminPassword();
            pass = RSA.testDecrypt(RSA.publicKey, pass);
            if (password.equals(pass)) {
                AdminLoginVO adminLoginVO = new AdminLoginVO();
                BeanUtils.copyProperties(admin, adminLoginVO);
                return adminLoginVO;
            } else {
                //账号或密码错误异常
                throw new LoginException("账号或密码错误");
            }
        }
        throw new LoginException("账号或密码错误");
    }

    @Override
    public int addAdmin(Administer administer) {
        try {
            administer.setAdminPassword(RSA.testEncrypt(RSA.privateKey, administer.getAdminPassword()));
        } catch (Exception e) {
            throw new ServiceException("服务器异常");
        }
        Map<String,Object> adminMap = new HashMap<>(1);
        adminMap.put("admin_account",administer.getAdminAccount());
        List<Administer> administers = adminMapper.selectByMap(adminMap);
        return administers == null ?  adminMapper.insert(administer) : 0;
    }

    @Override
    public AdminManageMemoryVO getMemoryInfo() {
        OperatingSystemMXBean mem = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
        AdminManageMemoryVO adminManageMemoryVO = new AdminManageMemoryVO();
        adminManageMemoryVO.setTotalRAM(mem.getTotalPhysicalMemorySize() / 1024 / 1024);
        adminManageMemoryVO.setAvailableRAM(mem.getFreePhysicalMemorySize() / 1024 / 1024);
        return adminManageMemoryVO;
    }

    @Override
    public ConcurDockerNumVO getDockerNumInfo() {
        return experimentService.queryExperimentNum();
    }


    /**
     * 在线人数统计
     * @return
     */
    @Override
    public ConcurrentUsersNumVO onlineCount(){
        int concurrentUserNum=redisUtil.getAllKeys().size();
        return new ConcurrentUsersNumVO(concurrentUserNum);
    }

}
