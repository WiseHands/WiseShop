package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.OrderDTO;
import models.Product;
import play.data.Upload;
import play.mvc.Controller;

import java.io.FileOutputStream;
import java.util.*;

public class ProductAPI extends Controller {
    public static final String USERIMAGESPATH = "public/product_images/";

    public static void create(String name, String description, Upload photo) throws Exception {
        Product product = new Product(name, description, photo.getFileName());

        FileOutputStream out = new FileOutputStream(USERIMAGESPATH + photo.getFileName());
        out.write(photo.asBytes());
        out.close();

        product.save();
        ok();
    }

    public static void list() throws Exception {
        List<Product> orders = Product.findAll();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orders);

        renderJSON(json);
    }

    public static void delete(String uuid) throws Exception {
        Product product = Product.findById(uuid);
        product.delete();
        ok();
    }

}