package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.DeliveryDTO;
import models.ShopDTO;
import models.UserDTO;
import play.mvc.Before;
import play.mvc.Controller;
import responses.InvalidPassword;
import responses.UserDoesNotExist;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

public class UserAPI extends Controller {
    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }


    public static void register(String email, String password, String repeatPassword,
                                String shopName, String shopID, String publicLiqPayKey,
                                String privateLiqPayKey, String clientDomain) throws Exception {
        if (isValidEmailAddress(email)) {
            UserDTO user = new UserDTO(email, password);
            user.save();

            DeliveryDTO delivery = new DeliveryDTO(
                    true, "Викликати кур’єра по Львову – 35 грн або безкоштовно (якщо розмір замовлення перевищує 500 грн.)",
                    true, "Замовити доставку до найближчого відділення Нової Пошти у Вашому місті (від 35 грн.)",
                    true, "Самовивіз"
            );
            delivery.save();

            ShopDTO shop = new ShopDTO(user, delivery, shopName, publicLiqPayKey, privateLiqPayKey, clientDomain);
            shop.save();

            user = UserDTO.find("byEmail", email).first();
            response.setHeader(X_AUTH_TOKEN, user.token);
            String json = json(user);
            renderText(json);
        } else {
            UserDoesNotExist error = new UserDoesNotExist();
            forbidden(json(error));
        }
    }

    public static void login(String email, String password) throws Exception {
        if (isValidEmailAddress(email)) {
            UserDTO user = UserDTO.find("byEmail", email).first();

            if(user == null)
                forbidden(json(new UserDoesNotExist()));

            if(!user.password.equals(password)) {
                InvalidPassword error = new InvalidPassword();
                forbidden(json(error));
            }

            response.setHeader(X_AUTH_TOKEN, user.token);
            String json = json(user);
            System.out.println("\n\n\nRendering json: \n" + json);
            renderJSON(json);
        } else {
            UserDoesNotExist error = new UserDoesNotExist();
            forbidden(json(error));
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