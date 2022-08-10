package com.dockers.docker.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.dockers.docker.annotation.ParamValidate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Date;

/**
 * 反馈实体
 * @author zxy
 */
@TableName(value = "reported_problem")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Reported {
    /**
     * 反馈号
     */
    @TableId
    private Integer reportedId;
    /**
     * 反馈标题
     */
    @ParamValidate(name = "反馈标题",required = true)
    private String reportedTitle;
    /**
     * 反馈详情
     */
    @ParamValidate(name = "反馈内容",required = true)
    private String reportedDetail;
    /**
     * 反馈图片
     */
    private String reportedImage;
    /**
     * 反馈时间
     */
    @TableField(fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
    /**
     * 反馈用户序号
     */
    private Integer userId;
    /**
     * 是否解决
     */
    @TableField(exist = false)
    @TableLogic
    private Integer isHandled;
}
