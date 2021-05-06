package controllers;

import models.ProductDTO;
import models.ShopDTO;
import models.VisualSettingsDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class BannerAPI extends AuthController{

    public static void setDishOfDay(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);


        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("jsonBody => " + jsonBody.get("isDishOfDay"));

        ProductDTO product = ProductDTO.findById((String) jsonBody.get("uuid"));
        product.isDishOfDay = Boolean.parseBoolean(String.valueOf(jsonBody.get("isDishOfDay")));
        product.save();
        renderJSON(json(product));
    }


}
