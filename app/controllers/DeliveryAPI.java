package controllers;

import com.google.gson.Gson;
import models.DeliveryDTO;
import models.ShopDTO;
import models.TranslationBucketDTO;
import models.TranslationItemDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import util.PolygonUtil;

import java.lang.reflect.Array;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DeliveryAPI extends AuthController {

    public static void checkCourierDeliveryBoundaries(String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        Double lat = Double.valueOf(request.params.get("lat"));
        Double lng = Double.valueOf(request.params.get("lng"));

        JSONParser parser = new JSONParser();
        String stringToParse = shop.delivery.courierPolygonData;
        JSONObject polygonData = (JSONObject) parser.parse(stringToParse);

        JSONArray polygon = (JSONArray) polygonData.get("features");
        JSONObject features = (JSONObject) polygon.get(0);
        JSONObject geometry = (JSONObject) features.get("geometry");
        JSONArray coordinates = (JSONArray) geometry.get("coordinates");
        JSONArray newCoordinates = (JSONArray) coordinates.get(0);

        List<PolygonUtil.Point> polygonPoints = new ArrayList<PolygonUtil.Point>();
        for (int i=0; i<newCoordinates.size(); i++) {
            JSONArray point = (JSONArray) newCoordinates.get(i);
            Double latitude = (Double) point.get(0);
            Double longtitude = (Double) point.get(1);
            PolygonUtil.Point points = new PolygonUtil.Point(longtitude, latitude);
            polygonPoints.add(points);
        }



        PolygonUtil.Point[] pointArray = new PolygonUtil.Point[polygonPoints.size()];
        polygonPoints.toArray(pointArray);


         int length = polygonPoints.size();
         PolygonUtil.Point point = new PolygonUtil.Point(lat, lng);
        boolean isPointInsidePolygon = PolygonUtil.isInside(pointArray, length, point);



        if(isPointInsidePolygon) {
            JSONObject successfulRequest = new JSONObject();
            successfulRequest.put("status", "ok");
            successfulRequest.put("message", "given gps point is inside delivery boundaries");
            renderJSON(successfulRequest);
        } else {
            JSONObject failedRequest = new JSONObject();
            failedRequest.put("status", "failed");
            failedRequest.put("message", "given gps point is not inside delivery boundaries");
            renderJSON(failedRequest);
        }


    }

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        DeliveryDTO delivery = shop.delivery;
        setNewPostDefaultLabel(delivery);
        setCourierDefaultLabel(delivery);
        setSelfTakeDefaultLabel(delivery);
        System.out.println("json(delivery) \n" + json(delivery.courierTextTranslationBucket) + "\n"
                + json(delivery.newPostTranslationBucket)  + "\n"
                + json(delivery.selfTakeTranslationBucket));
        renderJSON(json(delivery));
    }

    private static void setSelfTakeDefaultLabel(DeliveryDTO delivery) {
        if (delivery.selfTakeTranslationBucket == null){
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Самовиніс");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "Self Pick Up");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            delivery.selfTakeTranslationBucket = translationBucket;
            delivery.save();
        }
    }

    private static void setCourierDefaultLabel(DeliveryDTO delivery) {
        if (delivery.courierTextTranslationBucket == null){
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Доставка кур'єром");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "Courier");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            delivery.courierTextTranslationBucket = translationBucket;
            delivery.save();

        }
    }

    private static void setNewPostDefaultLabel(DeliveryDTO delivery) {
        if (delivery.newPostTranslationBucket == null){
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Доставка Новою Поштою");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "Nova Poshta Delivery");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            delivery.newPostTranslationBucket = translationBucket;
            delivery.save();

        }
    }

    public static void updateCourierPolygonData(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        String polygonData = params.get("body");
        shop.delivery.courierPolygonData = polygonData;
        shop.delivery.save();
        ok();
    }

    public static void deleteCourierPolygonData(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        String polygonData = params.get("body");
        shop.delivery.courierPolygonData = polygonData;
        shop.delivery.save();
        ok();
    }

    public static void getCourierPolygonData(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String polygonMap = shop.delivery.courierPolygonData;
        renderJSON(json(polygonMap));
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String uuid = (String) jsonBody.get("uuid");
        String courierText = (String) jsonBody.get("courierText");
        String selfTakeText = (String) jsonBody.get("selfTakeText");
        String newPostText = (String) jsonBody.get("newPostText");
        String orderMessage = (String) jsonBody.get("orderMessage");

        Double courierPrice = Double.parseDouble(String.valueOf(jsonBody.get("courierPrice")));

        Object courierFreeDeliveryLimitObject = jsonBody.get("courierFreeDeliveryLimit");
        DeliveryDTO delivery = DeliveryDTO.findById(uuid);
        if(courierFreeDeliveryLimitObject != null) {
            Double courierFreeDeliveryLimit = Double.parseDouble(String.valueOf(courierFreeDeliveryLimitObject));
            delivery.courierFreeDeliveryLimit = courierFreeDeliveryLimit;
        }

        Boolean isCourierAvailable = (Boolean) jsonBody.get("isCourierAvailable");
        Boolean isSelfTakeAvailable = (Boolean) jsonBody.get("isSelfTakeAvailable");
        Boolean isNewPostAvailable = (Boolean) jsonBody.get("isNewPostAvailable");

        delivery.isCourierAvailable = isCourierAvailable;
        delivery.courierText = courierText;
        delivery.isSelfTakeAvailable = isSelfTakeAvailable;
        delivery.selfTakeText = selfTakeText;
        delivery.isNewPostAvailable = isNewPostAvailable;
        delivery.newPostText = newPostText;
        delivery.courierPrice = courierPrice;
        delivery.orderMessage = orderMessage;

        delivery.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " updated delivery information for  " + shop.shopName + " at " + dateFormat.format(date));


        renderJSON(json(delivery));
    }

}