package controllers;

import models.*;
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
        PaymentSettingsDTO payment = shop.paymentSettings;
        setTranslationForCashPaymentLabel(payment);
        setTranslationForOnlinePaymentLabel(payment);
        renderJSON(json(payment));
    }

    private static void setTranslationForCashPaymentLabel(PaymentSettingsDTO payment) {
        if (payment.manualPaymentTitleTranslationBucket == null){
            System.out.println("delivery.selfTakeTranslationBucket is null and will be creating NEW");
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Готівкою");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "By Cash");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            payment.manualPaymentTitleTranslationBucket = translationBucket;
            payment.save();
        }
    }

    private static void setTranslationForOnlinePaymentLabel(PaymentSettingsDTO payment) {
        if (payment.onlinePaymentTitleTranslationBucket == null){
            System.out.println("delivery.selfTakeTranslationBucket is null and will be creating NEW");
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Карткою");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "By Credit Cart");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            payment.onlinePaymentTitleTranslationBucket = translationBucket;
            payment.save();
        }
    }

    public static void updateCashPayment(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        PaymentSettingsDTO paymentSettings = shop.paymentSettings;

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        Boolean manualPaymentEnabled = (Boolean) jsonBody.get("manualPaymentEnabled");
        String manualPaymentTitle = (String) jsonBody.get("manualPaymentTitle");

        String onlinePaymentTitle = (String) jsonBody.get("onlinePaymentTitle");

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
        Boolean additionalPaymentEnabled = Boolean.parseBoolean(String.valueOf(jsonBody.get("additionalPaymentEnabled")));
        Double additionalPaymentPrice = Double.parseDouble(String.valueOf(jsonBody.get("additionalPaymentPrice")));
        String additionalPaymentDescription = (String) jsonBody.get("additionalPaymentDescription");

        PaymentSettingsDTO paymentSettings = shop.paymentSettings;
        paymentSettings.minimumPayment = minimumPayment;
        paymentSettings.additionalPaymentEnabled = additionalPaymentEnabled;
        paymentSettings.additionalPaymentPrice = additionalPaymentPrice;
        paymentSettings.additionalPaymentDescription = additionalPaymentDescription;
        paymentSettings = paymentSettings.save();

        renderJSON(json(paymentSettings));
    }

}