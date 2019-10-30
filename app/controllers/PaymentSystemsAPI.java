package controllers;

import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class PaymentSystemsAPI  extends AuthController {

    public static void detailLiqpayPayment(String client) throws Exception{

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONObject json = new JSONObject();
        json.put("liqpayPublicKey", shop.liqpayPublicKey);
        json.put("liqpayPrivateKey", shop.liqpayPrivateKey);

        renderJSON(json);

    }

    public static void updateLiqpayPayment(String client) throws Exception{

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        System.out.println("Keys from db: " + shop.liqpayPublicKey + ", " + shop.liqpayPrivateKey);


        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String liqpayPublicKey = (String) jsonBody.get("liqpayPublicKey");
        String liqpayPrivateKey = (String) jsonBody.get("liqpayPrivateKey");
        shop.liqpayPublicKey = liqpayPublicKey;
        shop.liqpayPrivateKey = liqpayPrivateKey;
        shop = shop.save();
        renderJSON(json(shop));


    }



}
