package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

/**
 * @author zgx
 * @date 2020.07.13
 */
@TableName(value = "reference_material")
@Data
public class LessonFile {
    /**
     * 文件id
     */
    @TableId(type = IdType.AUTO)
    private Integer materialId;

    /**
     * 文件名
     */
    private String materialName;

    /**
     * 文件路径
     */
    private String materialUrl;

    /**
     * 上传者的id
     */
    private Integer adminId;

    /**
     * 删除标志
     */
    @TableField(fill = FieldFill.INSERT)
    @TableLogic
    private Integer isDeleted;
}
