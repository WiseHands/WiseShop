package controllers;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class FeedbackToOrderAPI extends AuthController{

    public static void createFeedbackFromClient() throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("createFeedbackFromClient jsonBody: " + jsonBody);

    }


}
