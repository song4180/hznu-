package com.dockers.docker.dto;

import lombok.Data;

/**
 * 实验状态检测
 * @author zxy
 */
@Data
public class ExpStatusCheckDTO {
    private Integer experimentId;
    private String containerId;

    public ExpStatusCheckDTO(Integer experimentId, String containerId) {
        this.experimentId = experimentId;
        this.containerId = containerId;
    }
}
