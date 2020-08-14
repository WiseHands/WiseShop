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
        json.put("clientPaysProcessingCommission", shop.paymentSettings.clientPaysProcessingCommission);

        renderJSON(json);

    }

    public static void updateLiqpayPayment(String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String liqpayPublicKey = (String) jsonBody.get("liqpayPublicKey");
        String liqpayPrivateKey = (String) jsonBody.get("liqpayPrivateKey");
        Boolean clientPaysProcessingCommission = (Boolean) jsonBody.get("clientPaysProcessingCommission");
        shop.liqpayPublicKey = liqpayPublicKey;
        shop.liqpayPrivateKey = liqpayPrivateKey;
        shop.paymentSettings.clientPaysProcessingCommission = clientPaysProcessingCommission;
        shop = shop.save();
        renderJSON(json(shop));
    }
}
