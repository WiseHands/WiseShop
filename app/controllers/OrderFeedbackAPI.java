package controllers;

import models.FeedbackDTO;
import models.OrderDTO;
import models.ProductDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class OrderFeedbackAPI extends AuthController{

    public static void createFeedback() throws Exception{
        long time = System.currentTimeMillis() / 1000L;

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("createFeedbackFromClient : " + jsonBody);

        JSONArray feedbackList = (JSONArray) jsonBody.get("feedbackToOrderItems");
        for(int i = 0; i<feedbackList.size(); i++){
            JSONObject parseFeedbackObject = (JSONObject) feedbackList.get(i);

            String productUuid = (String) parseFeedbackObject.get("uuid");
            String description = (String) parseFeedbackObject.get("description");
            String quality = (String) parseFeedbackObject.get("quality");

            ProductDTO product = ProductDTO.findById(productUuid);
            if (product != null){
                FeedbackDTO feedback = new FeedbackDTO(description, quality, time);
                product.addFeedback(feedback);
                product.save();
            }

        }

        JSONObject parseDeliveryFeedback = (JSONObject) jsonBody.get("deliveryFeedback");
        String description = (String) parseDeliveryFeedback.get("description");
        String quality = (String) parseDeliveryFeedback.get("quality");
        FeedbackDTO feedback = new FeedbackDTO(description, quality, time);

        String orderUuid = (String) jsonBody.get("orderUuid");
        OrderDTO order = OrderDTO.findById(orderUuid);
        order.orderFeedback = feedback;
        order.save();

        renderJSON(jsonBody);
    }

//    public static void getOrderFeedback(uuid order){
//
//    }
//
//    public static void getFeedbackListForProduct(uuid product){
//
//    }
//
//    public static void getFeedbackListForShop(uuid shop){
//
//    }


}
