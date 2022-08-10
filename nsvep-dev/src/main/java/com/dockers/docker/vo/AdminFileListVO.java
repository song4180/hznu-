package com.dockers.docker.vo;

import lombok.Data;

/**
 * 管理端查询的实验信息
 * @author zgx
 */
@Data
public class AdminFileListVO {
    private Integer materialId;
    private String materialName;
    private String materialUrl;
    private String adminName;
}
