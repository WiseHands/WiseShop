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

    public static void saveTranslationForDeliveryAndPaymentType(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("jsonBody => " + jsonBody);
        String uuid = (String) jsonBody.get("translationUuid");
        TranslationBucketDTO translation = TranslationBucketDTO.findById(uuid);
        System.out.println("uuid for translation bucket object " + uuid);
        JSONArray parseTranslationList = (JSONArray) jsonBody.get("translationList");
        for(int i = 0; i < parseTranslationList.size(); i++){
            JSONObject object = (JSONObject) parseTranslationList.get(i);
            String _uuid = (String) object.get("uuid");
            String language = (String) object.get("language");
            String content = (String) object.get("content");
            TranslationItemDTO translationItem = null;
            if(_uuid == null) {
                translationItem = new TranslationItemDTO(language, content);
            } else {
                translationItem = TranslationItemDTO.findById(_uuid);
                translationItem.language = language;
                translationItem.content = content;
            }
            translationItem.save();
        }
        translation.save();
        renderJSON(json(translation));
    }


}