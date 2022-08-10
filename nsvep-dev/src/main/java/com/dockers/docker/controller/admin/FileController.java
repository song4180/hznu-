package com.dockers.docker.controller.admin;

import com.dockers.docker.annotation.Verifys;
import com.dockers.docker.param.FileUplodParam;
import com.dockers.docker.param.ImageUploadParam;
import com.dockers.docker.service.FileService;
import com.dockers.docker.vo.AdminFileListVO;
import com.dockers.docker.param.FileRequestParam;
import com.dockers.docker.vo.Result;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 管理端文件管理模块
 */
@RestController("AdminFileController")
@RequestMapping("/admin/file")
public class FileController {
    @Resource(name = "fileService")
    private FileService fileService;

    /**
     * 文件上传接口 多文件上传
     * 调用方式表单调用 enctype="multipart/form-data"
     * @param fileUplodParam 要上传的文件和管理员id
     * @return Result
     * @author zgx
     * @date 2020.07.13
     */
    @RequestMapping(value = "/uploadFile")
    @Verifys
    public Result<List<String>> uploadFile(FileUplodParam fileUplodParam) {
        return Result.success("上传成功", fileService.fileUpload(fileUplodParam));
    }

    /**
     * 头像上传接口
     * @param imageUploadParam 上传的头像 上传者id
     * @return Result 上传头像是否成功
     * @date 2020.07.13
     */
    @RequestMapping(value = "/uploadImage")
    @Verifys
    public Result<Object> uploadImage(ImageUploadParam imageUploadParam) {
        return Result.success(fileService.uploadImage(imageUploadParam));
    }

    /**
     * 管理员查询数据库所有文件
     * @return Result 返回数据库所有文件
     * @author zgx
     * @date 2020.07.17
     */
    @GetMapping(value = "/filelist")
    public Result<List<AdminFileListVO>> adminFileList() {
        return Result.success(fileService.adminQueryAll());
    }

    /**
     * 文件删除接口
     * 单文件删除
     * 删除该文件在服务器上的位置和数据库中存储的数据
     * @param fileRequestParam 文件删除参数
     * @return Result 删除状态
     * @author zgx
     * @date 2020.07.17
     */
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public Result<Object> delete(FileRequestParam fileRequestParam) {
        return Result.success (fileService.deleteFile(fileRequestParam));
    }
}
