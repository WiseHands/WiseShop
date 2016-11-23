package controllers;

import models.ShopDTO;
import models.VisualSettingsDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class VisualSettingsAPI extends AuthController {

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        renderJSON(json(shop.visualSettingsDTO));
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        VisualSettingsDTO visualSettings = shop.visualSettingsDTO;

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        visualSettings.navbarColor = (String) jsonBody.get("navbarColor");
        visualSettings.navbarTextColor = (String) jsonBody.get("navbarTextColor");
        visualSettings.navbarShopItemsColor = (String) jsonBody.get("navbarShopItemsColor");

        visualSettings.save();
        shop.save();

        renderJSON(json(visualSettings));
    }

}