package controllers;

import models.ContactDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import responses.JsonHandleForbidden;
import services.MailSender;
import services.MailSenderImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ContactAPI extends AuthController {

    static MailSender mailSender = new MailSenderImpl();

    public static void sendMailToUs() throws Exception{

        String clientName = request.params.get("clientName");
        String clientPhone = request.params.get("clientPhone");
        String clientMail = request.params.get("clientMail");

        String message = "Доброї години доби Богдане. Мене звати "
                + clientName + ", телефонуйте за номером: " + clientPhone + " або напишіть емейл " + clientMail;


        try {
            mailSender.sendContactUsEmail(message);
            String reason = "Your query was sent";
            JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(421, reason);
            renderJSON(jsonHandleForbidden);
        } catch (Exception e) {
            System.out.println("ContactAPI create mailSender error" + e.getCause() + e.getStackTrace());
            String reason = "Sorry, have some problem";
            JsonHandleForbidden jsonHandleForbidden = new JsonHandleForbidden(421, reason);
            renderJSON(jsonHandleForbidden);
        }
    }

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(shop.contact));
    }


    public static void update(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String email = (String) jsonBody.get("email");
        String phone = (String) jsonBody.get("phone");
        String description = (String) jsonBody.get("description");
        String addressCity = (String) jsonBody.get("addressCity");
        String addressStreet = (String) jsonBody.get("addressStreet");
        String addressNumberHouse = (String) jsonBody.get("addressNumberHouse");
        String latLng = (String) jsonBody.get("latLng");
        String linkfacebook = (String) jsonBody.get("linkfacebook");
        String linkinstagram = (String) jsonBody.get("linkinstagram");
        String linkyoutube = (String) jsonBody.get("linkyoutube");

        ContactDTO contact = shop.contact;
        contact.email = email;
        contact.phone = phone;
        contact.addressCity = addressCity;
        contact.addressStreet = addressStreet;
        contact.addressNumberHouse = addressNumberHouse;
        contact.description = description;
        contact.latLng = latLng;
        contact.linkfacebook = linkfacebook;
        contact.linkinstagram = linkinstagram;
        contact.linkyoutube = linkyoutube;

        contact.save();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " updated contact information for  " + shop.shopName + " at " + dateFormat.format(date));


        renderJSON(json(contact));
    }

}