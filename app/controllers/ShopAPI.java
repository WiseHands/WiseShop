package controllers;

import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import play.i18n.Messages;
import services.MailSender;
import services.MailSenderImpl;
import services.SmsSender;
import services.SmsSenderImpl;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ShopAPI extends AuthController {
    public static final String WISEHANDS_STATIC_MAPS_KEY = "AIzaSyCcBhIqH-XMcNu99hnEKvWIZTrazd9XgXg";
    public static final String WISEHANDS_MAPS_KEY = "AIzaSyAuKg9jszEEgoGfUlIqmd4n9czbQsgcYRM";
    public static final String SHOP_OPEN_FROM = "1969-12-31T22:00:00.000Z";
    public static final String SHOP_OPEN_UNTIL = "1970-01-01T21:59:00.000Z";
    public static final String SERVER_IP = "91.224.11.24";

    static MailSender mailSender = new MailSenderImpl();
    static SmsSender smsSender = new SmsSenderImpl();

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
        }catch (IOException ex){
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

        ShopDTO shop = ShopDTO.findById(uuid);
        for(UserDTO user : shop.userList) {
            user.shopList.remove(shop);
            user.save();
        }
        shop.userList.clear();

        List<ProductDTO> productsTodelete = new ArrayList<ProductDTO>(shop.productList);
        shop.productList.clear();
        for (ProductDTO product : productsTodelete) {
            product.delete();
        }

        for (OrderDTO order : shop.orders) {
            List<OrderItemDTO> orderItemsToDelete = new ArrayList<OrderItemDTO>(order.items);
            order.items.clear();
            order = order.save();
            for (OrderItemDTO orderItem : orderItemsToDelete) {
                orderItem.delete();
            }
        }
        shop = shop.save();
        shop.delete();
        ok();
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        String userId = request.headers.get(X_AUTH_USER_ID).value();
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

    public static void publicInfo(String client) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        JSONObject json = new JSONObject();
        json.put("name", shop.shopName);
        json.put("uuid", shop.uuid);
        json.put("startTime", shop.startTime);
        json.put("endTime", shop.endTime);
        json.put("locale", shop.locale);
        json.put("alwaysOpen", shop.alwaysOpen);
        json.put("manualPaymentEnabled", shop.paymentSettings.manualPaymentEnabled);
        json.put("onlinePaymentEnabled", shop.paymentSettings.onlinePaymentEnabled);
        json.put("freeDeliveryLimit", shop.paymentSettings.freeDeliveryLimit);
        boolean couponsEnabled = true;
        List<CouponDTO> coupons = CouponDTO.find("byShopUuid", shop.uuid).fetch();
        if(coupons.size() == 0) {
            couponsEnabled = false;
        }
        json.put("couponsEnabled", couponsEnabled);

        renderJSON(json);
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

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        System.out.println("Keys from db: " + shop.liqpayPublicKey + ", " + shop.liqpayPrivateKey);


        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String name = (String) jsonBody.get("shopName");
        String liqpayPublicKey = (String) jsonBody.get("liqpayPublicKey");
        String liqpayPrivateKey = (String) jsonBody.get("liqpayPrivateKey");
        String googleWebsiteVerificator = (String) jsonBody.get("googleWebsiteVerificator");
        String googleAnalyticsCode = (String) jsonBody.get("googleAnalyticsCode");
        String googleMapsApiKey = (String) jsonBody.get("googleMapsApiKey");
        String googleStaticMapsApiKey = (String) jsonBody.get("googleStaticMapsApiKey");
        String startTime = (String) jsonBody.get("startTime");
        String endTime = (String) jsonBody.get("endTime");
        Boolean alwaysOpen = (Boolean) jsonBody.get("alwaysOpen");
        String locale = (String) jsonBody.get("locale");
        System.out.println("Keys from request: " + liqpayPublicKey + ", " + liqpayPrivateKey);

        shop.liqpayPublicKey = liqpayPublicKey;
        shop.liqpayPrivateKey = liqpayPrivateKey;

        shop.startTime = startTime;
        shop.endTime = endTime;
        shop.alwaysOpen = alwaysOpen;
        shop.shopName = name;

        shop.googleWebsiteVerificator = googleWebsiteVerificator;
        shop.googleAnalyticsCode = googleAnalyticsCode;
        shop.googleMapsApiKey = googleMapsApiKey;
        shop.googleStaticMapsApiKey = googleStaticMapsApiKey;
        shop.locale = locale;

        shop = shop.save();
        renderJSON(json(shop));
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

        String userId = request.headers.get(X_AUTH_USER_ID).value();
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

    public static void create(String name, String domain) throws Exception {
        checkAuthentification(null);

        try {

            boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

            if(isDevEnv){
                if (domain.contains(".localhost")) {
                    boolean isDomainRegisteredAlready = !ShopDTO.find("byDomain", domain).fetch().isEmpty();
                    if (isDomainRegisteredAlready) {
                        forbidden(domain + " is used by another user. Please select other one");
                    }
                    System.out.println("Creating shop with domain name " + domain);
                    ShopDTO shop = createShop(name, domain);
                    renderJSON(json(shop));
                }
                forbidden("Domain in dev env should follow yourdomain.localhost pattern. You entered " + domain);
            } else {
                String domainIp = InetAddress.getByName(domain).getHostAddress();
                if (domainIp.equals(SERVER_IP)) {
                    boolean isDomainRegisteredAlready = !ShopDTO.find("byDomain", domain).fetch().isEmpty();
                    if (isDomainRegisteredAlready) {
                        forbidden(domain + " is used by another user. Please select other one");
                    }
                    System.out.println("Creating shop with domain name " + domain);
                    ShopDTO shop = createShop(name, domain);
                    renderJSON(json(shop));
                }
                forbidden("domain ip address is not correct: " + domainIp);
            }

        } catch (UnknownHostException e) {
            System.out.println(e.getStackTrace());
            forbidden("Unknown Host for domain enetered for shop: " + domain);
        }



    }

    private static ShopDTO createShop(String name, String domain){
        String userId = request.headers.get(X_AUTH_USER_ID).value();
        UserDTO user = UserDTO.findById(userId);

        ShopDTO shopWithGivenDomain = ShopDTO.find("byDomain", domain).first();
        if(shopWithGivenDomain != null) {
            String reason = Messages.get("shop.with.domain.already.exist");
            forbidden(reason);
        }

        Double courierDeliveryPrice = 40.0;
        Double courierFreeDeliveryLimit = 9999.0;
        DeliveryDTO delivery = new DeliveryDTO(
                true, "Викликати кур’єра по Львову – 40 грн або безкоштовно (якщо розмір замовлення перевищує 500 грн.)",
                true, "Самовивіз",
                true, "Замовити доставку до найближчого відділення Нової Пошти у Вашому місті (від 35 грн.)",
                courierDeliveryPrice,
                courierFreeDeliveryLimit
        );
        delivery.save();

        PaymentSettingsDTO paymentSettings = new PaymentSettingsDTO(true, true, (double) 500);
        paymentSettings.save();

        ContactDTO contact = new ContactDTO("380932092108", "me@email.com", "Львів, вул. Академіка Люльки, 4", "49.848596:24.0229203", "МИ СТВОРИЛИ ТОРБУ ЩАСТЯ ДЛЯ ТОГО, ЩОБ МІЛЬЙОНИ ЛЮДЕЙ МАЛИ МОЖЛИВІСТЬ КОЖНОГО ДНЯ ВЧАСНО ОТРИМУВАТИ ЦІКАВІ ВІДПОВІДІ ТА СВОЄ НАТХНЕННЯ НА ЧУДОВИЙ ДЕНЬ");
        contact.save();

        List<UserDTO> users = new ArrayList<UserDTO>();
        users.add(user);

        BalanceDTO balance = new BalanceDTO();

        VisualSettingsDTO visualSettings = new VisualSettingsDTO();
        visualSettings.navbarTextColor = "#fff";
        visualSettings.navbarColor = "#072e6e";
        visualSettings.navbarShopItemsColor = "#F44336";
        SidebarColorScheme color = (SidebarColorScheme) SidebarColorScheme.findAll().get(0);
        visualSettings.sidebarColorScheme = color;

        ShopDTO shop = new ShopDTO(users, paymentSettings, delivery, contact, balance, visualSettings, name, "", "", domain, "en_US");
        shop.startTime = SHOP_OPEN_FROM;
        shop.endTime = SHOP_OPEN_UNTIL;
        shop.googleStaticMapsApiKey = WISEHANDS_STATIC_MAPS_KEY;
        shop.googleMapsApiKey = WISEHANDS_MAPS_KEY;

        _appendDomainToList(domain);
        return shop = shop.save();
    }

    private static void _appendDomainToList(String domainName) {
        String filename = "domains.txt";
        String text = domainName + "\n";
        System.out.println("Appending domain name" + domainName + " to domains.txt");
        try {
            Files.write(Paths.get(filename), text.getBytes(), StandardOpenOption.APPEND);
        }catch (IOException e) {
            System.out.println("_appendDomainToList" + e.getStackTrace());
        }
    }

}