package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.DeliveryDTO;
import models.ShopDTO;
import models.UserDTO;
import play.mvc.Before;
import play.mvc.Controller;

public class DeliveryAPI extends Controller {
    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";
    private static final String X_AUTH_USER_ID = "x-auth-user-id";

    @Before
    static void interceptAction(){
        corsHeaders();
    }

    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
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
        DeliveryDTO delivery = shop.delivery;
        renderJSON(json(delivery));
    }

    public static void update(DeliveryDTO delivery) throws Exception {
        checkAuthentification();
        delivery.save();
        renderJSON(json(delivery));
    }


    private static String json(Object object){
        response.setHeader("Content-Type", "application/json");
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}