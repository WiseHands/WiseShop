package controllers;

import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import responses.JsonResponse;
import services.MailSender;
import services.MailSenderImpl;

import javax.swing.text.html.parser.Parser;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

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

    public static void savePostTranslation(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String uuid = (String) jsonBody.get("translationUuid");
        TranslationBucketDTO translation = TranslationBucketDTO.findById(uuid);

        JSONArray translationList = (JSONArray) jsonBody.get("translationList");

        for(int i = 0; i < translationList.size(); i++){
            JSONObject object = (JSONObject) translationList.get(i);
            String language = (String) object.get("language");
            String content = (String) object.get("content");
            TranslationItemDTO translationItem = new TranslationItemDTO(language, content);
            translationItem.save();
            translation.addTranslationItem(translationItem);
        }
        translation.save();
        renderJSON(json(translation));
    }


}