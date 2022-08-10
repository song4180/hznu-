package com.dockers.docker.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * 用于配置插入或更新时的时间操作。
 * @author zxy
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject,"createTime", Date.class,new Date());
        this.strictInsertFill(metaObject,"isDeleted",Integer.class,0);
        this.strictInsertFill(metaObject,"userGender",Integer.class,2);
        this.strictInsertFill(metaObject,"isEnd",Integer.class,0);
        this.strictInsertFill(metaObject,"isRemoved",Integer.class,0);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        Object val = getFieldValByName("updateTime",metaObject);
        if(val == null) {
            this.strictInsertFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
        }
    }
}
