package controllers;

import play.mvc.*;

import models.*;

public class Application extends Controller {

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    public static void login(String client) {
        if (client.equals("localhost")){
            renderTemplate("WiseHands/index.html");
        } else {
            redirect("http://wisehands.me");
        }
    }

    public static void index(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();

        if (client.equals("localhost") || client.equals("wisehands.me")){
            renderTemplate("WiseHands/index.html");
        }

        if (shop == null) {
            notFound("The requested Shop is not available. Contact administrator");
        }

        renderTemplate("Application/shop.html", shop);
    }

    public static void shop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            notFound("The requested Shop is not available. Contact administrator    ");
        }

        render(shop);
    }

    public static void done(String client) {
        render();
    }

    public static void fail(String client) {
        render();
    }

    public static void admin(String client) {
        render();
    }

    public static void superAdmin(String client) {
        render();
    }


}