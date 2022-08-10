package com.dockers.docker.controller.admin;

import com.alibaba.excel.EasyExcel;
import com.dockers.docker.dto.UserBatchDTO;
import com.dockers.docker.handler.UserBatchListener;
import com.dockers.docker.param.UserIdParam;
import com.dockers.docker.service.UserBatchService;
import com.dockers.docker.service.UserService;
import com.dockers.docker.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;

/**
 * 管理端用户管理
 * @author zxy
 */
@RestController
@RequestMapping(value = "/admin")
@Slf4j
public class StudentController {
    private final static String OLD_TYPE = "xls";
    private final static String NEW_TYPE = "xlsx";

    @Resource(name = "userService")
    private UserService userService;
    @Resource(name = "userBatchService")
    private UserBatchService userBatchService;

    /**
     * 管理端模糊分页查询用户信息
     *
     * @param pageNum   当前页
     * @param pageSize  页大小
     * @param adminId   管理员id
     * @param className 班级名（周一1，2）
     * @param userName  用户名
     * @return 分页数据
     */
    @GetMapping(value = "/users")
    public Result<?> queryAllUsers(int pageNum, int pageSize,
                                   String adminId, String className,
                                   String userName) {
        return Result.success(userService.queryUsers(pageNum, pageSize, adminId, className, userName));
    }
    /**
     * 上传文件批量注册用户信息
     *
     * @param file    上传的文件
     * @param classId 班级编号
     * @return result
     */
    @PostMapping(value = "/batchusers")
    public Result<?> batchInsert(MultipartFile file, Long classId) {
        if (null == file) {
            return Result.fail("文件为空");
        } else {
            String fileName = file.getOriginalFilename();
            if (StringUtils.isEmpty(fileName)) {
                return Result.fail("请选择文件");
            } else {
                if (!fileName.endsWith(OLD_TYPE) && !fileName.endsWith(NEW_TYPE)) {
                    return Result.fail("上传文件不是Excel");
                } else {
                    try {
                        EasyExcel.read(file.getInputStream(), UserBatchDTO.class, new UserBatchListener(userBatchService).setClassId(classId)).headRowNumber(1).sheet().doRead();
                        return Result.success();
                    } catch (IOException e) {
                        log.error(e.getMessage());
                    }

                }
            }
        }
        return Result.fail("服务器异常");
    }

    /**
     * 通过userId删除用户（软删除）
     *
     * @param userIds 用户ids
     * @return Result 操作是否成功
     */
    @PostMapping(value = "/deletes")
    public Result<?> delete(@RequestBody UserIdParam userIds) {
        int effectNum = userService.deleteUserById(userIds.getUserIds());
        if (effectNum > 0) {
            return Result.success("删除成功！");
        } else {
            return Result.fail();
        }
    }
}
