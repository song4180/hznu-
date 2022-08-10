package com.dockers.docker.handler;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.alibaba.fastjson.JSON;
import com.dockers.docker.dto.UserBatchDTO;
import com.dockers.docker.service.UserBatchService;
import com.dockers.docker.utils.RSA;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 监听读excel并插入
 * @author zxy
 */
public class UserBatchListener extends AnalysisEventListener<UserBatchDTO> {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserBatchListener.class);
    /**
     * 每隔5条存储数据库，实际使用中可以3000条，然后清理list ，方便内存回收
     */
    private static final int BATCH_COUNT = 5;
    List<UserBatchDTO> list = new ArrayList<>();
    private Long classId;

    /**
     * 假设这个是一个DAO，当然有业务逻辑这个也可以是一个service。当然如果不用存储这个对象没用。
     */
    private final UserBatchService userBatchService;
    /**
     * 如果使用了spring,请使用这个构造方法。每次创建Listener的时候需要把spring管理的类传进来
     * @param userBatchService 批量插入用户信息
     */
    public UserBatchListener(UserBatchService userBatchService) {
        this.userBatchService = userBatchService;
    }
    /**
     * 这个每一条数据解析都会来调用
     * @param userBatchDTO
     *            one row value. Is is same as {@link AnalysisContext#readRowHolder()}
     * @param analysisContext 文本扫描
     */
    @Override
    public void invoke(UserBatchDTO userBatchDTO, AnalysisContext analysisContext) {
        LOGGER.info("解析到一条数据:{}", JSON.toJSONString(userBatchDTO));
        userBatchDTO.setClassId(classId);
        try{
            String pass = userBatchDTO.getUserStudentNumber().substring(7);
            pass = RSA.testEncrypt(RSA.privateKey,pass);
            userBatchDTO.setUserPassword(pass);
        }catch (Exception e){
            LOGGER.info("加密错误  用户："+userBatchDTO.getUserName()+"   学号："+userBatchDTO.getUserStudentNumber());
        }
        list.add(userBatchDTO);
        // 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM
        if (list.size() >= BATCH_COUNT) {
            saveData();
            // 存储完成清理 list
            list.clear();
        }
    }
    /**
     * 所有数据解析完成了 都会来调用
     *
     * @param analysisContext 剩余的内容
     */
    @Override
    public void doAfterAllAnalysed(AnalysisContext analysisContext) {
        // 这里也要保存数据，确保最后遗留的数据也存储到数据库
        if(list.size()>0){
            saveData();
        }
        LOGGER.info("所有数据解析完成！");
    }
    /**
     * 加上存储数据库
     */
    private void saveData() {
        LOGGER.info("{}条数据，开始存储数据库！", list.size());
        boolean b = userBatchService.saveBatchWithOutRepeat(list);
        if(!b){
            LOGGER.warn("批量插入出现问题 "+ LocalDateTime.now()+" 操作班级" + this.classId);
        }
    }

    /**
     * 设置班级id
     * @param id 班级id
     * @return UserBatchListener 修改单字段供new使用
     */
    public UserBatchListener setClassId(Long id){
        this.classId = id;
        return this;
    }
}
