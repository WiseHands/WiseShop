package controllers;

import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.i18n.Messages;
import services.*;
import util.DomainValidation;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class ShopAPI extends AuthController {

    static MailSender mailSender = new MailSenderImpl();
    static SmsSender smsSender = new SmsSenderImpl();
    static ShopService shopService = ShopServiceImpl.getInstance();

    public static void updateDomain(String client, String domain) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        File myFile = new File("newDomainCert.txt");

        try {
            FileWriter file = new FileWriter(myFile);
            file.write(domain);

            file.close();
        } catch (IOException ex){
            ex.printStackTrace();

        }

        ok();
    }

    public static void all(String client) throws Exception {

        checkSudoAuthentification();

        List<ShopDTO> shops = ShopDTO.findAll();
        renderJSON(json(shops));
    }

    public static void one(String client, String uuid) throws Exception { // /shop/details
        checkSudoAuthentification();

        ShopDTO shop = ShopDTO.findById(uuid);
        renderJSON(json(shop));
    }

    public static void deleteOne(String client, String uuid) throws Exception { // /shop/details
        checkSudoAuthentification();

        //PRODUCT WILL NEVER BE DELETED
        ok();

    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        String userId = loggedInUser.uuid;
        UserDTO user = UserDTO.findById(userId);
        renderJSON(json(user.shopList));

    }

    public static void details(String client) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        renderJSON(json(shop));

    }

    public static void shopLabelsForTranslation(String client, String uuid) throws Exception { // /shop/details/public
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        JSONObject json = new JSONObject();
        json.put("shopName", shop.shopName);
        json.put("uuid", shop.uuid);
        json.put("shopNameTextTranslationBucket", shop.shopNameTextTranslationBucket);

        renderJSON(json(json));
    }

    public static void publicInfo(String client) throws Exception { // /shop/details/public
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        JSONObject json = new JSONObject();
        json.put("shopName", shop.shopName);
        json.put("uuid", shop.uuid);
        json.put("locale", shop.locale);
        json.put("alwaysOpen", shop.alwaysOpen);
        json.put("isTemporaryClosed", shop.isTemporaryClosed);
        json.put("manualPaymentEnabled", shop.paymentSettings.manualPaymentEnabled);
        json.put("manualPaymentTitle", shop.paymentSettings.manualPaymentTitle);
        json.put("onlinePaymentEnabled", shop.paymentSettings.onlinePaymentEnabled);
        json.put("onlinePaymentTitle", shop.paymentSettings.onlinePaymentTitle);
        json.put("buttonPaymentTitle", shop.paymentSettings.buttonPaymentTitle);
        json.put("minimumPayment", shop.paymentSettings.minimumPayment);
        json.put("freeDeliveryLimit", shop.paymentSettings.freeDeliveryLimit);

        json.put("deliveryPolygon", shop.delivery.courierPolygonData);
        json.put("googleStaticMapsApiKey", shop.googleStaticMapsApiKey);

        json.put("visualSetting", shop.visualSettingsDTO);

        json.put("monStartTime", shop.monStartTime);
        json.put("monEndTime", shop.monEndTime);
        json.put("monOpen", shop.monOpen);
        json.put("tueStartTime", shop.tueStartTime);
        json.put("tueEndTime", shop.tueEndTime);
        json.put("tueOpen", shop.tueOpen);
        json.put("wedStartTime", shop.wedStartTime);
        json.put("wedEndTime", shop.wedEndTime);
        json.put("wedOpen", shop.wedOpen);
        json.put("thuStartTime", shop.thuStartTime);
        json.put("thuEndTime", shop.thuEndTime);
        json.put("thuOpen", shop.thuOpen);
        json.put("friStartTime", shop.friStartTime);
        json.put("friEndTime", shop.friEndTime);
        json.put("friOpen", shop.friOpen);
        json.put("satStartTime", shop.satStartTime);
        json.put("satEndTime", shop.satEndTime);
        json.put("satOpen", shop.satOpen);
        json.put("sunStartTime", shop.sunStartTime);
        json.put("sunEndTime", shop.sunEndTime);
        json.put("sunOpen", shop.sunOpen);
        json.put("isShowAmountTools", shop.isShowAmountTools);
        json.put("labelNameForBuyerNameFieldInShoppingCart",shop.labelNameForBuyerNameFieldInShoppingCart);
        boolean couponsEnabled = true;
        List<CouponDTO> coupons = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        if(coupons.size() == 0) {
            couponsEnabled = false;
        }
        json.put("couponsEnabled", couponsEnabled);


        renderJSON(json(json));
    }

    public static void changeLocal(String client, String locale) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        shop.locale = locale;

        shop = shop.save();
        renderJSON(json(shop));

    }

    public static void update(String client) throws Exception { // /shop PUT

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String name = (String) jsonBody.get("shopName");

        String googleWebsiteVerificator = (String) jsonBody.get("googleWebsiteVerificator");
        String googleAnalyticsCode = (String) jsonBody.get("googleAnalyticsCode");
        String googleMapsApiKey = (String) jsonBody.get("googleMapsApiKey");
        String googleStaticMapsApiKey = (String) jsonBody.get("googleStaticMapsApiKey");
        String faceBookPixelApiKey = (String) jsonBody.get("faceBookPixelApiKey");
        String closedShopTitle = (String) jsonBody.get("temporaryClosedTitle");
        String closedShopdiscription = (String) jsonBody.get("temporaryClosedDescription");
        boolean isTemporaryClosed = (boolean) jsonBody.get("isTemporaryClosed");

        boolean alwaysOpen = (boolean) jsonBody.get("alwaysOpen");
        String locale = (String) jsonBody.get("locale");

        String labelNameForBuyerNameFieldInShoppingCart = (String) jsonBody.get("labelNameForBuyerNameFieldInShoppingCart");

        shop.labelNameForBuyerNameFieldInShoppingCart = labelNameForBuyerNameFieldInShoppingCart;
        System.out.println("labelNameForBuyerNameFieldInShoppingCart +> " + labelNameForBuyerNameFieldInShoppingCart);
        shop.shopName = name;

        shop.temporaryClosedTitle = closedShopTitle;
        shop.temporaryClosedDescription = closedShopdiscription;
        shop.isTemporaryClosed = isTemporaryClosed;
        shop.alwaysOpen = alwaysOpen;

        shop.googleWebsiteVerificator = googleWebsiteVerificator;
        shop.googleAnalyticsCode = googleAnalyticsCode;
        shop.googleMapsApiKey = googleMapsApiKey;
        shop.googleStaticMapsApiKey = googleStaticMapsApiKey;
        shop.faceBookPixelApiKey = faceBookPixelApiKey;
        shop.locale = locale;


        shop = shop.save();
        renderJSON(json(shop));

    }

    public static void updateWorkingHoursForShop(String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        boolean monOpen = checkIsShopOpenToday(jsonBody, "monOpen");
        boolean tueOpen = checkIsShopOpenToday(jsonBody, "tueOpen");
        boolean wedOpen = checkIsShopOpenToday(jsonBody, "wedOpen");
        boolean thuOpen = checkIsShopOpenToday(jsonBody, "thuOpen");
        boolean friOpen = checkIsShopOpenToday(jsonBody, "friOpen");
        boolean satOpen = checkIsShopOpenToday(jsonBody, "satOpen");
        boolean sunOpen = checkIsShopOpenToday(jsonBody, "sunOpen");

        shop.monStartTime = (String) jsonBody.get("monStartTime");
        shop.monEndTime = (String) jsonBody.get("monEndTime");
        shop.monOpen = monOpen;
        shop.tueStartTime = (String) jsonBody.get("tueStartTime");
        shop.tueEndTime = (String) jsonBody.get("tueEndTime");
        shop.tueOpen = tueOpen;
        shop.wedStartTime = (String) jsonBody.get("wedStartTime");
        shop.wedEndTime = (String) jsonBody.get("wedEndTime");
        shop.wedOpen = wedOpen;
        shop.thuStartTime = (String) jsonBody.get("thuStartTime");
        shop.thuEndTime = (String) jsonBody.get("thuEndTime");
        shop.thuOpen = thuOpen;
        shop.friStartTime = (String) jsonBody.get("friStartTime");
        shop.friEndTime = (String) jsonBody.get("friEndTime");
        shop.friOpen = friOpen;
        shop.satStartTime = (String) jsonBody.get("satStartTime");
        shop.satEndTime = (String) jsonBody.get("satEndTime");
        shop.satOpen = satOpen;
        shop.sunStartTime = (String) jsonBody.get("sunStartTime");
        shop.sunEndTime = (String) jsonBody.get("sunEndTime");
        shop.sunOpen = sunOpen;

        shop = shop.save();
        renderJSON(json(shop));
    }

    private static boolean checkIsShopOpenToday(JSONObject jsonBody, String day) {
        boolean isShopOpen;
        try {
            isShopOpen = (boolean) jsonBody.get(day);
            return isShopOpen;
        }
        catch(Exception e) {
            isShopOpen = false;
            System.out.println("Exception for "+ day + " : => " + e);
            return isShopOpen;
        }
    }

    public static void listUsers(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        renderJSON(json(shop.userList));

    }

    public static void addUserToShop(String client, String email, String phone) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        boolean isEmailProvided = !email.equals("");
        boolean isPhoneProvided = !phone.equals("");
        UserDTO user = null;

        if(isEmailProvided){
            user = UserDTO.find("byEmail", email).first();
        } else if(!phone.equals("")){
            user = UserDTO.find("byPhone", phone).first();
        }

        if (user == null) {
            user = new UserDTO();
            user.email = email;
            user.phone = phone;
            if(isPhoneProvided) {
                Random r = new Random();
                String code = String.valueOf(r.nextInt(10)) + String.valueOf(r.nextInt(10)) + String.valueOf(r.nextInt(10)) + String.valueOf(r.nextInt(10));
                user.password = code;
            }

        } else if (user.shopList.contains(shop)) {
            forbidden(Messages.get("user.already.member.of.shop"));
        }
        user.shopList.add(shop);
        user = user.save();

        shop.userList.add(user);
        shop.save();

        if(isEmailProvided){
            mailSender.sendEmailToInvitedUser(shop, user);
        } else if(isPhoneProvided) {
            String msg = Messages.get("user.added.to.shop.sms", shop.shopName, user.password);
            smsSender.sendSms(user.phone, msg);
        }
        renderJSON(json(user));

    }

    public static void removeUserFromShop(String client, String email, String phone) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        boolean isEmailProvided = !email.equals("");
        UserDTO user = null;
        if(isEmailProvided){
            user = UserDTO.find("byEmail", email).first();
        } else if(!phone.equals("")){
            user = UserDTO.find("byPhone", phone).first();
        }

        if(user == null) {
           forbidden(Messages.get("user.not.found"));
        }

        String userId = loggedInUser.uuid;
        UserDTO loggedInUser = UserDTO.findById(userId);

        if (loggedInUser == user) {
            forbidden("You not allowed to delete yourself from shop");
        } else if(user != null) {
            shop.userList.remove(user);
            shop = shop.save();
            user.shopList.remove(shop);
        } else {
            forbidden("user with such email not found");
        }

        renderJSON(json(shop));

    }

    public static void create(String name, String domain) {

        checkAuthentification(null);

        String userId = loggedInUser.uuid;
        UserDTO user = UserDTO.findById(userId);

        DomainValidation domainValidation = shopService.validateShopDetails(domain);

        if (domainValidation.isValid) {
            System.out.println("Creating shop with domain name " + domain);
            ShopDTO shop = shopService.createShop(name, domain, user);
            renderJSON(json(shop));
        } else {
            System.out.println("domainValidation not valid reason " + domainValidation.errorReason);
            forbidden(domainValidation.errorReason);
        }

    }

}