package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.CategoryDTO;
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
import java.util.*;

public class ProductAPI extends AuthController {
    public static final String USERIMAGESPATH = "public/product_images/";

    public static void create(String client, String name, String description,
                              Double price, File fake, Integer mainPhotoIndex,
                              String category,
                              Integer sortOrder, Boolean isActive, Double oldPrice) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);
        Files.createDirectories(Paths.get(USERIMAGESPATH + shop.uuid));

        List<Upload> photos = (List<Upload>) request.args.get("__UPLOADS");
        List<ProductImage> images = new ArrayList<ProductImage>();
        for(Upload photo: photos) {
            String filename = UUID.randomUUID()+".jpg";
            FileOutputStream out = new FileOutputStream(USERIMAGESPATH + shop.uuid + "/" + filename);
            out.write(photo.asBytes());
            out.close();
            ProductImage productImage = new ProductImage(filename);
            productImage = productImage.save();
            images.add(productImage);
        }

        CategoryDTO cat = CategoryDTO.findById(category);
        ProductDTO product = new ProductDTO(name, description, price, images, shop, cat);
        product.mainImage = images.get(mainPhotoIndex);
        product.isActive = isActive;
        product.sortOrder = sortOrder;
        product.oldPrice = oldPrice;
        product.save();

        product = product.save();

        if (shop.productList == null) {
            shop.productList = new ArrayList<ProductDTO>();
        }
        shop.productList.add(product);
        shop.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " created new product " + product.name + " at " + dateFormat.format(date));

        renderJSON(json);
    }

    public static void details(String client, String uuid) throws Exception {
        ProductDTO productDTO = ProductDTO.findById(uuid);
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productDTO);

        renderJSON(json);
    }

    public static void list(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        List<ProductDTO> products = ProductDTO.find("byShop", shop).fetch();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(products);

        renderJSON(json);
    }

    public static void update(String client, String uuid, String name, String description, Double price, Upload photo,
                              Integer sortOrder, Boolean isActive, Double oldPrice) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);


        ProductDTO product = (ProductDTO) ProductDTO.findById(uuid);

        if(photo != null) {
            File file = new File(USERIMAGESPATH + product.fileName);
            String path = USERIMAGESPATH + shop.domain + "/" + photo.getFileName();
            if(!file.delete()){
                System.out.println("error deleting file: " + path);
            }

            FileOutputStream out = new FileOutputStream(path);
            out.write(photo.asBytes());
            out.close();

            product.fileName = shop.domain + "/" + photo.getFileName();
        }


        if (name != null){
            product.name = name;
        }
        if (description != null){
            product.description = description;
        }
        if (price != null){
            product.price = price;
        }

        product.isActive = isActive;
        product.sortOrder = sortOrder;
        product.oldPrice = oldPrice;

        product.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " updated product " + product.name + " at " + dateFormat.format(date));


        renderJSON(json);
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        checkAuthentification(shop);

        ProductDTO product = ProductDTO.findById(uuid);
        product.mainImage = null;
        product = product.save();
        List<ProductImage> images = new ArrayList<ProductImage>(product.images);
        //delete files on fs
        for (ProductImage image: images) {
            File file = new File(USERIMAGESPATH + shop.uuid + "/" + image.filename);
            if(!file.delete()){
                System.out.println("error deleting file: " + USERIMAGESPATH + product.fileName);
            }
        }
        //delete ProductImages
        product.images.clear();
        product = product.save();
        for (ProductImage image: images) {
            image.delete();
        }
        shop.productList.remove(product);
        shop = shop.save();
        product.delete();


        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("Deleted product " + product.name + " at " + dateFormat.format(date));

        ok();
    }

}