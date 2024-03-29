package controllers;

import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.i18n.Lang;
import play.mvc.Before;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import static controllers.WizardAPI.getUserIdFromAuthorization;
import static services.ShopServiceImpl._appendDomainToList;

public class UserDashBoardAPI extends AuthController{

    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Before
    public static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }

    public static void allowCors(){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ok();
    }

    public static void createShop() throws Exception{
        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();

        List<UserDTO> users = new ArrayList<UserDTO>();
        users.add(user);

        Double courierDeliveryPrice = 40.0;
        Double courierFreeDeliveryPrice = 9999.0;
        DeliveryDTO delivery = new DeliveryDTO(
                user.wizard.courierDelivery, "Courier",
                user.wizard.selfTake, "Selftake",
                user.wizard.postDepartment, "Post Service",
                courierDeliveryPrice, courierFreeDeliveryPrice
        );
        setTranslationForCourierDeliveryLabel(delivery);
        setTranslationForSelfTakeLabel(delivery);
        setTranslationForPostDepartmentLabel(delivery);
        delivery.save();

        ContactDTO contact = new ContactDTO(user.phone, user.email, user.wizard.shopDescription,
                user.wizard.cityName, user.wizard.streetName, user.wizard.buildingNumber,
                user.wizard.facebookLink, user.wizard.instagramLink, user.wizard.youtubeLink
        );

        PaymentSettingsDTO paymentSettings = new PaymentSettingsDTO(user.wizard.payCash, user.wizard.payOnline,
                (double) 0, "Готівкою", "Карткою", ""
        );

        setTranslationForCashPaymentLabel(paymentSettings);
        setTranslationForOnlinePaymentLabel(paymentSettings);
        paymentSettings.save();

        BalanceDTO balance = new BalanceDTO();
        VisualSettingsDTO visualSettings = new VisualSettingsDTO();

        ShopDTO shop = new ShopDTO(users, paymentSettings, delivery,
                contact, balance, visualSettings, user.wizard.shopName,
                "public liqpay key here", "private liqpay key here", user.wizard.shopDomain, "uk_UA"
        );
        shop.googleStaticMapsApiKey = "AIzaSyCcBhIqH-XMcNu99hnEKvWIZTrazd9XgXg";
        shop.googleMapsApiKey = "AIzaSyAuKg9jszEEgoGfUlIqmd4n9czbQsgcYRM";
        visualSettings.shop = shop;

        _appendDomainToList(user.wizard.shopDomain);
        shop.save();
        renderJSON(json(shop));

    }

    private static void setTranslationForCashPaymentLabel(PaymentSettingsDTO payment) {
        if (payment.manualPaymentTitleTranslationBucket == null){
            System.out.println("delivery.selfTakeTranslationBucket is null and will be creating NEW");
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Готівкою");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "By Cash");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            payment.manualPaymentTitleTranslationBucket = translationBucket;
        }
    }

    private static void setTranslationForOnlinePaymentLabel(PaymentSettingsDTO payment) {
        if (payment.onlinePaymentTitleTranslationBucket == null){
            System.out.println("delivery.selfTakeTranslationBucket is null and will be creating NEW");
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Карткою");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "By Credit Cart");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            payment.onlinePaymentTitleTranslationBucket = translationBucket;
        }
    }

    private static void setTranslationForSelfTakeLabel(DeliveryDTO delivery) {
        if (delivery.selfTakeTranslationBucket == null){
            System.out.println("delivery.selfTakeTranslationBucket is null and will be creating NEW");
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Самовивіз");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "Self Pickup");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            delivery.selfTakeTranslationBucket = translationBucket;
        }
    }

    private static void setTranslationForCourierDeliveryLabel(DeliveryDTO delivery) {
        if (delivery.courierTextTranslationBucket == null){
            System.out.println("delivery.courierTextTranslationBucket is null and will be creating NEW");
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Доставка кур'єром");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "Courier");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            delivery.courierTextTranslationBucket = translationBucket;
        }
    }

    private static void setTranslationForPostDepartmentLabel(DeliveryDTO delivery) {
        if (delivery.newPostTranslationBucket == null){
            System.out.println("delivery.newPostTranslationBucket is null and will be creating NEW");
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "Доставка Новою Поштою");
            translationItemUk.save();
            TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "Nova Poshta Delivery");
            translationItemEn.save();
            translationBucket.addTranslationItem(translationItemUk);
            translationBucket.addTranslationItem(translationItemEn);
            translationBucket.save();
            delivery.newPostTranslationBucket = translationBucket;
        }
    }

    public static void getUserInfo() throws Exception {
        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();
        System.out.println("admin name: " + user.name);
        renderJSON(json(user));
    }

    public static void getShopInfo() throws Exception{
        String shopUuid = request.params.get("shopUuid");
        System.out.println("getShopInfo for balance: " + shopUuid);
        ShopDTO shop = ShopDTO.findById(shopUuid);
        CoinAccountDTO coinAccount = CoinAccountDTO.find("byShop", shop).first();
        renderJSON(json(coinAccount));
    }

    public static void saveShopName() throws Exception{
        String shopUuid = request.params.get("shopUuid");
        String shopName = request.params.get("shopName");
        System.out.println("getShopInfo for shopName: " + shopName);
        ShopDTO shop = ShopDTO.findById(shopUuid);
        shop.shopName = shopName;
        shop.save();
        renderJSON(json(shop));
    }

    public static void saveSettingsForShop() throws Exception {

        String googleWebsiteVerificator = request.params.get("googleWebsiteVerificator");
        String googleAnalyticsCode = request.params.get("googleAnalyticsCode");
        String googleStaticMapsApiKey = request.params.get("googleStaticMapsApiKey");
        String googleMapsApiKey = request.params.get("googleMapsApiKey");
        String faceBookPixelApiKey = request.params.get("faceBookPixelApiKey");
        System.out.println("google setting: " + googleWebsiteVerificator + googleAnalyticsCode + googleStaticMapsApiKey
        + googleMapsApiKey + faceBookPixelApiKey);

        String shopUuid = request.params.get("shopUuid");
        ShopDTO shop = ShopDTO.findById(shopUuid);

        if (googleWebsiteVerificator != null){
            shop.googleWebsiteVerificator = googleWebsiteVerificator;
        }
        if (googleAnalyticsCode != null){
            shop.googleAnalyticsCode = googleAnalyticsCode;
        }
        if (googleStaticMapsApiKey != null){
            shop.googleStaticMapsApiKey = googleStaticMapsApiKey;
        }
        if (googleMapsApiKey != null){
            shop.googleMapsApiKey = googleMapsApiKey;
        }
        if (faceBookPixelApiKey != null){
            shop.faceBookPixelApiKey = faceBookPixelApiKey;
        }
        shop.save();
        renderJSON(json(shop));
    }

    public static void getShopList() throws Exception {

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();
        System.out.println("shop list for user: " + user.shopList);
        renderJSON(json(user.shopList));

    }




}
