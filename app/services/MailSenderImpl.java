package services;

import liqp.Template;
import models.CoinAccountDTO;
import models.OrderDTO;
import models.ShopDTO;
import models.UserDTO;
import org.apache.commons.mail.HtmlEmail;
import play.Play;
import play.i18n.Lang;
import play.i18n.Messages;
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
        //System.out.println("MailSenderImpl " + isDevEnv + status + shop.contact.email);
//        if (!isDevEnv) {
            HtmlEmail email = new HtmlEmail();
            email.setHostName(shop.domain);
            email.setFrom("wisehandsme@gmail.com");
            //System.out.println("AddTo: " + shop.contact.email);
            email.addTo(shop.contact.email);
            email.setSubject(status);

            String templateString = readAllBytesJava7("app/emails/email_form.html");
            Template template = Template.parse(templateString);
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("name", order.name);
            map.put("phone", order.phone);
            map.put("deliveryType", order.deliveryType);
            map.put("address", order.clientCity);
            map.put("total", order.total);

            Lang.change(shop.locale);
            String labelName = Messages.get("mail.label.name");
            map.put("labelName", labelName);
            String labelPhone = Messages.get("mail.label.phone");
            map.put("labelPhone", labelPhone);
            String labelDelivery = Messages.get("mail.label.delivery");
            map.put("labelDelivery", labelDelivery);
            String labelAddress = Messages.get("mail.label.address");
            map.put("labelAddress", labelAddress);
            String labelTotal = Messages.get("mail.label.total");
            map.put("labelTotal", labelTotal);
            String labelNewOrder = Messages.get("mail.label.neworder");
            map.put("labelNewOrder", labelNewOrder);
            String labelDetails = Messages.get("mail.label.details");
            map.put("labelDetails", labelDetails);
            String orderLink = String.format("https://%s/admin#/details/%s", shop.domain, order.uuid);
            map.put("orderLink", orderLink);
            String labelComment = Messages.get("mail.label.comment");
            map.put("labelComment", labelComment);
            map.put("comment", order.comment);


        String rendered = template.render(map);

            email.setHtmlMsg(rendered);
            email.setCharset("utf-8");
            Mail.send(email);
    }

    public void sendEmailLowShopBalance(ShopDTO shop, String status) throws Exception {
        //System.out.println("MailSenderImpl " + isDevEnv + status + shop.contact.email);
//        if (!isDevEnv) {
        HtmlEmail email = new HtmlEmail();
        email.setHostName(shop.domain);
        email.setFrom("wisehandsme@gmail.com");
        //System.out.println("AddTo: " + shop.contact.email);
        email.addTo(shop.contact.email);
        email.setSubject(status);

        String templateString = readAllBytesJava7("app/emails/email_low_shop_balance.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("shopName", shop.shopName);
        map.put("balance", shop.coinAccount.balance);

        Lang.change(shop.locale);
        String lowBalanceLabel = Messages.get("balance.transaction.low.shop.balance");
        map.put("lowBalanceLabel", lowBalanceLabel);

        String shopBalanceLabel = Messages.get("shop.balance");
        map.put("shopBalanceLabel", shopBalanceLabel);
        String currencyLabel = Messages.get("shop.balance.currency");
        map.put("currencyLabel", currencyLabel);



        String rendered = template.render(map);

        email.setHtmlMsg(rendered);
        email.setCharset("utf-8");
        Mail.send(email);
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

    public void sendContactUsEmail(String message) throws Exception {
        HtmlEmail email = new HtmlEmail();
        email.setHostName("wstore.pro");
        email.setFrom("wisehandsme@gmail.com");
        email.addTo("bohdaq@gmail.com");
        System.out.println("AddTo: " + "bohdaq@gmail.com");
        email.setSubject("Нове повідомлення");

        String templateString = readAllBytesJava7("app/emails/contact_us_email_form.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("label", message);

        String rendered = template.render(map);

        email.setHtmlMsg(rendered);
        email.setCharset("utf-8");
        Mail.send(email);
    }
}
