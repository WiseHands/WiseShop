package controllers;

import enums.FeedbackRequestState;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.jsoup.Jsoup;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class OrderFeedbackAPI extends AuthController{

    public static void createFeedback() throws Exception{
        long time = System.currentTimeMillis();
        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        Date date = new Date(time);
        System.out.println("create feedback => " + date + "\n"+ time);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String orderUuid = (String) jsonBody.get("orderUuid");
        OrderDTO order = OrderDTO.findById(orderUuid);

        JSONArray feedbackList = (JSONArray) jsonBody.get("feedbackToOrderItems");

        createFeedbackListForProduct(feedbackList, order, time);
        createFeedbackForOrderItem(feedbackList, order, time);

        JSONObject parseDeliveryFeedback = (JSONObject) jsonBody.get("deliveryFeedback");
        String description = (String) parseDeliveryFeedback.get("description");
        String quality = (String) parseDeliveryFeedback.get("quality");
        FeedbackDTO orderFeedback = new FeedbackDTO(quality, description, time);
        order.orderFeedback = orderFeedback;
        order.feedbackRequestState = FeedbackRequestState.REQUEST_SENT;
        order.save();

        renderJSON(jsonBody);
    }

    private static void createFeedbackListForProduct(JSONArray feedbackList, OrderDTO order, long time) {
        for(int i = 0; i<feedbackList.size(); i++){
            JSONObject parseFeedbackObject = (JSONObject) feedbackList.get(i);

            String productUuid = (String) parseFeedbackObject.get("uuid");
            String quality = (String) parseFeedbackObject.get("quality");
            String review = (String) parseFeedbackObject.get("review");

            ProductDTO product = ProductDTO.findById(productUuid);
            if (product != null){
                FeedbackDTO feedback = new FeedbackDTO(quality, review, order.name, time);
                product.addFeedback(feedback);
                product.save();
            }
        }
    }

    private static void createFeedbackForOrderItem(JSONArray feedbackList, OrderDTO order, long time) {
        for(int i = 0; i<feedbackList.size(); i++){
            JSONObject parseFeedbackObject = (JSONObject) feedbackList.get(i);
            String productUuid = (String) parseFeedbackObject.get("uuid");
            String quality = (String) parseFeedbackObject.get("quality");
            FeedbackDTO feedback = new FeedbackDTO(quality, time);
            for(OrderItemDTO item: order.items){
                if (item.productUuid.equals(productUuid)){
                    item.feedbackToOrderItem = feedback;
                    item.save();
                }
            }
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

//        ProductDTO product = ProductDTO.findById(productUuid);
//        if (product != null){
//            List<FeedbackDTO> feedbackList = product.feedbackList;
//            renderJSON(json(feedbackList));
//        }
        ok();

    }

    public static void getFeedbackListForShop(){
        String shopUuid = request.params.get("uuid");
        ShopDTO shop = ShopDTO.findById(shopUuid);
        List<ProductDTO> productList = shop.productList;
        renderJSON(json(productList));
    }


}
