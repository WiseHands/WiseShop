package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import models.*;
import play.data.Upload;

import java.io.File;
import java.io.FileOutputStream;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class DepartmentAPI extends AuthController  {

    public static void create(String client, String shopName, String shopAddress, String shopMail, String shopPhone, String destinationLat, String destinationLng) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        checkAuthentification(shop);

        DepartmentDTO department = new DepartmentDTO(shopName, shopAddress, shopMail, shopPhone, destinationLat, destinationLng);
        department.shopName = shopName;
        department.shopAddress = shopAddress;
        department.shopMail = shopMail;
        department.shopPhone = shopPhone;
        department.destinationLat = destinationLat;
        department.destinationLng = destinationLng;
        department = department.save();


        if (shop.departmentList == null) {
            shop.departmentList = new ArrayList<DepartmentDTO>();
        }
        shop.departmentList.add(department);
        shop.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(department);

        System.out.println("JSON" + json);

        renderJSON(json);
    }

    public static void details(String client, String uuid) throws Exception {
        DepartmentDTO department = DepartmentDTO.findById(uuid);
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(department);

        renderJSON(json);
    }

    public static void update(String client, String uuid, String shopName, String shopAddress, String shopMail, String shopPhone, String destinationLat, String destinationLng, String googleStaticMapsApiKey) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        DepartmentDTO department = DepartmentDTO.findById(uuid);
        if (shopName != null){
            department.shopName = shopName;
        }
        department.shopAddress = shopAddress;
        department.shopMail = shopMail;
        department.shopPhone = shopPhone;
        department.destinationLat = destinationLat;
        department.destinationLng = destinationLng;
        department.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(department);
        renderJSON(json);
    }


    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        DepartmentDTO department = DepartmentDTO.findById(uuid);
        department.delete();
        ok();
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(shop.departmentList);

        renderJSON(json);
    }

}
