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
import java.util.*;

public class ProductAPI extends AuthController {
    public static final String USERIMAGESPATH = "public/product_images/";

    public static void create(String client, String name, String description,
                              Double price, File fake, Integer mainPhotoIndex,
                              String category,
                              Integer sortOrder, Boolean isActive, Double oldPrice) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

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
        product = product.save();


        List<ProductPropertyDTO> properties = ProductPropertyDTO.find("byCategoryUuidAndProductUuidIsNull", product.categoryUuid).fetch();
        for(ProductPropertyDTO property : properties) {
            ProductPropertyDTO propertyNew = new ProductPropertyDTO();
            propertyNew.name = property.name;
            propertyNew.categoryUuid = product.categoryUuid;
            propertyNew.productUuid = product.uuid;
            propertyNew.shopUuid = shop.uuid;


            List<PropertyTagDTO> tagsListNew = new ArrayList<PropertyTagDTO>();
            for(PropertyTagDTO tag : property.tags) {
                PropertyTagDTO tagNew = new PropertyTagDTO();
                tagNew.value = tag.value;
                tagNew.selected = tag.selected;
                tagNew.productPropertyUuid = property.uuid;
                tagNew = tagNew.save();
                tagsListNew.add(tagNew);
            }
            propertyNew.tags = tagsListNew;
            propertyNew = propertyNew.save();
            if(product.properties == null ) {
                product.properties =  new ArrayList<ProductPropertyDTO>();
            }
            propertyNew = propertyNew.save();
            product.properties.add(propertyNew);
        }
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
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        List<ProductDTO> products = ProductDTO.find(
                "select p from ProductDTO p, CategoryDTO c " +
                        "where p.category = c and p.shop = ?1 and c.isHidden = ?2", shop, false
        ).fetch();


        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(products);

        renderJSON(json);
    }

    public static void update(String client, String uuid, String name, String description, Double price, Upload photo,
                              Integer sortOrder, Boolean isActive, Double oldPrice, String properties) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        Type collectionType = new TypeToken<List<ProductPropertyDTO>>(){}.getType();
        List<ProductPropertyDTO> propertiesList = gson.fromJson(properties, collectionType);
        for(ProductPropertyDTO updatedProperty : propertiesList) {
            ProductPropertyDTO attachedProperty = ProductPropertyDTO.find("byUuid", updatedProperty.uuid).first();
            List<PropertyTagDTO> tagList = new ArrayList<PropertyTagDTO>();
            for(PropertyTagDTO tag : updatedProperty.tags) {
                PropertyTagDTO attachedTag = PropertyTagDTO.find("byUuid", tag.uuid).first();
                attachedTag.selected = tag.selected;
                attachedTag.save();
                tagList.add(attachedTag);
            }
        }



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

        String json = gson.toJson(product);

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("User " + loggedInUser.name + " updated product " + product.name + " at " + dateFormat.format(date));


        renderJSON(json);
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
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

        List<ProductPropertyDTO> properties = new ArrayList<ProductPropertyDTO>(product.properties);
        product.properties.clear();
        product = product.save();
        for (ProductPropertyDTO property : properties) {
            property.delete();
        }
        CategoryDTO category  = product.category;
        category.products.remove(product);
        category.save();


        product.delete();


        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println("Deleted product " + product.name + " at " + dateFormat.format(date));

        ok();
    }

}