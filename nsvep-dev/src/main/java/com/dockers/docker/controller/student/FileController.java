package com.dockers.docker.controller.student;

import com.dockers.docker.service.FileService;
import com.dockers.docker.param.FileRequestParam;
import com.dockers.docker.vo.Result;
import com.dockers.docker.vo.UserFileListVO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 学生端文件查看、下载
 *
 * @author zgx
 */
@RestController
@RequestMapping("/stu/file")
public class FileController {
    @Resource(name = "fileService")
    private FileService fileService;

    /**
     * 文件下载接口
     *
     * @param fileRequestParam（fileName）
     * @param response http请求响应
     * @author zgx
     * @date 2020.07.14
     */
    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(FileRequestParam fileRequestParam
            , HttpServletResponse response) {
        fileService.download(fileRequestParam, response);
    }


    /**
     * 查询数据库所有文件
     *
     * @return Result 返回数据库所有文件
     * @author zgx
     * @date 2020.07.15
     */
    @RequestMapping(value = "/filelist", method = RequestMethod.GET)
    public Result<List<UserFileListVO>> userFileList() {
        List<UserFileListVO> userFileListVOList = fileService.userQueryAll();
        return Result.success(userFileListVOList);
    }
}
