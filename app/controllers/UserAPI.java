package controllers;

import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ContactDTO;
import models.DeliveryDTO;
import models.ShopDTO;
import models.UserDTO;
import play.db.jpa.JPA;
import play.mvc.Before;
import play.mvc.Controller;
import responses.InvalidPassword;
import responses.UserDoesNotExist;
import services.MailSender;
import services.SmsSender;

import javax.inject.Inject;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.persistence.Query;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class UserAPI extends Controller {
    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    @Inject
    static SmsSender smsSender;


    public static void register(String email, String password, String passwordConfirmation,
                                String shopName, String name, String publicLiqPayKey,
                                String privateLiqPayKey, String clientDomain, String phone) throws Exception {
        if (isValidEmailAddress(email)) {
            //GOOGLE SIGN IN
            UserDTO user = UserDTO.find("byEmail", email).first();
            System.out.println(user);
            if (user != null) {
                user.phone = phone;
            } else if (user == null) {
                //NOT GOOGLE SIGN IN
                if (!password.equals(passwordConfirmation)) {
                    error("password mismatch");
                }
                user = new UserDTO(email, password, phone);
                user.name = name;
            }
            user.save();

            DeliveryDTO delivery = new DeliveryDTO(
                    true, "Викликати кур’єра по Львову – 35 грн або безкоштовно (якщо розмір замовлення перевищує 500 грн.)",
                    true, "Самовивіз",
                    true, "Замовити доставку до найближчого відділення Нової Пошти у Вашому місті (від 35 грн.)"
            );
            delivery.save();

            ContactDTO contact = new ContactDTO(user.phone, user.email, "Lviv", "25,67:48.54", "Best Company Ever");
            contact.save();

            List<UserDTO> users = new ArrayList<UserDTO>();
            users.add(user);
            ShopDTO shop = new ShopDTO(users, delivery, contact, shopName, publicLiqPayKey, privateLiqPayKey, clientDomain);
            shop.save();

            response.setHeader(X_AUTH_TOKEN, user.token);
            String json = json(user);
            System.out.println("\nUserAPI register: \n" + json);
            String greetingText = "Успішно створено Ваш новий магазин " + shop.shopName;
            smsSender.sendSms(shop.contact.phone, greetingText);
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

            if(user.password == null) // if the user used google sign in and hacker tries to login via empty password
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

    public static void storeauthcode(String authCode) throws Exception {
        System.out.println(authCode);

        String CLIENT_SECRET_FILE = "conf/client_secret.json";
        String REDIRECT_URI = "postmessage";

        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(
                        JacksonFactory.getDefaultInstance(), new FileReader(CLIENT_SECRET_FILE));
        GoogleTokenResponse tokenResponse =
                new GoogleAuthorizationCodeTokenRequest(
                        new NetHttpTransport(),
                        JacksonFactory.getDefaultInstance(),
                        "https://www.googleapis.com/oauth2/v4/token",
                        clientSecrets.getDetails().getClientId(),
                        clientSecrets.getDetails().getClientSecret(),
                        authCode,
                        REDIRECT_URI)  // Specify the same redirect URI that you use with your web
                        // app. If you don't have a web version of your app, you can
                        // specify an empty string.
                        .execute();
        String accessToken = tokenResponse.getAccessToken();

        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

        GoogleIdToken idToken = tokenResponse.parseIdToken();
        GoogleIdToken.Payload payload = idToken.getPayload();
        String userId = payload.getSubject();  // Use this value as a key to identify a user.
        String email = payload.getEmail();
        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        String locale = (String) payload.get("locale");
        String familyName = (String) payload.get("family_name");
        String givenName = (String) payload.get("given_name");

        System.out.println(userId);
        System.out.println(email);
        System.out.println(emailVerified);
        System.out.println(name);
        System.out.println(pictureUrl);
        System.out.println(locale);
        System.out.println(familyName);
        System.out.println(givenName);

        if(!emailVerified){
            error("user have not verified email address on google");
        }

        UserDTO user = UserDTO.find("email", email).first();
        if(user == null){
            user = new UserDTO();
            user.email = email;
        }

        user.googleId = userId;
        user.name = name;
        user.profileUrl = pictureUrl;
        user.locale = locale;
        user.familyName = familyName;
        user.givenName = givenName;
        user.save();

        String json = json(user);
        System.out.println(json);

        response.setHeader(X_AUTH_TOKEN, user.token);
        renderJSON(json);
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