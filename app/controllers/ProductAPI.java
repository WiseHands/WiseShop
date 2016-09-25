package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ProductDTO;
import models.ShopDTO;
import play.data.Upload;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class ProductAPI extends AuthController {
    public static final String USERIMAGESPATH = "public/product_images/";

    public static void create(String client, String name, String description, Double price, Upload photo) throws Exception {
        checkAuthentification();

        Files.createDirectories(Paths.get(USERIMAGESPATH + client));

        FileOutputStream out = new FileOutputStream(USERIMAGESPATH + client + "/" + photo.getFileName());
        out.write(photo.asBytes());
        out.close();

        ShopDTO shopDTO = ShopDTO.find("byDomain", client).first();
        ProductDTO productDTO = new ProductDTO(name, description, price, client + "/" + photo.getFileName(), shopDTO);
        productDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productDTO);

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " created new product " + productDTO.name + " at " + dateFormat.format(date));


        renderJSON(json);
    }

    public static void details(String client, String uuid) throws Exception {
        ProductDTO productDTO = (ProductDTO) ProductDTO.findById(uuid);
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productDTO);

        renderJSON(json);
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        List<ProductDTO> orders = ProductDTO.find("byShop", shop).fetch();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orders);

        renderJSON(json);
    }

    public static void update(String client, String uuid, String name, String description, Double price, Upload photo) throws Exception {
        checkAuthentification();
        ShopDTO shop = ShopDTO.find("byDomain", client).first();


        ProductDTO productDTO = (ProductDTO) ProductDTO.findById(uuid);

        if(photo != null) {
            File file = new File(USERIMAGESPATH + productDTO.fileName);
            String path = USERIMAGESPATH + shop.domain + "/" + photo.getFileName();
            if(!file.delete()){
                System.out.println("error deleting file: " + path);
            }

            FileOutputStream out = new FileOutputStream(path);
            out.write(photo.asBytes());
            out.close();

            productDTO.fileName = shop.domain + "/" + photo.getFileName();
        }


        if (name != null){
            productDTO.name = name;
        }
        if (description != null){
            productDTO.description = description;
        }
        if (price != null){
            productDTO.price = price;
        }

        productDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productDTO);

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " updated product " + productDTO.name + " at " + dateFormat.format(date));


        renderJSON(json);
    }

    public static void delete(String client, String uuid) throws Exception {
        checkAuthentification();

        ProductDTO product = (ProductDTO) ProductDTO.findById(uuid);
        product.delete();

        File file = new File(USERIMAGESPATH + product.fileName);
        if(!file.delete()){
            System.out.println("error deleting file: " + USERIMAGESPATH + product.fileName);
        }

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " deleted product " + product.name + " at " + dateFormat.format(date));

        ok();
    }

}