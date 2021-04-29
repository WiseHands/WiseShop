package controllers;

import models.ShopDTO;
import models.VisualSettingsDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class BannerAPI extends AuthController{

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        VisualSettingsDTO visualSettings = shop.visualSettingsDTO;

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        visualSettings.navbarColor = (String) jsonBody.get("navbarColor");
        visualSettings.navbarTextColor = (String) jsonBody.get("navbarTextColor");
        visualSettings.navbarShopItemsColor = (String) jsonBody.get("navbarShopItemsColor");
        visualSettings.logoHref = (String) jsonBody.get("logoHref");
        visualSettings.isFooterOn = Boolean.parseBoolean(String.valueOf(jsonBody.get("isFooterOn")));
        visualSettings.isBannerOn = Boolean.parseBoolean(String.valueOf(jsonBody.get("isBannerOn")));
        visualSettings.bannerName = (String) jsonBody.get("bannerName");
        visualSettings.bannerDescription = (String) jsonBody.get("bannerDescription");

        visualSettings = visualSettings.save();
        shop.save();

        renderJSON(json(visualSettings));
    }


}
