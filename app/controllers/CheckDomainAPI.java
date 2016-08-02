package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ShopDTO;
import play.Play;
import play.mvc.Before;
import play.mvc.Controller;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class CheckDomainAPI extends Controller {

    public static final String SERVER_IP = "91.224.11.24";
    public static final String DEV_IP = "127.0.0.1";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }


    public static void checkDomain(String domain) throws Exception {
        try {

            boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

            if(isDevEnv){
                if (domain.contains(".localhost")) {
                    boolean isDomainRegisteredAlready = !ShopDTO.find("byDomain", domain).fetch().isEmpty();
                    if (isDomainRegisteredAlready) {
                        forbidden(domain + " is used by another user. Please select other one");
                    }
                    ok();
                }
                forbidden("domain in dev env should follow yourdomain.localhost pattern. You entered " + domain);
            } else {
                String domainIp = InetAddress.getByName(domain).getHostAddress();
                if (domainIp.equals(SERVER_IP)) {
                    boolean isDomainRegisteredAlready = !ShopDTO.find("byDomain", domain).fetch().isEmpty();
                    if (isDomainRegisteredAlready) {
                        forbidden(domain + " is used by another user. Please select other one");
                    }
                    ok();
                }
                forbidden("domain ip address is not correct: " + domainIp);
            }

        } catch (UnknownHostException e) {
            System.out.println(e.getStackTrace());
            forbidden("Unknown Host for domain enetered for shop: " + domain);
        }

    }


    private static String json(Object object){
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}