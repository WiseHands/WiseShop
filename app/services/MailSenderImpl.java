package services;

import models.OrderDTO;
import models.ShopDTO;
import models.UserDTO;
import org.apache.commons.mail.SimpleEmail;
import play.Play;
import play.libs.Mail;

public class MailSenderImpl implements MailSender {
    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

    public void sendEmail(ShopDTO shop, OrderDTO order, String status) throws Exception {
        if (!isDevEnv) {
            SimpleEmail email = new SimpleEmail();
            email.setCharset("UTF-16");
            email.setFrom("noreply@" + shop.domain);
            System.out.println("AddTo: " + shop.contact.email);
            email.addTo(shop.contact.email);
            email.setSubject(status);
            email.setMsg(order.toString());
            Mail.send(email);
        }
    }

    public void sendEmailToInvitedUser(ShopDTO shop, UserDTO user) throws Exception {
        if (!isDevEnv) {
            String loginUrl = "http://";
            if(isDevEnv) {
                loginUrl += "localhost:3334/";
            } else {
                loginUrl += "wisehands.me/";
            }

            SimpleEmail email = new SimpleEmail();
            email.setCharset("UTF-16");
            email.setFrom("noreply@" + shop.domain);
            email.addTo(user.email);
            email.setSubject(shop.shopName + ". Вас було додано в адмін панелі магазину");
            email.setMsg("Вітаємо, \n" + ". Вас було додано в адмін панелі магазину\n " + loginUrl);
            Mail.send(email);
        }
    }
}
