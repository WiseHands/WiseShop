package controllers;

import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


public class BannerAPI extends AuthController{

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) shop = ShopDTO.find("byDomain", "localhost").first();
        checkAuthentification(shop);
        renderJSON(json(shop.bannerList));
    }

    public static void setBannerForProductOfDay(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) shop = ShopDTO.find("byDomain", "localhost").first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        System.out.println("setBannerForProductOfDay => " + jsonBody);
        boolean isForDishOfDayOn = Boolean.parseBoolean(String.valueOf(jsonBody.get("isForDishOfDayOn")));
        String bannerName = (String) jsonBody.get("name");
        Integer discount = Integer.parseInt(String.valueOf(jsonBody.get("discount")));

        BannerDTO banner = BannerDTO.find("select b from BannerDTO b where b.shop = ?1 and b.isForDishOfDayOn = ?2", shop, isForDishOfDayOn).first();
        if (banner == null) {
            banner = new BannerDTO(shop, isForDishOfDayOn, bannerName, discount); banner.save();
            shop.bannerList.add(banner); shop.save();
            renderJSON(json(banner));
        } else {
            banner.isBannerInShopBasketOn = isForDishOfDayOn;
            banner.bannerName = bannerName;
            banner.discount = discount; banner.save();
            shop.bannerList.add(banner); shop.save();
            System.out.println("createBanner => " + banner.toString());
        }
    }


    public static void setBannerForShopBasket(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) shop = ShopDTO.find("byDomain", "localhost").first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        System.out.println("setBannerForShopBasket => " + jsonBody);

        boolean isBannerInShopOn = Boolean.parseBoolean(String.valueOf(jsonBody.get("isBannerOn")));
        String bannerName = (String) jsonBody.get("name");
        String bannerDescription = (String) jsonBody.get("description");

        BannerDTO banner = BannerDTO.find("select b from BannerDTO b where b.shop = ?1 and b.isBannerOn = ?2", shop, isBannerInShopOn).first();
        if (banner == null) {
            banner = new BannerDTO(shop, isBannerInShopOn, bannerName, bannerDescription); banner.save();
            shop.bannerList.add(banner); shop.save();
            renderJSON(json(banner));
        } else {
            banner.isBannerOn = isBannerInShopOn;
            banner.bannerName = bannerName;
            banner.bannerDescription = bannerDescription; banner.save();
            shop.bannerList.add(banner); shop.save();
            System.out.println("createBanner => " + banner.toString());
        }

        renderJSON(json(shop));
    }



}
