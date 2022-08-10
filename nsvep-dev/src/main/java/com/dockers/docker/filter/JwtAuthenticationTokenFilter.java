//package com.dockers.docker.filter;
//
//import com.auth0.jwt.interfaces.Claim;
//import com.dockers.docker.exception.AuthenticException;
//import com.dockers.docker.utils.IpUtil;
//import com.dockers.docker.utils.JwtTokenUtil;
//import com.dockers.docker.utils.RedisUtil;
//import com.dockers.docker.vo.Result;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.util.ObjectUtils;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.OutputStream;
//import java.nio.charset.StandardCharsets;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
///**
// * @author zxy
// */
//@Component
//public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
//
//    @Value("${token.header}")
//    private String header;
//    @Autowired
//    RedisUtil redisUtil;
//
//    private static final String ID = "userId";
//    private static final String NAME = "userName";
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        List<String> doNotFilter = new ArrayList<>();
//        //放行主页面、管理端、密码找回、注册、文件下载
//        doNotFilter.add("index.html");
//        doNotFilter.add("/login");
//        doNotFilter.add("/admin");
//        doNotFilter.add("/stu/forget");
//        doNotFilter.add("/stu/adduser");
//        doNotFilter.add("/stu/file/download");
//        for(String s:doNotFilter){
//            if(request.getRequestURL().indexOf(s) != -1){
//                filterChain.doFilter(request,response);
//                return;
//            }
//        }
//        String token = getToken(request);
//        if(token == null){
//            logger.warn("无Token用户"+ IpUtil.getIpAddr(request));
//            return;
//        }
//
////        验证有效性
//        try{
//            JwtTokenUtil.verifyToken(token);
////        取得存储值
//        Map<String, Claim> stringClaimMap = JwtTokenUtil.parseToken(token);
//        String uId = stringClaimMap.get(ID).asString();
//        String uName = stringClaimMap.get(NAME).asString();
////        判断取出来的值不为空
//        if(!ObjectUtils.isEmpty(uId) && !StringUtils.isEmpty(uName)){
////            从缓存中拿数据
//            String userName = (String) redisUtil.get(uId);
//            if(!StringUtils.isEmpty(userName)) {
//                if (uName.equals(userName)) {
//                    filterChain.doFilter(request, response);
//                }else{
//                    constructResponse(response,new AuthenticException("身份异常"));
//                }
//            }else{
//                constructResponse(response,new AuthenticException("请先获取访问令牌"));
//            }
//            return;
//        }
//        filterChain.doFilter(request,response);
//        }catch (AuthenticException e){
//            constructResponse(response,e);
//        }
//    }
//
//    private String getToken(HttpServletRequest request){
//        return request.getHeader("token");
//    }
//
//    public String convertObjectToJson(Object object) throws JsonProcessingException {
//        if (object == null) {
//            return null;
//        }
//        ObjectMapper mapper = new ObjectMapper();
//        return mapper.writeValueAsString(object);
//    }
//
//    /**
//     * 构造返回参数
//     * @param response 返回的参数
//     * @param e 异常
//     * @throws IOException 读写异常
//     */
//    public void constructResponse(HttpServletResponse response,AuthenticException e) throws IOException {
//        response.setContentType("application/json; charset=utf-8");
//        response.setCharacterEncoding("UTF-8");
//        String errorJson = convertObjectToJson(Result.fail(e.getMessage(),e.getStatus()));
//        OutputStream out = response.getOutputStream();
//        out.write(errorJson.getBytes(StandardCharsets.UTF_8));
//        out.flush();
//    }
//}