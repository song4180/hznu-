package com.dockers.docker.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.dockers.docker.dao.LessonFileMapper;
import com.dockers.docker.entity.LessonFile;
import com.dockers.docker.exception.BadRequestException;
import com.dockers.docker.exception.FileOperationException;
import com.dockers.docker.exception.ServiceException;
import com.dockers.docker.param.FileUplodParam;
import com.dockers.docker.param.ImageUploadParam;
import com.dockers.docker.service.FileService;
import com.dockers.docker.utils.FileUtil;
import com.dockers.docker.vo.AdminFileListVO;
import com.dockers.docker.param.FileRequestParam;
import com.dockers.docker.vo.UserFileListVO;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 文件管理服务
 */
@Service("fileService")
public class FileServiceImpl implements FileService {
    @Resource(name = "lessonFileMapper")
    private LessonFileMapper lessonFileMapper;

    /**
     * 文件根目录
     */
    @Value("${materialPath}")
    private String FILE_PATH;

    /**
     * 头像根目录
     */
    @Value("${imagePath}")
    private String IMAGE_PATH;

    /**
     * 将文件名、部分文件路径保存在数据库中
     *
     * @param fileName 文件名
     * @param filePath 部分文件路径
     * @param adminId  上传者的id
     * @return boolean true 表示保存成功 false 表示失败
     * @author zgx
     * @date 2020.07.14
     */
    @Override
    public boolean pathInsert(String fileName, String filePath, int adminId) {
        LessonFile lessonFile = new LessonFile();
        lessonFile.setMaterialName(fileName);
        lessonFile.setMaterialUrl(filePath);
        lessonFile.setAdminId(adminId);
        int result = lessonFileMapper.insert(lessonFile);
        return result > 0;
    }

    @Override
    public boolean imageInsert(String imagePath, int userId) {
        return false;
    }

    /**
     * 学生端查询所有的文件
     *
     * @return List<FileVO>
     * @author zgx
     * @date 2020.07.15
     */
    @Override
    public List<UserFileListVO> userQueryAll() {
        List<LessonFile> fileList = lessonFileMapper.selectList(null);
        List<UserFileListVO> fileDTOList = new ArrayList<>();
        String fileName;
        for (LessonFile file : fileList) {
            fileName = file.getMaterialName();
            String suffixName = fileName.substring(fileName.lastIndexOf(".") + 1);
            UserFileListVO fileDTO = new UserFileListVO();
            fileDTO.setSufName(suffixName);
            BeanUtils.copyProperties(file, fileDTO);
            fileDTOList.add(fileDTO);
        }
        return fileDTOList;
    }

    /**
     * 管理端查询所有的文件
     *
     * @return List<AdminFlieListVO>
     * @author zgx
     * @date 2020.07.17
     */
    @Override
    public List<AdminFileListVO> adminQueryAll() {
        List<AdminFileListVO> fileList = lessonFileMapper.queryAdminFiles();
        return fileList;
    }

    /**
     * 查找文件id对应的部分文件路径
     *
     * @param fileRequestParam 文件id 文件名
     * @return String
     * @author zgx
     * @date 2020.07.15
     */
    @Override
    public String queryPath(FileRequestParam fileRequestParam) {
        QueryWrapper<LessonFile> queryWrapper = new QueryWrapper();
        queryWrapper.select("material_url")
                .eq("material_id", fileRequestParam.getId());
        queryWrapper.eq("material_name", fileRequestParam.getFileName());
        String path = lessonFileMapper.selectOne(queryWrapper).getMaterialUrl();
        return path;
    }

    /**
     * 文件上传方法
     *
     * @param fileUplodParam 文件上传参数
     * @return 上传成功的文件列表
     * @author zgx
     * @date 2020.07.28
     */
    @Override
    public List<String> fileUpload(FileUplodParam fileUplodParam) {
        Assert.notNull(fileUplodParam, "文件上传参数不能为空");

        String name, fileName, newFileName;
        List<String> files = new ArrayList<>();
        for (MultipartFile file : fileUplodParam.getUploadFile()) {
            // 获取原始名字
            name = file.getOriginalFilename();
            // 获取后缀名
            if (name == null) {
                throw new BadRequestException("文件名异常");
            } else {
                String suffixName = name.substring(name.lastIndexOf("."));
                newFileName = UUID.randomUUID() + suffixName;
                //上传至不同类别文件夹中
                switch (suffixName) {
                    case ".docx":
                    case ".doc":
                    case ".pdf":
                        fileName = FILE_PATH + newFileName;
                        break;
                    default:
                        throw new BadRequestException("文件格式错误");
                }

                // 文件对象
                File dest = new File(fileName);
                // 判断路径是否存在，如果不存在则创建
                if (!dest.getParentFile().exists()) {
                    dest.getParentFile().mkdirs();
                }
                if (dest.exists()) {
                    throw new BadRequestException("文件已经存在");
                } else {
                    try {
                        boolean flag;
                        // 保存到服务器中
                        file.transferTo(dest);
                        flag = pathInsert(name, newFileName, fileUplodParam.getId());
                        files.add(name);
                        if (!flag) {
                            throw new FileOperationException("数据库插入文件路径失败");
                        }
                    } catch (IllegalStateException | IOException e) {
                        throw new FileOperationException("服务器保存上传文件出错", e);
                    }
                }
            }
        }
        return files;
    }

    /**
     * 头像上传服务
     *
     * @param imageUploadParam 头像上传参数
     * @return 默认上传成功
     * @author zgx
     * @date 2020.07.28
     */
    @Override
    public String uploadImage(ImageUploadParam imageUploadParam) {
        Assert.notNull(imageUploadParam, "头像上传参数不能为空");

        MultipartFile file = imageUploadParam.getFile();
        // 获取原始名字
        String fileName = file.getOriginalFilename();
        // 获取后缀名
        if (fileName == null) {
            throw new BadRequestException("文件名异常");
        } else {
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            //上传至不同类别文件夹中
            switch (suffixName) {
                case ".jpg":
                case ".jpeg":
                case ".png":
                case ".svg":
                    // 文件重命名，防止重复
                    fileName = IMAGE_PATH + UUID.randomUUID() + fileName;
                    break;
                default:
                    throw new BadRequestException("文件格式错误");
            }

            // 文件对象
            File dest = new File(fileName);
            // 判断路径是否存在，如果不存在则创建
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            if (dest.exists()) {
                throw new BadRequestException("文件已经存在");
            } else {
                try {
                    // 保存到服务器中
                    file.transferTo(dest);
                } catch (IllegalStateException | IOException e) {
                    throw new FileOperationException("服务器保存上传头像出错", e);
                }
                return "上传成功";
            }
        }
    }


    /**
     * 将存储在服务器的文件删除，数据库内的数据软删除
     *
     * @param fileRequestParam 文件id 文件名
     * @return 是否删除成功
     * @author zgx
     * @date 2020.07.17
     */
    @Override
    public String deleteFile(FileRequestParam fileRequestParam) {
        Assert.notNull(fileRequestParam, "文件删除参数不能为空");
        String path = queryPath(fileRequestParam);
        if (lessonFileMapper.deleteById(fileRequestParam.getId()) > 0) {
            if (FileUtil.deleteFile(FILE_PATH + path)) {
                return "删除成功";
            }
            //服务器中不存在当前文件
            throw new FileOperationException("服务器中不存在当前文件");
        }
        //数据库中文件不存在
        throw new BadRequestException("不存在当前文件");
    }

    @Override
    public void download(FileRequestParam fileRequestParam, HttpServletResponse response) {
        Assert.notNull(fileRequestParam, "文件下载参数不能为空");

        String filePath, fileName = fileRequestParam.getFileName();
        filePath = FILE_PATH + queryPath(fileRequestParam);
        File file = new File(filePath);
        if (file.exists() && file.isFile()) {
            // 设置文件输出类型
            try {
                response.reset();
                //设置ContentType字段值
                response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
                response.setContentType("application/octet-stream");
                IOUtils.copy(new FileInputStream(filePath), response.getOutputStream());
                // 关闭流
            } catch (IOException e) {
                throw new ServiceException("服务器下载错误,请重试!", e);
            }
        } else {
            throw new BadRequestException("文件不存在");
        }
    }
}
