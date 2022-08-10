package com.dockers.docker.param;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

/**
 * @author zxy
 */
@Setter
@Getter
@ToString
public class UserIdParam {
    ArrayList<Integer> userIds;
}
