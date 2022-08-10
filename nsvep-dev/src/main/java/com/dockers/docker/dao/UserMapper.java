package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dto.UserDTO;
import com.dockers.docker.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("userMapper")
public interface UserMapper extends BaseMapper<User> {

    /**
     * a test
     * @param wrapper 条件构造器
     * @return 用户列表
     */
    //List<User> selectAll(@Param(Constants.WRAPPER) Wrapper<User> wrapper);
    /**
     * 分页查询用户
     * @param page 分页信息
     * @param adminId 管理员id
     * @param className 班级名称
     * @param userName 用户名称
     * @return 管理端展示信息
     */
    Page<UserDTO> queryUsers(Page<UserDTO> page,String adminId,String className,String userName);

}
