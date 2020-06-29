package controllers;

import models.ContactDTO;
import models.ShopDTO;
import models.ShopLocation;
import models.TranslationBucketDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import responses.JsonResponse;
import services.MailSender;
import services.MailSenderImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TranslationBucketAPI extends AuthController {

    public static void checkTranslation(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        if (shop.delivery.newPostTranslationBucket == null){
            TranslationBucketDTO translationBucket = new TranslationBucketDTO();
            translationBucket.save();
            shop.delivery.newPostTranslationBucket = translationBucket;
            shop.delivery.save();
        }
        renderJSON(json(shop.delivery));
    }


}