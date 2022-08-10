package com.dockers.docker.vo;

import com.dockers.docker.dto.ExpStatusCheckDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @author zxy
 */
@Getter
@Setter
public class ExperimentIdVO  {

    private Integer experimentId;
    private String containerId;

    public ExperimentIdVO() {
    }

    public ExperimentIdVO(Integer experimentId, String containerId) {
        this.experimentId = experimentId;
        this.containerId = containerId;
    }

}
