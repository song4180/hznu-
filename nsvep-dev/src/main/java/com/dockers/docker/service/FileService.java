package com.dockers.docker.service;


import com.dockers.docker.param.FileUplodParam;
import com.dockers.docker.param.ImageUploadParam;
import com.dockers.docker.vo.AdminFileListVO;
import com.dockers.docker.param.FileRequestParam;
import com.dockers.docker.vo.UserFileListVO;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 文件相关操作
 *
 * @author zgx
 */
public interface FileService {
    /**
     * 插入路径
     *
     * @param fileName 文件名
     * @param filePath 文件路径
     * @param adminId  管理员ID
     * @return 成功与否
     */
    boolean pathInsert(String fileName, String filePath, int adminId);

    /**
     * 插入图片
     *
     * @param imagePath 图像路径
     * @param userId    用户Id
     * @return 成功与否
     */
    boolean imageInsert(String imagePath, int userId);

    /**
     * 用户查询所有文件
     *
     * @return 文件列表
     */
    List<UserFileListVO> userQueryAll();

    /**
     * 管理员查询所有文件
     *
     * @return 文件列表
     */
    List<AdminFileListVO> adminQueryAll();

    /**
     * 查询文件路径
     *
     * @param fileRequestParam 文件请求路径
     * @return 文件路径
     */
    String queryPath(FileRequestParam fileRequestParam);

    /**
     * 删除文件
     *
     * @param fileRequestParam 文件请求路径
     * @return 文件路径
     */
    String deleteFile(FileRequestParam fileRequestParam);

    /**
     * 多文件上传
     *
     * @param fileUplodParam 文件路径
     * @return 文件列表
     */
    List<String> fileUpload(FileUplodParam fileUplodParam);

    /**
     * 上传图片
     *
     * @param imageUploadParam 图片路径
     * @return 文件路径
     */
    String uploadImage(ImageUploadParam imageUploadParam);

    /**
     * 文件下载
     *
     * @param fileRequestParam 文件请求参数
     * @param response         response
     */
    void download(FileRequestParam fileRequestParam, HttpServletResponse response);
}
