package controllers;

import models.AdditionalSettingDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;



public class AdditionalSettingAPI  extends AuthController  {

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(shop.additionalSetting));
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String fieldNameCustomer = (String) jsonBody.get("fieldNameCustomer");

        System.out.println("fieldNameCustomer ______ " + fieldNameCustomer);


        AdditionalSettingDTO additionalSetting;
        if(shop.additionalSetting != null) {
            additionalSetting = shop.additionalSetting;
        } else {
            additionalSetting = new AdditionalSettingDTO(fieldNameCustomer);
            shop.additionalSetting = additionalSetting;
        }

        additionalSetting.fieldNameCustomer = fieldNameCustomer;
        additionalSetting = additionalSetting.save();


        renderJSON(json(additionalSetting));
    }

}
