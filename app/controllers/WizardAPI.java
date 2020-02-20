package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import models.UserDTO;
import models.WizardDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.Play;
import play.i18n.Messages;
import responses.InvalidPassword;
import responses.JsonHandleForbidden;


import static controllers.UserAPI.generateToken;
import static controllers.UserAPI.isValidEmailAddress;

public class WizardAPI extends AuthController {

    protected static UserDTO loggedInUser;
    private static final String JWT_TOKEN = "JWT_TOKEN";
//    checkDomainNameAvailability
    public static void upDateWizardDetails() throws Exception{


        String authorizationHeader = request.headers.get("authorization").value();
        String jwtToken = authorizationHeader.replace("Bearer ","");
        try {
            String encodingSecret = Play.configuration.getProperty("jwt.secret");
            Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("wisehands")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(jwtToken);
            String userId = jwt.getClaim("uuid").asString();
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
        } catch (JWTVerificationException exception){
            forbidden("Invalid Authorization header");
        }

        ok();
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
                JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(420, reason);
                renderJSON(jsonHandleForbidden);
            }

            UserDTO userByPhone = UserDTO.find("byPhone", phone).first();
            if(userByPhone != null) {
                String reason = Messages.get("user.with.phone.number.already.exist");
                JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(421, reason);
                renderJSON(jsonHandleForbidden);
            }

            user = new UserDTO(name, lastName, phone, email, password);
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
                JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(420, reason);
                renderJSON(jsonHandleForbidden);
            }

            if (user.isGoogleSignIn == true){ // if the user used google sign in and hacker tries to login via empty password
                String reason = "Користувача не знайдено";
                JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(421, reason);
                renderJSON(jsonHandleForbidden);
            }

            if (!user.password.equals(password)) {
                InvalidPassword error = new InvalidPassword();
                JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(422, error.toString());
                renderJSON(jsonHandleForbidden);
            }

            String jwtToken = generateToken(user);
            response.setHeader(JWT_TOKEN, jwtToken);
            String json = json(user);

            renderJSON(json);

        }

    }

}
