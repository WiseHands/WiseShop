package controllers;

import models.ShopDTO;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.i18n.Messages;
import services.ShopService;
import services.ShopServiceImpl;
import services.SmsSender;
import services.SmsSenderImpl;

import static controllers.UserAPI.generateToken;
import static controllers.UserAPI.isValidEmailAddress;

public class WizardAPI extends AuthController {

    private static final String JWT_TOKEN = "JWT_TOKEN";
    private static SmsSender smsSender = new SmsSenderImpl();

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
                String reason = Messages.get("user.with.email.already.exist");
                forbidden(reason);
            }

            UserDTO userByPhone = UserDTO.find("byPhone", phone).first();
            if(userByPhone != null) {
                String reason = Messages.get("user.with.phone.number.already.exist");
                forbidden(reason);
            }

            user = new UserDTO(name, lastName, phone, email, password);
            user.save();

            String jwtToken = generateToken(user);
            response.setHeader(JWT_TOKEN, jwtToken);
            String json = json(user);
            renderJSON(json);
        }

    }

}
