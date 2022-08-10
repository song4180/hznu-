package com.dockers.docker.param;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * File请求对象，下载文件使用。
 *
 * @author zxy
 * @date 2020-7-8
 */
@Getter
@Setter
@ToString
public class FileRequestParam {

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 文件id
     */
    private Integer id;
}
