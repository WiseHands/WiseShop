package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ShopDTO;
import models.ShopNetworkDTO;

import java.util.*;

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

    public static void getAll(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        List<ShopNetworkDTO> networkList = new ArrayList<>();

        for(ShopDTO _shop : loggedInUser.shopList) {
            if(_shop.network != null) {
                networkList.add(_shop.network);
            }
        }
        System.out.println("networkList " + networkList);
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(networkList);
        renderJSON(json);
    }


    public static void create(String client, String shopUuidList, String networkName) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        List<String> shopList =
                new ArrayList<String>(Arrays.asList(shopUuidList.split(",")));
        List<ShopDTO> selectedShops = new ArrayList<>();
        for(String uuid : shopList) {
            ShopDTO _shop = ShopDTO.findById(uuid);
            selectedShops.add(_shop);
        }

        ShopNetworkDTO shopNetwork = new ShopNetworkDTO(networkName, selectedShops);
        System.out.println("shopNetwork " + shopNetwork.networkName + " " + selectedShops);
        shop.network = shopNetwork.save();
        shop.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(shopNetwork);
        renderJSON(json);
    }


}
