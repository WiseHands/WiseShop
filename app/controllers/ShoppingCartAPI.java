package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import json.shoppingcart.LineItem;
import models.*;
import play.Play;
import play.mvc.Before;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.TimeZone;

public class ShoppingCartAPI extends AuthController {

    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    @Before
    static void corsHeaders() {
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }

    public static void allowCors(){
        ok();
    }

    private String _getCartUuid() {
        String cartId = null;


        if (request.params.get("cartId") != null) {
            cartId = request.params.get("cartId");
        } else {
            if(request.cookies.get("userToken") == null) {
                return null;
            }
            String userTokenCookie = request.cookies.get("userToken").value;
            try {
                String encodingSecret = Play.configuration.getProperty("jwt.secret");
                Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
                JWTVerifier verifier = JWT.require(algorithm)
                        .withIssuer("wisehands")
                        .build(); //Reusable verifier instance
                DecodedJWT jwt = verifier.verify(userTokenCookie);
                cartId = jwt.getSubject();

            } catch (JWTVerificationException exception) {
                forbidden("Invalid Authorization header: " + userTokenCookie);
            }
        }
        return cartId;
    }

    public void getCart(ShopDTO shop) {
        String cartId = _getCartUuid();
        ShoppingCartDTO shoppingCart = null;

        if(cartId == null) {
            shoppingCart = new ShoppingCartDTO();
            shoppingCart.uuid = cartId;
            shoppingCart.shopUuid = shop.uuid;
            shoppingCart = shoppingCart.save();
        } else {
            shoppingCart = (ShoppingCartDTO) ShoppingCartDTO.find("byUuid", cartId).fetch().get(0);
        }


        renderJSON(json(shoppingCart));
    }

    public void addProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String productUuid = request.params.get("uuid");
        System.out.println("productId " + productUuid);
        ProductDTO product = ProductDTO.findById(productUuid);

        int quantity = 1;
        String quantityParam = request.params.get("quantity");
        if (quantityParam != null) {
            quantity = Integer.parseInt(quantityParam);
        }

        String cartId = _getCartUuid();

        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        LineItem lineItem = new LineItem(product.uuid, product.name, product.mainImage.filename, quantity, product.price);
        lineItem = lineItem.save();
        if (shoppingCart == null) {
            shoppingCart = new ShoppingCartDTO();
            shoppingCart.uuid = cartId;
            shoppingCart.shopUuid = shop.uuid;
        }

        if (shoppingCart.items == null) {
            shoppingCart.items = new ArrayList<>();
        }

        if (shoppingCart.items.size() == 0) {
            shoppingCart.items.add(lineItem);
            shoppingCart.save();
        } else {
            boolean isProductUnique = false;
            for (LineItem lineItems : shoppingCart.items) {
                if (productUuid.equals(lineItems.id)) {
                    isProductUnique = true;
                    lineItems.quantity = lineItems.quantity + quantity;
                    lineItems.save();
                }
            }

            if (!isProductUnique) {
                shoppingCart.items.add(lineItem);
                shoppingCart.save();
            }
        }


        getCart(shop);
    }

    public void deleteProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String lineItemUuid = request.params.get("uuid");

        String cartId = _getCartUuid();
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();

        LineItem lineItemToRemove = null;
        for (LineItem lineItem : shoppingCart.items) {
            if (lineItem.id.equals(lineItemUuid)) {
                lineItemToRemove = lineItem;
            }
        }
        shoppingCart.items.remove(lineItemToRemove);
        shoppingCart.save();

        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.delete();

        if (shoppingCart.items.size() == 0) {
            shoppingCart.delete();
        }

        getCart(shop);
    }

    public void increaseQuantityProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
        String lineItemUuid = request.params.get("uuid");

        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.quantity += 1;
        lineItem.save();

        getCart(shop);

    }

    public void decreaseQuantityProduct(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String lineItemUuid = request.params.get("uuid");

        LineItem lineItem = LineItem.findById(lineItemUuid);
        lineItem.quantity -= 1;
        if (lineItem.quantity == 0) {
            deleteProduct(client);
        }
        if (lineItem.quantity >= 0) {
            lineItem.save();
            getCart(shop);
        }


    }

    public void selectDeliveryType(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String delivery = request.params.get("deliverytype");
        System.out.println("deliverytype FROM REQUEST: " + delivery);

        String cartId = _getCartUuid();
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
        getCart(shop);
    }

    public void selectPaymentType(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }

        String payment = request.params.get("paymenttype");
        System.out.println("payment from request: " + payment);

        String cartId = _getCartUuid();
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

        getCart(shop);
    }


    public void setClientInfo(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
           String clientName = request.params.get("clientName");
           String clientPhone = request.params.get("clientPhone");
           String clientComments = request.params.get("clientComments");

           System.out.println("setClientInfo from request: " + clientComments + " " + clientPhone + " " + clientName);

           String cartId = _getCartUuid();
            ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
           if (clientName != null) {
               shoppingCart.clientName = clientName;
           }
           if (clientPhone != null) {
               shoppingCart.clientPhone = clientPhone;
           }
           if (clientComments != null) {
               shoppingCart.clientComments = clientComments;
           }

           shoppingCart.save();
           getCart(shop);

    }

    public void setAddressInfo(String client) {
        ShopDTO shop = ShopDTO.find("byDomain", client).first();
        if (shop == null){
            shop = ShopDTO.find("byDomain", "localhost").first();
        }
           String clientAddressStreetName = request.params.get("clientAddressStreetName");
           String clientAddressBuildingNumber = request.params.get("clientAddressBuildingNumber");
           String clientAddressAppartmentNumber = request.params.get("clientAddressAppartmentNumber");

           System.out.println("infoAboutClientAddress from request: " + clientAddressStreetName + " " + clientAddressBuildingNumber + " " + clientAddressAppartmentNumber);

           String cartId = _getCartUuid();
            ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
           if (clientAddressStreetName != null) {
               shoppingCart.clientAddressStreetName = clientAddressStreetName;
           }
           if (clientAddressBuildingNumber != null) {
               shoppingCart.clientAddressBuildingNumber = clientAddressBuildingNumber;
           }
           if (clientAddressAppartmentNumber != null) {
               shoppingCart.clientAddressAppartamentNumber = clientAddressAppartmentNumber;

           }

           shoppingCart.save();
           getCart(shop);

    }


     public void setPostDepartmentInfo(String client) {
         ShopDTO shop = ShopDTO.find("byDomain", client).first();
         if (shop == null){
             shop = ShopDTO.find("byDomain", "localhost").first();
         }
           String clientCity = request.params.get("clientCity");
           String clientPostDepartmentNumber = request.params.get("clientPostDepartmentNumber");

           String cartId = _getCartUuid();
         ShoppingCartDTO shoppingCart = ShoppingCartDTO.find("byUuid", cartId).first();
           if (clientCity != null) {
               shoppingCart.clientCity = clientCity;
           }
           if (clientPostDepartmentNumber != null) {
               shoppingCart.clientPostDepartmentNumber = clientPostDepartmentNumber;
           }


           shoppingCart.save();
           getCart(shop);

     }



}
