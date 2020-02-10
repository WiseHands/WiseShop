package controllers;

import services.MailSender;
import services.MailSenderImpl;

public class LandingContactFormAPI extends AuthController {

    static MailSender mailSender = new MailSenderImpl();

    public static void sendContactUsEmail(String client) throws Exception {
//        String userEmail = request.params.get("userEmail");
//        String message = request.params.get("message");
//        mailSender.sendContactUsEmail(userEmail, message);
        ok();
    }


}
