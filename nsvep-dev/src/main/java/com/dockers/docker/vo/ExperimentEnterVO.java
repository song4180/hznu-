package com.dockers.docker.vo;

import lombok.Data;

@Data
public class ExperimentEnterVO {
    //实验描述
    private String courseDetail;
    //实验标题
    private String experimentTitle;
    //实验任务
    private String experimentTask;
    //实验容器是否关闭
    private Integer isClosed;
}
