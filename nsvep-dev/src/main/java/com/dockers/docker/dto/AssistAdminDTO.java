package com.dockers.docker.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * 管理端协助展示
 * @author zxy
 */
@Data
public class AssistAdminDTO {
    private Integer assistId;
    private Integer userId;
    private String userStudentNumber;
    private String userName;
    private Integer experimentId;
    private String experimentTitle;
    private Integer isAssisted;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
}
