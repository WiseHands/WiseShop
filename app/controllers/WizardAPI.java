package controllers;

import models.ShopDTO;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.i18n.Messages;
import responses.InvalidPassword;
import responses.JsonHandleForbidden;
import responses.UserDoesNotExist;
import services.SmsSender;
import services.SmsSenderImpl;

import static controllers.UserAPI.generateToken;
import static controllers.UserAPI.isValidEmailAddress;

public class WizardAPI extends AuthController {

    private static final String JWT_TOKEN = "JWT_TOKEN";

    public static void checkDomainNameAvailability(String domainName) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", domainName).first();
        if (shop == null){
            ok();
        }
        forbidden();
    }

    public static void signUp() throws Exception {

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String name = (String) jsonBody.get("name");
        String lastName = (String) jsonBody.get("lastName");
        String phone = (String) jsonBody.get("phone");
        String email = (String) jsonBody.get("email");
        String password = (String) jsonBody.get("password");

        System.out.println("GET info from signUp form: " +"\n"+ name +"\n"+ lastName +"\n"+ phone +"\n"+ email +"\n"+ password);

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

            if (user == null)
                forbidden(json(new UserDoesNotExist()));

            if (user.isGoogleSignIn == true) // if the user used google sign in and hacker tries to login via empty password
                forbidden(json(new UserDoesNotExist()));

            if (!user.password.equals(password)) {
                InvalidPassword error = new InvalidPassword();
                forbidden(json(error));
            }

            String jwtToken = generateToken(user);
            response.setHeader(JWT_TOKEN, jwtToken);
            String json = json(user);

            renderJSON(json);

        }

    }

}
