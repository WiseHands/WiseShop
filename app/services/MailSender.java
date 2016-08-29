package services;

import models.OrderDTO;
import models.ShopDTO;

public interface MailSender {
    void sendEmail(ShopDTO shop, OrderDTO order, String status) throws Exception;
}
