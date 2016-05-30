package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.Product;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.data.Upload;
import play.mvc.Controller;

import java.io.FileOutputStream;
import java.util.*;

public class ProductAPI extends Controller {
    public static final String USERIMAGESPATH = "public/product_images/";

    public static void create(String name, String description, Double price, Upload photo) throws Exception {
        FileOutputStream out = new FileOutputStream(USERIMAGESPATH + photo.getFileName());
        out.write(photo.asBytes());
        out.close();

        Product product = new Product(name, description, price, photo.getFileName());
        product.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);

        renderJSON(json);
    }

    public static void list() throws Exception {
        List<Product> orders = Product.findAll();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orders);

        renderJSON(json);
    }

    public static void delete(String uuid) throws Exception {
        Product product = (Product) Product.findById(uuid);
        product.delete();
        ok();
    }

    public static void update(String uuid) throws Exception {
        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String name = (String) jsonBody.get("name");
        String description = (String) jsonBody.get("description");
        String fileName = (String) jsonBody.get("fileName");
        Double price = (Double) Double.parseDouble(jsonBody.get("price").toString());


        Product product = (Product) Product.findById(uuid);
        if (name != null){
            product.name = name;
        }
        if (description != null){
            product.description = description;
        }
        if (price != null){
            product.price = price;
        }
        if (fileName != null){
            product.fileName = fileName;
        }
        product.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);

        renderJSON(json);
    }

    public static void details(String uuid) throws Exception {
        Product product = (Product) Product.findById(uuid);
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(product);

        renderJSON(json);
    }

}