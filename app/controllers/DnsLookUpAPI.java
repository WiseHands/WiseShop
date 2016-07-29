package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import play.mvc.Before;
import play.mvc.Controller;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class DnsLookUpAPI extends Controller {
    private static final String SERVER_IP = "91.224.11.24";

    @Before
    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }


    public static void checkDns(String domain) throws Exception {
        System.out.println("DnsLookUpAPI checkDns domain: " + domain);

        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            String domainIp = InetAddress.getByName(domain).getHostAddress();
            System.out.println("DnsLookUpAPI checkDns " + domain + ": " + domainIp);

            if(SERVER_IP.equals(domainIp)){
                ok();
            } else {
                forbidden(domain + " DNS record not set to " + SERVER_IP);
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