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


    public static void createAddition(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("jsonBody for addition => " + jsonBody);
        String title = (String) jsonBody.get("title");
        String imagePath = (String) jsonBody.get("filepath");
        Double price = Double.parseDouble(String.valueOf(jsonBody.get("price")));

        AdditionDTO addition = new AdditionDTO();
        addition.title = title;
        addition.price = price;
        addition.imagePath = imagePath;
        addition.shopUuid = shop.uuid;
        addition.isDeleted = false;
        addition.save();

        renderJSON(json(addition));
    }

    public static void info(String client) {
        renderJSON(json(AdditionDTO.findById(request.params.get("uuid"))));
    }

    public static void additionList (String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        List<AdditionDTO> additionList;
        String query = "select a from AdditionDTO a where a.isDeleted = 0 and a.shopUuid = ?1";
        additionList = AdditionDTO.find(query, shop.uuid).fetch();

        renderJSON(json(additionList));
    }

    public static void getAllForProduct (String client, String productUuid) throws Exception{
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
        System.out.println("update addition => " + jsonBody);

        String title = (String) jsonBody.get("title");
        String imagePath = (String) jsonBody.get("imagePath");
        Double price = Double.parseDouble(String.valueOf(jsonBody.get("price")));

        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        addition.title = title;
        addition.imagePath = imagePath;
        addition.price = price;

        addition.save();
        renderJSON(json(addition));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        System.out.println("delete addition => " + uuid);
        checkAuthentification(shop);
        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        addition.isDeleted = true;
        addition.save();
        renderJSON(json(addition));

    }

    public static void addAdditionToProduct (String client, String productId, String additionId) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        ProductDTO product = ProductDTO.find("byUuid", productId).first();
        AdditionDTO addition = AdditionDTO.find("byUuid", additionId).first();
        product.addAddition(addition);
        product.save();
        renderJSON(json(product));
    }



}
