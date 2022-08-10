package com.dockers.docker.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * @author zgx
 * @date 2020.07.15
 */
@Getter
@Setter
@ToString
public class UserFileListVO {
    private Integer materialId;
    private String materialName;
    private String sufName;
}
