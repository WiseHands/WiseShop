package controllers;

import models.BannerDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class BannerAPI extends AuthController{

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(BannerDTO.findAll().get(0)));
    }

    public static void upDate(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("upDate jsonBody => " + jsonBody);
        boolean isBannerInShopOn = Boolean.parseBoolean(String.valueOf(jsonBody.get("isBannerInShopOn")));
        String name = (String) jsonBody.get("name");
        Integer discount = Integer.parseInt(String.valueOf(jsonBody.get("discount")));

        BannerDTO banner = BannerDTO.find("byIsBannerInShopOn", isBannerInShopOn).first();
        if (banner == null) {
            BannerDTO createBanner = new BannerDTO(isBannerInShopOn, name, discount);
            createBanner.save();
            shop.banner = createBanner; shop.save();
            renderJSON(json(createBanner));
        } else {
            banner.isBannerInShopOn = isBannerInShopOn;
            banner.name = name;
            banner.discount = discount;
            shop.banner = banner; shop.save();

            System.out.println("createBanner => " + banner.isBannerInShopOn);

            banner.save();
        }

        renderJSON(json(banner));

    }

}
