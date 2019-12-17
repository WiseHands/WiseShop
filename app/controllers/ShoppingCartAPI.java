package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
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
    }

    private String _getCartUuid() {
        String uuid = null;


        if (request.params.get("uuid") != null) {
            uuid = request.params.get("uuid");
        } else {
            String userTokenCookie = request.cookies.get("userToken").value;
            try {
                String encodingSecret = Play.configuration.getProperty("jwt.secret");
                Algorithm algorithm = Algorithm.HMAC256(encodingSecret);
                JWTVerifier verifier = JWT.require(algorithm)
                        .withIssuer("wisehands")
                        .build(); //Reusable verifier instance
                DecodedJWT jwt = verifier.verify(userTokenCookie);
                uuid = jwt.getSubject();

            } catch (JWTVerificationException exception) {
                forbidden("Invalid Authorization header: " + userTokenCookie);
            }
        }
        return uuid;
    }

    public void getCart() {
        String uuid = _getCartUuid();
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(uuid);
        renderJSON(json(shoppingCart));
    }

    public void addProduct() {
        String productUuid = request.params.get("uuid");
        System.out.println("productId " + productUuid);
        ProductDTO product = ProductDTO.findById(productUuid);

        int quantity = 1;
        String quantityParam = request.params.get("quantity");
        if (quantityParam != null) {
            quantity = Integer.parseInt(quantityParam);
        }

        String uuid = _getCartUuid();
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(uuid);


        LineItemDTO lineItem = new LineItemDTO();
        if (shoppingCart == null) {
            shoppingCart = new ShoppingCartDTO();
            shoppingCart.uuid = uuid;
        }


        if (shoppingCart.lineItemList == null) {
            shoppingCart.lineItemList = new ArrayList<>();
        }


        if (shoppingCart.lineItemList.size() == 0) {
            lineItem.product = product;
            lineItem.quantity = quantity;
            lineItem = lineItem.save();

            shoppingCart.lineItemList.add(lineItem);
            shoppingCart.save();
        } else {
            boolean isProductUnique = false;
            for (LineItemDTO lineItems : shoppingCart.lineItemList) {
                if (productUuid.equals(lineItems.product.uuid)) {
                    isProductUnique = true;
                    lineItems.quantity = lineItems.quantity + quantity;
                    lineItems.save();
                }
            }

            if (!isProductUnique) {
                lineItem.product = product;
                lineItem.quantity = quantity;
                lineItem = lineItem.save();

                shoppingCart.lineItemList.add(lineItem);
                shoppingCart.save();
            }
        }


        getCart();
    }

    public void deleteProduct() {
        String lineItemUuid = request.params.get("uuid");

        String uuid = _getCartUuid();
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(uuid);

        LineItemDTO lineItemToRemove = null;
        for (LineItemDTO lineItem : shoppingCart.lineItemList) {
            if (lineItem.uuid.equals(lineItemUuid)) {
                lineItemToRemove = lineItem;
            }
        }
        shoppingCart.lineItemList.remove(lineItemToRemove);
        shoppingCart.save();

        LineItemDTO lineItem = LineItemDTO.findById(lineItemUuid);
        lineItem.delete();

        if (shoppingCart.lineItemList.size() == 0) {
            shoppingCart.delete();
        }

        getCart();
    }

    public void increaseQuantityProduct() {

        String lineItemUuid = request.params.get("uuid");

        LineItemDTO lineItem = LineItemDTO.findById(lineItemUuid);
        lineItem.quantity += 1;
        lineItem.save();

        getCart();

    }

    public void decreaseQuantityProduct() {

        String lineItemUuid = request.params.get("uuid");

        LineItemDTO lineItem = LineItemDTO.findById(lineItemUuid);
        lineItem.quantity -= 1;
        if (lineItem.quantity == 0) {
            deleteProduct();
        }
        if (lineItem.quantity >= 0) {
            lineItem.save();
            getCart();
        }


    }

    public void selectDeliveryType() {

        String delivery = request.params.get("deliverytype");
        System.out.println("deliverytype FROM REQUEST: " + delivery);

        String uuid = _getCartUuid();
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(uuid);

        switch (delivery) {
            case "COURIER":
                System.out.println("COURIER: " + true);
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.COURIER;
                break;
            case "NOVAPOSHTA":
                System.out.println("NOVAPOSHTA: " + true);
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.POSTSERVICE;
                break;
            case "SELFTAKE":
                System.out.println("SELFTAKE: " + true);
                shoppingCart.deliveryType = ShoppingCartDTO.DeliveryType.SELFTAKE;
                break;
        }
        shoppingCart.save();
        getCart();
    }

    public void selectPaymentType() {

        String payment = request.params.get("paymenttype");
        System.out.println("payment from request: " + payment);

        String uuid = _getCartUuid();
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(uuid);

        switch (payment) {
            case "PAYONLINE":
                System.out.println("PAYONLINE: " + true);
                shoppingCart.paymentType = ShoppingCartDTO.PaymentType.CREDITCARD;
                break;
            case "CASHONSPOT":
                System.out.println("CASHONSPOT: " + true);
                shoppingCart.paymentType = ShoppingCartDTO.PaymentType.CASHONDELIVERY;
                break;

        }
        shoppingCart.save();

        getCart();
    }

    public void setClientInfo() {

        String clientName = request.params.get("clientname");
        String clientPhone = request.params.get("clientphone");
        String clientComments = request.params.get("clientcomments");

        System.out.println("infoAboutClient from request: " + clientName + " " + clientPhone + " " + clientComments);

        String uuid = _getCartUuid();
        ShoppingCartDTO shoppingCart = ShoppingCartDTO.findById(uuid);
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
        getCart();

    }

}
