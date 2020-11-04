package controllers;

import models.AdditionDTO;
import models.ProductDTO;
import models.SelectedAdditionDTO;
import models.ShopDTO;
import org.json.simple.JSONArray;
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

    public static void saveAllSelectedAdditions (String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null) {
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        checkAuthentification(shop);

        JSONParser parser = new JSONParser();
        JSONArray jsonArray = (JSONArray) parser.parse(params.get("body"));

        for(int i = 0; i < jsonArray.size(); i++){
            JSONObject object = (JSONObject) jsonArray.get(i);
            assignAdditionToProduct(object);
        }
    }

    private static void assignAdditionToProduct (JSONObject additionObject){
        boolean isSelected = false;
        String availableAdditionId = "", productUuid = "";
        if (additionObject.get("uuid") != null) {
            availableAdditionId = (String) additionObject.get("uuid");
        }
        if (additionObject.get("productUuid") != null) {
            productUuid = (String) additionObject.get("productUuid");
        }
        if (additionObject.get("isSelected") != null){
            isSelected = (boolean) additionObject.get("isSelected");
        }

        AdditionDTO availableAddition = AdditionDTO.find("byUuid", availableAdditionId).first();
        SelectedAdditionDTO selectedAddition;
        SelectedAdditionDTO selectedAdditionQuery = SelectedAdditionDTO.find("byAddition_uuid", availableAdditionId).first();
        if (selectedAdditionQuery == null) {
            selectedAddition = new SelectedAdditionDTO();
        } else {
            selectedAddition = selectedAdditionQuery;
        }
        selectedAddition.addition = availableAddition;
        selectedAddition.productUuid = productUuid;
        selectedAddition.isSelected = isSelected;

        if (additionObject.get("isDefault") != null) {
            System.out.println("isAdditionDefaultSelected => " + (boolean) additionObject.get("isDefault"));
            selectedAddition.isDefault = (boolean) additionObject.get("isDefault");
        }
        selectedAddition.save();
    }

}
