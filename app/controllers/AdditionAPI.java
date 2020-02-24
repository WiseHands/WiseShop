package controllers;

import models.AdditionDTO;
import models.ProductDTO;
import models.ProductImage;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.data.Upload;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AdditionAPI extends AuthController {

    public static final String USERIMAGESPATH = "public/product_images/";

    public static void create(String client, String productUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String title = (String) jsonBody.get("title");
        String imagePath = (String) jsonBody.get("filepath");
        Double price = Double.parseDouble(String.valueOf(jsonBody.get("price")));

        ProductDTO productDTO = ProductDTO.findById(productUuid);

        AdditionDTO addition = new AdditionDTO();
        addition.title = title;
        addition.price = price;
        addition.product = productDTO;
        addition.imagePath = imagePath;

        addition.save();
        renderJSON(json(addition));

    }

    public static void getAll (String client, String productUuid) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        ProductDTO productDTO = ProductDTO.findById(productUuid);
        List<Object> additionList = AdditionDTO.find("byProduct", productDTO).fetch();

        renderJSON(json(additionList));
    }

    public static void details(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        addition = addition.save();
        renderJSON(json(addition));
    }

    public static void update(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String title = (String) jsonBody.get("title");
        String imagePath = (String) jsonBody.get("imagePath");
        Double price = Double.parseDouble(String.valueOf(jsonBody.get("price")));

        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        addition.title = title;
        addition.imagePath = imagePath;
        addition.price = price;

        addition = addition.save();
        renderJSON(json(addition));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        addition.delete();

        ok();
    }


}
