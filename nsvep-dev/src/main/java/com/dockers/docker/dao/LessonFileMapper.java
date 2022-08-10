package com.dockers.docker.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dockers.docker.entity.LessonFile;
import com.dockers.docker.vo.AdminFileListVO;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("lessonFileMapper")
public interface LessonFileMapper extends BaseMapper<LessonFile> {

    /**
     * 查找当前班级中所有上传文件
     * @return AdminFileListVO 返回文件列表
     */
    @Select("SELECT material_id,material_name,material_url,a.admin_name FROM reference_material r,admin a WHERE r.admin_id = a.admin_id AND r.is_deleted = 0")
    List<AdminFileListVO> queryAdminFiles();
}
