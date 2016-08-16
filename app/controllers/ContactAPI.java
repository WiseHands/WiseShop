package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ContactDTO;
import models.DeliveryDTO;
import models.ShopDTO;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import play.mvc.Before;
import play.mvc.Controller;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class ContactsAPI extends Controller {
    private static final String X_AUTH_TOKEN = "x-auth-token";
    private static final String X_AUTH_USER_ID = "x-auth-user-id";


    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", X_AUTH_TOKEN);
    }


    static void checkAuthentification() {
        boolean authHeadersPopulated = request.headers.get(X_AUTH_TOKEN) != null && request.headers.get(X_AUTH_USER_ID) != null;
        if (authHeadersPopulated){
            String userId = request.headers.get(X_AUTH_USER_ID).value();
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.findById(userId);

            if(user == null)
                forbidden("Invalid X-AUTH-TOKEN: " + token);
        } else {
            forbidden("Empty X-AUTH-TOKEN");
        }
    }

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        renderJSON(json(shop.contact));
    }


    public static void update(String client) throws Exception {
        checkAuthentification();

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String email = (String) jsonBody.get("email");
        String phone = (String) jsonBody.get("phone");
        String description = (String) jsonBody.get("description");
        String address = (String) jsonBody.get("address");

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        ContactDTO contact = shop.contact;
        contact.email = email;
        contact.phone = phone;
        contact.address = address;
        contact.description = description;

        contact.save();

        renderJSON(json(contact));
    }

    private static String json(Object object){
        response.setHeader("Content-Type", "application/json");
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}