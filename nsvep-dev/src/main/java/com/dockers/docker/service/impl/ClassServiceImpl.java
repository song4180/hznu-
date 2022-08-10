package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.dockers.docker.dao.AdminMapper;
import com.dockers.docker.dao.ClassMapper;
import com.dockers.docker.exception.RoleNullException;
import com.dockers.docker.vo.AdminClassVO;
import com.dockers.docker.entity.Administer;
import com.dockers.docker.entity.ExperimentClass;
import com.dockers.docker.service.ClassService;
import com.dockers.docker.vo.StateCode;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 班级管理实现类
 * @author zxy
 */
@Service("classService")
public class ClassServiceImpl implements ClassService {

    @Resource(name = "classMapper")
    private ClassMapper classMapper;
    @Resource(name = "adminMapper")
    private AdminMapper adminMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public StateCode insertClass(ExperimentClass experimentClass) {
        LambdaQueryWrapper<Administer> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(Administer::getAdminId,experimentClass.getAdminId());
        //验证管理员是否存在
        int num = adminMapper.selectCount(queryWrapper);
        if(num > 0){
            //处理班级名重复的课程
            String old = experimentClass.getClassName();
            old = old.replace(",","，");
            Map<String, Object> map = new HashMap<>(1);
            map.put("class_name",old);
            List<ExperimentClass> experimentClass1 =  classMapper.selectByMap(map);
            if (experimentClass1.size() != 0){
                return StateCode.IS_EXIST;
            }
            int effectNum = classMapper.insert(experimentClass);
            //插入是否成功
            if(effectNum > 0){
                return StateCode.SUCCESS;
            }else{
                return StateCode.ERROR;
            }
        }else {
            return StateCode.NOT_EXIST;
        }
    }

    @Override
    public List<ExperimentClass> queryAllClass(Integer adminId) {
        LambdaQueryWrapper<ExperimentClass> queryWrapper = Wrappers.lambdaQuery();
        queryWrapper.eq(ExperimentClass::getAdminId,adminId).select(ExperimentClass.class,info->!"adminId".equals(info.getProperty())
                &&!"isEnd".equals(info.getProperty()));
        return classMapper.selectList(queryWrapper);
    }

    @Override
    public List<AdminClassVO> selectClass(Integer adminId) {
        List<ExperimentClass> experimentClassList = queryAllClass(adminId);
        if(experimentClassList.isEmpty()){
            throw new RoleNullException("暂无班级，请先添加班级，并添加实验！");
        }
        List<AdminClassVO> adminClassVOList = new ArrayList<>();
        for (ExperimentClass experimentClass : experimentClassList) {
            AdminClassVO adminClassVO = new AdminClassVO();
            BeanUtils.copyProperties(experimentClass, adminClassVO);
            adminClassVOList.add(adminClassVO);
        }
        return adminClassVOList;
    }

    @Override
    public StateCode deleteClass(Integer adminId,Long classId) {
        QueryWrapper<Administer> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("admin_id",adminId);
        int count = adminMapper.selectCount(queryWrapper);
        if(count <= 0){
            return StateCode.NOT_EXIST;
        }else{
            int effect = classMapper.deleteById(classId);
            if(effect>0){
                return StateCode.SUCCESS;
            }else{
                return StateCode.ERROR;
            }
        }
    }
}
