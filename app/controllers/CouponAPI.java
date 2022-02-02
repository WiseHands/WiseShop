package controllers;

import models.CouponDTO;
import models.CouponId;
import models.CouponPlan;
import models.ShopDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CouponAPI extends AuthController {


    public static void create(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        JSONArray plans = (JSONArray) jsonBody.get("plans");
        String coupons = (String) jsonBody.get("coupons");

        List<CouponId> couponIds = new ArrayList<>();
        List<CouponPlan> couponPlans = new ArrayList<>();
        CouponDTO couponDTO = new CouponDTO(couponPlans, couponIds, shop.uuid);
        couponDTO = couponDTO.save();

        for (Object o : plans) {
            JSONObject plan = (JSONObject) o;
            Long percentDiscount = (Long) plan.get("percentDiscount");
            Long total = (Long) plan.get("total");
            CouponPlan couponPlan = new CouponPlan(percentDiscount, total, couponDTO.uuid);
            couponPlan = couponPlan.save();
            couponPlans.add(couponPlan);
        }

        List<String> couponList = Arrays.asList(coupons.split("\\r?\\n"));
        for (String coupon : couponList) {
            CouponId couponId = new CouponId(coupon, couponDTO.uuid);
            couponId = couponId.save();
            couponIds.add(couponId);
        }

        couponDTO.save();
        List<CouponDTO> couponsList = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        renderJSON(json(couponsList));
    }

    public static void details(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);


        CouponDTO coupon = CouponDTO.findById(uuid);
        if(coupon == null){
            notFound();
        }
        renderJSON(json(coupon));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);


        CouponId coupon = CouponId.findById(uuid);
        CouponDTO couponDTO = CouponDTO.findById(coupon.couponUuid);
        couponDTO.couponIds.remove(coupon);
        couponDTO = couponDTO.save();

        if(couponDTO.couponIds.size() == 0) {
            couponDTO.delete();
            ok();
        }
        //TODO: check if there is left ghost plans....
        if(coupon != null){
            coupon.delete();
            renderJSON(json(coupon));
        }
        notFound();
    }

    public static void checkForCoupon(String client, String couponId) throws Exception {
        List<CouponId> coupons = CouponId.find("byCouponId", couponId).fetch();
        CouponId unusedCoupon = null;
        for (CouponId coupon : coupons) {
            if (coupon.used == null || !coupon.used) {
                unusedCoupon = coupon;
            }
        }
        if(unusedCoupon == null) {
            notFound();
        }

        CouponDTO couponDTO = CouponDTO.findById(unusedCoupon.couponUuid);
        renderJSON(json(couponDTO.plans));
    }

    public static void deleteAll(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);


        List<CouponDTO> coupons = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        for(CouponDTO coupon : coupons) {
            coupon.delete();
        }
        ok();
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);


        List<CouponDTO> coupons = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        renderJSON(json(coupons));
    }


}
