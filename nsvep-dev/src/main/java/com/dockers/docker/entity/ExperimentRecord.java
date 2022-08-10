package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.util.Date;

/**
 * @author zxy
 */
@Data
@TableName(value = "experiment_record")
public class ExperimentRecord {
    /**
     * 实验记录id
     */
    @TableId(type = IdType.AUTO)
    private Integer recordId;

    /**
     * 用户id
     */
    private Integer userId;

    /**
     * 实验id
     */
    private Integer experimentId;

    /***
     * docker容器id
     */
    private String containerId;

    /**
     * 容器名称
     */
    private String containerName;

    /**
     * 开放端口
     */
    private String occupyPort;

    /**
     * 申请者的ip地址
     */
    private String recordIp;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 实验结束时间
     */
    private Date endTime;

    /**
     * 实验关闭标志
     */
    private Integer isClosed;

    /**
     * 实验容器移除标志
     */
    @TableField(fill = FieldFill.INSERT)
    private Integer isRemoved;
}
