package controllers;

import play.Play;
import play.exceptions.TemplateNotFoundException;
import play.i18n.Lang;
import play.mvc.*;

import models.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class Application extends Controller {

    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));
    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    private static final String GOOGLE_OAUTH_CLIENT_ID = Play.configuration.getProperty("google.oauthweb.client.id");
    private static final String GOOGLE_MAPS_API_KEY = Play.configuration.getProperty("google.maps.api.key");
    private static final String GOOGLE_ANALYTICS_ID = Play.configuration.getProperty("google.analytics.id");

    @Before
    static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    public static void login(String client) {
        if(client.equals("wisehands.me") || isDevEnv) {
            renderTemplate("WiseHands/index.html", GOOGLE_OAUTH_CLIENT_ID, GOOGLE_MAPS_API_KEY, GOOGLE_ANALYTICS_ID);
        }
        redirect("https://wisehands.me/", true);
    }

    public static void index(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String locale = "en_US";
        if(shop != null && shop.locale != null) {
            locale = shop.locale;
        }
        Lang.change(locale);

        if (client.equals("wisehands.me")){
            renderTemplate("WiseHands/index.html");
        }

        Date date = new Date();


        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }

        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened shop " + shop.shopName + " at " + dateFormat.format(date));

        boolean isGoogleCrawler = request.params.data.containsKey("_escaped_fragment_");
        if (isGoogleCrawler) {
            String escapedFragment = request.params.data.get("_escaped_fragment_")[0];
            System.out.println("Escaped Fragment: " + escapedFragment);
            if (escapedFragment.contains("product")){
                String filePathString = "Prerender/" + shop.uuid + "/" + escapedFragment + ".html";
                try {
                    renderTemplate(filePathString);
                } catch (TemplateNotFoundException ex){
                    System.out.println("not found template at path: " + escapedFragment);
                    notFound();
                }
            } else if (escapedFragment.contains("category")){
                renderTemplate("Prerender/" + shop.uuid + "/" + escapedFragment + ".html");
            } else if (escapedFragment.contains("contacts")) {
                renderTemplate("Prerender/" + shop.uuid + "/" + escapedFragment + ".html");
            }
            System.out.println(dateFormat.format(date) + ": Escaped Fragment " + escapedFragment + " request with ip " + ip +  " and user-agent " + agent + " just opened " + shop.shopName + ", rendering snapshot...");
            renderTemplate("Prerender/" + shop.uuid + "/index.html");

        }

        renderTemplate("Application/shop.html", shop);
    }

    public static void shop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }


        Date date = new Date();

        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }
        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened SHOP " + shop.shopName + " at " + dateFormat.format(date));


        render(shop);
    }

    public static void done(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        DeliveryDTO delivery = shop.delivery;
        if(delivery.orderMessage == null || delivery.orderMessage.equals("")) {
            delivery.orderMessage = "Замовлення успішно завершено. Очікуйте, з вами зв'яжуться.";
            delivery = delivery.save();
        }
        render(delivery);
    }

    public static void fail(String client) {
        render();
    }

    public static void admin(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        Date date = new Date();

        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }

        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened ADMIN " + shop.shopName + " at " + dateFormat.format(date));

        render(shop);
    }

    public static void superAdmin(String client) {
        render();
    }

    public static void sitemap(String client) throws IOException {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }


        Date date = new Date();


        Http.Header xforwardedHeader = request.headers.get("x-forwarded-for");
        String ip = "";
        if (xforwardedHeader != null){
            ip = xforwardedHeader.value();
        }

        String agent = request.headers.get("user-agent").value();
        System.out.println("User with ip " + ip + " and user-agent " + agent + " opened sitemap " + shop.shopName + " at " + dateFormat.format(date));


        renderTemplate("Prerender/" + shop.uuid + "/" + "sitemap.xml");


    }

    public static void manifestAdmin(String client) throws IOException {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        render(shop);
    }


}
