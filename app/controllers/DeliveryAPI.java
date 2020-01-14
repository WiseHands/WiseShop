package controllers;

import com.google.gson.Gson;
import models.DeliveryDTO;
import models.ShopDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.lang.reflect.Array;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class DeliveryAPI extends AuthController {

    public static void checkCourierDeliveryBoundaries(String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String lat = request.params.get("lat");
        String lng = request.params.get("lng");
        System.out.println("lat " + lat + " lng " + lng);

        JSONParser parser = new JSONParser();
        String stringToParse = shop.delivery.courierPolygonData;
        JSONObject polygonData = (JSONObject) parser.parse(stringToParse);

        JSONArray polygon = (JSONArray) polygonData.get("features");
        JSONObject features = (JSONObject) polygon.get(0);
        JSONObject geometry = (JSONObject) features.get("geometry");
        JSONArray coordinates = (JSONArray) geometry.get("coordinates");
        JSONArray newCoordinates = (JSONArray) coordinates.get(0);

        ArrayList<Array> polygonePoints = new ArrayList<>();
        for (int i=0; i<newCoordinates.size(); i++) {
            JSONArray point = (JSONArray) newCoordinates.get(i);
            Double latitude = (Double) point.get(0);
            Double longtitude = (Double) point.get(1);
            System.out.println("POINT [" + i + "]: " + latitude + ":" + longtitude);
        }
        System.out.println("polygon from features " + newCoordinates);
        //features[0].geometry.coordinates[0];


    }
    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        DeliveryDTO delivery = shop.delivery;
        renderJSON(json(delivery));
    }

    public static void updateCourierPolygonData(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        String polygonData = params.get("body");
        System.out.println("polygonData " + polygonData);
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