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
    private static final String X_AUTH_TOKEN = "fa8426a0-8eaf-4d22-8e13-7c1b16a9370c";


    public static void signin(String email, String password) throws Exception {
        String SVYAT = "sviatoslav.p5@gmail.com";
        String BOGDAN = "bohdaq@gmail.com";
        String VOVA = "patlavovach@gmail.com";

        String PASSWORD = "rjylbnth";


        if (email.equals(SVYAT) || email.equals(BOGDAN) || email.equals(VOVA)){
            if (password.equals(PASSWORD)) {
                response.setHeader("X-AUTH-TOKEN", X_AUTH_TOKEN);
                ok();
            }
        }
        forbidden();
    }

    public static void index() {
        render();
    }

    public static void client(String client) {
        System.out.println("client domain: " + client);;
    }

    public static void map() {
        render();
    }

    public static void indexRu() {
        render();
    }

    public static void shop() {
        render();
    }

    public static void done() {
        render();
    }

    public static void fail() {
        render();
    }

    public static void admin() {
        render();
    }

    public static void login() {
        render();
    }

}