package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageUploadParam {
    @ParamValidate(name = "上传头像", required = true)
    MultipartFile file;
    @ParamValidate(name = "上传者id", required = true)
    Integer id;
}
