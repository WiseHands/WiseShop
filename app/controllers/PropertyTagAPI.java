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

public class PropertyTagAPI extends AuthController {


    public static void delete(String client, String propertyUuid, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        PropertyTagDTO tag = PropertyTagDTO.find("byUuid", uuid).first();
        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", propertyUuid).first();
        if(property !=null) {
            property.tags.remove(tag);
            property.save();
        }
        ok();
    }

}