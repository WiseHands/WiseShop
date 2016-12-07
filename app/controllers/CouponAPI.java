package controllers;

import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.*;

public class CouponAPI extends AuthController {


    public static void create(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        Double percentDiscount = Double.parseDouble(String.valueOf(jsonBody.get("percentDiscount")));
        String coupons = (String) jsonBody.get("coupons");

        List<String> couponList = Arrays.asList(coupons.split("\\r?\\n"));
        for (String coupon: couponList) {
            CouponDTO couponDto = new CouponDTO(percentDiscount, coupon, shop.uuid);
            couponDto.save();
        }
        List<CouponDTO> couponsList = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        renderJSON(json(couponsList));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);


        CouponDTO coupon = CouponDTO.findById(uuid);
        if(coupon != null){
            coupon.delete();
            ok();
        }
        notFound();
    }

    public static void deleteAll(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);


        List<CouponDTO> coupons = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        for(CouponDTO coupon : coupons) {
            coupon.delete();
        }
        ok();
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);


        List<CouponDTO> coupons = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        renderJSON(json(coupons));
    }


}
