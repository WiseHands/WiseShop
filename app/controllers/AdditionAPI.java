package controllers;

import models.AdditionDTO;
import models.ProductDTO;
import models.SelectedAdditionDTO;
import models.ShopDTO;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.List;

public class AdditionAPI extends AuthController {

    public static final String USERIMAGESPATH = "public/product_images/";
    public static void createAddition(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("jsonBody for addition => " + jsonBody);
        String title = (String) jsonBody.get("title");
        String imagePath = (String) jsonBody.get("filepath");
        String fileName = (String) jsonBody.get("fileName");
        Double price = Double.parseDouble(String.valueOf(jsonBody.get("price")));

        AdditionDTO addition = new AdditionDTO();
        addition.title = title;
        addition.price = price;
        addition.fileName = fileName;
        addition.imagePath = imagePath;
        addition.shopUuid = shop.uuid;
        addition.isDeleted = false;
        addition.save();

        renderJSON(json(addition));
    }

    public static void info(String client) {
        renderJSON(json(AdditionDTO.findById(request.params.get("uuid"))));
    }

    public static void additionList (String client) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        List<AdditionDTO> additionList;
        String query = "select a from AdditionDTO a where a.isDeleted = 0 and a.shopUuid = ?1";
        additionList = AdditionDTO.find(query, shop.uuid).fetch();

        renderJSON(json(additionList));
    }

    public static void getAllForProduct (String client, String productUuid) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        ProductDTO productDTO = ProductDTO.findById(productUuid);
        List<Object> additionList = AdditionDTO.find("byProduct", productDTO).fetch();

        renderJSON(json(additionList));
    }

    public static void details(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        renderJSON(json(addition));
    }

    public static void update(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONObject jsonBody = (JSONObject) parser.parse(params.get("body"));
        System.out.println("update addition => " + jsonBody);

        String title = (String) jsonBody.get("title");
        String imagePath = (String) jsonBody.get("imagePath");
        Double price = Double.parseDouble(String.valueOf(jsonBody.get("price")));

        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        addition.title = title;
        addition.imagePath = imagePath;
        addition.price = price;

        addition.save();
        renderJSON(json(addition));
    }

    public static void delete(String client, String uuid) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        System.out.println("delete addition => " + uuid);
        checkAuthentification(shop);
        AdditionDTO addition = AdditionDTO.find("byUuid", uuid).first();
        addition.isDeleted = true;
        addition.save();
        renderJSON(json(addition));

    }

    public static void addAdditionToProduct (String client, String productId, String additionId) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);
        AdditionDTO availableAddition = AdditionDTO.find("byUuid", additionId).first();
        SelectedAdditionDTO selectedAddition;
        SelectedAdditionDTO selectedAdditionQuery = SelectedAdditionDTO.find("byAddition_uuid", additionId).first();
        if (selectedAdditionQuery == null) {
            selectedAddition = new SelectedAdditionDTO();
        } else {
            selectedAddition = selectedAdditionQuery;
        }
        selectedAddition.addition = availableAddition;
        selectedAddition.productUuid = productId;
        selectedAddition.isSelected = true;
        System.out.println("addAdditionToProduct => " + selectedAddition.isSelected);
        selectedAddition.save();

        renderJSON(json(selectedAddition));
    }

    public static void removeAdditionFromProduct (String client, String additionId) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);
        System.out.println("removeAdditionFromProduct => " + additionId);

        SelectedAdditionDTO selectedAddition = SelectedAdditionDTO.find("byUuid", additionId).first();
        selectedAddition.isSelected = false;
        selectedAddition.save();
        System.out.println("removeAdditionFromProduct => " + selectedAddition.isSelected);

        renderJSON(json(selectedAddition));
    }

    public static void setDefaultAdditionToProduct (String client, String productId, String additionId, Boolean isDefault) throws Exception{
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        SelectedAdditionDTO selectedAddition = SelectedAdditionDTO.find("byAddition_uuid", additionId).first();
        System.out.println("selectedAddition.addition.price => "+ selectedAddition.addition.price);
        selectedAddition.isDefault = isDefault;
        ProductDTO product = ProductDTO.find("byUuid", productId).first();
        if (selectedAddition.isDefault) {
            product.price += selectedAddition.addition.price;
            product.defaultAdditionUuid = selectedAddition.uuid;
        } else {
            product.price -= selectedAddition.addition.price;
        }
        product.save();
        selectedAddition.save();
        System.out.println("setDefaultAdditionToProduct => " + selectedAddition.isDefault);
        renderJSON(json(selectedAddition));
    }



}
