package com.dockers.docker.controller.admin;

import com.dockers.docker.service.AdminService;
import com.dockers.docker.vo.AdminManageNumVO;
import com.dockers.docker.vo.AdminManageMemoryVO;
import com.dockers.docker.vo.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**系统性能监控
 * @author zgx
 */
@RestController
@RequestMapping("/admin")
public class AdminManageController {
    @Resource(name = "adminService")
    private AdminService adminService;

    /**
     * 获取内存使用情况接口
     * @return AdminManageMemoryVO 内存使用数据
     */
    @GetMapping("/getMemoryInfo")
    public Result<AdminManageMemoryVO> getMemInfo() {
        return Result.success(adminService.getMemoryInfo());
    }

    /**
     * 获得docker开启数量和网站在线人数接口
     * @return AdminManageNumVO docker开启数量和网站在线人数
     */
    @GetMapping("/getDockerNum")
    public Result<AdminManageNumVO> getDockerNum() {
        return Result.success(new AdminManageNumVO(adminService.getDockerNumInfo(),adminService.onlineCount()));
    }

}


