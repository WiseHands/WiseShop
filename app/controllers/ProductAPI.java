package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ProductDTO;
import models.ShopDTO;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.data.Upload;
import play.mvc.Before;
import play.mvc.Controller;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class ProductAPI extends Controller {
    public static final String USERIMAGESPATH = "public/product_images/";

    private static final String X_AUTH_TOKEN = "x-auth-token";
    private static final String X_AUTH_USER_ID = "x-auth-user-id";

    @Before
    static void interceptAction(){
        corsHeaders();
    }


    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    static void checkAuthentification() {
        boolean authHeadersPopulated = request.headers.get(X_AUTH_TOKEN) != null && request.headers.get(X_AUTH_USER_ID) != null;
        if (authHeadersPopulated){
            String userId = request.headers.get(X_AUTH_USER_ID).value();
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.findById(userId);

            if(user == null)
                forbidden("Invalid X-AUTH-TOKEN: " + token);
        } else {
            forbidden("Empty X-AUTH-TOKEN");
        }
    }

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

        ProductDTO productDTO = (ProductDTO) ProductDTO.findById(uuid);

        if(photo != null) {
            File file = new File(USERIMAGESPATH + productDTO.fileName);
            if(!file.delete()){
                error("error deleting file: " + USERIMAGESPATH + productDTO.fileName);
            }

            FileOutputStream out = new FileOutputStream(USERIMAGESPATH + client + "/" + photo.getFileName());
            out.write(photo.asBytes());
            out.close();

            productDTO.fileName = client + "/" + photo.getFileName();
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

        renderJSON(json);
    }

    public static void delete(String client, String uuid) throws Exception {
        checkAuthentification();

        ProductDTO product = (ProductDTO) ProductDTO.findById(uuid);
        File file = new File(USERIMAGESPATH + product.fileName);
        if(!file.delete()){
            error("error deleting file: " + USERIMAGESPATH + product.fileName);
        }
        product.delete();
        ok();
    }

}