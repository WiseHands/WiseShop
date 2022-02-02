package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ShopDTO;
import models.UserDTO;
import play.mvc.Before;
import play.mvc.Controller;

import static controllers.WizardAPI.getUserIdFromAuthorization;

public class AuthController extends Controller {

    protected static UserDTO loggedInUser;

    protected static final String AUTHORIZATION = "authorization";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
    }

    static void checkAuthentication(ShopDTO shop) {
        String authorizationHeader = request.headers.get(AUTHORIZATION).value();
        String jwtToken = authorizationHeader.replace("Bearer ", "");
        loggedInUser = verifyToken(jwtToken);
        if (shop != null && !shop.userList.contains(loggedInUser)) {
            forbidden("This user do not belong to given shop: " + loggedInUser.name);
        }

    }

    static UserDTO verifyToken(String token) {
        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        return UserDTO.findById(userId);
    }

    static void checkSudoAuthentification() {
        String authorizationHeader = request.headers.get(AUTHORIZATION).value();
        String jwtToken = authorizationHeader.replace("Bearer ","");
        loggedInUser = verifyToken(jwtToken);
        if(!loggedInUser.isSuperUser) {
            forbidden("Not a superuser :) " + loggedInUser.name);
        }
    }

    protected static String json(Object object){
        response.setHeader("Content-Type", "application/json");
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }
}
