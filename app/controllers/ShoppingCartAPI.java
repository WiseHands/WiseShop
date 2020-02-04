package controllers;

import json.shoppingcart.LineItem;
import models.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import play.Play;
import play.mvc.Before;
import util.PolygonUtil;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import static util.ShoppingCartUtil._getCartUuid;

//-Xverify:none export JAVA_TOOL_OPTIONS="-Xverify:none"

public class ShoppingCartAPI extends AuthController {

    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    private static final boolean isDevEnv = Boolean.parseBoolean(Play.configuration.getProperty("dev.env"));

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

    public static void getCart(ShopDTO shop) {
        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = null;
        System.out.println("cartId from request " + cartId);
        if(cartId == null) {
            shoppingCart = _createCart(shop);
        } else {
            shoppingCart = (ShoppingCartDTO) ShoppingCartDTO.find("byUuid", cartId).fetch().get(0);
        }


        renderJSON(json(shoppingCart));
    }

    public static ShoppingCartDTO _createCart(ShopDTO shop) {
        ShoppingCartDTO shoppingCart = new ShoppingCartDTO();
        shoppingCart.shopUuid = shop.uuid;
        shoppingCart = shoppingCart.save();
        return shoppingCart;
    }

    public static void addProduct(String client) throws ParseException {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String productUuid = request.params.get("uuid");
        String stringAdditionList = request.params.get("additionList");

        JSONParser parser = new JSONParser();
        JSONArray jsonAdditionList = (JSONArray) parser.parse(stringAdditionList);

        List<JSONObject> additionList = new ArrayList<JSONObject>();
        List<AdditionOrderDTO> additionOrderDTOList = new ArrayList<AdditionOrderDTO>();

        for (int i=0; i<jsonAdditionList.size(); i++) {
        JSONObject additionObject = (JSONObject) jsonAdditionList.get(i);
            additionList.add(additionObject);
        }

        for(JSONObject object: additionList){
            AdditionDTO additionDTO = AdditionDTO.findById(object.get("uuid"));
            AdditionOrderDTO additionOrderDTO = new AdditionOrderDTO();
            additionOrderDTO.title = additionDTO.getTitle();
            additionOrderDTO.price = additionDTO.getPrice();
            additionOrderDTO.imagePath = _getWholePath(String.valueOf(additionDTO.getImagePath()), shop);
            additionOrderDTO.counter = (Long) object.get("counter");
            additionOrderDTO.save();
            additionOrderDTOList.add(additionOrderDTO);
        }

        System.out.println("productId " + productUuid + "\n" + additionList);
        ProductDTO product = ProductDTO.findById(productUuid);

        int quantity = 1;
        String quantityParam = request.params.get("quantity");
        if (quantityParam != null) {
            quantity = Integer.parseInt(quantityParam);
        }

        String cartId = _getCartUuid(request);

        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();


        LineItem lineItem = new LineItem(product.uuid, product.name, product.mainImage.filename, quantity, product.price, shop, additionOrderDTOList);
        if (shoppingCart == null) {
            shoppingCart = new ShoppingCartDTO();
            if(cartId != null) {
                shoppingCart.uuid = cartId;
            }
            shoppingCart.shopUuid = shop.uuid;
        }


        if (shoppingCart.items.size() == 0) {
            shoppingCart.items.add(lineItem);
        } else {
            boolean isProductUnique = false;
            for (LineItem lineItems : shoppingCart.items) {
                if (productUuid.equals(lineItems.productId)) {
                    isProductUnique = true;
                    lineItems.quantity = lineItems.quantity + quantity;
                    lineItems.save();
                }
            }

            if (!isProductUnique) {
                shoppingCart.items.add(lineItem);
            }
        }

        shoppingCart.save();
        renderJSON(json(shoppingCart));
    }

    private static String _getWholePath(String imagePath, ShopDTO shop) {
        String path = shop.domain;
        if(isDevEnv) {
            path = path + ":3334";
        }
        return imagePath = String.format("http://%s/public/product_images/%s/%s", path, shop.uuid, imagePath);

    }

    public static void deleteProduct(String client) {
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


        renderJSON(json(shoppingCart));
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

    public void increaseQuantityProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String lineItemUuid = request.params.get("uuid");
        String cartId = request.params.get("cartId");

        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.quantity += 1;
        lineItem.save();


        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
        renderJSON(json(shoppingCart));
    }

    public static void decreaseQuantityProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String lineItemUuid = request.params.get("uuid");
        String cartId = request.params.get("cartId");
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();


        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.quantity -= 1;
        if (lineItem.quantity == 0) {
            _deleteProduct(shoppingCart, lineItemUuid);
            renderJSON(json(shoppingCart));
        }
        if (lineItem.quantity >= 0) {
            lineItem.save();
            renderJSON(json(shoppingCart));
        }


    }

    public static void selectDeliveryType(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String delivery = request.params.get("deliverytype");
        System.out.println("deliverytype FROM REQUEST: " + delivery);

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        switch (delivery) {
            case "COURIER":
                System.out.println("COURIER: " + true);
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.COURIER;
                break;
            case "POSTSERVICE":
                System.out.println("POSTSERVICE: " + true);
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.POSTSERVICE;
                break;
            case "SELFTAKE":
                System.out.println("SELFTAKE: " + true);
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.SELFTAKE;
                break;
        }
        shoppingCart.save();
        shoppingCart.formatObject();

        renderJSON(json(shoppingCart));

    }

    public static void selectPaymentType(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String payment = request.params.get("paymenttype");
        System.out.println("payment from request: " + payment);

        String cartId = _getCartUuid(request);
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        switch (payment) {
            case "CREDITCARD":
                System.out.println("CREDITCARD: " + true);
                shoppingCart.paymentType = ShoppingCartDTO.PaymentType.CREDITCARD;
                break;
            case "CASHONDELIVERY":
                System.out.println("CASHONDELIVERY: " + true);
                shoppingCart.paymentType = ShoppingCartDTO.PaymentType.CASHONDELIVERY;
                break;
        }
        shoppingCart.save();
        shoppingCart.formatObject();

        renderJSON(json(shoppingCart));
    }

    public static void setClientInfo(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
           String clientName = request.params.get("clientName");
           String clientPhone = request.params.get("clientPhone");
           String clientEmail = request.params.get("clientEmail");
           String clientComments = request.params.get("clientComments");

           System.out.println("setClientInfo from request: " + clientComments + " " + clientPhone + " " + clientEmail + " " + clientName);

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
           renderJSON(json(shoppingCart));

    }

    public static void setAddressInfo(String client) throws Exception {
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

           System.out.println("infoAboutClientAddress from request: " + clientAddressStreetName + " " + clientAddressBuildingNumber + " " + clientAddressApartmentNumber);
           System.out.println("infoAboutClientAddress from clientAddressStreetLat: " + clientAddressStreetLat + " " + clientAddressStreetLng);

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
           if (clientAddressStreetLat != null && clientAddressStreetLng != null) {
               shoppingCart.clientAddressStreetLat = clientAddressStreetLat;
               shoppingCart.clientAddressStreetLng = clientAddressStreetLng;
               shoppingCart.clientAddressGpsPointInsideDeliveryBoundaries = isPointInsidePolygon(shop, clientAddressStreetLat, clientAddressStreetLng);
           }

           shoppingCart.save();
           shoppingCart.formatObject();

           renderJSON(json(shoppingCart));

    }

    private static boolean isPointInsidePolygon(ShopDTO shop, String latitude, String longitude) throws Exception{

        Double lat = Double.valueOf(latitude);
        Double lng = Double.valueOf(longitude);

        JSONParser parser = new JSONParser();
        String stringToParse = shop.delivery.courierPolygonData;
        JSONObject polygonData = (JSONObject) parser.parse(stringToParse);

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
            System.out.println("POINT [" + i + "]: " + latitudePoint + ":" + longtitudePoint);
        }

        PolygonUtil.Point[] pointArray = new PolygonUtil.Point[polygonPoints.size()];
        polygonPoints.toArray(pointArray);

        int length = polygonPoints.size();
        PolygonUtil.Point point = new PolygonUtil.Point(lat, lng);
        boolean isPointInsidePolygon = PolygonUtil.isInside(pointArray, length, point);

        System.out.println("isPointInsidePolygon: " + isPointInsidePolygon);

        return isPointInsidePolygon;
    }

     public static void setPostDepartmentInfo(String client) {
         ShopDTO shop = ShopDTO.find("byDomain", client).first();
         if (shop == null){
             shop = ShopDTO.find("byDomain", "localhost").first();
         }
         String clientCity = request.params.get("clientCity");
         String clientPostDepartmentNumber = request.params.get("clientPostDepartmentNumber");

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

         renderJSON(json(shoppingCart));
     }

}
