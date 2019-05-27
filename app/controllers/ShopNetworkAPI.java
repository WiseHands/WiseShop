package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ShopDTO;
import models.ShopNetworkDTO;

import java.util.ArrayList;
import java.util.List;

public class ShopNetworkAPI extends AuthController {

    public static void get(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(shop.network);
        renderJSON(json);
    }


    public static void create(String client, String[] shopUuidList, String networkName) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        List<ShopDTO> selectedShops = new ArrayList<>();
        for(String uuid : shopUuidList) {
            ShopDTO _shop = ShopDTO.findById(uuid);
            selectedShops.add(_shop);
        }



        ShopNetworkDTO shopNetwork = new ShopNetworkDTO(networkName, selectedShops);
        shop.network = shopNetwork.save();
        shop.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(shopNetwork);
        renderJSON(json);
    }


}
