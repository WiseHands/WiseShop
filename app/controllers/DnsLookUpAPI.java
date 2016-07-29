package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import play.mvc.Before;
import play.mvc.Controller;
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
        System.out.println("DnsLookUpAPI checkDns domain: " + domain);

        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            String localIp = inetAddress.getHostAddress();
            System.out.println("DnsLookUpAPI checkDns localIp: " + localIp);
            String domainIp = InetAddress.getByName(domain).getHostAddress();
            System.out.println("DnsLookUpAPI checkDns " + domain + ": " + domainIp);

            if(localIp.equals(domainIp)){
                ok();
            } else {
                forbidden(domain + " DNS record not set to " + localIp);
            }
        } catch (UnknownHostException e) {
            System.out.println(e.getMessage());
            forbidden("Unknown Host " + domain);
        }
    }


    private static String json(Object object){
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gson.toJson(object);
    }

}