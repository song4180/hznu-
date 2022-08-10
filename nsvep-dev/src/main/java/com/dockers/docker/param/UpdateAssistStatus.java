package com.dockers.docker.param;

import lombok.Data;

/**
 * @author zxy
 */
@Data
public class UpdateAssistStatus {
    private Integer assistId;
    private Integer userId;
    private Integer experimentId;
    private Integer assistStatus;
}
