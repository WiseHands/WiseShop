package controllers;

import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


public class BannerAPI extends AuthController{

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(shop.bannerList));
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
            shop.bannerList.add(banner); shop.save();
            renderJSON(json(banner));
        } else {
            banner.isBannerInShopOn = isBannerInShopOn;
            banner.name = name;
            banner.discount = discount; banner.save();
            shop.bannerList.add(banner); shop.save();
            System.out.println("createBanner => " + banner.toString());
            banner.save();
        }

        renderJSON(json(banner));

    }

}
