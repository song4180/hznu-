package com.dockers.docker.controller.admin;

import com.dockers.docker.annotation.Verifys;
import com.dockers.docker.entity.Administer;
import com.dockers.docker.param.AdminLoginParam;
import com.dockers.docker.service.AdminService;
import com.dockers.docker.vo.AdminLoginVO;
import com.dockers.docker.vo.Result;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 管理员登录功能
 *
 * @author zgx
 */
@RestController
@RequestMapping("/admin")
public class AdminLoginController {
    @Resource(name = "adminService")
    private AdminService adminService;

    /**
     * 登录接口
     *
     * @param admin 将传入参数封装成Administer类
     * @return 登录结果
     */
    @PostMapping("/login")
    @Verifys
    public Result<Object> login(@RequestBody AdminLoginParam admin) throws Exception {
        AdminLoginVO adminLoginVO = adminService.checkLogin(admin);
        return Result.success(adminLoginVO);
    }

    /**
     * 添加管理员
     *
     * @param administer 管理员信息
     * @return 添加成功与否
     */
    @PostMapping("/add")
    @Verifys
    public Result<Object> addAdmin(@RequestBody Administer administer) {
        return adminService.addAdmin(administer) == 1 ? Result.success("添加成功") : Result.fail("添加失败，用户工号已存在！");
    }
}
