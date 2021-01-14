package controllers;

import org.json.simple.parser.ParseException;
import play.mvc.Before;
import play.mvc.Http;
import services.querying.DataBaseQueries;
import services.translaiton.LanguageForShop;
import util.PolygonUtil;
import services.ShoppingCartService;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

//-Xverify:none export JAVA_TOOL_OPTIONS="-Xverify:none"

public class ShoppingCartAPI extends AuthController {

    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Before
    public static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }

    public static void allowCors(){
        response.setHeader("Access-Control-Allow-Origin", "*");
        ok();
    }

    public static void getCart(String client) {
        renderJSON(ShoppingCartService.getCart(client));
    }

    public static void addProduct(String client) throws ParseException {

        ShopDTO shop = _getShop(client);

        String qrUuid = request.params.get("qr_uuid");
        String productUuid = request.params.get("uuid");
        ProductDTO product = ProductDTO.findById(productUuid);

        List<SelectedAdditionDTO> defaultAdditions = new ArrayList<>();
        if(qrUuid == null || qrUuid.isEmpty()){
            defaultAdditions = DataBaseQueries.checkIsAdditionDefaultToProduct(product);
        }

        Http.Header acceptLanguage = request.headers.get("accept-language");
        String languageFromHeader = LanguageForShop.getLanguageFromAcceptHeaders(acceptLanguage);

        String stringAdditionList = request.params.get("additionList");
        List<AdditionLineItemDTO> additionOrderDTOList = _createAdditionListOrderDTO(stringAdditionList, shop, defaultAdditions, languageFromHeader);

        String quantityParam = request.params.get("quantity");
        int quantity = _getProductQuantity(quantityParam);

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        LineItem lineItem = new LineItem(
                product.uuid, product.name, product.mainImage.filename,
                quantity, product.price, shop, additionOrderDTOList,
                product.productNameTextTranslationBucket);
        lineItem.save();

        boolean foundMatch = false;
        System.out.println("shoppingCart.items before foundMatch => " + shoppingCart.items);
        //1. Find Line Item
        for (LineItem _lineItem : shoppingCart.items) {
            if (productUuid.equals(_lineItem.productId)) {
                // LineItem found, next check if addition list match...
                foundMatch = additionOrderDTOList.equals(_lineItem.additionList);
                if(foundMatch) {
                    _lineItem.quantity = _lineItem.quantity + quantity;
                    _lineItem.save();
                }
            }
        }

        if(!foundMatch) {
          System.out.println("shoppingCart.items => " + shoppingCart.items);
          shoppingCart.items.add(lineItem);
        }
        System.out.println("shoppingCart.items => " + shoppingCart.items);
        shoppingCart.save();
        renderJSON(json(shoppingCart));
    }

    private static int _getProductQuantity(String quantityParam) {
        int quantity = 1;
        if (quantityParam != null) {
            quantity = Integer.parseInt(quantityParam);
        }
        return quantity;
    }

    private static ShopDTO _getShop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        return shop;
    }

    private static List<AdditionLineItemDTO> _createAdditionListOrderDTO(String stringAdditionList, ShopDTO shop,
                                                                         List<SelectedAdditionDTO> defaultAdditions,
                                                                         String languageFromHeader){
        if (stringAdditionList == null){
            stringAdditionList = "[]";
        }
        JSONParser parser = new JSONParser();
        JSONArray jsonAdditionList = null;
        try {
            jsonAdditionList = (JSONArray) parser.parse(stringAdditionList);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        List<JSONObject> additionList = new ArrayList<JSONObject>();
        for (int i=0; i<jsonAdditionList.size(); i++) {
            JSONObject additionObject = (JSONObject) jsonAdditionList.get(i);
            additionList.add(additionObject);
        }

        List<AdditionLineItemDTO> additionsLineItemList = new ArrayList<AdditionLineItemDTO>();
        for(JSONObject object: additionList){
            AdditionDTO additionDTO = AdditionDTO.findById(object.get("uuid"));
            AdditionLineItemDTO additionLineItem = new AdditionLineItemDTO();
            additionLineItem.title = additionDTO.getTitle();
            additionLineItem.price = additionDTO.getPrice();
            additionLineItem.imagePath = _getWholePath(String.valueOf(additionDTO.getImagePath()), shop);
            additionLineItem.quantity = (Long) object.get("quantity");
            if (additionDTO.additionNameTranslationBucket != null){
                additionLineItem.translationBucket = additionDTO.additionNameTranslationBucket;
                additionLineItem.title = translateTitle(languageFromHeader, additionDTO);
                if (additionLineItem.title.isEmpty() || additionLineItem.title == null) {
                    additionLineItem.title = additionDTO.getTitle();
                }
            }
            additionLineItem.save();
            additionsLineItemList.add(additionLineItem);
        }
        for(SelectedAdditionDTO selectedAddition: defaultAdditions){
            AdditionDTO additionDTO = AdditionDTO.findById(selectedAddition.addition.uuid);
            AdditionLineItemDTO additionLineItem = new AdditionLineItemDTO();
            additionLineItem.title = additionDTO.getTitle();
            additionLineItem.price = additionDTO.getPrice();
            additionLineItem.imagePath = _getWholePath(String.valueOf(additionDTO.getImagePath()), shop);
            additionLineItem.quantity = 1L;
            if (additionDTO.additionNameTranslationBucket != null){
                additionLineItem.translationBucket = additionDTO.additionNameTranslationBucket;
                additionLineItem.title = translateTitle(languageFromHeader, additionDTO);
                if (additionLineItem.title.isEmpty() || additionLineItem.title == null) {
                    additionLineItem.title = additionDTO.getTitle();
                }
            }

            additionLineItem.save();
            additionsLineItemList.add(additionLineItem);

        }
        return additionsLineItemList;
    }

    private static String translateTitle(String languageFromHeader, AdditionDTO additionDTO) {
        String title = "";
        List<TranslationItemDTO> translationList = additionDTO.additionNameTranslationBucket.translationList;
        for (TranslationItemDTO translationItem: translationList) {
            if (translationItem.language.equals(languageFromHeader)) {
                title = translationItem.content;
            } else {
                title = additionDTO.title;
            }

        }
        return title;
    }

    private static String _getWholePath(String imagePath, ShopDTO shop) {
        String path = shop.domain;
        imagePath = String.format("https://%s/public/product_images/%s/%s", path, shop.uuid, imagePath);
        if(isDevEnv) {
            path = path + ":3334";
            imagePath = String.format("http://%s/public/product_images/%s/%s", path, shop.uuid, imagePath);
        }
        return imagePath;

        renderJSON(ShoppingCartService.addProduct(client));
    }

    public static void deleteProduct(String client) {
        renderJSON(ShoppingCartService.deleteProduct(client));
    }

    public static void updateQuantityProduct(String client) throws Exception{
        renderJSON(ShoppingCartService.updateQuantityProduct(client));
    }

    public static void increaseQuantityProduct(String client) {
        renderJSON(ShoppingCartService.increaseQuantityProduct(client));
    }

    public static void decreaseQuantityProduct(String client) {
        renderJSON(ShoppingCartService.decreaseQuantityProduct(client));
    }

    public static void selectDeliveryType(String client) {
        renderJSON(ShoppingCartService.selectDeliveryType(client));
    }

    public static void selectPaymentType(String client) {
        renderJSON(ShoppingCartService.selectPaymentType(client));
    }

    public static void setClientInfo(String client) {
        renderJSON(ShoppingCartService.setClientInfo(client));
    }

    public static void setAddressInfo(String client) throws Exception {
        renderJSON(ShoppingCartService.setAddressInfo(client));
    }

     public static void setPostDepartmentInfo(String client) {
         renderJSON(ShoppingCartService.setPostDepartmentInfo(client));
     }

}
