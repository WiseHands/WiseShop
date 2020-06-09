package controllers;

import enums.FeedbackRequestState;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.jsoup.Jsoup;

import java.util.ArrayList;
import java.util.List;

public class OrderFeedbackAPI extends AuthController{

    static long time = System.currentTimeMillis();


    public static void createFeedback() throws Exception{
        System.out.println("create feedback => " + time);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String orderUuid = (String) jsonBody.get("orderUuid");
        OrderDTO order = OrderDTO.findById(orderUuid);

        JSONArray feedbackList = (JSONArray) jsonBody.get("feedbackToOrderItems");

        createFeedbackListForProduct(feedbackList, order);
        createFeedbackForOrderItem(feedbackList, order);

        JSONObject parseDeliveryFeedback = (JSONObject) jsonBody.get("deliveryFeedback");
        String description = (String) parseDeliveryFeedback.get("description");
        String quality = (String) parseDeliveryFeedback.get("quality");
        FeedbackDTO orderFeedback = new FeedbackDTO(quality, description, time);
        order.orderFeedback = orderFeedback;
        order.feedbackRequestState = FeedbackRequestState.REQUEST_SENT;
        order.save();

        renderJSON(jsonBody);
    }

    private static void createFeedbackListForProduct(JSONArray feedbackList, OrderDTO order) {
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

    private static void createFeedbackForOrderItem(JSONArray feedbackList, OrderDTO order) {
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

    public static void hideFeedback(){
        String feedbackUuid = request.params.get("uuid");
        FeedbackDTO feedback = FeedbackDTO.findById(feedbackUuid);
        feedback.hideReview = true;
        feedback.save();
        renderJSON(json(feedback));

    }

    public static void getFeedbackListForProduct(){
        String productUuid = request.params.get("uuid");
        ProductDTO product = ProductDTO.findById(productUuid);
        List<FeedbackDTO> feedbackList = product.feedbackList;
        renderJSON(json(feedbackList));

    }

    public static void getFeedbackListForShop(){
        String shopUuid = request.params.get("uuid");
        ShopDTO shop = ShopDTO.findById(shopUuid);
        List<ProductDTO> productList = shop.productList;
        renderJSON(json(productList));
    }


}
