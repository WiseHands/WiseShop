package controllers;

import models.*;
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


    public static void create(String client, String name) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        CategoryDTO category = new CategoryDTO(shop, name);
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
        category.products.add(product);
        product.category = category;

        product.save();
        category.save();
        ok();
    }


    public static void update(String client, String uuid, String name) throws Exception {
        CategoryDTO category = CategoryDTO.findById(uuid);
        category.name = name;
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