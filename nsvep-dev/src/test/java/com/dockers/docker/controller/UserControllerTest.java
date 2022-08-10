package com.dockers.docker.controller;


import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
//配置事务的回滚,对数据库的增删改都会回滚,便于测试用例的循环利用
class UserControllerTest {
    @Autowired
    protected MockMvc mockMvc;
    @Autowired
    protected WebApplicationContext wac;
    @Autowired
    private WebApplicationContext webApplicationContext;


    @Before()
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();//建议使用这种
    }


    @Test
    void addUser() throws Exception{

        //String requestJson = JSONObject.toJSONString(map);
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/user/adduser")
                .contentType(MediaType.APPLICATION_JSON).param("userAccount","killer1").param("userPassword",
                        "123456").param("userTel","13378906657").param("userImage","logo").param("userName","jack").param(
                        "userNickname","jeff").param("userAcademy","失乐院").param("userClass","石乐志3班").param(
                        "userStudentNumber","2019212217890").param("userEmail","shilezhi@example.com").param("gender","男")
                .param("classId","2")).andExpect(status().isOk()).andDo(print()).andReturn();
        System.out.println("result:"+response.getResponse().getContentAsString());
    }
}