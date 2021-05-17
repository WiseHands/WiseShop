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
        renderJSON(json(shop.banner));
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

        BannerDTO banner = BannerDTO.find("select b from BannerDTO b where b.shop = ?1 and b.isBannerInShopOn = ?2", shop, isBannerInShopOn).first();
        if (banner == null) {
            banner = new BannerDTO(shop, isBannerInShopOn, name, discount); banner.save();
            shop.banner = banner; shop.save();
            renderJSON(json(banner));
        } else {
            banner.isBannerInShopOn = isBannerInShopOn;
            banner.name = name;
            banner.discount = discount; banner.save();
            shop.banner = banner; shop.save();
            System.out.println("createBanner => " + banner.isBannerInShopOn);
            banner.save();
        }

        renderJSON(json(banner));

    }

}
