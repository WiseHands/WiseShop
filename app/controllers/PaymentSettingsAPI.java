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

    public static void updateCashPayment(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        Boolean manualPaymentEnabled = (Boolean) jsonBody.get("manualPaymentEnabled");
        String manualPaymentTitle = (String) jsonBody.get("manualPaymentTitle");

        PaymentSettingsDTO paymentSettings = shop.paymentSettings;
        paymentSettings.manualPaymentEnabled = manualPaymentEnabled;
        paymentSettings.manualPaymentTitle = manualPaymentTitle;

        paymentSettings = paymentSettings.save();

        renderJSON(json(paymentSettings));
    }

    public static void updateOnlinePayment(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        Boolean onlinePaymentEnabled = (Boolean) jsonBody.get("onlinePaymentEnabled");
        String onlinePaymentTitle = (String) jsonBody.get("onlinePaymentTitle");

        PaymentSettingsDTO paymentSettings = shop.paymentSettings;
        paymentSettings.onlinePaymentEnabled = onlinePaymentEnabled;
        paymentSettings.onlinePaymentTitle = onlinePaymentTitle;
        paymentSettings = paymentSettings.save();

        renderJSON(json(paymentSettings));
    }

    public static void setMinimalPayment(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        Double minimumPayment = Double.parseDouble(String.valueOf(jsonBody.get("minimumPayment")));

        PaymentSettingsDTO paymentSettings = shop.paymentSettings;
        paymentSettings.minimumPayment = minimumPayment;
        paymentSettings = paymentSettings.save();

        renderJSON(json(paymentSettings));
    }

}