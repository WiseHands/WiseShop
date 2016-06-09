package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.ProductDTO;
import models.UserDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.data.Upload;
import play.mvc.Before;
import play.mvc.Controller;

import java.io.FileOutputStream;
import java.util.*;

public class ProductAPI extends Controller {
    public static final String USERIMAGESPATH = "public/product_images/";

    private static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";

    @Before
    static void interceptAction(){
        corsHeaders();
    }


    static void corsHeaders() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Expose-Headers", "X-AUTH-TOKEN");
    }

    static void checkAuthentification() {
        if (request.headers.get(X_AUTH_TOKEN) != null){
            String token = request.headers.get(X_AUTH_TOKEN).value();
            UserDTO user = UserDTO.find("byEmail", token).first();

            if(user == null)
                forbidden("Invalid X-AUTH-TOKEN: " + token);
        }
    }

    public static void create(String name, String description, Double price, Upload photo) throws Exception {
        checkAuthentification();

        FileOutputStream out = new FileOutputStream(USERIMAGESPATH + photo.getFileName());
        out.write(photo.asBytes());
        out.close();

        ProductDTO productDTO = new ProductDTO(name, description, price, photo.getFileName());
        productDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productDTO);

        renderJSON(json);
    }

    public static void details(String uuid) throws Exception {
        ProductDTO productDTO = (ProductDTO) ProductDTO.findById(uuid);
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productDTO);

        renderJSON(json);
    }

    public static void list() throws Exception {
        List<ProductDTO> orders = ProductDTO.findAll();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(orders);

        renderJSON(json);
    }

    public static void update(String uuid) throws Exception {
        checkAuthentification();

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        String name = (String) jsonBody.get("name");
        String description = (String) jsonBody.get("description");
        String fileName = (String) jsonBody.get("fileName");
        Double price = (Double) Double.parseDouble(jsonBody.get("price").toString());


        ProductDTO productDTO = (ProductDTO) ProductDTO.findById(uuid);
        if (name != null){
            productDTO.name = name;
        }
        if (description != null){
            productDTO.description = description;
        }
        if (price != null){
            productDTO.price = price;
        }
        if (fileName != null){
            productDTO.fileName = fileName;
        }
        productDTO.save();

        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String json = gson.toJson(productDTO);

        renderJSON(json);
    }

    public static void delete(String uuid) throws Exception {
        checkAuthentification();

        ProductDTO productDTO = (ProductDTO) ProductDTO.findById(uuid);
        productDTO.delete();
        ok();
    }

}