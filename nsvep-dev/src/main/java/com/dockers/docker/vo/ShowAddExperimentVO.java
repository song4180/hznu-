package com.dockers.docker.vo;

import com.dockers.docker.dto.ShowExperimentDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * 展示所有实验并显示已添加实验
 * @author zxy
 */
@Getter
@Setter
@ToString
public class ShowAddExperimentVO {
    private List<ShowExperimentDTO> experimentDTOS;
    private List<Integer> isSelected;
}
