package com.dockers.docker.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 管理员添加实验传输
 * @author zxy
 */
@Setter
@Getter

public class ShowExperimentDTO {
    private Integer experimentId;
    private String experimentTitle;

    public ShowExperimentDTO(Integer experimentId, String experimentTitle) {
        this.experimentId = experimentId;
        this.experimentTitle = experimentTitle;
    }
}
