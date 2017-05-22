package controllers;

import models.ProductPropertyDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.Arrays;
import java.util.List;

public class ProductPropertyAPI extends AuthController {


    public static void create(String client, String categoryUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String name = (String) jsonBody.get("name");
        String optionsString = (String) jsonBody.get("options");
        List<String> options = Arrays.asList(optionsString.split(" "));

        ProductPropertyDTO property = new ProductPropertyDTO();
        property.name = name;
        property.categoryUuid = categoryUuid;
        property.options = options;

        property = property.save();
        renderJSON(json(property));
    }

    public static void update(String client, String categoryUuid, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String name = (String) jsonBody.get("name");
        String optionsString = (String) jsonBody.get("options");
        List<String> options = Arrays.asList(optionsString.split(" "));

        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", uuid).first();
        property.name = name;
        property.categoryUuid = categoryUuid;
        property.options = options;

        property = property.save();
        renderJSON(json(property));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);


        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", uuid).first();

        property.delete();
        ok();
    }

    public static void details(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", uuid).first();

        property = property.save();
        renderJSON(json(property));
    }

    public static void categoryProperties(String client, String categoryUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        List<ProductPropertyDTO> properties = ProductPropertyDTO.find("byCategoryUuid", categoryUuid).fetch();

        renderJSON(json(properties));
    }

    public static void deleteCategoryProperties(String client, String categoryUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        List<ProductPropertyDTO> properties = ProductPropertyDTO.find("byCategoryUuid", categoryUuid).fetch();
        for(ProductPropertyDTO property : properties) {
            property.delete();
        }

        ok();
    }

}