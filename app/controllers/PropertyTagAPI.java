package controllers;

import models.ProductPropertyDTO;
import models.PropertyTagDTO;
import models.ShopDTO;

public class PropertyTagAPI extends AuthController {


    public static void delete(String client, String propertyUuid, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        PropertyTagDTO tag = PropertyTagDTO.find("byUuid", uuid).first();
        ProductPropertyDTO property = ProductPropertyDTO.find("byUuid", propertyUuid).first();
        if(property !=null) {
            property.tags.remove(tag);
            property.save();
        }
        ok();
    }

}