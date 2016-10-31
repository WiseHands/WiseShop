package controllers;

import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.ArrayList;
import java.util.List;


public class CategoryAPI extends AuthController {

    public static void all(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        List<CategoryDTO> categoryList = CategoryDTO.find("byShop", shop).fetch();
        renderJSON(json(categoryList));
    }

    public static void details(String client, String uuid) throws Exception {
        CategoryDTO category = CategoryDTO.findById(uuid);
        renderJSON(json(category));
    }


    public static void create(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String description = (String) jsonBody.get("description");
        String name = (String) jsonBody.get("name");

        CategoryDTO category = new CategoryDTO(shop, name, description);
        if (shop.categoryList == null) {
            shop.categoryList = new ArrayList<CategoryDTO>();
        }
        shop.categoryList.add(category);
        category = category.save();
        shop.save();
        renderJSON(json(category));
    }

    public static void assignProduct(String client, String uuid, String productUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        ProductDTO product = ProductDTO.findById(productUuid);
        CategoryDTO category = CategoryDTO.findById(uuid);
        if(category.products == null) {
            category.products = new ArrayList<ProductDTO>();
        }
        if (category.products.contains(product)) {
            renderJSON(json(product));
        }
        if (product.category != null && product.category.products != null && product.category.products.contains(product)) {
            product.category.products.remove(product);
            product.category.save();
        }
        category.products.add(product);
        product.category = category;
        product.category.save();


        product = product.save();
        category = category.save();


        renderJSON(json(product));

    }


    public static void update(String client, String uuid, String name) throws Exception {
        CategoryDTO category = CategoryDTO.findById(uuid);
        category.name = name;
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String description = (String) jsonBody.get("description");
        category.description = description;
        category = category.save();
        renderJSON(json(category));
    }

    public static void delete(String client, String uuid) throws Exception {
        CategoryDTO category = CategoryDTO.findById(uuid);
        category.products.clear();
        category.delete();
        ok();
    }


}