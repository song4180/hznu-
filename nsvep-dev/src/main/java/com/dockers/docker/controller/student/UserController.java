package com.dockers.docker.controller.student;


import com.alibaba.fastjson.JSONObject;
import com.dockers.docker.entity.User;
import com.dockers.docker.exception.RoleNullException;
import com.dockers.docker.exception.ServiceException;
import com.dockers.docker.service.EmailService;
import com.dockers.docker.service.UserService;
import com.dockers.docker.utils.IpUtil;
import com.dockers.docker.utils.RedisUtil;
import com.dockers.docker.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Random;


/**
 * @author zxy
 */
@RestController
@Slf4j
@RequestMapping("/stu")
public class UserController {
    @Value("${continueTime}")
    private Long continueTime;
    private final static String IMAGE = "d:/upload/head.png";


    @Resource(name = "emailService")
    private EmailService emailService;
    @Resource(name = "userService")
    private UserService userService;
    @Autowired
    RedisUtil redisUtil;
    @Autowired
    HttpServletRequest httpServletRequest;

    /**
     * 用户登录功能
     *
     * @param user 将请求封装成User类
     * @return result 是否登录成功
     * @author zgx
     * @date 2020.6.29
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Result<?> login(@RequestBody User user) {
        String userAccount = user.getUserStudentNumber();
        String userPassword = user.getUserPassword();
        LoginDataVO loginDataVO;
        try {
            loginDataVO = userService.checkLogin(userAccount, userPassword);
        } catch (Exception e) {
            throw new ServiceException("服务器异常");
        }
        //登陆成功
        if (loginDataVO != null) {
            redisUtil.set(loginDataVO.getLoginData().getUserId().toString(),loginDataVO.getLoginData().getUserName(),continueTime);
            log.info("登录信息： 登录账号： {}，登录时间：{}",user.getUserStudentNumber(), LocalDateTime.now());
            return Result.success("登录成功", loginDataVO);
        } else {
            //登录失败
            log.warn("登录状态异常: 登录账号：{} 登录IP为{}",user.getUserStudentNumber(),IpUtil.getIpAddr(httpServletRequest));
            return Result.fail("账号或密码错误");
        }
    }


    /**
     * 添加用户
     * (userAccount, userPassword, userTel, userImage, userName, userNickname, userAcademy, userClass, userEmail, userGender, classId)
     *
     * @param user 添加用户的所有参数（图片默认）
     * @return Result
     * @author zxy
     */
    @RequestMapping(value = "/adduser", method = RequestMethod.POST)
    private Result<?> addUser(@RequestBody User user) {
        user.setUserImage(IMAGE);
        StateCode stateCode;
        try {
            stateCode = userService.insert(user);
        } catch (Exception e) {
            throw new ServiceException("服务器异常");
        }

        if (stateCode.equals(StateCode.SUCCESS)) {
            return Result.success();
        } else if (stateCode.equals(StateCode.ERROR)) {
            return Result.fail("用户数据填写错误！");
        } else if (stateCode.equals(StateCode.IS_EXIST)) {
            return Result.fail("用户存在！");
        } else if (stateCode.equals(StateCode.OTHER)) {
            return Result.fail("出现其他错误！");
        } else {
            return Result.fail("未知错误！");
        }
    }

    /**
     * 查询个人信息(不返回create_time,is_deleted,user_password)
     *
     * @param user1 传入userId进行用户信息检索
     * @return Result
     */
    @RequestMapping(value = "/query", method = RequestMethod.GET)
    private Result<?> queryInfo(User user1) {
        User user = userService.queryUser(user1.getUserId());
        if (ObjectUtils.isEmpty(user)) {
            return Result.fail("用户不存在！");
        } else {
            return Result.success(user);
        }
    }

    /**
     * 通过id修改个人信息
     * (仅允许修改头像，图片，邮箱）
     *
     * @param user 需要传入userId,userEmail,userTel
     * @return Result
     * @author zxy
     */
    @RequestMapping(value = "/update/user", method = RequestMethod.POST)
    private Result<?> updateInfo(@RequestBody User user) {
        if (StringUtils.isEmpty(user.getUserImage())) {
            user.setUserImage(IMAGE);
        }
        if (StringUtils.isEmpty(user.getUserTel())) {
            return Result.fail("电话号码不能为空！");
        }
        if (StringUtils.isEmpty(user.getUserEmail())) {
            return Result.fail("邮箱不能为空！");
        }
        StateCode stateCode;
        try {
            stateCode = userService.updateUser(user);
        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
        if (stateCode.equals(StateCode.SUCCESS)) {
            return Result.success();
        } else if (stateCode.equals(StateCode.ERROR)) {
            return Result.fail();
        } else {
            return Result.fail("更新出现了异常");
        }
    }

    /**
     * 更新用户密码(登录后）
     *
     * @param updatePassVO user_id,oldPassword,newPassword;
     * @return Result
     * @throws Exception 加密异常
     */
    @RequestMapping(value = "/update/pass", method = RequestMethod.POST)
    public Result<Object> updatePassword(@RequestBody RequestUpdatePassVO updatePassVO) throws Exception {
        StateCode code = userService.updateUserPassword(updatePassVO);
        if (code.equals(StateCode.ERROR)) {
            return Result.fail("密码错误");
        } else if (code.equals(StateCode.NOT_EXIST)) {
            throw new RoleNullException("用户不存在");
        } else if (code.equals(StateCode.SUCCESS)) {
            return Result.success("更新成功");
        } else {
            return Result.fail("服务器异常");
        }
    }

    /**
     * 验证用户身份,返回用户验证码
     *
     * @param user 用户邮箱和用户学号
     * @return Result 用户是否存在或者验证码。
     */
    @RequestMapping(value = "/forget", method = RequestMethod.POST)
    public Result<?> forget(@RequestBody User user) {
        User user1 = userService.forget(user.getUserEmail(), user.getUserStudentNumber());
        if (ObjectUtils.isEmpty(user1)) {
            return Result.fail("用户不存在");
        } else {
            UserAndYard yard = new UserAndYard();
            yard.setUserId(user1.getUserId());
            Random ra = new Random();
            int yardNum = ra.nextInt(899999) + 100000;
            emailService.passFound(yardNum, user.getUserEmail());
            yard.setYard(yardNum);
            return Result.success("邮件发送成功", yard);
        }
    }

    /**
     * 输入更新后的密码并更新数据库
     *
     * @param user 需要userId,和userPassword
     * @return 更新是否成功
     */
    @RequestMapping(value = "/update/forget", method = RequestMethod.POST)
    public Result<?> updateForgetPassword(@RequestBody User user) {
        if (StringUtils.isEmpty(user.getUserPassword())) {
            return Result.fail("密码不能为空");
        }
        StateCode stateCode;
        try {
            stateCode = userService.updateUser(user);
        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
        if (stateCode.equals(StateCode.SUCCESS)) {
            return Result.success("修改密码成功！");
        } else {
            return Result.fail("服务器异常");
        }
    }

    /**
     * 登出接口
     *
     * @param jsonObject 用户id
     * @return 登出成功
     */
    @PostMapping(value = "/logout")
    public Result<Object> logout(@RequestBody JSONObject jsonObject) {
        Integer userId = jsonObject.getInteger("userId");
        redisUtil.del(userId.toString());
        return Result.success("登出成功！");
    }

}