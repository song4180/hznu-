package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.util.Date;

/**
 * 帮助记录
 * @author zxy
 */
@TableName(value = "assist_record")
@Data
public class AssistRecord {
    /**
     * 协助编号记录
     */
    @TableId(type = IdType.AUTO)
    private Integer assistId;
    /**
     * 用户编号
     */
    private Integer userId;
    /**
     * 管理员编号
     */
    private Integer adminId;
    /**
     * 实验Id
     */
    private Integer experimentId;
    /**
     * 是否被协助 0未 1已协助 2拒绝协助
     */
    private Integer isAssisted;
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
}
