package com.dockers.docker.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ExperimentOpenVO {
    private Long endTime;

    public ExperimentOpenVO(Long endTime) {
        this.endTime = endTime;
    }
}
