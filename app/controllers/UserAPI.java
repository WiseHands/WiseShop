package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.OrderDTO;
import models.UserDTO;
import play.mvc.Before;
import play.mvc.Controller;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

public class UserAPI extends Controller {
    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }


    public static void register(String email, String password, String repeatPassword) throws Exception {
        if (isValidEmailAddress(email)) {
            UserDTO user = new UserDTO(email, password);
            user.save();

            System.out.println(json(user));
            renderJSON(json(user));
        } else {
            forbidden("Email Not Valid: " + email);
        }
    }

    public static void login(String email, String password) throws Exception {
        if (isValidEmailAddress(email)) {
            UserDTO user = UserDTO.find("byEmail", email).first();

            if(user == null)
                forbidden("Email not found: " + email);

            if(!user.password.equals(password))
                forbidden("Wrong password");

            response.setHeader(X_AUTH_TOKEN, user.token.toString());
            renderJSON(json(user));
        } else {
            forbidden("Email Not Valid: " + email);
        }
    }

    public static boolean isValidEmailAddress(String email) {
        boolean result = true;
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
        } catch (AddressException ex) {
            result = false;
        }
        return result;
    }


    private static String json(Object object){
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}