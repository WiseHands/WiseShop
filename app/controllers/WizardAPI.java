package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import models.ShopDTO;
import models.UserDTO;
import models.WizardDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import play.i18n.Messages;
import responses.InvalidPassword;
import responses.JsonResponse;

import static controllers.UserAPI.*;

public class WizardAPI extends AuthController {

    public static void getWizardInfo() throws Exception{
        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        System.out.println("String userId " + userId);

        UserDTO user = UserDTO.find("byUuid", userId).first();
        if (user.wizard == null){
            WizardDTO wizardDTO = new WizardDTO();
            wizardDTO.user = user;
            user.wizard = wizardDTO;
            wizardDTO.save();
        }

        renderJSON(json(user.wizard));
    }

    public static void upDateWizardDetails() throws Exception{
        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        System.out.println("String userId " + userId);

        UserDTO user = UserDTO.find("byUuid", userId).first();
        if (user.wizard == null){
            WizardDTO wizardDTO = new WizardDTO();
            wizardDTO.user = user;
            user.wizard = wizardDTO;
            wizardDTO.save();
        }

        String shopName = request.params.get("shopName");
        String description = request.params.get("shopDescription");

        if (shopName != null){
            user.wizard.shopName = shopName;
        }
        if (description != null){
            user.wizard.shopDescription = description;
        }

        user.wizard.save();
        renderJSON(json(user.wizard));

    }

    public static void checkDomainNameAvailability() throws Exception{
        String domain = request.params.get("shopDomain").toLowerCase();
        String domainPath = "";
        if (Application.isDevEnv) {
            domainPath = ".localhost";
            domain += domainPath;
        } else  {
            domainPath = ".wstore.pro";
            domain += domainPath;
        }

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        System.out.println("String userId " + userId);
        ShopDTO shop = ShopDTO.find("byDomain", domain).first();
        if (shop == null){
            String reason = "адреса доступна";
            JsonResponse jsonResponse = new JsonResponse(421, reason);
            UserDTO user = UserDTO.find("byUuid", userId).first();
            user.wizard.shopDomain = domain;
            user.wizard.save();
            renderJSON(jsonResponse);
        }
        String reason = "адреса недоступна";
        JsonResponse jsonResponse = new JsonResponse(420, reason);
        renderJSON(jsonResponse);

    }

    public static void setShopContactInfo() throws Exception{
        String cityName = request.params.get("cityName");
        String streetName = request.params.get("streetName");
        String buildingNumber = request.params.get("buildingNumber");

        System.out.println("setShopContactInfo\n" + cityName + "\n" + streetName + "\n" + buildingNumber);

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        System.out.println("setShopContactInfo userId\n" + userId);

        UserDTO user = UserDTO.find("byUuid", userId).first();
        System.out.println("setShopContactInfo get userDTO\n" + userId);

        if(cityName != null){
            user.wizard.cityName = cityName;
        }
        if(streetName != null){
            user.wizard.streetName = streetName;
        }
        if(buildingNumber != null){
            user.wizard.buildingNumber =buildingNumber;
        }

        user.wizard.save();
        renderJSON(json(user.wizard));
    }

    public static void setVariantsOfDeliveryAndPaymentTypes() throws Exception{

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        boolean courierDelivery = (boolean) jsonBody.get("courierDelivery");
        boolean postDepartment = (boolean) jsonBody.get("postDepartment");
        boolean selfTake = (boolean) jsonBody.get("selfTake");

        boolean uah = (boolean) jsonBody.get("uahCurrency");
        boolean usd = (boolean) jsonBody.get("usdCurrency");
        boolean eur = (boolean) jsonBody.get("eurCurrency");

        boolean payCash = true;
        boolean payOnline = false;

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();
        System.out.println("setVariantsOfDeliveryAndPaymentTypes\n" + user.givenName);

        user.wizard.courierDelivery = courierDelivery;
        user.wizard.postDepartment = postDepartment;
        user.wizard.selfTake = selfTake;
        user.wizard.payCash = payCash;
        user.wizard.payOnline = payOnline;
        user.wizard.shopCurrency = setCurrencyToShop(uah, usd, eur);

        user.wizard.save();
        renderJSON(json(user.wizard));

    }

    private static String setCurrencyToShop(boolean uah, boolean usd, boolean eur) {
        if (uah){
            return "UAH";
        } else if (usd) {
            return "USD";
        } else {
            return "EUR";
        }
    }

    public static void setSocialNetworkInfo() throws Exception{

        String facebookLink = request.params.get("facebook");
        String instagramLink = request.params.get("instagram");
        String youtubeLink = request.params.get("youtube");

        String authorizationHeader = request.headers.get("authorization").value();
        String userId = getUserIdFromAuthorization(authorizationHeader);
        UserDTO user = UserDTO.find("byUuid", userId).first();
        System.out.println("setSocialNetworkInfo\n" + user.givenName);

        if (facebookLink != null){
            user.wizard.facebookLink = facebookLink;
        }
        if (instagramLink != null){
            user.wizard.instagramLink = instagramLink;
        }
        if (youtubeLink != null){
            user.wizard.youtubeLink = youtubeLink;
        }

        user.wizard.save();
        renderJSON(json(user.wizard));

    }

    public static void signUp() throws Exception {

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String name = (String) jsonBody.get("name");
        String lastName = (String) jsonBody.get("lastName");
        String phone = (String) jsonBody.get("phone");
        String email = (String) jsonBody.get("email");
        String password = (String) jsonBody.get("password");

        if(isValidEmailAddress(email)){
            UserDTO user = UserDTO.find("byEmail", email).first();
            if (user != null) {
                System.out.println("user.with.email.already.exist");
                String reason = Messages.get("user.with.email.already.exist");
                JsonResponse jsonResponse = new JsonResponse(420, reason);
                renderJSON(jsonResponse);
            }

            UserDTO userByPhone = UserDTO.find("byPhone", phone).first();
            if(userByPhone != null) {
                String reason = Messages.get("user.with.phone.number.already.exist");
                JsonResponse jsonResponse = new JsonResponse(421, reason);
                renderJSON(jsonResponse);
            }

            user = new UserDTO(name, lastName, phone, email, password);
            user.name = name + " " + lastName;
            user.save();

            String jwtToken = generateToken(user);
            response.setHeader(JWT_TOKEN, jwtToken);
            String json = json(user);
            renderJSON(json);
        }

    }

    public static void signIn() throws Exception{

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String email = (String) jsonBody.get("email");
        String password = (String) jsonBody.get("password");

        System.out.println("login user with email&phone:\n" + email + "\n" + password);

        if(isValidEmailAddress(email)) {
            UserDTO user = UserDTO.find("byEmail", email).first();

            if (user == null){
                String reason = "Користувача не знайдено";
                JsonResponse jsonResponse = new JsonResponse(420, reason);
                renderJSON(jsonResponse);
            }

            if (user.isGoogleSignIn){ // if the user used google sign in and hacker tries to login via empty password
                String reason = "Користувача не знайдено";
                JsonResponse jsonResponse = new JsonResponse(421, reason);
                renderJSON(jsonResponse);
            }

            if (!user.password.equals(password)) {
                InvalidPassword error = new InvalidPassword();
                JsonResponse jsonResponse = new JsonResponse(422, error.toString());
                renderJSON(jsonResponse);
            }

            String jwtToken = generateToken(user);
            response.setHeader(JWT_TOKEN, jwtToken);

            renderJSON(json(user));

        }

    }

    public static String getUserIdFromAuthorization(String authorizationHeader){
        String userId = "";
        String jwtToken = authorizationHeader.replace("Bearer ","");
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("wisehands")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(jwtToken);
            userId = jwt.getClaim("uuid").asString();
        } catch (JWTVerificationException exception){
            forbidden("Invalid Authorization header");
        }
        return userId;
    }

}
