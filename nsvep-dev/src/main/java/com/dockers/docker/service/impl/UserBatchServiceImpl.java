package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dockers.docker.dao.UserBatchMapper;
import com.dockers.docker.dao.UserMapper;
import com.dockers.docker.dto.UserBatchDTO;
import com.dockers.docker.entity.User;
import com.dockers.docker.service.UserBatchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 批量插入用户
 * @author zxy
 */
@Service("userBatchService")
@Slf4j
public class UserBatchServiceImpl extends ServiceImpl<UserBatchMapper, UserBatchDTO> implements UserBatchService {

    @Resource(name = "userMapper")
    private UserMapper userMapper;

    @Override
    public boolean saveBatchWithOutRepeat(List<UserBatchDTO> entityList) {
        List<UserBatchDTO> userBatchDtoS = new ArrayList<>();
        for (UserBatchDTO userBatchDTO : entityList) {
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.select("user_student_number").eq("user_student_number", userBatchDTO.getUserStudentNumber());
            User user = userMapper.selectOne(queryWrapper);
            if (ObjectUtils.isEmpty(user)) {
                userBatchDtoS.add(userBatchDTO);
            } else {
                log.warn("批量插入存在重复对象: {}",user.toString());
            }
        }
        try{
            return saveBatch(userBatchDtoS,userBatchDtoS.size());
        }catch (MybatisPlusException e){
            log.error(e.getMessage());
        }
        return true;
    }
}
