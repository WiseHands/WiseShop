package controllers;

import enums.FeedbackRequestState;
import liqp.Template;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import play.Play;
import play.i18n.Lang;
import play.i18n.Messages;
import services.MailSender;
import services.MailSenderImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

public class OrderFeedbackAPI extends AuthController{

    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));
    static MailSender mailSender = new MailSenderImpl();

    public static void createFeedback(String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        int orderListSize = OrderDTO.find("byShop", shop).fetch().size();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        long time = System.currentTimeMillis();
        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        Date date = new Date(time);
        System.out.println("create feedback => " + date + "\n"+ time);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String orderUuid = (String) jsonBody.get("orderUuid");
        OrderDTO order = OrderDTO.find("byUuid", orderUuid).first();

        //mailSender.sendNotificationToAdminAboutFeedback(shop, order, Messages.get("feedback.email.notification.to.admin.about.new.feedback", shop.shopName, order.name));
        //String subject = Messages.get("feedback.email.notification.to.admin.about.new.feedback");
        String htmlContent = generateHtmlEmailForNotificationToAdminAboutFeedback(shop, order, shop.locale);
        String subject = Messages.get("mail.label.order") + ' ' + Messages.get("mail.label.number") + orderListSize + ' ' + '|' + ' ' + shop.shopName;
        List<String> emailList = new ArrayList<>();
        emailList.add(shop.contact.email);
        mailSender.sendEmail(emailList, subject, htmlContent, shop.domain);

        JSONArray feedbackList = (JSONArray) jsonBody.get("feedbackToOrderItems");

        createFeedbackListForProductAndOrderItem(feedbackList, order, time);

        JSONObject parseDeliveryFeedback = (JSONObject) jsonBody.get("deliveryFeedback");
        String description = (String) parseDeliveryFeedback.get("description");
        String quality = (String) parseDeliveryFeedback.get("quality");
        FeedbackDTO orderFeedback = new FeedbackDTO(quality, description, time);
        orderFeedback.showReview = false;

        order.orderFeedback = orderFeedback;
        order.feedbackRequestState = FeedbackRequestState.REQUEST_SENT;
        order.save();

        renderJSON(jsonBody);
    }

    private static String generateHtmlEmailForNotificationToAdminAboutFeedback(ShopDTO shop, OrderDTO order, String changeLanguage) {
        String templateString = MailSenderImpl.readAllBytesJava7("app/emails/email_notification _about_new_feedback_to_admin.html");
        Template template = Template.parse(templateString);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("shopName", shop.shopName);
        map.put("orderUuid", order.uuid);

        String path = shop.domain;
        if(isDevEnv) {
            path = path + ":3334";
        }
        map.put("shopDomain", path);

        Lang.change(changeLanguage);
        String feedback = Messages.get("feedback.email.feedback", order.name);
        map.put("feedback", feedback);

        String revise = Messages.get("feedback.email.revise");
        map.put("revise", revise);

        String rendered = template.render(map);
        return rendered;
    }

    private static void createFeedbackListForProductAndOrderItem(JSONArray feedbackList, OrderDTO order, long time) {
        for(int i = 0; i<feedbackList.size(); i++){
            JSONObject parseFeedbackObject = (JSONObject) feedbackList.get(i);

            String productUuid = (String) parseFeedbackObject.get("uuid");
            String quality = (String) parseFeedbackObject.get("quality");
            String review = (String) parseFeedbackObject.get("review");

            FeedbackDTO feedback = new FeedbackDTO(quality, time, review);
            ProductDTO product = ProductDTO.findById(productUuid);
            if (product != null){
                feedback.productUuid = product.uuid;
                feedback.customerName = order.name;
                feedback.customerMail = order.email;
                product.addFeedback(feedback);
                product.save();
            }

            for(OrderItemDTO item: order.items){
                if (item.productUuid.equals(productUuid)){
                    item.feedbackToOrderItem = feedback;
                    item.save();
                }
            }
            feedback.save();
        }
    }

    public static void getOrderFeedback(){
        String orderUuid = request.params.get("uuid");
        OrderDTO order = OrderDTO.findById(orderUuid);
        List<ProductDTO> productList = new ArrayList<ProductDTO>();
        for(OrderItemDTO orderItem: order.items){
            ProductDTO product = ProductDTO.findById(orderItem.productUuid);
            productList.add(product);
        }
        renderJSON(json(productList));

    }

    public static void showReview(){
        String feedbackUuid = request.params.get("uuid");
        FeedbackDTO feedback = FeedbackDTO.findById(feedbackUuid);
        feedback.showReview = true;
        feedback.save();
        System.out.println("showReview  => " + feedback.showReview);
        renderJSON(json(feedback));
    }

    public static void hideReview(){
        String feedbackUuid = request.params.get("uuid");
        FeedbackDTO feedback = FeedbackDTO.findById(feedbackUuid);
        feedback.showReview = false;
        feedback.save();
        System.out.println("hideReview => " + feedback.showReview);
        renderJSON(json(feedback));
    }

    public static void getFeedbackListForProduct(){
        String productUuid = request.params.get("uuid");
        ProductDTO product = ProductDTO.findById(productUuid);
        List<FeedbackDTO> feedbackList = new ArrayList<FeedbackDTO>();
        for (FeedbackDTO feedback: product.feedbackList){
            if (feedback.showReview){
                feedbackList.add(feedback);
            }
        }
       renderJSON(json(feedbackList));
    }

//    TODO change query for feedback where feedback.showReview = true;
    public static void getFeedbackListForShop(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        List<FeedbackDTO> feedbackList;
        String query = "select f from FeedbackDTO f WHERE productUuid IN (SELECT uuid FROM ProductDTO where shop_uuid = ?1) order by f.feedbackTime asc";
        feedbackList = FeedbackDTO.find(query, shop.uuid).fetch();
        System.out.println("feedbackList " + feedbackList.size());
        renderJSON(json(feedbackList));
    }

    public static void getOrderListWhereFeedbackRequestSent(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        List <OrderDTO> orderList = getOrderListWhereFeedbackSent(shop);
        renderJSON(json(orderList));
    }

    public static List<OrderDTO> getOrderListWhereFeedbackSent(ShopDTO shop){
        List<OrderDTO> orderList;
        String query = "select o from OrderDTO o where o.feedbackRequestState = 'REQUEST_SENT' and shop_uuid = ?1 order by o.time asc";
        orderList = OrderDTO.find(query, shop.uuid).fetch();
        return orderList;
    }

    public static void showFeedbackFromOrder(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String orderUuid = request.params.get("uuid");
        OrderDTO order = OrderDTO.find("byUuid", orderUuid).first();
        order.orderFeedback.showReview = true;
        for(OrderItemDTO item: order.items){
            item.feedbackToOrderItem.showReview = true;
        }
        order.save();
        renderJSON(json(order));
    }

    public static void hideFeedbackFromOrder(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String orderUuid = request.params.get("uuid");
        OrderDTO order = OrderDTO.find("byUuid", orderUuid).first();

        order.orderFeedback.showReview = false;
        for(OrderItemDTO item: order.items){
            item.feedbackToOrderItem.showReview = false;
        }
        order.save();
        renderJSON(json(order));
    }

    public static void deleteFeedbackFromOrder(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String orderUuid = request.params.get("uuid");
        OrderDTO order = OrderDTO.find("byUuid", orderUuid).first();

        order.feedbackRequestState = FeedbackRequestState.DELETED;
        order.orderFeedback.isFeedbackDeleted = true;
        for(OrderItemDTO item: order.items){
            item.feedbackToOrderItem.isFeedbackDeleted = true;
            item.feedbackToOrderItem.showReview = false;
        }
        order.save();
        renderJSON(json(order));
    }

    public static void restoreFeedbackForOrder(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String orderUuid = request.params.get("uuid");
        OrderDTO order = OrderDTO.find("byUuid", orderUuid).first();

        order.feedbackRequestState = FeedbackRequestState.REQUEST_SENT;
        order.orderFeedback.isFeedbackDeleted = true;
        for(OrderItemDTO item: order.items){
            item.feedbackToOrderItem.isFeedbackDeleted = false;
            item.feedbackToOrderItem.showReview = false;
        }
        order.save();
        renderJSON(json(order));
    }




}
