package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传接口入参
 *
 * @author zgx
 */
@Data
public class FileUplodParam {
    @ParamValidate(name = "上传文件", required = true)
    MultipartFile[] uploadFile;
    @ParamValidate(name = "管理员编号", required = true)
    Integer id;
}
