package com.dockers.docker.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.dockers.docker.exception.AuthenticException;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * @author zgx
 */
public class JwtTokenUtil {
    /**
     * 密钥
     */
    public static final String SECRET = "sdjhakdhajdklsl;o653632";
    /**
     * 过期时间:秒 12小时
     */
    public static final int EXPIRE_TIME = 24*60*60;

    /**
     * 生成Token
     *
     * @param userId   用户id
     * @param userName 用户名
     * @return 生成的token字符串
     */
    public static String createToken(String userId, String userName) {
        Calendar nowTime = Calendar.getInstance();
        nowTime.add(Calendar.SECOND, EXPIRE_TIME);
        Date expireTime = nowTime.getTime();

        Map<String, Object> map = new HashMap<>(2);
        map.put("alg", "HS256");
        map.put("typ", "JWT");

        String token = JWT.create()
                .withClaim("userId", userId)
                .withClaim("userName", userName)
                //签名时间
                .withIssuedAt(new Date())
                //过期时间
                .withExpiresAt(expireTime)
                //签名
                .sign(Algorithm.HMAC256(SECRET));
        return token;
    }

    /**
     * 验证Token
     *
     * @param token 传入要验证的token
     * @return 返回token解析出来的值
     * @throws Exception token过期抛出异常
     */
    public static Map<String, Claim> verifyToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
        DecodedJWT jwt;
        try {
            jwt = verifier.verify(token);
        } catch (Exception e) {
            throw new AuthenticException("凭证已过期，请重新登录");
        }
        return jwt.getClaims();
    }

    /**
     * 解析 Token
     *
     * @param token 传入要解析的token
     * @return 返回token解析出来的值
     */
    public static Map<String, Claim> parseToken(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        return decodedJWT.getClaims();
    }


}

