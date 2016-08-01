package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ShopDTO;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.mvc.Before;
import play.mvc.Controller;

public class ShopAPI extends Controller {
    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";
    private static final String X_AUTH_USER_ID = "X-AUTH-USER-ID";

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

    public static void list(String client) throws Exception {
        checkAuthentification();
        String userId = request.headers.get(X_AUTH_USER_ID).value();
        UserDTO user = UserDTO.findById(userId);
        renderJSON(json(user.shopList));
    }

    public static void details(String client, String shopId) throws Exception {
        checkAuthentification();
        ShopDTO shop = ShopDTO.findById(shopId);
        renderJSON(json(shop));
    }

    public static void update() throws Exception {
        checkAuthentification();

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String uuid = (String) jsonBody.get("uuid");
        String domain = (String) jsonBody.get("domain");
        String liqpayPublicKey = (String) jsonBody.get("liqpayPublicKey");
        String liqpayPrivateKey = (String) jsonBody.get("liqpayPrivateKey");


        ShopDTO shop = ShopDTO.findById(uuid);
        shop.domain = domain;
        shop.liqpayPublicKey = liqpayPublicKey;
        shop.liqpayPrivateKey = liqpayPrivateKey;

        shop.save();
        renderJSON(json(shop));
    }


    private static String json(Object object){
        response.setHeader("Content-Type", "application/json");
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}