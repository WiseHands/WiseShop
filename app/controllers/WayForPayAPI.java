package controllers;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class WayForPayAPI extends AuthController {

    public static void verifyCallback() throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("getCallbackFromPay jsonBody: " + jsonBody);
    }
}
