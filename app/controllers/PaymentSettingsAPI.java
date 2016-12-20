package controllers;

import models.DeliveryDTO;
import models.PaymentSettingsDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PaymentSettingsAPI extends AuthController {

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        renderJSON(json(shop.paymentSettings));
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        Boolean manualPaymentEnabled = (Boolean) jsonBody.get("manualPaymentEnabled");
        Boolean onlinePaymentEnabled = (Boolean) jsonBody.get("onlinePaymentEnabled");
        Double freeDeliveryLimit = Double.parseDouble(String.valueOf(jsonBody.get("freeDeliveryLimit")));

        PaymentSettingsDTO paymentSettings = shop.paymentSettings;
        paymentSettings.freeDeliveryLimit = freeDeliveryLimit;
        paymentSettings.manualPaymentEnabled = manualPaymentEnabled;
        paymentSettings.onlinePaymentEnabled = onlinePaymentEnabled;

        paymentSettings = paymentSettings.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("Updated payment settings information for  " + shop.shopName + " at " + dateFormat.format(date));


        renderJSON(json(paymentSettings));
    }

}