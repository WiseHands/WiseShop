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
import java.net.InetAddress;
import java.net.UnknownHostException;

public class DnsLookUpAPI extends Controller {
    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }


    public static void checkDns(String domain) throws Exception {
        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            String localIp = inetAddress.getHostAddress();
            String domainIp = InetAddress.getByName(domain).getHostAddress();

            if(localIp.equals(domainIp)){
                ok();
            } else {
                forbidden(domain + " DNS record not set to " + localIp);
            }
        } catch (UnknownHostException e) {
            e.printStackTrace();
            forbidden("Unknown Host " + domain);
        }
    }


    private static String json(Object object){
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}