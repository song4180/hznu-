package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.dockers.docker.dao.UserMapper;
import com.dockers.docker.dto.UserDTO;
import com.dockers.docker.entity.User;
import com.dockers.docker.exception.ServiceException;
import com.dockers.docker.service.UserService;
import com.dockers.docker.utils.JwtTokenUtil;
import com.dockers.docker.utils.RSA;
import com.dockers.docker.vo.LoginDataVO;
import com.dockers.docker.vo.RequestUpdatePassVO;
import com.dockers.docker.vo.StateCode;
import com.dockers.docker.vo.UserLoginVO;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;


/**
 * @author zxy
 */
@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Resource(name = "userMapper")
    private UserMapper userMapper;


    /**
     * 手机号长度需要为11
     */
    static final Integer PHONEME = 11;
    /**
     * 密码长度不宜过长，设置为30返回数据格式异常
     */
    static final Integer PASS_LENGTH = 30;

    /**
     * @param user 要插入的用户信息
     * @return StateCode
     * @author zxy
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public StateCode insert(User user) throws Exception {
        StateCode stateCode;
        if (StringUtils.isEmpty(user.getUserStudentNumber()) || StringUtils.isEmpty(user.getUserPassword()) || ObjectUtils.isEmpty(user.getClassId())) {
            stateCode = StateCode.ERROR;
        } else {
            //条件构造
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.select("user_student_number").eq("user_student_number", user.getUserStudentNumber());
            Integer count = userMapper.selectCount(queryWrapper);
            if (!count.equals(0)) {
                stateCode = StateCode.IS_EXIST;
            } else {
                if (!user.getUserGender().equals(1) || !user.getUserGender().equals(0)) {
                    user.setUserGender(2);
                }
                String pass;
                pass = RSA.testEncrypt(RSA.privateKey, user.getUserPassword());
                user.setUserPassword(pass);
                int insert = userMapper.insert(user);
                if (insert > 0) {
                    stateCode = StateCode.SUCCESS;
                } else {
                    stateCode = StateCode.ERROR;
                }
            }
        }
        return stateCode;
    }

    /**
     * @param userId 用户编号
     * @return User
     * @author zxy
     */
    @Override
    public User queryUser(Integer userId) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("USER_STUDENT_NUMBER", "USER_TEL", "USER_IMAGE", "USER_NAME", "USER_ACADEMY", "USER_CLASS", "USER_EMAIL", "USER_GENDER", "user_academy").eq("user_id", userId);
        return userMapper.selectOne(queryWrapper);
    }

    /**
     * 根据id更新个人信息
     *
     * @param user 个人信息
     * @return StateCode
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public StateCode updateUser(User user) throws Exception {
        StateCode stateCode;
        LambdaUpdateWrapper<User> updateWrapper = Wrappers.lambdaUpdate();
        updateWrapper.eq(User::getUserId, user.getUserId());
        //动态sql
        if (!StringUtils.isEmpty(user.getUserImage()) && !StringUtils.isEmpty(user.getUserTel()) &&
                !StringUtils.isEmpty(user.getUserEmail()) && !StringUtils.isEmpty(user.getUserAcademy())) {
            updateWrapper.set(User::getUserImage, user.getUserImage())
                    .set(User::getUserTel, user.getUserTel()).set(User::getUserEmail, user.getUserEmail())
                    .set(User::getUserAcademy, user.getUserAcademy());
        } else if (!StringUtils.isEmpty(user.getUserPassword())) {
            user.setUserPassword(RSA.testEncrypt(RSA.privateKey, user.getUserPassword()));
            updateWrapper.set(User::getUserPassword, user.getUserPassword());
        }
        int effectNum = userMapper.update(null, updateWrapper);
        if (effectNum > 0) {
            stateCode = StateCode.SUCCESS;
        } else {
            stateCode = StateCode.ERROR;
        }
        return stateCode;
    }

    /**
     * 将用户名和密码进行校验
     *
     * @param userAccount 用户名
     * @param password    密码
     * @return 将查询数据封装在LoginDataVO返回
     * @throws Exception 加密异常
     */
    @Override
    public LoginDataVO checkLogin(String userAccount, String password) throws Exception {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.select("user_id", "user_student_number", "user_password", "user_name", "class_id", "user_image").eq("user_student_number", userAccount);
        User user = userMapper.selectOne(wrapper);
        if (user == null) {
            return null;
        } else {
            String pass = user.getUserPassword();
            pass = RSA.testDecrypt(RSA.publicKey, pass);
            if (password.equals(pass)) {
                LoginDataVO loginDataVO = new LoginDataVO();
                String token = JwtTokenUtil.createToken(user.getUserId().toString(), user.getUserName());
                UserLoginVO userLoginVO = new UserLoginVO();
                BeanUtils.copyProperties(user, userLoginVO);
                userLoginVO.setToken(token);
                loginDataVO.setLoginData(userLoginVO);
                return loginDataVO;
            } else {
                return null;
            }
        }
    }

    /**
     * 更新密码
     *
     * @param updatePassVO 修改密码的三个参数
     * @return 更新状态码
     * @throws Exception 加密异常
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public StateCode updateUserPassword(RequestUpdatePassVO updatePassVO) throws Exception {
        StateCode stateCode;
        User user = userMapper.selectById(updatePassVO.getUserId());
        if (user == null) {
            //用户不存在
            stateCode = StateCode.NOT_EXIST;
        } else {
            String pass = RSA.testDecrypt(RSA.publicKey, user.getUserPassword());
            if (!pass.equals(updatePassVO.getOldPassword())) {
                stateCode = StateCode.ERROR;
            } else {
                if (pass.length() > PASS_LENGTH) {
                    stateCode = StateCode.ERROR;
                } else {
                    pass = RSA.testEncrypt(RSA.privateKey, updatePassVO.getNewPassword());
                    UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
                    updateWrapper.set("user_password", pass).eq("user_id", updatePassVO.getUserId());
                    int effectNum = userMapper.update(null, updateWrapper);
                    if (effectNum > 0) {
                        stateCode = StateCode.SUCCESS;
                    } else {
                        throw new ServiceException("更新异常");
                    }
                }

            }
        }
        return stateCode;
    }

    /**
     * 忘记密码
     *
     * @param userEmail         用户邮箱
     * @param userStudentNumber 用户学号
     * @return 用户信息是否正确
     */
    @Override
    public User forget(String userEmail, String userStudentNumber) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("user_id").eq("user_email", userEmail).eq("user_student_number", userStudentNumber);
        return userMapper.selectOne(queryWrapper);
    }

    /**
     * 删除多个用户
     *
     * @param ids 用户id
     * @return int
     */
    @Override
    public int deleteUserById(ArrayList<Integer> ids) {
        return userMapper.deleteBatchIds(ids);
    }

    /**
     * 分页的展示用户信息
     *
     * @param pageNum   当前页
     * @param pageSize  一页有几条数据
     * @param adminId   管理员id
     * @param className 班级名称
     * @param userName  用户名字
     * @return 用户信息
     */
    @Override
    public Page<UserDTO> queryUsers(int pageNum, int pageSize, String adminId, String className, String userName) {
        return userMapper.queryUsers(new Page<>(pageNum, pageSize), adminId, className, userName);
    }


}
