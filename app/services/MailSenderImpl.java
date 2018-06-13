package services;

import liqp.Template;
import models.OrderDTO;
import models.ShopDTO;
import models.UserDTO;
import org.apache.commons.mail.HtmlEmail;
import play.Play;
import play.libs.Mail;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import javax.mail.Session;
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
//        if (!isDevEnv) {
            HtmlEmail email = new HtmlEmail();
            email.setHostName(shop.domain);
            email.setFrom("wisehandsme@gmail.com");
            System.out.println("AddTo: " + shop.contact.email);
            email.addTo(shop.contact.email);
            email.setSubject(status);

            String templateString = readAllBytesJava7("app/emails/email_form.html");
            Template template = Template.parse(templateString);
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("name", order.name);
            String rendered = template.render(map);

            email.setHtmlMsg(rendered);
            email.setCharset("utf-8");
            Mail.send(email);
//        }
    }

    private static String readAllBytesJava7(String filePath)
    {
        String content = "";
        try
        {
            content = new String ( Files.readAllBytes( Paths.get(filePath) ) );
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return content;
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
