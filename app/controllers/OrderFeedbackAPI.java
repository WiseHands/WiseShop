package controllers;

import enums.FeedbackRequestState;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import play.i18n.Messages;
import services.MailSender;
import services.MailSenderImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderFeedbackAPI extends AuthController{

    static MailSender mailSender = new MailSenderImpl();

    public static void createFeedback(String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
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
        OrderDTO order = OrderDTO.findById(orderUuid);

        mailSender.sendNotificationToAdminAboutFeedback(shop, order, Messages.get("feedback.email.notification.to.admin.about.new.feedback", shop.shopName, order.name));

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
        OrderDTO order = OrderDTO.findById(orderUuid);
        order.orderFeedback.showReview = true;
        for(OrderItemDTO item: order.items){
            item.feedbackToOrderItem.showReview = true;
            System.out.println("item.feedbackToOrderItem.showReview = " + item.feedbackToOrderItem.showReview);
        }
        order.save();
        Boolean isSingleOrder = Boolean.valueOf(request.params.get("isSingle"));
        if(isSingleOrder){
            renderJSON(json(order));
        }

        List <OrderDTO> orderList = getOrderListWhereFeedbackSent(shop);
        renderJSON(json(orderList));
    }

    public static void hideFeedbackFromOrder(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String orderUuid = request.params.get("uuid");
        Boolean isSingle = Boolean.valueOf(request.params.get("isSingle"));

        OrderDTO order = OrderDTO.findById(orderUuid);
        order.orderFeedback.showReview = false;
        for(OrderItemDTO item: order.items){
            item.feedbackToOrderItem.showReview = false;
        }
        order.save();
        if(isSingle){
            renderJSON(json(order));
        }
        List <OrderDTO> orderList = getOrderListWhereFeedbackSent(shop);
        renderJSON(json(orderList));
    }


    public static void deleteFeedbackFromOrder(String client){
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String orderUuid = request.params.get("uuid");
        Boolean isSingle = Boolean.valueOf(request.params.get("isSingle"));
        System.out.println("deleteFeedbackFromOrder " + orderUuid);

        OrderDTO order = OrderDTO.findById(orderUuid);
        order.feedbackRequestState = null;
        order.orderFeedback.delete();
        System.out.println("feedback.delete();");
        for(OrderItemDTO item: order.items){
            item.feedbackToOrderItem.delete();
        }
        order.save();
        if(isSingle){
            System.out.println("deleteFeedbackFromOrder " + orderUuid + "\n" + isSingle);
            renderJSON(json(order));
        }
        List <OrderDTO> orderList = getOrderListWhereFeedbackSent(shop);
        renderJSON(json(orderList));

    }




}
