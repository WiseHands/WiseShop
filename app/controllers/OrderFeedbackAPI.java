package controllers;

import models.FeedbackDTO;
import models.OrderDTO;
import models.OrderItemDTO;
import models.ProductDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.ArrayList;
import java.util.List;

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
            System.out.println("productUuid => " + productUuid);
            String quality = (String) parseFeedbackObject.get("quality");

            ProductDTO product = ProductDTO.findById(productUuid);
            if (product != null){
                FeedbackDTO feedback = new FeedbackDTO(quality, time);
                product.addFeedback(feedback);
                product.save();
            }

        }

        JSONObject parseDeliveryFeedback = (JSONObject) jsonBody.get("deliveryFeedback");
        String description = (String) parseDeliveryFeedback.get("description");
        String quality = (String) parseDeliveryFeedback.get("quality");
        String orderUuid = (String) jsonBody.get("orderUuid");
        OrderDTO order = OrderDTO.findById(orderUuid);
        order.save();

        renderJSON(jsonBody);
    }

    public static void getOrderFeedback(){
        String orderUuid = request.params.get("uuid");
        System.out.println("uuid " + orderUuid);
        OrderDTO order = OrderDTO.findById(orderUuid);
        List<ProductDTO> productList = new ArrayList<ProductDTO>();
        for(OrderItemDTO orderItem: order.items){
            ProductDTO product = ProductDTO.findById(orderItem.productUuid);
            productList.add(product);
        }
        renderJSON(json(productList));

    }
//
//    public static void getFeedbackListForProduct(uuid product){
//
//    }
//
//    public static void getFeedbackListForShop(uuid shop){
//
//    }


}
