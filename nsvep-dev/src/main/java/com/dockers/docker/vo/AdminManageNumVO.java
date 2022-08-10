package com.dockers.docker.vo;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AdminManageNumVO {
    private ConcurDockerNumVO dockerNumVO;
    private ConcurrentUsersNumVO usersNumVO;
}
