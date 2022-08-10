package com.dockers.docker.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 实验管理前选择班级的信息
 * @author zgx
 */
@ToString
@Setter
@Getter
public class AdminClassVO {
    private Long classId;
    private String className;
}
