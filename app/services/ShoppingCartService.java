package services;

import controllers.AuthController;
import json.shoppingcart.LineItem;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.Play;
import play.mvc.Http;
import services.querying.DataBaseQueries;
import services.translaiton.LanguageForShop;
import util.PolygonUtil;
import java.util.ArrayList;
import java.util.List;

import static controllers.Application.generateTokenForCookie;
import static util.ShoppingCartUtil._getCartUuid;

public class ShoppingCartService extends AuthController {

    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

    private static ShopDTO _getShop(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        return shop;
    }

    public static ShoppingCartDTO _createCart(ShopDTO shop) {
        ShoppingCartDTO shoppingCart = new ShoppingCartDTO();
        shoppingCart.shopUuid = shop.uuid;
        shoppingCart = shoppingCart.save();
        return shoppingCart;
    }

    public static String getCart(String client) {
        ShopDTO shop = _getShop(client);

        String cartId = _getCartUuid(request);
        List<ShoppingCartDTO> fetch = ShoppingCartDTO.find("byUuid", cartId).fetch();
        ShoppingCartDTO shoppingCart;
        if(fetch.size() > 0) {
            shoppingCart = fetch.get(0);
        } else {
            shoppingCart = _createCart(shop);
            String agent = request.headers.get("user-agent").value();
            String token = generateTokenForCookie(shoppingCart.uuid, agent);
            response.setCookie("JWT_TOKEN", token, shop.domain, "/", 1800, false);
        }
        String jsonShoppingCart = "";
        try {
            jsonShoppingCart = json(shoppingCart);
        } catch (Exception e){
            shoppingCart = _createCart(shop);
            String agent = request.headers.get("user-agent").value();
            String token = generateTokenForCookie(shoppingCart.uuid, agent);
            response.setCookie("JWT_TOKEN", token, shop.domain, "/", 1800, false);
            jsonShoppingCart = json(shoppingCart);
        }
        return jsonShoppingCart;
    }

    public static String addProduct(String client) throws ParseException {
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

        String cartId = _getCartUuid(request);
        System.out.println("cartId => " + cartId);

        Http.Cookie userTokenCookie = request.cookies.get("JWT_TOKEN");
        System.out.println("userTokenCookie => " + userTokenCookie);

        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
        if (shoppingCart == null || userTokenCookie == null) {
            shoppingCart = _createCart(shop);
            if (shoppingCart.items == null) {
                shoppingCart.items = new ArrayList<>();
            }
            cartId = shoppingCart.uuid;
            String agent = request.headers.get("user-agent").value();
            String token = generateTokenForCookie(cartId, agent);
            System.out.println("generateTokenForCookie => " + token);
            Integer maxAge = 1800;
            response.setCookie("JWT_TOKEN", token, shop.domain, "/", maxAge, false);

        }

        System.out.println("shoppingCart: " + shoppingCart);

        String stringAdditionList = request.params.get("additionList");
        List<AdditionLineItemDTO> additionOrderDTOList = _createAdditionListOrderDTO(stringAdditionList, shop, defaultAdditions, languageFromHeader);
        String quantityParam = request.params.get("quantity");
        int quantity = _getProductQuantity(quantityParam);

        if (product.priceInCurrency != 0){
            product.price = product.priceInCurrency;
        }

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
        return json(shoppingCart);
    }

    private static int _getProductQuantity(String quantityParam) {
        int quantity = 1;
        if (quantityParam != null) {
            quantity = Integer.parseInt(quantityParam);
        }
        return quantity;
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
    }

    public static String deleteProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String lineItemUuid = request.params.get("uuid");

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        LineItem lineItemToRemove = null;
        for (LineItem lineItem : shoppingCart.items) {
            if (lineItem.uuid.equals(lineItemUuid)) {
                lineItemToRemove = lineItem;
            }
        }
        shoppingCart.items.remove(lineItemToRemove);
        shoppingCart.save();

        return json(shoppingCart);
    }

    private static ShoppingCartDTO _deleteProduct(ShoppingCartDTO shoppingCart, String lineItemUuid) {
        LineItem lineItemToRemove = null;
        for (LineItem lineItem : shoppingCart.items) {
            if (lineItem.uuid.equals(lineItemUuid)) {
                lineItemToRemove = lineItem;
            }
        }
        shoppingCart.items.remove(lineItemToRemove);
        return shoppingCart.save();
    }

    public static String updateQuantityProduct(String client) throws Exception{

        String lineItemUuid = request.params.get("uuid");
        Integer quantity = Integer.valueOf(request.params.get("quantity"));

        String cartId = _getCartUuid(request);

        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.quantity = quantity;
        lineItem.save();

        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        return json(shoppingCart);
    }
    public static String increaseQuantityProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String lineItemUuid = request.params.get("uuid");
        String cartId = _getCartUuid(request);

        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.quantity += 1;
        lineItem.save();

        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        return json(shoppingCart);
    }

    public static String decreaseQuantityProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String lineItemUuid = request.params.get("uuid");
        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();


        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.quantity -= 1;
        if (lineItem.quantity == 0) {
            _deleteProduct(shoppingCart, lineItemUuid);
            return json(shoppingCart);
        }
        if (lineItem.quantity >= 0) {
            lineItem.save();
            return json(shoppingCart);
        }

        return json(shoppingCart);
    }

    public static String selectDeliveryType(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String delivery = request.params.get("deliverytype");

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        switch (delivery) {
            case "COURIER":
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.COURIER;
                break;
            case "POSTSERVICE":
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.POSTSERVICE;
                break;
            case "SELFTAKE":
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.SELFTAKE;
                break;
        }
        shoppingCart.save();
        shoppingCart.formatObject();

        return json(shoppingCart);
    }

    public static String selectPaymentType(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String payment = request.params.get("paymenttype");

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        switch (payment) {
            case "CREDITCARD":
                shoppingCart.paymentType = ShoppingCartDTO.PaymentType.CREDITCARD;
                break;
            case "CASHONDELIVERY":
                shoppingCart.paymentType = ShoppingCartDTO.PaymentType.CASHONDELIVERY;
                break;
        }
        shoppingCart.save();
        shoppingCart.formatObject();

        return json(shoppingCart);
    }

    public static String setClientInfo(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String clientName = request.params.get("clientName");
        String clientPhone = request.params.get("clientPhone");
        String clientEmail = request.params.get("clientEmail");
        String clientComments = request.params.get("clientComments");

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
        if (clientName != null) {
            shoppingCart.clientName = clientName;
        }
        if (clientPhone != null) {
            shoppingCart.clientPhone = clientPhone;
        }
        if (clientEmail != null) {
            shoppingCart.clientEmail = clientEmail;
        }
        if (clientComments != null) {
            shoppingCart.clientComments = clientComments;
        }

        shoppingCart.save();
        shoppingCart.formatObject();

        return json(shoppingCart);
    }

    public static String setAddressInfo(String client) throws Exception {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String clientAddressStreetName = request.params.get("street");
        String clientAddressBuildingNumber = request.params.get("building");
        String clientAddressApartmentNumber = request.params.get("apartment");
        String clientAddressApartmentFloor = request.params.get("floor");
        String clientAddressApartmentEntrance = request.params.get("entrance");
        String clientAddressApartmentEntranceCode = request.params.get("entranceCode");
        String clientAddressStreetLat = request.params.get("lat");
        String clientAddressStreetLng = request.params.get("lng");
        Boolean isAddressSetFromMapView = Boolean.valueOf(request.params.get("isAddressSetFromMapView"));

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
        if (clientAddressStreetName != null) {
            shoppingCart.clientAddressStreetName = clientAddressStreetName;
        }
        if (clientAddressBuildingNumber != null) {
            shoppingCart.clientAddressBuildingNumber = clientAddressBuildingNumber;
        }
        if (clientAddressApartmentNumber != null) {
            shoppingCart.clientAddressApartmentNumber = clientAddressApartmentNumber;
        }
        if (clientAddressApartmentFloor != null) {
            shoppingCart.clientAddressApartmentFloor = clientAddressApartmentFloor;
        }
        if (clientAddressApartmentEntrance != null) {
            shoppingCart.clientAddressApartmentEntrance = clientAddressApartmentEntrance;
        }
        if (clientAddressApartmentEntranceCode != null) {
            shoppingCart.clientAddressApartmentEntranceCode = clientAddressApartmentEntranceCode;
        }
        if (isAddressSetFromMapView != null){
            shoppingCart.isAddressSetFromMapView = isAddressSetFromMapView;
        }
        if (clientAddressStreetLat != null && clientAddressStreetLng != null) {
            shoppingCart.clientAddressStreetLat = clientAddressStreetLat;
            shoppingCart.clientAddressStreetLng = clientAddressStreetLng;
            shoppingCart.clientAddressGpsPointInsideDeliveryBoundaries = isPointInsidePolygon(shop, clientAddressStreetLat, clientAddressStreetLng);
        }

        shoppingCart.save();
        shoppingCart.formatObject();

        return json(shoppingCart);
    }

    private static boolean isPointInsidePolygon(ShopDTO shop, String latitude, String longitude) throws Exception {

        Double lat = Double.valueOf(latitude);
        Double lng = Double.valueOf(longitude);

        JSONParser parser = new JSONParser();
        String stringToParse = shop.delivery.courierPolygonData;
        JSONObject polygonData = (JSONObject) parser.parse(stringToParse);

        if (polygonData == null) {
            notFound("There is not right coordinates");
        }

        JSONArray polygon = (JSONArray) polygonData.get("features");
        JSONObject features = (JSONObject) polygon.get(0);
        JSONObject geometry = (JSONObject) features.get("geometry");
        JSONArray coordinates = (JSONArray) geometry.get("coordinates");
        JSONArray newCoordinates = (JSONArray) coordinates.get(0);

        List<PolygonUtil.Point> polygonPoints = new ArrayList<PolygonUtil.Point>();
        for (int i=0; i<newCoordinates.size(); i++) {
            JSONArray point = (JSONArray) newCoordinates.get(i);
            Double latitudePoint = (Double) point.get(0);
            Double longtitudePoint = (Double) point.get(1);
            PolygonUtil.Point points = new PolygonUtil.Point(longtitudePoint, latitudePoint);
            polygonPoints.add(points);
        }

        PolygonUtil.Point[] pointArray = new PolygonUtil.Point[polygonPoints.size()];
        polygonPoints.toArray(pointArray);

        int length = polygonPoints.size();
        PolygonUtil.Point point = new PolygonUtil.Point(lat, lng);
        boolean isPointInsidePolygon = PolygonUtil.isInside(pointArray, length, point);

        return isPointInsidePolygon;
    }

    public static String setPostDepartmentInfo(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String clientCity = request.params.get("clientCity");
        String clientPostDepartmentNumber = request.params.get("clientPostDepartmentNumber");

        System.out.println("setPostDepartmentInfo => " + "clientCity: " + clientCity + " " + "clientPostDepartmentNumber: " + clientPostDepartmentNumber);

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
        if (clientCity != null) {
            shoppingCart.clientCity = clientCity;
        }
        if (clientPostDepartmentNumber != null) {
            shoppingCart.clientPostDepartmentNumber = clientPostDepartmentNumber;
        }

        shoppingCart.save();
        shoppingCart.formatObject();

        return json(shoppingCart);
    }

}
