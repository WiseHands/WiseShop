package controllers;

import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.*;

public class CouponAPI extends AuthController {


    public static void create(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        JSONArray plans = (JSONArray) jsonBody.get("plans");
        String coupons = (String) jsonBody.get("coupons");

        List<CouponId> couponIds = new ArrayList<CouponId>();
        List<CouponPlan> couponPlans = new ArrayList<CouponPlan>();
        CouponDTO couponDTO = new CouponDTO(couponPlans, couponIds, shop.uuid);
        couponDTO = couponDTO.save();

        for (int i = 0; i < plans.size(); i++) {
            JSONObject plan = (JSONObject) plans.get(i);
            Long percentDiscount = (Long) plan.get("percentDiscount");
            Long total = (Long) plan.get("total");
            CouponPlan couponPlan = new CouponPlan(percentDiscount, total, couponDTO.uuid);
            couponPlan = couponPlan.save();
            couponPlans.add(couponPlan);
            System.out.println("Coupon: " + couponPlan.percentDiscount + "%, " + "from: " + couponPlan.minimalOrderTotal);
        }

        List<String> couponList = Arrays.asList(coupons.split("\\r?\\n"));
        for (String coupon: couponList) {
            CouponId couponId = new CouponId(coupon, couponDTO.uuid);
            couponId = couponId.save();
            couponIds.add(couponId);
            System.out.println("Coupon ID: " + couponId.couponId);
        }

        couponDTO.save();
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
