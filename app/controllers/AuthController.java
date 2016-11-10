package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.*;
import play.mvc.Before;
import play.mvc.Controller;

public class AuthController extends Controller {

    protected static UserDTO loggedInUser;


    protected static final String X_AUTH_TOKEN = "x-auth-token";
    protected static final String X_AUTH_USER_ID = "x-auth-user-id";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    static void checkAuthentification(ShopDTO shop) {
        boolean authHeadersPopulated = request.headers.get(X_AUTH_TOKEN) != null && request.headers.get(X_AUTH_USER_ID) != null;
        if (authHeadersPopulated){
            String userId = request.headers.get(X_AUTH_USER_ID).value();
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.findById(userId);

            if(user == null)
                forbidden("Invalid X-AUTH-USER-ID: " + userId);
            if(!user.token.equals(token))
                forbidden("Invalid X-AUTH-TOKEN: " + token);

            loggedInUser = user;
            if(shop != null && !shop.userList.contains(user)) {
                forbidden("This user do not belong to given shop: " + userId);
            }
        } else {
            forbidden("Empty X-AUTH-TOKEN or X-AUTH-USER-ID");
        }
    }

    static void checkSudoAuthentification() {
        boolean authHeadersPopulated = request.headers.get(X_AUTH_TOKEN) != null && request.headers.get(X_AUTH_USER_ID) != null;
        if (authHeadersPopulated){
            String userId = request.headers.get(X_AUTH_USER_ID).value();
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.findById(userId);

            if(user == null)
                forbidden("Invalid X-AUTH-USER-ID: " + userId);
            if(!user.token.equals(token))
                forbidden("Invalid X-AUTH-TOKEN: " + token);

            loggedInUser = user;
            if(!(user.email.equals("bohdaq@gmail.com") || user.email.equals("patlavovach@gmail.com"))) {
                forbidden("This user is not superadmin: " + userId + user.email);
            }
        } else {
            forbidden("Empty X-AUTH-TOKEN or X-AUTH-USER-ID");
        }
    }

    protected static String json(Object object){
        response.setHeader("Content-Type", "application/json");
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }
}
