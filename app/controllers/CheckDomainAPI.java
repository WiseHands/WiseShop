package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ShopDTO;
import play.mvc.Before;
import play.mvc.Controller;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class CheckDomainAPI extends Controller {

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }


    public static void checkDns(String domain) throws Exception {
        System.out.println("CheckDomainAPI checkDns domain: " + domain);

        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            String domainIp = InetAddress.getByName(domain).getHostAddress();
            System.out.println("CheckDomainAPI checkDns " + domain + ": " + domainIp);

            if(inetAddress.getHostAddress().equals(domainIp)){
                boolean isDomainRegisteredAlready = !ShopDTO.find("byDomain", domain).fetch().isEmpty();
                if (isDomainRegisteredAlready) {
                    forbidden(domain + " is used by another user. Please select other one");
                }
                ok();
            } else {
                forbidden(domain + " DNS record not set to " + inetAddress.getHostAddress());
            }
        } catch (UnknownHostException e) {
            System.out.println(e.getStackTrace());
            forbidden("Unknown Host " + domain);
        }
    }


    private static String json(Object object){
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}