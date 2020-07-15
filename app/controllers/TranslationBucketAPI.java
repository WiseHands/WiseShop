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

    private static TranslationBucketDTO createTranslationBucket() {
        TranslationBucketDTO translationBucket = new TranslationBucketDTO();
        createUkTranslationItemForBucket(translationBucket);
        createEnTranslationItemForBucket(translationBucket);
        return translationBucket;
    }

    private static void createUkTranslationItemForBucket(TranslationBucketDTO translationBucket) {
        TranslationItemDTO translationItemUk = new TranslationItemDTO("uk", "");
        translationItemUk.save();
        translationBucket.addTranslationItem(translationItemUk);
        translationBucket.save();
    }

    private static void createEnTranslationItemForBucket(TranslationBucketDTO translationBucket) {
        TranslationItemDTO translationItemEn = new TranslationItemDTO("en", "");
        translationItemEn.save();
        translationBucket.addTranslationItem(translationItemEn);
        translationBucket.save();
    }

    public static void createTranslationBucketForPage() throws Exception {
        String pageUuid = request.params.get("uuid");
        System.out.println(pageUuid);
        PageConstructorDTO page = PageConstructorDTO.findById(pageUuid);
        if (page.pageTitleTextTranslationBucket == null){
            TranslationBucketDTO translationBucket = createTranslationBucket();
            page.pageTitleTextTranslationBucket = translationBucket;
            page.save();
        }
        renderJSON(json(page.pageTitleTextTranslationBucket));
    }

    public static void createTranslationBucketForCategory() throws Exception {
            String productUuid = request.params.get("uuid");
            CategoryDTO category = CategoryDTO.findById(productUuid);
            if (category.categoryNameTextTranslationBucket == null){
                TranslationBucketDTO translationBucket = createTranslationBucket();
                category.categoryNameTextTranslationBucket = translationBucket;
                category.save();
            }
            renderJSON(json(category.categoryNameTextTranslationBucket));
        }

    public static void createTranslationBucketForProductName() throws Exception {
        String productUuid = request.params.get("uuid");
        ProductDTO product = ProductDTO.findById(productUuid);
        if (product.productNameTextTranslationBucket == null){
            TranslationBucketDTO translationBucket = createTranslationBucket();
            product.productNameTextTranslationBucket = translationBucket;
            product.save();
        }
        renderJSON(json(product.productNameTextTranslationBucket));
    }

    public static void createTranslationBucketForProductDescription() throws Exception {
        String productUuid = request.params.get("uuid");
        ProductDTO product = ProductDTO.findById(productUuid);
        if (product.productDescriptionTextTranslationBucket == null){
            TranslationBucketDTO translationBucket = createTranslationBucket();
            product.productDescriptionTextTranslationBucket = translationBucket;
            product.save();
        }
        renderJSON(json(product.productDescriptionTextTranslationBucket ));
    }

    public static void saveTranslation(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("jsonBody => " + jsonBody);

        String uuid = (String) jsonBody.get("translationUuid");
        TranslationBucketDTO translation = TranslationBucketDTO.findById(uuid);

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