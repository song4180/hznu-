package com.dockers.docker.service.impl;

import com.dockers.docker.exception.ServiceException;
import com.dockers.docker.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * @author zxy
 */
@Service("emailService")
public class EmailServiceImpl implements EmailService {

    @Autowired
    JavaMailSender javaMailSender;


    @Async
    @Override
    public void passFound(int num, String userEmail) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper;
            messageHelper = new MimeMessageHelper(message,  true);
            messageHelper.setTo(userEmail);
            messageHelper.setFrom("security514@126.com");
            messageHelper.setSubject("实验平台密码找回验证");
            String sb = "<table width='700'  border='0'  align='center'  cellspacing='0'  style='width:700px;'>" +
                    "<tbody><tr><td><div style='width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;'><table border='0'  cellpadding='0'  cellspacing='0'  width='700'  height='39'  style='font:12px Tahoma, Arial, 宋体;'><tbody><tr><td width='210'></td></tr></tbody></table></div>" + "<div style=\"width:680px;padding:0 10px;margin:0 auto;\">\n" + "                <div style=\"line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;\">\n" + "                    <strong style=\"display:block;margin-bottom:15px;\">\n" + "                        亲爱的用户：\n" + "                        <span style=\"color:#f60;font-size: 16px;\"></span>您好！\n" + "                    </strong>\n" + "\n" + "                    <strong style=\"display:block;margin-bottom:15px;\">\n" + "                        您正在修改密码，请在验证码输入框中输入：\n" + "                        <span style=\"color:green;font-size: 24px\">" + num + "</span>，以完成操作。\n" + "                    </strong>\n" + "                </div>" +
                    "<div style=\"margin-bottom:30px;\">\n" +
                    "                    <small style=\"display:block;margin-bottom:20px;font-size:12px;\">\n" +
                    "                        <p style=\"color:#747474;\">\n" +
                    "                            注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全\n" +
                    "                            <br/>（工作人员不会向你索取此验证码，请勿泄漏！)\n" +
                    "                        </p>\n" +
                    "                    </small>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "            <div style=\"width:700px;margin:0 auto;\">\n" +
                    "                <div style=\"padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;\">\n" +
                    "                    <p>此为系统邮件，请勿回复<br/>\n" +
                    "                        请保管好您的邮箱，避免账号被他人盗用\n" +
                    "                    </p>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </td>\n" +
                    "    </tr>\n" +
                    "    </tbody>\n" +
                    "</table>";
            messageHelper.setText(sb,true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new ServiceException("邮件发送异常");
        }
    }
}

