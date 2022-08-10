package com.dockers.docker.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminManageMemoryVO {
    //总内存大小
    private long totalRAM;
    //可用内存大小
    private long availableRAM;
}
