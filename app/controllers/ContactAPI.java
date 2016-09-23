package controllers;

import models.ContactDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class ContactAPI extends AuthController {

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        renderJSON(json(shop.contact));
    }


    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String email = (String) jsonBody.get("email");
        String phone = (String) jsonBody.get("phone");
        String description = (String) jsonBody.get("description");
        String address = (String) jsonBody.get("address");
        String latLng = (String) jsonBody.get("latLng");

        ContactDTO contact = shop.contact;
        contact.email = email;
        contact.phone = phone;
        contact.address = address;
        contact.description = description;
        contact.latLng = latLng;

        contact.save();

        renderJSON(json(contact));
    }

}