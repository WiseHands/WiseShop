package services;

import models.OrderDTO;
import models.ShopDTO;
import models.UserDTO;
import org.apache.commons.mail.SimpleEmail;
import play.libs.Mail;

public class MailSenderImpl implements MailSender {
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
}
