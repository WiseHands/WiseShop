package controllers;

import models.DeliveryDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

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

        Boolean isCourierAvailable = (Boolean) jsonBody.get("isCourierAvailable");
        Boolean isSelfTakeAvailable = (Boolean) jsonBody.get("isSelfTakeAvailable");
        Boolean isNewPostAvailable = (Boolean) jsonBody.get("isNewPostAvailable");

        DeliveryDTO delivery = DeliveryDTO.findById(uuid);
        delivery.isCourierAvailable = isCourierAvailable;
        delivery.courierText = courierText;
        delivery.isSelfTakeAvailable = isSelfTakeAvailable;
        delivery.selfTakeText = selfTakeText;
        delivery.isNewPostAvailable = isNewPostAvailable;
        delivery.newPostText = newPostText;

        delivery.save();
        renderJSON(json(delivery));
    }

}