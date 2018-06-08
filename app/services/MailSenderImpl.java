package services;

import models.OrderDTO;
import models.ShopDTO;
import models.UserDTO;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.SimpleEmail;
import play.Play;
import play.i18n.Messages;
import play.libs.Mail;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailSenderImpl implements MailSender {
    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));
    private static final String gmailUsername = Play.configuration.getProperty("mail.smtp.user");
    private static final String gmailPass = Play.configuration.getProperty("mail.smtp.pass");

    static Properties mailServerProperties;
    static Session getMailSession;
    static MimeMessage generateMailMessage;

    public void sendEmail(ShopDTO shop, OrderDTO order, String status) throws Exception {
        System.out.println("MailSenderImpl " + isDevEnv + status + shop.contact.email);
        if (!isDevEnv) {
            HtmlEmail email = new HtmlEmail();
            email.setHostName(shop.domain);
            email.setFrom("wisehandsme@gmail.com");
            System.out.println("AddTo: " + shop.contact.email);
            email.addTo(shop.contact.email);
            email.setSubject(status);
            email.setHtmlMsg(order.toString());
            Mail.send(email);
        }
    }

    public void sendEmailToInvitedUser(ShopDTO shop, UserDTO user) throws Exception {
//        if (!isDevEnv) {
//            String loginUrl = "http://";
//            if(isDevEnv) {
//                loginUrl += "localhost:3334/";
//            } else {
//                loginUrl += "wisehands.me/";
//            }
//
//            HtmlEmail email = new HtmlEmail();
//            email.setHostName(shop.domain);
//            email.setFrom("noreply@" + shop.domain);
//            email.addTo(user.email);
//
//            String title = Messages.get("user.added.to.shop.email.title", shop.shopName);
//            email.setSubject(title);
//            String msg = Messages.get("user.added.to.shop.email", shop.shopName);
//            email.setMsg(msg);
//
//            Mail.send(email);
//        }
    }
}
