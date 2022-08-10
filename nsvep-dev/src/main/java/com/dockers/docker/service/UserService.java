package com.dockers.docker.service;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.dockers.docker.dto.UserDTO;
import com.dockers.docker.entity.User;
import com.dockers.docker.vo.LoginDataVO;
import com.dockers.docker.vo.RequestUpdatePassVO;
import com.dockers.docker.vo.StateCode;

import java.util.ArrayList;

/**
 * @author zxy
 * @date 2020-7-9
 */
public interface UserService extends IService<User> {
    /**
     * 添加用户的详细信息
     *
     * @param user 添加用户
     * @return StateCode(SUCCESS, ERROR, DEFAULT, EXIST, DEFAULT)
     * @throws Exception 加密异常
     * @author zxy
     */
    default StateCode insert(User user) throws Exception {
        return null;
    }

    /**
     * 展示用户的具体信息
     *
     * @param userId 根据用户id展示信息
     * @return User
     * @author zxy
     */
    default User queryUser(Integer userId) {
        return null;
    }

    /**
     * 更新个人数据by id,可以兼备密码找回功能和用户信息更新功能
     *
     * @param user 更新用户信息
     * @return StateCode
     * @throws Exception 加密异常
     */
    default StateCode updateUser(User user) throws Exception {
        return null;
    }

    /**
     * 对用户名和密码进行校验
     *
     * @param userAccount 用户名
     * @param password    密码
     * @return 将查询的数据封装在LoginDataVO中
     * @throws Exception 加密异常
     * @author zgx
     * @date 2020.06.29
     */
    default LoginDataVO checkLogin(String userAccount, String password) throws Exception {
        return null;
    }


    /**
     * 更改密码
     *
     * @param updatePassVO 修改密码的三个参数
     * @return StateCode 状态码
     * @throws Exception 加密失败信息
     */
    default StateCode updateUserPassword(RequestUpdatePassVO updatePassVO) throws Exception {
        return null;
    }

    /**
     * 查询通过email,userStudentNumber判断用户是否存在
     *
     * @param userEmail         用户邮箱
     * @param userStudentNumber 用户学号
     * @return StateCode NOT_EXIST(不存在） SUCCESS(存在）
     */
    default User forget(String userEmail, String userStudentNumber) {
        return null;
    }

    /**
     * 通过用户id删除该用户（软删除）
     *
     * @param id 用户id
     * @return 删除的状态
     */
    int deleteUserById(ArrayList<Integer> id);

    /**
     * 分页查询用户数据
     *
     * @param pageNum   当前页
     * @param pageSize  一页有几条数据
     * @param adminId   管理员id
     * @param className 班级名称
     * @param userName  用户名字
     * @return 分页的数据
     */
    Page<UserDTO> queryUsers(int pageNum, int pageSize, String adminId, String className, String userName);
}
