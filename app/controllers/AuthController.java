package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.*;
import play.mvc.Before;
import play.mvc.Controller;

public class AuthController extends Controller {

    private static final String X_AUTH_TOKEN = "x-auth-token";
    private static final String X_AUTH_USER_ID = "x-auth-user-id";

    protected static UserDTO loggedInUser;



    @Before
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
                forbidden("Invalid X-AUTH-USER-ID: " + userId);
            if(!user.token.equals(token))
                forbidden("Invalid X-AUTH-TOKEN: " + token);

            loggedInUser = user;
        } else {
            forbidden("Empty X-AUTH-TOKEN");
        }
    }

    protected static String json(Object object){
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }
}
