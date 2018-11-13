package controllers;

import models.PushSubscription;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PushSubscriptionAPI extends AuthController {

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(shop.contact));
    }


    public static void subscribe(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String endpoint = (String) jsonBody.get("endpoint");
        JSONObject keys = (JSONObject) jsonBody.get("keys");
        String p256dh = (String) keys.get("p256dh");
        String auth = (String) keys.get("auth");

        PushSubscription subscription = PushSubscription.find("byP256dhKey", p256dh).first();
        if(subscription == null) {
            subscription = new PushSubscription();
            subscription.endpoint = endpoint;
            subscription.p256dhKey = p256dh;
            subscription.authKey = auth;
            subscription.shopUuid = shop.uuid;
            String userId = loggedInUser.uuid;
            subscription.userUuid = userId;

            subscription.save();
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            System.out.println("PushSubscriptionAPI subscribed for " + shop.shopName + " at " + dateFormat.format(date));
        }

        renderJSON(json(subscription));
    }

}