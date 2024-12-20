package controllers;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.i18n.Messages;
import responses.JsonResponse;
import services.MailSender;
import services.MailSenderImpl;
import services.SmsSender;
import services.SmsSenderImpl;

import java.util.ArrayList;
import java.util.List;

public class EmailAPI extends AuthController {

    static MailSender mailSender = new MailSenderImpl();
    static SmsSender smsSender = new SmsSenderImpl();

    public static void sendEmailToAdmins() throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String name = (String) jsonBody.get("name");
        String company = (String) jsonBody.get("company");
        String phone = (String) jsonBody.get("phone");
        String email = (String) jsonBody.get("email");

        String message = "Доброї години доби. Мене звати "
                + name + ", і я представляю " + company + ", телефонуйте мені за номером: " + phone + " або напишіть емейл " + email;

        String[] phoneNumbers = {"380936484003", "380638200123", "380630386173", "380938864304"};

        try {
            for(String number: phoneNumbers){
                smsSender.sendSms(number, message);
            }
            mailSender.sendContactUsEmail(message);
            String reason = "Your email was send successfully.";
            JsonResponse jsonResponse = new JsonResponse(421, reason);
            renderJSON(jsonResponse);
        } catch (Exception e) {
            System.out.println("ContactAPI create mailSender error" + e.getCause() + e.getStackTrace());
            String reason = "Sorry, have some problem";
            JsonResponse jsonResponse = new JsonResponse(420, reason);
            renderJSON(jsonResponse);
        }




        System.out.println("sendEmailToAdmins -> " + name + company + phone + email);

    }

}
