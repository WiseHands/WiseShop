package controllers;

import models.ProductDTO;
import models.ProductPropertyDTO;
import models.PropertyTagDTO;
import models.ShopDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ProductPropertyAPI extends AuthController {


    public static void create(String client, String categoryUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String name = (String) jsonBody.get("name");
        JSONArray tags = (JSONArray) jsonBody.get("tags");

        ProductPropertyDTO property = new ProductPropertyDTO();
        property.name = name;
        property.categoryUuid = categoryUuid;
        property.shopUuid = shop.uuid;


        Iterator<JSONObject> iterator = tags.iterator();
        List<PropertyTagDTO> tagsList = new ArrayList<>();
        while (iterator.hasNext()) {
            JSONObject tagJson =  iterator.next();
            String val = (String) tagJson.get("text");
            PropertyTagDTO tag = new PropertyTagDTO();
            tag.value = val;
            tag.selected = true;
            tag = tag.save();
            tagsList.add(tag);
        }
        property.tags = tagsList;

        property = property.save();

        List<ProductDTO> products = ProductDTO.find("byCategoryUuid", categoryUuid).fetch();
        for(ProductDTO product : products) {
            ProductPropertyDTO propertyNew = new ProductPropertyDTO();
            propertyNew.name = name;
            propertyNew.categoryUuid = categoryUuid;
            propertyNew.productUuid = product.uuid;
            propertyNew.shopUuid = shop.uuid;
            propertyNew = propertyNew.save();


            List<PropertyTagDTO> tagsListNew = new ArrayList<>();
            for(PropertyTagDTO tag : property.tags) {
                PropertyTagDTO tagNew = new PropertyTagDTO();
                tagNew.value = tag.value;
                tagNew.selected = tag.selected;
                tagNew.productPropertyUuid = property.uuid;
                tagNew.currentPropertyUuid = propertyNew.uuid;
                tagNew = tagNew.save();
                tagsListNew.add(tagNew);
            }
            propertyNew.tags = tagsListNew;
            propertyNew = propertyNew.save();
            product.properties.add(propertyNew);
            product = product.save();

        }
        renderJSON(json(property));
    }

    public static void update(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));

        String name = (String) jsonBody.get("name");
        JSONArray tags = (JSONArray) jsonBody.get("tags");

        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", uuid).first();
        property.name = name;



        //UPDATE EXISTING
        for (PropertyTagDTO tag: property.tags) {
            Iterator<JSONObject> iterator = tags.iterator();
            while (iterator.hasNext()) {
                JSONObject tagJson =  iterator.next();
                String uuidUpdated = (String) tagJson.get("uuid");
                if(tag.uuid.equals(uuidUpdated)) {
                    String value = (String) tagJson.get("value");
                    Long additionalPrice = (Long) tagJson.get("additionalPrice");
                    Boolean selected = (Boolean) tagJson.get("selected");

                    tag.value = value;
                    tag.selected = selected;
                    tag.additionalPrice = additionalPrice;
                }
            }
        }


        //CREATE NEW
        Iterator<JSONObject> iterator = tags.iterator();
        while (iterator.hasNext()) {
            JSONObject tagJson =  iterator.next();
            String uuidUpdated = (String) tagJson.get("uuid");
            if(uuidUpdated == null) {
                String value = (String) tagJson.get("value");
                Long additionalPrice = (Long) tagJson.get("additionalPrice");
                Boolean selected = (Boolean) tagJson.get("selected");

                PropertyTagDTO tag = new PropertyTagDTO();
                tag.value = value;
                tag.selected = selected;
                tag.additionalPrice = additionalPrice;
                tag.productPropertyUuid = property.uuid;
                property.tags.add(tag);
            }
        }

        property = property.save();
        renderJSON(json(property));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);


        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", uuid).first();
        List<ProductPropertyDTO> allProperties = ProductPropertyDTO.find("byNameAndShopUuid", property.name, shop.uuid).fetch();
        for (ProductPropertyDTO singleProductProperty : allProperties) {
            ProductDTO product = ProductDTO.find("byUuid", singleProductProperty.productUuid).first();
            if(product != null) {
                product.properties.remove(singleProductProperty);
                product = product.save();
            }
            singleProductProperty.delete();
        }


        ok();
    }

    public static void details(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", uuid).first();

        property = property.save();
        renderJSON(json(property));
    }

    public static void categoryProperties(String client, String categoryUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        List<ProductPropertyDTO> properties = ProductPropertyDTO.find("byCategoryUuid", categoryUuid).fetch();

        renderJSON(json(properties));
    }

    public static void deleteCategoryProperties(String client, String categoryUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        List<ProductPropertyDTO> properties = ProductPropertyDTO.find("byCategoryUuid", categoryUuid).fetch();
        for(ProductPropertyDTO property : properties) {
            property.delete();
        }

        ok();
    }

}