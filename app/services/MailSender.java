package services;

import models.OrderDTO;
import models.ProductDTO;
import models.ShopDTO;
import models.UserDTO;

import java.util.List;

public interface MailSender {
    void sendEmail(List<String> emailList, String status, String htmlContent, String hostname) throws Exception;
    void sendEmailLowShopBalance(ShopDTO shop, String status) throws Exception;
    void sendEmailCommentForFeedback(ShopDTO shop, String customerMail, String customerName, ProductDTO product, String status) throws Exception;
    //void sendNotificationToAdminAboutFeedback(ShopDTO shop, OrderDTO order, String status) throws Exception;
    void sendEmailToInvitedUser(ShopDTO shop, UserDTO user) throws Exception;
    void sendContactUsEmail(String message) throws Exception;

}
