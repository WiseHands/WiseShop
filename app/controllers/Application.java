package controllers;

import in.ankushs.dbip.api.DbIpClient;
import in.ankushs.dbip.api.GeoEntity;
import play.mvc.*;

import models.*;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Application extends Controller {
    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";

    @Before
    static void interceptAction(){
        corsHeaders();
    }

    static void checkAuthentification() {
        if (request.headers.get(X_AUTH_TOKEN) != null){
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.find("byEmail", token).first();

            if(user == null)
                forbidden("Invalid X-AUTH-TOKEN: " + token);
        } else {
            forbidden("Empty X-AUTH-TOKEN");
        }
    }

    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    public static void index(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();

        if (client.equals("localhost") || client.equals("wisehands.me")){
            renderTemplate("WiseHands/index.html");
        }

        if (shop == null) {
            notFound("The requested Shop is not available. Contact administrator");
        }

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();

        File gzip = new File("csv/dbip-city-2016-09.csv");
        DbIpClient geoClient = new DbIpClient(gzip);

        System.out.println(System.currentTimeMillis());
        GeoEntity geoEntity = geoClient.lookup("31.45.127.255");
        System.out.println(System.currentTimeMillis());
        String city = geoEntity.getCity();

        String ip = request.headers.get("x-forwarded-for").value();
        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " [" + city + "] and user-agent " + agent + " opened shop " + shop.shopName + " at " + dateFormat.format(date));

        renderTemplate("Application/shop.html", shop);
    }

    public static void shop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            notFound("The requested Shop is not available. Contact administrator    ");
        }


        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();

        String ip = request.headers.get("x-forwarded-for").value();
        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened SHOP " + shop.shopName + " at " + dateFormat.format(date));


        render(shop);
    }

    public static void done(String client) {
        render();
    }

    public static void fail(String client) {
        render();
    }

    public static void admin(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            notFound("The requested Shop is not available. Contact administrator    ");
        }

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();

        String ip = request.headers.get("x-forwarded-for").value();
        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened ADMIN " + shop.shopName + " at " + dateFormat.format(date));


        render();
    }

    public static void superAdmin(String client) {
        render();
    }

    public static void login(String client) {
        if (client.equals("localhost")){
            renderTemplate("WiseHands/index.html");
        } else {
            redirect("http://wisehands.me");
        }
    }

    public static void register(String client) {
        renderTemplate("WiseHands/register.html");
    }

}
