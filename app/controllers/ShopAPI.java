package controllers;

import models.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import services.MailSender;

import javax.inject.Inject;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

public class ShopAPI extends AuthController {
    public static final String SERVER_IP = "91.224.11.24";

    @Inject
    static MailSender mailSender;

    public static void all(String client) throws Exception {
        List<ShopDTO> shops = ShopDTO.findAll();
        renderJSON(json(shops));
    }
    public static void one(String client, String uuid) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.findById(uuid);
        renderJSON(json(shop));
    }
    public static void deleteOne(String client, String uuid) throws Exception { // /shop/details
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
        checkAuthentification(shop);

        String userId = request.headers.get(X_AUTH_USER_ID).value();
        UserDTO user = UserDTO.findById(userId);
        renderJSON(json(user.shopList));
    }

    public static void details(String client) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        renderJSON(json(shop));
    }

    public static void publicInfo(String client) throws Exception { // /shop/details
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        JSONObject json = new JSONObject();
        json.put("name", shop.shopName);
        json.put("uuid", shop.uuid);
        json.put("startTime", shop.startTime);
        json.put("endTime", shop.endTime);
        json.put("manualPaymentEnabled", shop.paymentSettings.manualPaymentEnabled);
        json.put("freeDeliveryLimit", shop.paymentSettings.freeDeliveryLimit);
        renderJSON(json);
    }

    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        System.out.println("Keys from db: " + shop.liqpayPublicKey + ", " + shop.liqpayPrivateKey);


        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String name = (String) jsonBody.get("shopName");
        String liqpayPublicKey = (String) jsonBody.get("liqpayPublicKey");
        String liqpayPrivateKey = (String) jsonBody.get("liqpayPrivateKey");
        String googleWebsiteVerificator = (String) jsonBody.get("googleWebsiteVerificator");
        String googleAnalyticsCode = (String) jsonBody.get("googleAnalyticsCode");
        String startTime = (String) jsonBody.get("startTime");
        String endTime = (String) jsonBody.get("endTime");
        System.out.println("Keys from request: " + liqpayPublicKey + ", " + liqpayPrivateKey);

        shop.liqpayPublicKey = liqpayPublicKey;
        shop.liqpayPrivateKey = liqpayPrivateKey;

        shop.startTime = startTime;
        shop.endTime = endTime;
        shop.shopName = name;

        shop.googleWebsiteVerificator = googleWebsiteVerificator;
        shop.googleAnalyticsCode = googleAnalyticsCode;

        shop = shop.save();
        renderJSON(json(shop));
    }


    public static void listUsers(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        renderJSON(json(shop.userList));
    }


    public static void addUserToShop(String client, String email) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        UserDTO user = UserDTO.find("byEmail", email).first();

        if (user == null) {
            user = new UserDTO();
            user.email = email;
        } else if (user.shopList.contains(shop)) {
            forbidden("User already a member of the given Shop");
        }
        user.shopList.add(shop);
        user = user.save();

        shop.userList.add(user);
        shop.save();

        mailSender.sendEmailToInvitedUser(shop, user);
        renderJSON(json(user));
    }

    public static void removeUserFromShop(String client, String email) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        UserDTO user = UserDTO.find("byEmail", email).first();

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

    public static void create(String name, String domain, String publicLiqpayKey, String privateLiqPayKey) throws Exception {
        checkAuthentification(null);

        try {

            boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

            if(isDevEnv){
                if (domain.contains(".localhost")) {
                    boolean isDomainRegisteredAlready = !ShopDTO.find("byDomain", domain).fetch().isEmpty();
                    if (isDomainRegisteredAlready) {
                        forbidden(domain + " is used by another user. Please select other one");
                    }
                    ShopDTO shop = createShop(name, domain, publicLiqpayKey, privateLiqPayKey);
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
                    ShopDTO shop = createShop(name, domain, publicLiqpayKey, privateLiqPayKey);
                    renderJSON(json(shop));
                }
                forbidden("domain ip address is not correct: " + domainIp);
            }

        } catch (UnknownHostException e) {
            System.out.println(e.getStackTrace());
            forbidden("Unknown Host for domain enetered for shop: " + domain);
        }



    }

    private static ShopDTO createShop(String name, String domain, String publicLiqpayKey, String privateLiqPayKey){
        String userId = request.headers.get(X_AUTH_USER_ID).value();
        UserDTO user = UserDTO.findById(userId);

        Double courierDeliveryPrice = 40.0;
        DeliveryDTO delivery = new DeliveryDTO(
                true, "Викликати кур’єра по Львову – 40 грн або безкоштовно (якщо розмір замовлення перевищує 500 грн.)",
                true, "Самовивіз",
                true, "Замовити доставку до найближчого відділення Нової Пошти у Вашому місті (від 35 грн.)",
                courierDeliveryPrice
        );
        delivery.save();

        PaymentSettingsDTO paymentSettings = new PaymentSettingsDTO(true, (double) 500);
        paymentSettings.save();

        ContactDTO contact = new ContactDTO("380932092108", "me@email.com", "Львів, вул. Академіка Люльки, 4", "49.848596:24.0229203", "МИ СТВОРИЛИ ТОРБУ ЩАСТЯ ДЛЯ ТОГО, ЩОБ МІЛЬЙОНИ ЛЮДЕЙ МАЛИ МОЖЛИВІСТЬ КОЖНОГО ДНЯ ВЧАСНО ОТРИМУВАТИ ЦІКАВІ ВІДПОВІДІ ТА СВОЄ НАТХНЕННЯ НА ЧУДОВИЙ ДЕНЬ");
        contact.save();

        List<UserDTO> users = new ArrayList<UserDTO>();
        users.add(user);

        ShopDTO shop = new ShopDTO(users, paymentSettings, delivery, contact, name, publicLiqpayKey, privateLiqPayKey, domain);
        return shop = shop.save();
    }

}