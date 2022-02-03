package controllers;

import models.BannerDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import static java.util.Objects.nonNull;

public class BannerAPI extends AuthController{

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) shop = ShopDTO.find("byDomain", "localhost").first();
        checkAuthentication(shop);
        renderJSON(json(shop.bannerList));
    }

    public static void setBannerForProductOfDay(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) shop = ShopDTO.find("byDomain", "localhost").first();
        checkAuthentication(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        boolean isForDishOfDayOn = false;
        String bannerName = "";
        Integer discount = 0;
        if(nonNull(jsonBody.get("isForDishOfDayOn"))){
           isForDishOfDayOn =  Boolean.parseBoolean(String.valueOf(jsonBody.get("isForDishOfDayOn")));
        }
        if(nonNull(jsonBody.get("bannerName"))){
           bannerName = (String) jsonBody.get("bannerName");
        }

        if(nonNull(jsonBody.get("discount"))){
                   discount = Integer.parseInt(String.valueOf(jsonBody.get("discount")));
        }

        BannerDTO banner = BannerDTO.find("select b from BannerDTO b where b.shop = ?1 and b.type = ?2", shop, "DISH_OF_DAY").first();

        if (banner == null) {
            banner = new BannerDTO(shop, isForDishOfDayOn, bannerName, discount);
            banner.type = "DISH_OF_DAY";
            banner.save();
            shop.bannerList.add(banner);
            shop.save();
            renderJSON(json(banner));
        } else {
            banner.isForDishOfDayOn = isForDishOfDayOn;
            banner.bannerName = bannerName;
            banner.discount = discount;
            banner.save();
        }
    }


    public static void setBannerForShopBasket(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) shop = ShopDTO.find("byDomain", "localhost").first();
        checkAuthentication(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        boolean isBannerInShopOn = false;
        String bannerName = "";
        String bannerDescription = "";
        if(nonNull(jsonBody.get("isBannerOn"))){
           isBannerInShopOn = Boolean.parseBoolean(String.valueOf(jsonBody.get("isBannerOn")));
        }
        if(nonNull(jsonBody.get("bannerName"))){
           bannerName = (String) jsonBody.get("bannerName");
        }

        if(nonNull(jsonBody.get("bannerDescription"))){
                   bannerDescription = (String) jsonBody.get("bannerDescription");
        }

        BannerDTO banner = BannerDTO.find("select b from BannerDTO b where b.shop = ?1 and b.type = ?2", shop, "BASKET").first();

        if (banner == null) {
            banner = new BannerDTO(shop, isBannerInShopOn, bannerName, bannerDescription);
            banner.type = "BASKET";
            banner.save();
            shop.bannerList.add(banner);
            shop.save();
            renderJSON(json(banner));
        } else {
            banner.isBannerOn = isBannerInShopOn;
            banner.bannerName = bannerName;
            banner.bannerDescription = bannerDescription;
            banner.save();
        }

        renderJSON(json(shop));
    }



}
