package com.dockers.docker.param;

import com.dockers.docker.annotation.ParamValidate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminLoginParam {
    @ParamValidate(name = "管理员账号", required = true)
    private String adminAccount;
    @ParamValidate(name = "管理员密码", required = true)
    private String adminPassword;

    public AdminLoginParam() {
    }
}
