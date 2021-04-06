package controllers;

import models.ContactDTO;
import models.ShopDTO;
import models.ShopLocation;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import responses.JsonResponse;
import services.MailSender;
import services.MailSenderImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ContactAPI extends AuthController {

    static final double DEFAULT_SHOP_LATITUDE = 49.843246;
    static final double DEFAULT_SHOP_LONGITUDE = 24.031556;

    static MailSender mailSender = new MailSenderImpl();

    public static void sendMailToUs() throws Exception{

        String clientName = request.params.get("clientName");
        String clientPhone = request.params.get("clientPhone");
        String clientMail = request.params.get("clientMail");

        String message = "Доброї години доби Богдане. Мене звати "
                + clientName + ", телефонуйте за номером: " + clientPhone + " або напишіть емейл " + clientMail;


        try {
            mailSender.sendContactUsEmail(message);
            String reason = "Your query was sent successfully.";
            JsonResponse jsonResponse = new JsonResponse(421, reason);
            renderJSON(jsonResponse);
        } catch (Exception e) {
            System.out.println("ContactAPI create mailSender error" + e.getCause() + e.getStackTrace());
            String reason = "Sorry, have some problem";
            JsonResponse jsonResponse = new JsonResponse(420, reason);
            renderJSON(jsonResponse);
        }
    }

    public static void details(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        renderJSON(json(shop.contact));
    }

    public static void getContactForTranslation(String client, String uuid) throws Exception {
        ContactDTO contact = ContactDTO.findById(uuid);
        renderJSON(json(contact));
    }


    public static void update(String client) throws Exception {

        double shopLatitude;
        double shopLongitude;

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("jsonBody for updating contacts" + jsonBody);

        String email = (String) jsonBody.get("email");
        String phone = (String) jsonBody.get("phone");

        String addressNumberHouse = (String) jsonBody.get("addressNumberHouse");
        System.out.println("number house => " + addressNumberHouse);

        String linkfacebook = (String) jsonBody.get("linkfacebook");
        String linkinstagram = (String) jsonBody.get("linkinstagram");
        String linkyoutube = (String) jsonBody.get("linkyoutube");

        JSONObject jsonShopLocation = (JSONObject) jsonBody.get("shopLocation");
        System.out.println("get shopLocation " + jsonShopLocation);

        if (jsonShopLocation == null){
            shopLatitude = DEFAULT_SHOP_LATITUDE;
            shopLongitude = DEFAULT_SHOP_LONGITUDE;
        } else {
            shopLatitude = Double.parseDouble(String.valueOf(jsonShopLocation.get("latitude")));
            shopLongitude = Double.parseDouble(String.valueOf(jsonShopLocation.get("longitude")));
        }

        System.out.println("get shopLocation " + shopLatitude + "," + shopLongitude);

        ContactDTO contact = shop.contact;

        if (shop.contact.shopLocation == null){
            ShopLocation shopLocation = new ShopLocation(shopLatitude, shopLongitude);
            shop.contact.shopLocation = shopLocation;
        } else {
            shop.contact.shopLocation.latitude = shopLatitude;
            shop.contact.shopLocation.longitude = shopLongitude;
        }
        if(email != null){
            contact.email = email;
        }
        if(phone != null){
            contact.phone = phone;
        }
        if(addressNumberHouse != null){
            contact.addressNumberHouse = addressNumberHouse;
        }
        contact.latLng = String.valueOf(shopLatitude) + "," + String.valueOf(shopLongitude);
        System.out.println("contact.latLng " + contact.latLng);
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