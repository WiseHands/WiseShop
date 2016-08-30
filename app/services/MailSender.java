package services;

import models.OrderDTO;
import models.ShopDTO;
import models.UserDTO;

public interface MailSender {
    void sendEmail(ShopDTO shop, OrderDTO order, String status) throws Exception;
    void sendEmailToInvitedUser(ShopDTO shop, UserDTO user) throws Exception;
}
