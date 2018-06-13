package controllers;

import models.*;
import org.json.simple.JSONObject;
import play.i18n.Messages;
import services.SmsSender;
import services.SmsSenderImpl;

import javax.inject.Inject;
import java.util.Random;

public class SmsVerificationAPI extends AuthController {
    static SmsSender smsSender = new SmsSenderImpl();

    public static void generateSmsVerificationCode(String phoneNumber) throws Exception {
        UserDTO user = UserDTO.find("byPhone", phoneNumber).first();
        if(user != null) {
            String reason = Messages.get("user.with.phone.number.already.exist");
            forbidden(reason);
        }

        Random r = new Random();
        SmsVerificationDTO smsVerificationDTO = new SmsVerificationDTO();
        smsVerificationDTO.phoneNumber = phoneNumber;
        String code = String.valueOf(r.nextInt(10)) + String.valueOf(r.nextInt(10)) + String.valueOf(r.nextInt(10)) + String.valueOf(r.nextInt(10));
        smsVerificationDTO.code = Integer.parseInt(code);
        smsVerificationDTO.save();

        String msg = Messages.get("verification.code", String.valueOf(smsVerificationDTO.code));

        smsSender.sendSms(phoneNumber, msg);
        ok();
    }

    public static void verifySmsCode(Integer code) throws Exception {
        Random r = new Random();
        SmsVerificationDTO smsVerificationDTO = SmsVerificationDTO.find("byCode", code).first();
        if(smsVerificationDTO == null) {
            String msg = Messages.get("wrong.verification.code");
            JSONObject jo = new JSONObject();
            jo.put("status", "error");
            jo.put("reason", msg);
            System.out.println(jo.toJSONString());
            error(jo.toJSONString());
        }
        ok();
    }


}