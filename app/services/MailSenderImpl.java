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
        SimpleEmail email = new SimpleEmail();
        email.setCharset("UTF-16");
        email.setFrom("noreply@" + shop.domain);
        for (UserDTO user : shop.userList) {
            System.out.println("AddTo: " + user.email);
            email.addTo(user.email);
        }
        email.setSubject(status);
        email.setMsg(order.toString());
        Mail.send(email);
    }

    public void sendEmailToInvitedUser(ShopDTO shop, UserDTO user) throws Exception {
        String loginUrl = "http://";
        if(isDevEnv) {
            loginUrl += "localhost:3334/login";
        } else {
            loginUrl += "wisehands.me/login";
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
