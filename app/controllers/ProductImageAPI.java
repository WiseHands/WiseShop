package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ProductDTO;
import models.ProductImage;
import models.ShopDTO;
import play.data.Upload;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class ProductImageAPI extends AuthController {
    public static final String USERIMAGESPATH = "public/product_images/";

    public static void delete(String client, String uuid, String productUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        ProductImage productImage = ProductImage.findById(uuid);
        ProductDTO product = ProductDTO.findById(productUuid);
        if(product.images != null && product.images.contains(productImage)){
            int index = product.images.indexOf(productImage);
            product.images.remove(index);
        }
        product = product.save();
        if (product.mainImage.uuid == productImage.uuid) {
            product.mainImage = product.images.get(0);
        }
        product = product.save();

        productImage.delete();
        File file = new File(USERIMAGESPATH + shop.uuid + "/" + productImage.filename);
        if(!file.delete()){
            error("error deleting file: " + USERIMAGESPATH + product.fileName);
        }

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);
        renderJSON(json);
    }

    public static void add(String client, String productUuid, File fake) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        ProductDTO product = ProductDTO.findById(productUuid);

        List<Upload> photos = (List<Upload>) request.args.get("__UPLOADS");
        List<ProductImage> images = new ArrayList<ProductImage>();
        for(Upload photo: photos) {
            String filename = UUID.randomUUID()+".jpg";
            File logo = new File(USERIMAGESPATH + shop.uuid + "/" + filename);
            FileOutputStream out = new FileOutputStream(logo);
            out.write(photo.asBytes());
            out.close();
            ProductImage productImage = new ProductImage(filename);
            productImage = productImage.save();
            images.add(productImage);
        }

        product.images.addAll(images);
        product = product.save();
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);
        renderJSON(json);
    }

    public static void update(String client, String productUuid, String uuid, File fake) throws Exception {
        System.out.println("ProductImageApi " + client + " " + productUuid + " " + uuid);
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        ProductImage productImage = ProductImage.findById(uuid);
        ProductDTO product = ProductDTO.findById(productUuid);

        File file = new File(USERIMAGESPATH + shop.uuid + "/" + productImage.filename);
        if(!file.delete()){
            error("error deleting file: " + USERIMAGESPATH + product.fileName);
        }

        List<Upload> photos = (List<Upload>) request.args.get("__UPLOADS");

        List<ProductImage> images = new ArrayList<ProductImage>();
        for(Upload photo: photos) {
            String filename = UUID.randomUUID()+".jpg";
            File logo = new File(USERIMAGESPATH + shop.uuid + "/" + filename);
            FileOutputStream out = new FileOutputStream(logo);
            out.write(photo.asBytes());
            out.close();
            productImage.filename = filename;
            productImage = productImage.save();
        }

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productImage);
        renderJSON(json);
    }

    public static void makeMain(String client, String uuid, String productUuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        ProductImage productImage = ProductImage.findById(uuid);
        ProductDTO product = ProductDTO.findById(productUuid);
        if(product.images != null && product.images.contains(productImage)){
            product.mainImage = productImage;
        }
        product = product.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);
        renderJSON(json);
    }

}