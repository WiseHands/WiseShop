package controllers;

import models.DeliveryDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DeliveryAPI extends AuthController {

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        DeliveryDTO delivery = shop.delivery;
        renderJSON(json(delivery));
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String uuid = (String) jsonBody.get("uuid");
        String courierText = (String) jsonBody.get("courierText");
        String selfTakeText = (String) jsonBody.get("selfTakeText");
        String newPostText = (String) jsonBody.get("newPostText");
        String orderMessage = (String) jsonBody.get("orderMessage");

        Double courierPrice = Double.parseDouble(String.valueOf(jsonBody.get("courierPrice")));

        Object courierFreeDeliveryLimitObject = jsonBody.get("courierFreeDeliveryLimit");
        DeliveryDTO delivery = DeliveryDTO.findById(uuid);
        if(courierFreeDeliveryLimitObject != null) {
            Double courierFreeDeliveryLimit = Double.parseDouble(String.valueOf(courierFreeDeliveryLimitObject));
            delivery.courierFreeDeliveryLimit = courierFreeDeliveryLimit;
        }

        Boolean isCourierAvailable = (Boolean) jsonBody.get("isCourierAvailable");
        Boolean isSelfTakeAvailable = (Boolean) jsonBody.get("isSelfTakeAvailable");
        Boolean isNewPostAvailable = (Boolean) jsonBody.get("isNewPostAvailable");

        delivery.isCourierAvailable = isCourierAvailable;
        delivery.courierText = courierText;
        delivery.isSelfTakeAvailable = isSelfTakeAvailable;
        delivery.selfTakeText = selfTakeText;
        delivery.isNewPostAvailable = isNewPostAvailable;
        delivery.newPostText = newPostText;
        delivery.courierPrice = courierPrice;
        delivery.orderMessage = orderMessage;

        delivery.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " updated delivery information for  " + shop.shopName + " at " + dateFormat.format(date));


        renderJSON(json(delivery));
    }

}