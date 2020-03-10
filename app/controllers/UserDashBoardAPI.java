package controllers;

import models.*;
import play.Play;
import play.mvc.Before;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import static controllers.WizardAPI.getUserIdFromAuthorization;

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

    public static void getShopList() throws Exception {

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();
        System.out.println("shop list for user: " + user.shopList);
        renderJSON(json(user.shopList));

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
        ContactDTO contact = new ContactDTO(user.phone, user.email, user.wizard.shopDescription,
                user.wizard.cityName, user.wizard.streetName, user.wizard.buildingNumber,
                user.wizard.facebookLink, user.wizard.instagramLink, user.wizard.youtubeLink
        );
        PaymentSettingsDTO paymentSettings = new PaymentSettingsDTO(user.wizard.payCash, user.wizard.payOnline,
                (double) 0, "", "", ""
        );

        BalanceDTO balance = new BalanceDTO();
        VisualSettingsDTO visualSettings = new VisualSettingsDTO();

        ShopDTO shop = new ShopDTO(users, paymentSettings, delivery,
                contact, balance, visualSettings, user.wizard.shopName,
                "public liqpay key here", "private liqpay key here", user.wizard.shopDomain, "en_US"
        );
        shop.googleStaticMapsApiKey = "AIzaSyCcBhIqH-XMcNu99hnEKvWIZTrazd9XgXg";
        shop.googleMapsApiKey = "AIzaSyAuKg9jszEEgoGfUlIqmd4n9czbQsgcYRM";
        visualSettings.shop = shop;
        shop.save();

    }

}
