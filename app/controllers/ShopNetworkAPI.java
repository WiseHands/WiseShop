package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ShopDTO;
import models.ShopNetworkDTO;

import java.util.*;

public class ShopNetworkAPI extends AuthController {


    public static void create(String client, String shopUuidList, String networkName) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        List<String> uuidList =
                new ArrayList<>(Arrays.asList(shopUuidList.split(",")));

        ShopNetworkDTO shopNetwork = new ShopNetworkDTO();
        shopNetwork.networkName = networkName;
        shopNetwork.addUuidShopListToNetwork(uuidList);
        shopNetwork.save();

        System.out.println("shopNetwork " + shopNetwork.networkName + " " + shopNetwork.shopList);

        List<ShopDTO> selectedShops = new ArrayList<>();
        for(String uuid: uuidList){
            ShopDTO _shop = ShopDTO.findById(uuid);
            _shop.networkUuid = shopNetwork.uuid;
            _shop.save();
        }


        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(shopNetwork);
        renderJSON(json);
    }

    public static void addShopToNetwork(String client, String shopUuidList, String networkUuid) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);
        System.out.println("network parameter " + networkUuid);

        List<String> shopList = new ArrayList<>(Arrays.asList(shopUuidList.split(",")));

        ShopNetworkDTO networkDTO = ShopNetworkDTO.findById(networkUuid);
        networkDTO.addUuidShopListToNetwork(shopList);
        networkDTO.save();

        for(String uuid : shopList) {
            ShopDTO _shop = ShopDTO.findById(uuid);
            _shop.networkUuid = networkDTO.uuid;
            _shop.save();
        }

        System.out.println("added shopList to network" + shopList + '\n' + networkDTO);
    }

    public static void deleteShopFromNetwork(String client, String shopUuidList, String networkUuid) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        List<String> shopList = new ArrayList<>(Arrays.asList(shopUuidList.split(",")));

        ShopNetworkDTO networkDTO = ShopNetworkDTO.findById(networkUuid);
        networkDTO.removeUuidShopListToNetwork(shopList);
        networkDTO.save();

        for(String _uuid : shopList) {
            ShopDTO _shop = ShopDTO.findById(_uuid);
            _shop.networkUuid = null;
            _shop.save();
        }

    }

    public static void deleteNetwork(String client, String uuid) throws Exception {

        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        checkAuthentication(shop);

        ShopNetworkDTO network = ShopNetworkDTO.findById(uuid);
        for (ShopDTO _shop : network.shopList) {
            _shop.networkUuid = null;
            _shop.save();
        }
        network.delete();
        ok();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(network);
        renderJSON(json);
    }


    public static void get(String client, String uuid) throws Exception {
        ShopNetworkDTO network = ShopNetworkDTO.findById(uuid);
        network.retrieveShopList();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(network);
        renderJSON(json);
    }

    public static void getShopList(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        if(shop.getNetwork() != null) {
            shop.getNetwork().retrieveShopList();
        }

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(shop.getNetwork());
        renderJSON(json);
    }

    public static void getAll(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentication(shop);

        Set<ShopNetworkDTO> networkSet = new HashSet<>();

        for(ShopDTO _shop : loggedInUser.shopList) {
            if(_shop.getNetwork() != null) {
                _shop.getNetwork().retrieveShopList();
                networkSet.add(_shop.getNetwork());
            }
        }

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(new ArrayList<>(networkSet));
        renderJSON(json);
    }

    public static void getShopListNotInNetwork(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        List<ShopDTO> shopListToReturn = new ArrayList<>();
        for (ShopDTO _shop : loggedInUser.shopList){
             if(_shop.getNetwork() == null) {
                 shopListToReturn.add(_shop);
             }
        }

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(shopListToReturn);
        renderJSON(json);
    }

}
