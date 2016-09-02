package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.liqpay.LiqPay;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.*;
import play.libs.Mail;
import play.mvc.*;
import org.apache.commons.codec.binary.Base64;
import java.util.UUID;

import java.util.*;

import models.*;

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
        System.out.println("client domain: " + client);

        if (client.equals("localhost") || client.equals("wisehands.me")){
            renderTemplate("WiseHands/index.html");
        }

        ShopDTO shopDTO = ShopDTO.find("byDomain", client).first();
        if (shopDTO == null) {
            notFound("The requested Shop is not available. Contact administrator");
        }

        renderTemplate("Application/shop.html");
    }

    public static void shop(String client) {
        ShopDTO shopDTO = ShopDTO.find("byDomain", client).first();
        if (shopDTO == null) {
            notFound("The requested Shop is not available. Contact administrator    ");
        }

        render();
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