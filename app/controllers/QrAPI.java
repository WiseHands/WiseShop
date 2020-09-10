package controllers;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.swing.text.html.parser.Parser;

public class QrAPI extends AuthController {

    public static void save(String client) throws ParseException {
        JSONParser parser = new JSONParser();
        String qrCode = (String) parser.parse(params.get("body"));
        System.out.println("qr => " + qrCode);

    }
}
