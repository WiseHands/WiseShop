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
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(shop.paymentSettings));
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        PaymentSettingsDTO paymentSettings = shop.paymentSettings;

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        Boolean manualPaymentEnabled = (Boolean) jsonBody.get("manualPaymentEnabled");
        Boolean onlinePaymentEnabled = (Boolean) jsonBody.get("onlinePaymentEnabled");
        Double freeDeliveryLimit = Double.parseDouble(String.valueOf(jsonBody.get("freeDeliveryLimit")));
        String manualPaymentTitle = (String) jsonBody.get("manualPaymentTitle");
        String onlinePaymentTitle = (String) jsonBody.get("onlinePaymentTitle");

        if(jsonBody.get("minimumPayment") != null) {
            paymentSettings.minimumPayment = Double.parseDouble(String.valueOf(jsonBody.get("minimumPayment")));
        }

        if(jsonBody.get("buttonPaymentTitle") != null) {
            paymentSettings.buttonPaymentTitle = (String) jsonBody.get("buttonPaymentTitle");
        }

        paymentSettings.freeDeliveryLimit = freeDeliveryLimit;
        paymentSettings.manualPaymentEnabled = manualPaymentEnabled;
        paymentSettings.onlinePaymentEnabled = onlinePaymentEnabled;
        paymentSettings.manualPaymentTitle = manualPaymentTitle;
        paymentSettings.onlinePaymentTitle = onlinePaymentTitle;

        paymentSettings = paymentSettings.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("Updated payment settings information for  " + shop.shopName + " at " + dateFormat.format(date));


        renderJSON(json(paymentSettings));
    }

}