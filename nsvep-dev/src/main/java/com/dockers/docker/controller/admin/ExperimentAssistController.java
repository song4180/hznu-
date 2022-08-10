package com.dockers.docker.controller.admin;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.dockers.docker.dto.AssistAdminDTO;
import com.dockers.docker.param.UpdateAssistStatus;
import com.dockers.docker.service.AssistRecordService;
import com.dockers.docker.vo.PortVo;
import com.dockers.docker.vo.Result;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;

/**管理端师生互助
 * @author zxy
 */
@RestController(value = "AdminExperimentAssistController")
@RequestMapping("/admin")
public class ExperimentAssistController {
    @Resource(name = "assistRecordService")
    private AssistRecordService assistRecordService;

    @GetMapping(value = "/queryall")
    public Result<Page<AssistAdminDTO>> queryAllAssistRecords(@NotNull(message = "当前页数不能为空") @Param("pageNum") int pageNum,
                                                              @NotNull(message = "每页大小不能为空") @Param("pageSize") int pageSize,
                                                              @NotNull(message = "班级id不能为空") @Param("classId") int adminId){
       return Result.success(assistRecordService.pageQueryAssist(pageNum,pageSize,adminId));
   }

   @PostMapping(value = "/getportwithupdate")
    public Result<PortVo> getPortAndUpdateAssistedStatus(@RequestBody UpdateAssistStatus updateAssistStatus){
        String port = assistRecordService.updateAssistStatus(updateAssistStatus.getAssistId(),updateAssistStatus.getUserId(),updateAssistStatus.getExperimentId(),updateAssistStatus.getAssistStatus());
        PortVo portVo = new PortVo();
        portVo.setPort(port);
        return Result.success(portVo);
   }

}
