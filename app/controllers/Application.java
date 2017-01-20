package controllers;

import com.google.common.base.Charsets;
import com.google.common.io.CharStreams;
import com.google.common.io.Files;
import com.google.common.io.InputSupplier;
import play.exceptions.TemplateNotFoundException;
import play.mvc.*;

import models.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class Application extends Controller {

    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Before
    static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
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

        if (client.equals("wisehands.me")){
            renderTemplate("WiseHands/index.html");
        }

        if (shop == null) {
            notFound("The requested Shop is not available. Contact administrator");
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
                } catch (TemplateNotFoundException){
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
            notFound("The requested Shop is not available. Contact administrator    ");
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
            notFound("The requested Shop is not available. Contact administrator    ");
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


}
