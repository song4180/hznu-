package com.dockers.docker.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * 反馈传输层
 * @author zxy
 */
@Getter
@Setter
@ToString
public class ReportDTO {
    private String reportedTitle;
    private String reportedDetail;
    private String userName;
    private String userStudentNumber;
    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
}
